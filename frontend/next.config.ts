import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['*'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '*',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
