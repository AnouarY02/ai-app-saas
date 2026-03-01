/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  // Security: prevent leaking server-only env vars
  serverExternalPackages: ['stripe'],
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Headers for security (supplement CSP from middleware)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      // Cache static assets aggressively
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
