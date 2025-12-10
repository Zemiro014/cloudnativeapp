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