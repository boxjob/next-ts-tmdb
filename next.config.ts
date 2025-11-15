import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects() {
    return [
      {
        source: '/',
        destination: '/discover/now_playing',
        permanent: true
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        hostname: 'image.tmdb.org',
      },
    ],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    API_KEY: process.env.API_KEY
  },
};

export default nextConfig;
