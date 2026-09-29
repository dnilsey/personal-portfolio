import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray ~/package-lock.json makes Next guess the wrong workspace root,
  // which breaks CSS hot reload. Pin it to this project.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
