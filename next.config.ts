import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "instagram.famd5-4.fna.fbcdn.net"
      },
      {
        protocol: "https",
        hostname: "instagram.famd5-3.fna.fbcdn.net"
      },
      {
        protocol: "https",
        hostname: "instagram.famd5-2.fna.fbcdn.net"
      },
      {
        protocol: "https",
        hostname: "instagram.famd5-1.fna.fbcdn.net"
      }
    ]
  }
};

export default nextConfig;
