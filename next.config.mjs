/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: { bodySizeLimit: '2mb' },
    // Prevent webpack from bundling Node-only packages used in API routes
    serverComponentsExternalPackages: ['@mendable/firecrawl-js'],
  },
}

export default nextConfig
