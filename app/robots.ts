import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/constants"

/**
 * Search & AI crawler policy.
 *
 * We allow all standard search engines and explicitly opt in to AI training /
 * retrieval crawlers (GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot,
 * Google-Extended, etc.) so the site is eligible to be cited in AI answers
 * (ChatGPT, Claude, Perplexity, Google AI Overviews).
 */
const AI_BOTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Googlebot",
  "Bingbot",
  "Applebot",
  "Applebot-Extended",
  "DuckDuckBot",
  "YandexBot",
  "Amazonbot",
  "Meta-ExternalAgent",
  "FacebookBot",
  "CCBot",
] as const

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      ...AI_BOTS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
