/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    dangerouslyAllowSVG: true, 
    unoptimized: true, 
    remotePatterns: [
      {
        protocol: "https", 
        hostname: "*", 
      }
    ]
  }
};

export default nextConfig;

