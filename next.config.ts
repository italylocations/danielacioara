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
  async redirects() {
    return [
      {
        source: "/services",
        destination: "/#services",
        permanent: true,
      },
      {
        source: "/about-daniela-cioara-makeup-artist",
        destination: "/about",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
