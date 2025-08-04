data "aws_ecr_repository" "task_ecr" {
  name = "${local.vars.project}/${local.env}-${local.vars.application}"
}
data "aws_secretsmanager_secret" "auth_secret" {
  name = local.vars.secret_manager_name
}
data "aws_secretsmanager_secret_version" "auth_secret_version" {
  secret_id = data.aws_secretsmanager_secret.auth_secret.id
}
