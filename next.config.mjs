/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Next.js'e "Bana statik dosyalar üret" diyoruz.
  images: {
    unoptimized: true, // Statik export'ta Next.js imaj optimizasyonu hata verebilir, bunu eklemek hayat kurtarır.
  },
};

export default nextConfig;
