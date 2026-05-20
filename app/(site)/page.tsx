import type { Metadata } from "next"
import { APP_NAME, APP_YEAR, APP_CITY, APP_DATES, SITE_URL } from "@/lib/constants"
import { Hero } from "@/components/sections/hero"
import { AppScreens } from "@/components/sections/app-screens"
import { Features } from "@/components/sections/features"
import { Trust } from "@/components/sections/trust"
import { PostersMarquee } from "@/components/sections/posters-marquee"
import { Programme } from "@/components/sections/programme"
import { Faq } from "@/components/sections/faq"

const homeTitle = `${APP_NAME} ${APP_YEAR} — Programa, horaris i mapa · Festa Major de ${APP_CITY}`
const homeDescription = `${APP_DATES} de ${APP_YEAR}: programa complet de ${APP_NAME}, la Festa Major de ${APP_CITY}. Horaris, mapa interactiu, correfoc (Nit Boja), gegants, castellers, havaneres i castell de focs. App gratuïta per a iOS i Android.`

export const metadata: Metadata = {
  title: homeTitle,
  description: homeDescription,
  alternates: {
    canonical: SITE_URL,
    languages: { "ca-ES": SITE_URL, "x-default": SITE_URL },
  },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: SITE_URL,
    siteName: APP_NAME,
    type: "website",
    locale: "ca_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
  },
}

export default function Page() {
  return (
    <main>
      <Hero />
      <AppScreens />
      <Features />
      <Trust />
      <PostersMarquee />
      <Programme />
      <Faq />
    </main>
  )
}
