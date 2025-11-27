
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
    experimental: {
    turbo: {
      rootDir: __dirname,
    },
  },
  env: {
    API_HOST: process.env.API_HOST,
    API_PORT: process.env.API_PORT,
  },
};

export default nextConfig;
