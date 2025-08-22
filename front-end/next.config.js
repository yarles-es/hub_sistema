/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // não falha o build por causa do ESLint
    ignoreDuringBuilds: true,
  },
  basePath: "/erp-academia",
  images: {
    loader: "default",
    // aponta para o endpoint de otimização (inclui seu basePath)
    path: "/erp-academia/_next/image",
  },
};

module.exports = nextConfig;
