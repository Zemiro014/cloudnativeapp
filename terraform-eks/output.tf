output "cluster_endpoint" {
  description = "Endpoint for EKS control plane"
  value       = module.eks.cluster_endpoint
}

output "rds_endpoint" {
  description = "Endpoint do Banco de Dados"
  value       = aws_db_instance.default.address
}

output "configure_kubectl" {
  description = "Comando para configurar o kubectl no seu terminal"
  value       = "aws eks update-kubeconfig --region us-east-1 --name ${var.cluster_name}"
}