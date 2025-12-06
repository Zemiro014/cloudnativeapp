#!/bin/sh
set -e # Para o script se der erro em comandos críticos

echo "🛠️  Iniciando Setup do Banco de Dados..."

# 1. Tenta criar o banco (Ignora erro se já existir)
echo "1. Criando Database (se não existir)..."
npx sequelize-cli db:create || true

# 2. Roda as Migrations
echo "2. Rodando Migrations..."
npx sequelize-cli db:migrate

# 3. Inicia o Servidor
echo "🚀 Iniciando Servidor Node.js..."
exec node src/server.js