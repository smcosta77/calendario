import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  
};

export default nextConfig;

module.exports = {
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },
};