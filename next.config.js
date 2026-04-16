/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  // Optimize for Vercel deployment
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig
