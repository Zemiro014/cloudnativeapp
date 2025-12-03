# ===============================
# 1. Stage: Instalação de Dependências
# ===============================
FROM node:20-alpine AS deps
WORKDIR /app

# Instala ferramentas básicas caso algum pacote precise compilar (opcional, mas recomendado)
RUN apk add --no-cache python3 make g++

COPY package*.json ./

# Instala APENAS dependências de produção para deixar a imagem leve
# IMPORTANTE: O 'sequelize-cli' DEVE estar em "dependencies" no package.json, e não em "devDependencies"
RUN npm ci --omit=dev

# ===============================
# 2. Stage: Runner (Imagem Final)
# ===============================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Instala dumb-init para gerenciar processos corretamente
RUN apk add --no-cache dumb-init

# Cria a pasta 'tmp' que o logger precisa e dá permissão ao usuário node
RUN mkdir -p tmp && chown -R node:node /app

# Define usuário não-root por segurança
USER node

# Copia os módulos já instalados do estágio anterior
COPY --from=deps --chown=node:node /app/node_modules ./node_modules
COPY --from=deps --chown=node:node /app/package*.json ./

# Copia todo o código fonte (incluindo src/config/config.js)
COPY --chown=node:node src ./src
COPY --chown=node:node .sequelizerc .sequelizerc

EXPOSE 3000

# Usa dumb-init como entrypoint
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

# Comando de inicialização (lembre que o migration está no docker-compose)
CMD ["npm", "start"]