# 1. The VPC ( Container of Network)
resource "aws_vpc" "main" {
  cidr_block            = "10.0.0.0/16"
  enable_dns_hostnames  = true
  enable_dns_support    = true

  tags = {
    Name = "${var.cluster_name}-vpc"
  }
}

# 2. Internet Gateway (Allow public subnet accessing the external network)
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${var.cluster_name}-igw"
  }
}

# 3. Public Subnets(Where stays the Public Load Balancers and NAT)
resource "aws_subnet" "public_subnet_1a" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = true # Allow Public IP automaticly

  tags = {
    Name                      = "public_subnet_1a"
    "kubernetes.io/role/elb"  = "1" # <--- Important for our Load Balancer
  }
}

resource "aws_subnet" "public_subnet_1b" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "us-east-1b"
  map_public_ip_on_launch = true

  tags = {
    Name                      = "public_subnet_1b"
    "kubernetes.io/role/elb"  = "1"
  }
}

# 4. NAT Gateway (Allow the Private Subnets to access the internet)
# We need the immutable IP (Elastic IP - eip) for our NAT
resource "aws_eip" "nat_eip" {
  domain = "vpc"

  tags = {
    Name = "${var.cluster_name}-nat_eip"
  }
}

resource "aws_nat_gateway" "nat" {
  allocation_id = aws_eip.nat_eip.id
  subnet_id = aws_subnet.public_subnet_1a.id

  tags = {
    Name = "${var.cluster_name}-nat"
  }

  # Allow that our NAT will be created after our Internet Gateway
  depends_on = [ aws_internet_gateway.igw ]
}

# 5. Private Subnetes (Where stays our EKS Nodes and Data Base)
resource "aws_subnet" "private_subnet_1a" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.3.0/24"
  availability_zone = "us-east-1a"

  tags = {
    Name                              = "private_subnet_1a"
    "kubernetes.io/role/internal-elb" = "1" # <--- Important for our LBs Internos
  }
}

resource "aws_subnet" "private_subnet_1b" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.4.0/24"
  availability_zone = "us-east-1b"

    tags = {
    Name                              = "private_subnet_1b"
    "kubernetes.io/role/internal-elb" = "1" # <--- Important for our LBs Internos
  }
}

# 6. Route Tables (O GPS da rede)
# Tabela Pública: Tudo que não for local (0.0.0.0/0) vai para o Internet Gateway
resource "aws_route_table" "public_rTable" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = { Name = "public_rTable" }
}

# Tabela Privada: Tudo que não for local (0.0.0.0/0) vai para o NAT Gateway
resource "aws_route_table" "private_rTable" {
  vpc_id = aws_vpc.main.id
  
  route {
    cidr_block      = "0.0.0.0/0"
    nat_gateway_id  = aws_nat_gateway.nat.id
  }

  tags = {
    Name = "private_rTable"
  }
}

# 7. Association (Linking Subnets to its Route Table)
resource "aws_route_table_association" "pub_associ_1a" {
  subnet_id       = aws_subnet.public_subnet_1a.id
  route_table_id  = aws_route_table.public_rTable.id
}

resource "aws_route_table_association" "pub_associ_1b" {
  subnet_id       = aws_subnet.public_subnet_1b.id
  route_table_id  = aws_route_table.public_rTable.id
}

resource "aws_route_table_association" "private_associ_1a" {
  subnet_id       = aws_subnet.private_subnet_1a.id
  route_table_id  = aws_route_table.private_rTable.id
}

resource "aws_route_table_association" "private_associ_1b" {
  subnet_id       = aws_subnet.private_subnet_1b.id
  route_table_id  = aws_route_table.private_rTable.id
}