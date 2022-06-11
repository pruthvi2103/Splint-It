/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['courses.ineuron.ai', 'cdn.ineuron.ai'],
  },
};

module.exports = nextConfig;
