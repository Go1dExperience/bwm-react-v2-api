resource "aws_eks_cluster" "bwm-cluster" {
  name     = "${local.env}-cluster"
  role_arn = aws_iam_role.eks_cluster.arn
  enabled_cluster_log_types = ["api", "audit", "authenticator"]
  access_config {
    authentication_mode = "API_AND_CONFIG_MAP"
  }
  vpc_config {
    subnet_ids = local.vars.private_subnets
  }

  depends_on = [aws_iam_role_policy_attachment.eks_cluster_policy]
}

resource "aws_eks_addon" "coredns" {
  cluster_name = aws_eks_cluster.bwm-cluster.name
  addon_name   = "coredns"
  depends_on   = [aws_eks_node_group.bwm-node-group]
}

resource "aws_eks_addon" "vpc_cni" {
  cluster_name = aws_eks_cluster.bwm-cluster.name
  addon_name   = "vpc-cni"
  depends_on   = [aws_eks_node_group.bwm-node-group]
}

resource "aws_eks_addon" "kube_proxy" {
  cluster_name = aws_eks_cluster.bwm-cluster.name
  addon_name   = "kube-proxy"
  depends_on   = [aws_eks_node_group.bwm-node-group]
}

resource "aws_eks_node_group" "bwm-node-group" {
  cluster_name    = aws_eks_cluster.bwm-cluster.name
  node_group_name = "${local.env}-node-group"
  node_role_arn   = aws_iam_role.eks_node.arn
  subnet_ids      = local.vars.private_subnets

  scaling_config {
    desired_size = 2
    max_size     = 3
    min_size     = 1
  }

  instance_types = ["${local.vars.instance_type}"]

  depends_on = [
    aws_eks_cluster.bwm-cluster,
  ]
}
resource "aws_eks_access_entry" "terraform_access" {
  cluster_name      = aws_eks_cluster.bwm-cluster.name
  principal_arn     = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:user/bwm-user"
  type              = "STANDARD"
  depends_on = [aws_eks_cluster.bwm-cluster]

}

resource "aws_eks_access_policy_association" "terraform_admin" {
  cluster_name  = aws_eks_cluster.bwm-cluster.name
  principal_arn = aws_eks_access_entry.terraform_access.principal_arn
  policy_arn    = "arn:aws:eks::aws:cluster-access-policy/AmazonEKSClusterAdminPolicy"
  access_scope {
    type = "cluster"
  }
}

resource "kubernetes_deployment" "bwm-api-deployment" {
  metadata {
    name      = "${local.env}-${local.vars.application}-deployment"
    labels = {
      app = "${local.vars.application}"
    }
  }
  depends_on = [aws_eks_node_group.bwm-node-group]

  spec {
    replicas = 2
    selector {
      match_labels = {
        app = "${local.vars.application}"
      }
    }

    template {
      metadata {
        labels = {
          app = "${local.vars.application}"
        }
      }

      spec {
        service_account_name = kubernetes_service_account.irsa.metadata[0].name
        container {
          image = "${data.aws_ecr_repository.task_ecr.repository_url}:${var.image_tag}"
          name  = "${local.env}-${local.vars.application}"
          env {
            name  = "ENVIRONMENT"
            value = local.env
          }
          env {
            name  = "DB_PORT"
            value = 5432
          }
          env {
            name  = "DB_HOST"
            value = aws_db_instance.this.address
          }
          env {
            name  = "DB_NAME"
            value = aws_db_instance.this.db_name
          }
          env {
            name  = "DB_USER"
            value = local.vars.rds_username
          }
          env {
            name  = "DB_PASSWORD"
            value = jsondecode(data.aws_secretsmanager_secret_version.auth_secret_version.secret_string)["RDS_PASSWORD"]
          }
          env {
            name  = "PORT"
            value = "3000"
          }
          port {
            container_port = 3000
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "bwm-api-service" {
  metadata {
    name      = "${local.env}-${local.vars.application}-service"
    annotations = {
      "service.beta.kubernetes.io/aws-load-balancer-scheme" = "internet-facing"
    }
  }
  spec {
    selector = {
      app = "${local.vars.application}"
    }
    port {
      port        = 80
      target_port = 3000
    }
    type = "LoadBalancer"

  }
  depends_on = [aws_eks_node_group.bwm-node-group]
}

resource "kubernetes_service_account" "irsa" {
  metadata {
    name      = "${local.env}-${local.vars.application}-service-account"
    annotations = {
      "eks.amazonaws.com/role-arn" = aws_iam_role.irsa_role.arn
    }
  }
}