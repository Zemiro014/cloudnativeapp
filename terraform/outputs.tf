# output "backend_url" {
#   value = "https://${aws_apprunner_service.backend.service_url}"
# }

# output "frontend_url" {
#   value = "https://${aws_apprunner_service.frontend.service_url}"
# }

output "ecr_backend_url" {
  value = aws_ecr_repository.backend.repository_url
}

output "ecr_frontend_url" {
  value = aws_ecr_repository.frontend.repository_url
}