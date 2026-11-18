import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Point Turbopack at the monorepo root so it can resolve workspace packages
  // (packages/*) and the hoisted node_modules. Pinning it explicitly also stops
  // a stray ~/package-lock.json from making Next guess the wrong root, which
  // breaks CSS hot reload.
  turbopack: {
    root: path.join(__dirname, "../.."),
  },
};

export default nextConfig;
