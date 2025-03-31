/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "food-backend.blosomtrade.com",
      },
    ],
  }
}
  
  export default nextConfig;
  