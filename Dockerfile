# 1. Aşama: Build (Daha hafif olan Alpine sürümünü kullanalım)
FROM node:20-alpine AS builder
WORKDIR /app

# Paket yükleme sırasında gereksiz logları ve kontrolleri kapatalım
COPY package*.json ./
RUN npm ci --quiet --no-audit --prefer-offline

COPY . .
RUN npm run build

# 2. Aşama: Serve (Nginx Alpine)
FROM nginx:alpine
# Vite kullanıyorsan 'dist', React ise 'build' olduğundan emin ol
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
