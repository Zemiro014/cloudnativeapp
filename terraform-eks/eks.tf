module "eks" {
  source    = "terraform-aws-modules/eks/aws"
  version   = "~> 19.0"

  cluster_name      = var.cluster_name
  cluster_version   = "1.28" # Kubernetes Version

  # O cluster deve ser acessível via internet (para você rodar comandos kubectl)
  cluster_endpoint_public_access = true

  vpc_id        = aws_vpc.main.id
  subnet_ids    = [ aws_subnet.private_subnet_1a.id, aws_subnet.private_subnet_1b.id ]

  # --- WORKER NODES (As máquinas que rodam os containers) ---
  eks_managed_node_groups = {
    main = {
        min_size        = 1
        max_size        = 3
        desired_size    = 2

        instance_types = ["t3.medium"]
        capacity_type = "ON_DEMAND"
    }
  }

  enable_irsa = true

  tags = {
    Environment = "dev"
    Terraform   = "true"
  }
}

  # Security Group Rule: Permite que os Nodes do EKS acessem o RDS
resource "aws_security_group_rule" "eks_nodes_to_rds" {
  type                     = "ingress"
  from_port                = 3306
  to_port                  = 3306
  protocol                 = "tcp"
  security_group_id        = aws_security_group.rds_sg.id
  source_security_group_id = module.eks.node_security_group_id # Pega o SG dos Nodes criado pelo módulo
}