# Repositório do Backend
resource "aws_ecr_repository" "backend" {
  # NOME EXATO que está no seu release.yml
  name         = "cloudnativeapp-backend-repo" 
  force_delete = true
  
  image_scanning_configuration {
    scan_on_push = true
  }
}

# Repositório do Frontend
resource "aws_ecr_repository" "frontend" {
  # NOME EXATO que está no seu release.yml
  name         = "cloudnativeapp-frontend-repo"
  force_delete = true

  image_scanning_configuration {
    scan_on_push = true
  }
}