/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['courses.ineuron.ai', 'cdn.ineuron.ai', 'avatars.githubusercontent.com'],
  },
};

module.exports = nextConfig;
