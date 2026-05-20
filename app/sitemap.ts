import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/constants"

/**
 * Stable lastModified at build time. Re-deploying refreshes the timestamp,
 * which keeps Search Console happy without churning every render.
 */
const lastModified = new Date()

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: { "ca-ES": `${SITE_URL}/` } },
    },
    {
      url: `${SITE_URL}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: { "ca-ES": `${SITE_URL}/about` } },
    },
    {
      url: `${SITE_URL}/support`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: { languages: { "ca-ES": `${SITE_URL}/support` } },
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/accessibility`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]
}
