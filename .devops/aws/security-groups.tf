resource "aws_security_group" "rds_sg" {
  name        = "${local.env}-${local.vars.application}-rds-sg"
  description = "Security group for RDS bwm database"
  vpc_id      = local.vars.vpc_id

  # Inbound rules
  ingress {
    description      = "Allow all traffic access to PostgreSQL RDS"
    from_port        = 5432
    to_port          = 5432
    protocol         = "tcp"
    cidr_blocks      = ["${local.vars.vpc_cidr_block}"]
  }

  ingress {
    description      = "Allow all traffic access RDS private network"
    from_port        = 0
    to_port          = 65535
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
  }

  # Outbound rules
  egress {
    description      = "Allow all outbound traffic"
    from_port        = 0
    to_port          = 65535
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
  }
  egress {
    description      = "Allow all outbound traffic"
    from_port        = 0
    to_port          = 65535
    protocol         = "udp"
    cidr_blocks      = ["0.0.0.0/0"]
  }
}
