import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // appDir: true, // Required for Next.js App Router (Next.js 13+)
  },
};

export default nextConfig;
