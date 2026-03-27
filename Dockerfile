# 1. Aşama: Build (Derleme)
FROM node:20-alpine AS builder
WORKDIR /app

# Bağımlılıkları yükle (Sadece lock dosyalarını kopyalamak cache avantajı sağlar)
COPY package*.json ./
RUN npm ci --quiet --no-audit --prefer-offline

# Tüm proje dosyalarını kopyala ve derlemeyi başlat
COPY . .
RUN npm run build

# 2. Aşama: Serve (Nginx ile Hafif ve Hızlı Yayınlama)
FROM nginx:alpine

# KRİTİK DEĞİŞİKLİK: 
# Next.js 'output: export' ayarı aktifken dosyaları 'out' klasörüne çıkarır.
# Bu yüzden '/app/dist' olan kısmı '/app/out' olarak güncelledik.
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80

# Nginx'i ön planda çalıştırıyoruz
CMD ["nginx", "-g", "daemon off;"]
