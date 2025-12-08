# # 1. VPC Connector (bridge between App Eunner and RDS)
# resource "aws_apprunner_vpc_connector" "connector" {
#   vpc_connector_name    = "${var.project_name}-connector"
#   subnets               = [ aws_subnet.private_1, aws_subnet.private_2 ]
#   security_groups       = [ aws_security_group.rds_sg.id ]
# }

# # 2. Backend Service
# resource "aws_apprunner_service" "backend" {
#   service_name  = "${var.project_name}-backend"

#   #   Waiting untill DB is ready to up
#   depends_on    = [ aws_db_instance.default ]

#   source_configuration {
#     authentication_configuration {
#       access_role_arn = aws_iam_role.apprunner_role.arn
#     }
#     image_repository {
#       image_identifier      = "${aws_ecr_repository.backend.repository_url}:latest"
#       image_repository_type = "ECR"
#       image_configuration {
#         port            = "3000"
#         start_command   = "/bin/sh -c 'npx sequelize-cli db:create || true && npx sequelize-cli db:migrate && node src/server.js'"
#         runtime_environment_variables = {
#           NODE_ENV  = "production"
#           DB_HOST   = aws_db_instance.default.address
#           DB_USER   = "root"
#           DB_PASS   = var.db_password
#           DB_NAME   = "ecommerce"
#         }
#       }
#     }
#   }

#   network_configuration {
#     egress_configuration {
#       egress_type       = "VPC"
#       vpc_connector_arn = aws_apprunner_vpc_connector.connector.arn
#     }
#   }
  
#   health_check_configuration {
#     protocol = "TCP"
#     timeout  = 20
#     interval = 10
#   }
# }

# # 3. Frontend Service
# resource "aws_apprunner_service" "frontend" {
#   service_name = "${var.project_name}-frontend"

#   source_configuration {
#     authentication_configuration {
#       access_role_arn = aws_iam_role.apprunner_role.arn
#     }
#     image_repository {
#       image_identifier      = "${aws_ecr_repository.frontend.repository_url}:latest"
#       image_repository_type = "ECR"
#       image_configuration {
#         port = "3000"
#         start_command = "node server.js"
#         runtime_environment_variables = {
#           HOSTNAME            = "0.0.0.0"
#           PORT                = "3000"
#           NODE_ENV            = "production"
#           # The HTTPS secret
#           API_URL             = "https://${aws_apprunner_service.backend.service_url}"
#           NEXT_PUBLIC_API_URL = "https://${aws_apprunner_service.backend.service_url}"
#         }
#       }
#     }
#   }

#   health_check_configuration {
#     protocol = "HTTP"
#     path     = "/"
#     timeout  = 20
#     interval = 10
#   }
# }