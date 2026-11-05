import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    // Next 16 requires an explicit allowlist when a custom `quality` is used.
    qualities: [75, 90],
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
