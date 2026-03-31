import { withPayload } from '@payloadcms/next/withPayload'
import redirects from './redirects.js'
import { sqliteAdapter } from '@payloadcms/db-sqlite'

const NEXT_PUBLIC_SERVER_URL = process.env.RAILWAY_PUBLIC_DOMAIN
  ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
  : undefined || process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'localhost',
        protocol: 'http',
      },
      {
        hostname: process.env.NEXT_PUBLIC_SERVER_URL/*.split('https://')[1]*/,
        protocol: 'https'
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
