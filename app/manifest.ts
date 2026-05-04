import type { MetadataRoute } from "next"
import { APP_NAME, APP_SUBTITLE, SITE_URL } from "@/lib/constants"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: APP_NAME,
    short_name: APP_NAME,
    description: APP_SUBTITLE,
    start_url: "/",
    display: "standalone",
    background_color: "#faf8f5",
    theme_color: "#8a1a10",
    lang: "ca",
    scope: SITE_URL,
    icons: [
      { src: "/icon/32.png",  sizes: "32x32",   type: "image/png" },
      { src: "/icon/48.png",  sizes: "48x48",   type: "image/png" },
      { src: "/icon/64.png",  sizes: "64x64",   type: "image/png" },
      { src: "/icon/128.png", sizes: "128x128", type: "image/png" },
      { src: "/icon/240.png", sizes: "240x240", type: "image/png" },
      { src: "/icon/512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  }
}
