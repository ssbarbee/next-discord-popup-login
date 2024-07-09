/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
    env: {
        DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    },
};

export default nextConfig;
