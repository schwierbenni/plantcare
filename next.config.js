/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
    ],
  },
}

const isDev = process.env.NODE_ENV === 'development'

if (isDev) {
  module.exports = nextConfig
} else {
  const withSerwist = require('@serwist/next').default({
    swSrc: 'app/sw.ts',
    swDest: 'public/sw.js',
  })
  module.exports = withSerwist(nextConfig)
}
