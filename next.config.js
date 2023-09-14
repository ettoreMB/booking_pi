/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'api.js', 'api.jsx'],
  swcMinify: false,
  images: {
    domains: ['images.unsplash.com','grupo2-bucket.s3.amazonaws.com', '*'],
    
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',

      },
    ],
  },
}

module.exports = nextConfig
