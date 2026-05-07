import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["http://localhost:3000", "10.81.85.110"],
  images: {
    remotePatterns: [
      // ── Unsplash ──────────────────────────────────────────
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // ── Instagram CDN — covers all shard variants ─────────
      // famd5-1 through famd5-9 and beyond
      {
        protocol: "https",
        hostname: "**.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "**.cdninstagram.com",
      },
    ],
  },
};

export default nextConfig;