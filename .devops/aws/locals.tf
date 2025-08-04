locals {
  env        = terraform.workspace
  account_id = data.aws_caller_identity.current.account_id
  vars       = merge(
    yamldecode(file("configs/common.yml")),
    yamldecode(file("envs/${local.env}/conf.yaml"))
  )
  tags = {
    AdministratorEmail = "tienhung0182@gmail.com"
    Project            = local.vars.project
    Environment        = local.env
    Application        = local.vars.application
    Owner              = "Hung Tran"
    CreatedUsing       = "terraform"
    RepoURL            = "https://github.com/Go1dExperience/bwm-react-v2-api"
  }
}
