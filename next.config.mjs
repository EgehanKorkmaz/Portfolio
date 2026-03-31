/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  optimizeFonts: false, // Google Fonts hata verirse build'i durdurmasın
};

export default nextConfig;
