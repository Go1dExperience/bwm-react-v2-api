provider "aws" {
  region = var.region
  default_tags {
    tags = local.tags
  }
}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.100.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "2.20.0"
    }
  }
  backend "s3" { }

}

provider "kubernetes" {
  host                   = aws_eks_cluster.bwm-cluster.endpoint
  cluster_ca_certificate = base64decode(aws_eks_cluster.bwm-cluster.certificate_authority[0].data)
  token                  = data.aws_eks_cluster_auth.token.token
}
resource "aws_iam_openid_connect_provider" "oidc" {
  url = aws_eks_cluster.bwm-cluster.identity[0].oidc[0].issuer

  client_id_list = ["sts.amazonaws.com"]

  thumbprint_list = [data.tls_certificate.oidc_cert.certificates[0].sha1_fingerprint]
}

data "aws_eks_cluster_auth" "token" {
  name = aws_eks_cluster.bwm-cluster.name
}

data "tls_certificate" "oidc_cert" {
  url = aws_eks_cluster.bwm-cluster.identity[0].oidc[0].issuer
}

data "aws_caller_identity" "current" {}

data "aws_region" "current" {}
