# 1. Aşama: Derleme (Build)
FROM node:20-slim AS builder
WORKDIR /app
# Bağımlılıkları kopyala ve yükle
COPY package*.json ./
RUN npm ci
# Kaynak kodları kopyala ve derle
COPY . .
RUN npm run build

# 2. Aşama: Sunum (Serve)
FROM nginx:alpine
# Eğer projen Vite kullanıyorsa 'dist', eski React (CRA) ise 'build' yazmalısın.
# Portfolyo klasör yapına göre aşağıdakini kontrol et:
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
