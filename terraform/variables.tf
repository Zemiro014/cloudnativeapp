variable "project_name" {
  default = "cloudnativeapp"
}

variable "db_password" {
  description = "Data base password"
  type        = string
  sensitive   = true
}