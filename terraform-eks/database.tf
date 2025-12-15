resource "aws_security_group" "rds_sg" {
  name          = "${var.cluster_name}-rds-sg"
  description   = "Allow accessing the RDS"
  vpc_id        = aws_vpc.main.id
}

resource "aws_db_subnet_group" "db_subnet_group" {
  name          = "${var.cluster_name}-db-subnet-group"
  subnet_ids    = [ aws_subnet.private_subnet_1a.id, aws_subnet.private_subnet_1b.id ]
}

resource "aws_db_instance" "default" {
  identifier             = "ecommerce-db"
  allocated_storage      = 20
  engine                 = "mysql"
  engine_version         = "8.0"
  instance_class         = "db.t3.micro"
  db_name                = "ecommerce"
  username               = "root"
  password               = var.db_password
  skip_final_snapshot    = true
  publicly_accessible    = false
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  db_subnet_group_name   = aws_db_subnet_group.db_subnet_group.name
}

resource "aws_security_group_rule" "allow_vpc_to_rds" {
  description       = "Permitir que qualquer recurso da VPC (incluindo EKS) acesse o RDS"
  type              = "ingress"
  from_port         = 3306
  to_port           = 3306
  protocol          = "tcp"
  
  # Aplica esta regra no Security Group do RDS
  security_group_id = aws_security_group.rds_sg.id
  
  # Quem pode entrar? Todo mundo que tem IP da sua VPC (10.0.x.x)
  cidr_blocks       = ["10.0.0.0/16"]
}