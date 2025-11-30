# =================
# 1. Stage: Build
# =================

FROM node:22-alpine AS build
WORKDIR /app

# Update OS packages to pick up security fixes
RUN apk update && apk upgrade --no-cache

# copy only dependencies files (Efficient layer caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# =================
# 2. Stage: Runtime (Production)
# =================

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# copy only artifacts we need for production
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Install only production dependencies
RUN npm ci --only=production
# Expose the application port
EXPOSE 3000
# Start the application
CMD ["node", "dist/server.js"]