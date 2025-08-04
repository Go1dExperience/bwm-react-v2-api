# For the control plane to assume the role to manage log group, attach secutiry group policy
resource "aws_iam_role" "eks_cluster" {
  name = "eks-cluster-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect    = "Allow",
      Principal = { Service = "eks.amazonaws.com" },
      Action    = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy_attachment" "eks_cluster_policy" {
  role       = aws_iam_role.eks_cluster.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
}
# Same as ecs task execution role
resource "aws_iam_role" "eks_node" {
  name = "eks-node-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect    = "Allow",
      Principal = { Service = "ec2.amazonaws.com" },
      Action    = "sts:AssumeRole"
    }]
  })
}
# Lets nodes join the EKS cluster, register themselves, pull kubelet configs, etc.
resource "aws_iam_role_policy_attachment" "eks_worker_node_policy" {
  role       = aws_iam_role.eks_node.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
}
# Needed for the VPC CNI plugin, which handles pod networking. 
resource "aws_iam_role_policy_attachment" "eks_cni_policy" {
  role       = aws_iam_role.eks_node.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
}
# Lets nodes pull images from ECR
resource "aws_iam_role_policy_attachment" "eks_registry_policy" {
  role       = aws_iam_role.eks_node.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}
// IRSA Role for Kubernetes Service Account
resource "aws_iam_role" "irsa_role" {
  name = "${local.env}-${local.vars.project}-irsa-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow",
      Principal = {
        Federated = aws_iam_openid_connect_provider.oidc.arn
      },
      Action = "sts:AssumeRoleWithWebIdentity",
      Condition = {
        StringEquals = {
          "${replace(aws_eks_cluster.bwm-cluster.identity[0].oidc[0].issuer, "https://", "")}:sub" = "system:serviceaccount:${kubernetes_namespace.prod-namespace.metadata[0].name}:${local.env}-${local.vars.application}-service-account"
        }
      }
    }]
  })
}
