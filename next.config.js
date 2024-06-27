/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['img.freepik.com', 'example.com', 'images.pexels.com'],
  },
  async redirects() {
    return [
      {
        source: '/auth/google',
        destination: '/auth/google-callback',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
