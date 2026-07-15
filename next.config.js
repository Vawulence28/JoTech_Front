/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  poweredByHeader: false,

  compress: true,

  images: {
    formats: ["image/avif", "image/webp"],
  },

  allowedDevOrigins: [
    "192.168.56.144",
  ],

  turbopack: {},
};

export default nextConfig;