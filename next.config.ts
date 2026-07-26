import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep Turbopack scoped to this app when a parent directory also has a lockfile.
  turbopack: {
    root: process.cwd(),
  },
  // The workspace preview may load the dev server through either loopback host.
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
};

export default nextConfig;
