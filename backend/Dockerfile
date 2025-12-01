# =============================== 
# 1. Stage: Build 
# =============================== 
FROM node:20-alpine AS build 
WORKDIR /app 
RUN apk update && apk upgrade --no-cache 
COPY package*.json ./ 
RUN npm ci 
COPY . . 
# =============================== 
# 2. Stage: Runtime 
# =============================== 
FROM node:20-alpine AS runtime 
WORKDIR /app 
# Production environment
ENV NODE_ENV=production 
# Copy only we need
COPY --from=build /app/package*.json ./ 
COPY --from=build /app/node_modules ./node_modules 
COPY --from=build /app/src ./src 
COPY --from=build /app/src/config/config.js ./config/config.js
COPY .sequelizerc .sequelizerc 

# Install prod dependencies 
RUN npm ci --omit=dev 
EXPOSE 3000
CMD ["npm", "start"]