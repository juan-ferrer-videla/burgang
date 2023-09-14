/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  fontLoaders: [
    { loader: "@next/font/google", options: { subsets: ["latin"] } },
  ],
};

module.exports = nextConfig;
