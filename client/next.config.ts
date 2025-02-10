import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // This allows all domains
        port: '', // No port restrictions
        pathname: '**', // This allows any path
      },
    ],
  },
};

export default nextConfig;
