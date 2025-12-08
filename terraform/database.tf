# 1. Creating ECR Repositories
resource "aws_ecr_repository" "backend" {
  name          = "${var.project_name}-backend-repo"
  force_delete  = true
}

resource "aws_ecr_repository" "frontend" {
  name          = "${var.project_name}-frontend-repo"
  force_delete  = true
}

# 2. RDS instance
resource "aws_db_subnet_group" "main" {
  name          = "${var.project_name}-db-subnet-group"
  subnet_ids    = [ aws_subnet.private_1.id, aws_subnet.private_2.id ]
}

resource "aws_db_instance" "default" {
  identifier                = "${var.project_name}-db"
  allocated_storage         = 20
  engine                    = "mysql"
  engine_version            = "8.0"
  instance_class            = "db.t3.micro"
  db_name                   = "ecommerce"
  username                  = "root"
  password                  = var.db_password
  parameter_group_name      = "default.mysql8.0"
  skip_final_snapshot       = true
  publicly_accessible       = false
  vpc_security_group_ids    = [ aws_security_group.rds_sg.id ]
  db_subnet_group_name      = aws_db_subnet_group.main.name
}