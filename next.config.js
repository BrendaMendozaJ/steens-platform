/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración para AWS Amplify
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig