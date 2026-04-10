import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-4bb9524bd21248d2ac34348d996317e9.r2.dev",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
