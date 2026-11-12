import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    // Next 16 requires an explicit allowlist when a custom `quality` is used.
    qualities: [75, 90],
  },
  async headers() {
    return [
      {
        // Site assets (incl. the OG image) are content-hashed by filename, so
        // cache them hard. A long-lived, cacheable image lets the Facebook
        // scraper fetch it reliably instead of hitting cold, revalidated misses.
        source: "/sites/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          destination: "/vi/mau-thiep/minimalism-nau/demo",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
