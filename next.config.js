/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    remotePatterns: [
      {
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/longlister-static/recruiter-avatars/**',
      },
    ],
  },
}

module.exports = nextConfig
