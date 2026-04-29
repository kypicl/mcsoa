import { withPayload } from '@payloadcms/next/withPayload'
import redirects from './redirects.js'
import { sqliteAdapter } from '@payloadcms/db-sqlite'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'localhost',
        protocol: 'http'
      },
      {
        protocol: 'https',
        hostname: process.env.RAILWAY_PUBLIC_DOMAIN || 'localhost'
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
    tsconfigPath: 'tsconfig.json',
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }
    return webpackConfig
  },
  reactStrictMode: true,
  redirects,
  staticPageGenerationTimeout: 0,
}

// Wrap it with Payload
export default withPayload(nextConfig, { devBundleServerPackages: false })
