import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["picsum.photos"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
