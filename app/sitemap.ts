import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/constants"

/**
 * Stable lastModified at build time. Re-deploying refreshes the timestamp,
 * which keeps Search Console happy without churning every render.
 */
const lastModified = new Date()

/** Historic posters surfaced in the home page marquee — also indexed in Google Images. */
const POSTER_YEARS = [
  "1892", "1920", "1934", "1950", "1960", "1970", "1980", "1985", "1990", "2000",
  "2010", "2015", "2018", "2020", "2022", "2023", "2024", "2025", "2026",
] as const

/** App screenshots shown on the home page — surface them in image search too. */
const SCREENSHOTS = [
  "ara", "agenda", "agenda-favs", "mapa", "recursos", "cartells", "postals",
] as const

const homeImages: string[] = [
  `${SITE_URL}/banner.webp`,
  `${SITE_URL}/opengraph-image`,
  ...POSTER_YEARS.map((y) => `${SITE_URL}/posters/${y}.avif`),
  ...SCREENSHOTS.map((s) => `${SITE_URL}/screenshots/${s}.avif`),
]

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: { "ca-ES": `${SITE_URL}/` } },
      images: homeImages,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: { "ca-ES": `${SITE_URL}/about` } },
    },
    {
      url: `${SITE_URL}/developers`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: { "ca-ES": `${SITE_URL}/developers` } },
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
