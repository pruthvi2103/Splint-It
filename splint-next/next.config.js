/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['courses.ineuron.ai', 'cdn.ineuron.ai', 'images.unsplash.com', 'avatars.githubusercontent.com'],
  },
};

module.exports = nextConfig;
