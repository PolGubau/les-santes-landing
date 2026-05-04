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
    ],
  },
}

export default nextConfig
