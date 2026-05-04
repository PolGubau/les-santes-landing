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
      { src: "/favicon_32x32.png",   sizes: "32x32",   type: "image/png" },
      { src: "/favicon_48x48.png",   sizes: "48x48",   type: "image/png" },
      { src: "/favicon_64x64.png",   sizes: "64x64",   type: "image/png" },
      { src: "/favicon_128x128.png", sizes: "128x128", type: "image/png" },
      { src: "/favicon_256x256.png", sizes: "256x256", type: "image/png" },
    ],
  }
}
