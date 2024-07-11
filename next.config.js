/** @type {import('next').NextConfig} */
const nextConfig = {};
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

module.exports = nextConfig;
module.exports = withPWA({});
module.exports = {
  images: {
    domains: ['img.freepik.com', 'example.com', "images.pexels.com", "i.pinimg.com"],
  },
};