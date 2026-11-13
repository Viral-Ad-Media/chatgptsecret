import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Content is read from Neon on each request so admin edits show up
  // immediately. Cache Components is off to keep that model simple.
  cacheComponents: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      // Old WordPress URLs that should not 404.
      { source: "/wp-admin/:path*", destination: "/admin", permanent: false },
      { source: "/wp-login.php", destination: "/sign-in", permanent: false },
      { source: "/feed", destination: "/blog", permanent: false },
      { source: "/category/:slug", destination: "/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
