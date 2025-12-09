module "vpc" {
  source            = "terraform-aws-modules/vpc/aws"
  version           = "5.1.2"

  name              = "${var.cluster_name}-vpc"
  cidr              = "10.0.0.0/16"

  azs               = ["us-east-1a", "us-east-1b"]
  private_subnets   = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets    = ["10.0.101.0/24", "10.0.102.0/24"]

  enable_nat_gateway    = true # Kubernete needs a NAT to download imagens docker for private subnets
  single_nat_gateway    = true # Economiza dinheiro (1 NAT em vez de 2)
  enable_dns_hostnames  = true

  #   Mandatories Tags to allow EKS knowing where can creates the load balancers
  public_subnet_tags = {
    "kubernetes.io/role/elb" = 1
  }
  
  private_subnet_tags = {
    "kubernetes.io/role/internal-elb" = 1
  }

}