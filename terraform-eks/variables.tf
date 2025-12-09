variable "region" {
  default = "us-east-1"
}

variable "cluster_name" {
  default = "cloudnative-cluster"
}

variable "db_password" {
  description   = "RDS Password"
  type          = string
  sensitive     = true
}