/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  /**
   * Longer client chunk load timeout (webpack production builds & `next dev --webpack` only).
   * Default `npm run dev` uses Turbopack and ignores this hook (Next may log a benign warning).
   */
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.output = {
        ...config.output,
        chunkLoadTimeout: 180000,
      }
    }
    return config
  },
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  experimental: {
    // Barrel-import Treeshaking (use exact package names; globs like @radix-ui/react-* are not supported)
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-slot',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-label',
      '@radix-ui/react-tabs',
      '@radix-ui/react-select',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-switch',
      '@radix-ui/react-tooltip',
      '@radix-ui/react-popover',
      '@radix-ui/react-accordion',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-avatar',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-separator',
      '@radix-ui/react-toast',
    ],
  },
  headers: async () => {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store' },
        ],
      },
    ]
  },
}

export default nextConfig
