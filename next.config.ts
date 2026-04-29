import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow images from any external domain (news sources)
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
  },
};

export default nextConfig;
