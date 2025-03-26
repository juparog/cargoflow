import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "storage.googleapis.com",
      },
      {
        hostname: "avatars.githubusercontent.com",
      },
      {
        hostname: "loremflickr.com",
      },
    ],
  },
};

export default nextConfig;
