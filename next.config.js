import withSerwistInit from "@serwist/next";

/**
 * Initialize the Serwist plugin.
 */
const withSerwist = withSerwistInit({
  swSrc: "src/sw.js",
  swDest: "public/sw.js",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    "192.168.56.144",
  ],

  reactStrictMode: true,

  poweredByHeader: false,

  compress: true,

  images: {
    formats: ["image/avif", "image/webp"],
  },

  experimental: {},

  turbopack: {},
};

export default withSerwist(nextConfig);