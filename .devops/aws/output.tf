output "rds_id" {
  value = aws_db_instance.this.id
}

output "rds_direct_endpoint" {
  description = "Direct RDS endpoint"
  value       = aws_db_instance.this.endpoint
  sensitive   = true
}


output "rds_proxy_endpoint" {
  description = "RDS Proxy endpoint for database connections"
  value       = aws_db_proxy.this.endpoint
}

output "rds_proxy_custom_endpoint" {
  description = "RDS Proxy custom endpoint"
  value       = aws_db_proxy_endpoint.this.endpoint
}