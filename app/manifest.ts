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
      { src: "/favicon.png", sizes: "any", type: "image/png" },
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
  }
}
