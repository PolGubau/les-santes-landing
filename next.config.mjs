/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uploads.lessantes.cat",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "cdn.appculturamataro.cat",
      },
    ],
  },
}

export default nextConfig
