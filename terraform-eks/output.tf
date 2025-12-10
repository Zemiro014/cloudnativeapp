output "cluster_endpoint" {
  description = "Endpoint for EKS control plane"
  value       = aws_eks_cluster.main.endpoint # Mudou de module.eks.
}

output "rds_endpoint" {
  description = "Endpoint do Banco de Dados"
  value       = aws_db_instance.default.address
}

output "cluster_name" {
  value = aws_eks_cluster.main.name
}

output "configure_kubectl" {
  description   = "Comando para configurar o kubectl no seu terminal"
  value         = "aws eks update-kubeconfig --region us-east-1 --name ${aws_eks_cluster.main.name}"
}