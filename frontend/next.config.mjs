/* eslint-disable no-undef */

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: 'standalone',
    // Ignora erros no build do Docker
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites(){
      return [
      {
        source: '/api-backend/:path*',
        // O servidor Next.js vai ler a variável API_URL do App Runner em tempo de execução
        destination: `${process.env.API_URL || 'http://localhost:3001'}/:path*`,
      },
    ];
  },
  env: {
    API_HOST: process.env.API_HOST,
    API_PORT: process.env.API_PORT,
  },
};

export default nextConfig;
