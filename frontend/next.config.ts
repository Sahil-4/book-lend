import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
        protocol: "https",
        port: "",
        search: "",
        pathname: "/book-lend-user-assets/image/**",
      },
    ],
  },
};

export default nextConfig;
