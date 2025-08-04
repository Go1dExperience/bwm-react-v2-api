resource "aws_db_subnet_group" "this" {
  name        = join("-", [local.env, local.vars.project, local.vars.application, "rds-subnet-group"])
  subnet_ids  = local.vars.private_subnets
  tags = local.tags
}

resource "aws_db_instance" "this" {
  identifier              = join("-", [local.env, local.vars.project, local.vars.application, "rds"])
  db_name                 = "bwm_db" 
  engine                  = "postgres"
  engine_version          = local.vars.rds_engine_version
  parameter_group_name    = local.vars.rds_parameter_group_name
  instance_class          = local.vars.rds_instance_class
  username                = jsondecode(data.aws_secretsmanager_secret_version.auth_secret_version.secret_string)["RDS_USERNAME"]
  password                = jsondecode(data.aws_secretsmanager_secret_version.auth_secret_version.secret_string)["RDS_PASSWORD"]
  backup_retention_period = local.vars.rds_backup_retention_period
  vpc_security_group_ids  = [ aws_security_group.rds_sg.id ]
  db_subnet_group_name    = aws_db_subnet_group.this.name
  skip_final_snapshot     = true
  allow_major_version_upgrade = true
  enabled_cloudwatch_logs_exports = []
  allocated_storage     = 100
  max_allocated_storage = 200
  storage_type         = "gp3"
  tags = local.tags
}

# Security Group for RDS Proxy
resource "aws_security_group" "rds_proxy_sg" {
  name_prefix = join("-", [local.env, local.vars.project, local.vars.application, "rds-proxy-sg"])
  vpc_id      = local.vars.vpc_id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Or use security_groups for more restrictive access
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(local.tags, {
    Name = join("-", [local.env, local.vars.project, local.vars.application, "rds-proxy-sg"])
  })
}

# IAM Role for RDS Proxy
resource "aws_iam_role" "rds_proxy_role" {
  name = join("-", [local.env, local.vars.project, local.vars.application, "rds-proxy-role"])

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "rds.amazonaws.com"
        }
      }
    ]
  })

  tags = local.tags
}

# IAM Role Policy Attachment for RDS Proxy
resource "aws_iam_role_policy_attachment" "rds_proxy_policy" {
  role       = aws_iam_role.rds_proxy_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonRDSEnhancedMonitoringRole"
}

# Custom policy for Secrets Manager access
resource "aws_iam_role_policy" "rds_proxy_secrets_policy" {
  name = join("-", [local.env, local.vars.project, local.vars.application, "rds-proxy-secrets-policy"])
  role = aws_iam_role.rds_proxy_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "GetSecretValue"
        Effect = "Allow"
        Action = [
          "secretsmanager:GetSecretValue"
        ]
        Resource = data.aws_secretsmanager_secret.auth_secret.arn
      },
      {
        Sid    = "DecryptSecretValue"
        Effect = "Allow"
        Action = [
          "kms:Decrypt"
        ]
        Resource = "*"
      }
    ]
  })
}

# RDS Proxy
resource "aws_db_proxy" "this" {
  name                   = join("-", [local.env, local.vars.project, local.vars.application, "rds-proxy"])
  debug_logging          = false
  engine_family         = "POSTGRESQL"
  idle_client_timeout   = 1800
  require_tls           = false
  role_arn              = aws_iam_role.rds_proxy_role.arn
  vpc_subnet_ids        = local.vars.private_subnets

  auth {
    auth_scheme = "SECRETS"
    description = "RDS Proxy auth for PostgreSQL"
    iam_auth    = "DISABLED"
    secret_arn  = data.aws_secretsmanager_secret.auth_secret.arn
  }

  tags = local.tags
}

# RDS Proxy Default Target Group
resource "aws_db_proxy_default_target_group" "this" {
  db_proxy_name = aws_db_proxy.this.name

  connection_pool_config {
    connection_borrow_timeout    = 120
    init_query                  = ""
    max_connections_percent     = 100
    max_idle_connections_percent = 50
    session_pinning_filters     = []
  }
}

# RDS Proxy Target
resource "aws_db_proxy_target" "this" {
  db_instance_identifier = aws_db_instance.this.identifier
  db_proxy_name         = aws_db_proxy.this.name
  target_group_name     = aws_db_proxy_default_target_group.this.name
}

# Associate security group with RDS Proxy
resource "aws_db_proxy_endpoint" "this" {
  db_proxy_name          = aws_db_proxy.this.name
  db_proxy_endpoint_name = join("-", [local.env, local.vars.project, local.vars.application, "rds-proxy-endpoint"])
  vpc_subnet_ids         = local.vars.private_subnets
  vpc_security_group_ids = [aws_security_group.rds_proxy_sg.id]
  target_role           = "READ_WRITE"
  
  tags = local.tags
}
