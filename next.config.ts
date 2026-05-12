import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins : ["http://localhost:3000", "10.81.85.110"],
  images: {
    // Tell next/image what breakpoints to generate optimised sizes for.
    // Default is [640,750,828,1080,1200,1920,2048,3840] — too many variants.
    // These match the actual sizes used across the site.
    deviceSizes: [390, 640, 768, 1024, 1280, 1536],
    imageSizes: [64, 128, 256, 384],

    // Prefer AVIF (smaller than WebP), fall back to WebP.
    // next/image serves the best format the browser supports automatically.
    formats: ["image/avif", "image/webp"],

    // How long browsers cache optimised images. 7 days is safe for
    // product/hero images that don't change frequently.
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days in seconds

    remotePatterns: [
      // Webflow CDN used for the background texture pattern
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
      },
    ],
  },

  // Compress responses — negligible CPU cost, meaningful bandwidth savings
  compress: true,

  // Headers for better caching of static assets
  async headers() {
    return [
      {
        // Cache static assets (fonts, images, JS chunks) aggressively
        source: "/:path*.(jpg|jpeg|png|svg|webp|avif|woff2|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;