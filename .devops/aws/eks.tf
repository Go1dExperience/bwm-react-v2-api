resource "aws_eks_cluster" "bwm-cluster" {
  name     = "${local.env}-${local.vars.project}-cluster"
  role_arn = aws_iam_role.eks_cluster.arn

  vpc_config {
    subnet_ids = local.vars.private_subnets
  }

  depends_on = [aws_iam_role_policy_attachment.eks_cluster_policy]
}

resource "aws_eks_node_group" "bwm-node-group" {
  cluster_name    = aws_eks_cluster.bwm-cluster.name
  node_group_name = "${local.env}-${local.vars.project}-node-group"
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
    aws_iam_role_policy_attachment.eks_worker_node_policy
  ]
}

resource "kubernetes_namespace" "prod-namespace" {
  metadata {
    name = "${local.vars.project}-${local.env}"
  }
}

resource "kubernetes_deployment" "bwm-api-deployment" {
  metadata {
    name      = "${local.env}-${local.vars.application}-deployment"
    namespace = kubernetes_namespace.prod-namespace.metadata[0].name
    labels = {
      app = "${local.vars.application}"
    }
  }

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
            name = "DB_PORT"
            value = 5432
          }
          env {
            name  = "DB_HOST"
            value = aws_db_instance.this.address
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
    namespace = kubernetes_namespace.prod-namespace.metadata[0].name
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
}
