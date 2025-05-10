import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
      remotePatterns: [
          {
              protocol: "http",
              hostname: "localhost",
              port: "3001",
              pathname: "/uploads/profil-pictures/**",
          },
      ],
      unoptimized: true, // Allow http protocol for local development
  },
};

export default nextConfig;
