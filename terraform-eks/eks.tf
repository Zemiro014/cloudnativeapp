# ==========================================
# 1. IAM ROLE FOR CLUSTER (Control Plane)
# ==========================================

# The ROLE that EKS service needs to manager resources in our aws count
resource "aws_iam_role" "cluster_role" {
  name                  = "${var.cluster_name}-cluster-role"

# TRUST POLICY: Aqui definimos QUEM pode usar o crachá
  assume_role_policy    = jsonencode({
    Version     = "2012-10-17"
    Statement   = [{
      Action = "sts:AssumeRole" # Permissão para "vestir" o role
      Effect = "Allow"
      Principal = {
        Service = "eks.amazonaws.com" # <--- SÓ O EKS PODE USAR!
      }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "cluster_policy" {
    # O QUE pode fazer: Tudo o que a AWS definiu como necessário para um cluster
  policy_arn    = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
  # QUEM ganha o poder: O nosso Role criado acima
  role          = aws_iam_role.cluster_role.name
}

# ==========================================
# 2. O CLUSTER EKS
# ==========================================
resource "aws_eks_cluster" "main" {
  name      = var.cluster_name
  role_arn  = aws_iam_role.cluster_role.arn
  version   = "1.28" # Kubernet version

  vpc_config {
    # O Cluster deve saber onde criar suas interfaces de rede
    subnet_ids = [ 
        aws_subnet.public_subnet_1a.id, # Necessário para Load Balancers públicos
        aws_subnet.public_subnet_1b.id,
        aws_subnet.private_subnet_1a.id,
        aws_subnet.private_subnet_1b.id
     ]

     # Acesso ao endpoint da API (kubectl)
     endpoint_private_access = true
     endpoint_public_access = true
  }

  depends_on = [ aws_iam_role_policy_attachment.cluster_policy ]
}

# ==========================================
# 3. OIDC PROVIDER (Para autenticação avançada)
# ==========================================
# Isso permite criar "IAM Roles for Service Accounts" no futuro (segurança granular)
data "tls_certificate" "tls_cert_eks" {
  url = aws_eks_cluster.main.identity[0].oidc[0].issuer
}

resource "aws_iam_openid_connect_provider" "op_conn_prov_eks" {
  client_id_list    = [ "sts.amazonaws.com" ]
  thumbprint_list   = [ data.tls_certificate.tls_cert_eks.certificates[0].sha1_fingerprint ]
  url               = aws_eks_cluster.main.identity[0].oidc[0].issuer
}

# ==========================================
# 4. IAM ROLE PARA OS NODES (Workers)
# ==========================================

# A Role que as máquinas EC2 vão assumir
resource "aws_iam_role" "node_role" {
  name = "${var.cluster_name}-node-role"

  assume_role_policy = jsondecode({
    version = "2012-10-17"
    Statement = [{
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
            Service = "ec2.amazonaws.com"
        }
    }]
  })
}

# Políticas OBRIGATÓRIAS para os Nodes funcionarem
resource "aws_iam_role_policy_attachment" "node_policy_worker" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
  role       = aws_iam_role.node_role.name
}

resource "aws_iam_role_policy_attachment" "node_policy_cni" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy" # Rede do K8s
  role       = aws_iam_role.node_role.name
}

resource "aws_iam_role_policy_attachment" "node_policy_registry" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly" # Baixar imagens
  role       = aws_iam_role.node_role.name
}

# ==========================================
# 5. NODE GROUP (As máquinas EC2)
# ==========================================

resource "aws_eks_node_group" "main" {
  cluster_name    = aws_eks_cluster.main.name
  node_group_name = "main-node-group"
  node_role_arn   = aws_iam_role.node_role.arn
  
  # Onde os nodes vão rodar? NAS SUBNETS PRIVADAS!
  subnet_ids      = [
    aws_subnet.private_1a.id,
    aws_subnet.private_1b.id
  ]

  scaling_config {
    desired_size = 2
    max_size     = 3
    min_size     = 1
  }

  instance_types = ["t3.medium"]
  capacity_type  = "ON_DEMAND"

  # Dependências críticas para não quebrar a criação
  depends_on = [
    aws_iam_role_policy_attachment.node_policy_worker,
    aws_iam_role_policy_attachment.node_policy_cni,
    aws_iam_role_policy_attachment.node_policy_registry,
  ]
}