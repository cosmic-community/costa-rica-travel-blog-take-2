/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imgix.cosmicjs.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.cosmicjs.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['@cosmicjs/sdk'],
  },
}

module.exports = nextConfig