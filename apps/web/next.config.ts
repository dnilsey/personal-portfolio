import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname, "../.."),
  },
  images: {
    remotePatterns: [
      new URL(
        "https://scaysijywzlixgfhuvwf.supabase.co/storage/v1/object/public/**",
      ),
    ],
  },
};

export default nextConfig;
