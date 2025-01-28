import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.node$/,
      use: "nextjs-node-loader",
    });

    return config;
  },
};

export default nextConfig;
