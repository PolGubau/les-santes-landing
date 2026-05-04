import type { Metadata } from "next"
import Image from "next/image"
import { APP_NAME, APP_SUBTITLE, APP_YEAR, APP_CITY, APP_DATES, SITE_URL } from "@/lib/constants"
import { Hero } from "@/components/sections/hero"

export const metadata: Metadata = {
  title: `${APP_NAME} - ${APP_SUBTITLE}`,
  description: `App gratuïta de Les Santes ${APP_YEAR}, la Festa Major de Mataró. ${APP_DATES}. Agenda completa, mapa interactiu, correfoc, gegants, castellers, havaneres i cartells des de 1892. Per a iOS i Android.`,
  alternates: {
    canonical: SITE_URL,
    languages: { "ca-ES": SITE_URL },
  },
  openGraph: {
    title: `${APP_NAME} ${APP_YEAR} - ${APP_SUBTITLE}`,
    description: `Tota l'agenda, el mapa i els actes en temps real de ${APP_NAME}. App gratuïta de Les Santes, la Festa Major de Mataró. ${APP_DATES}. Per a iOS i Android.`,
    url: SITE_URL,
    siteName: APP_NAME,
    type: "website",
  },
}
import { AppScreens } from "@/components/sections/app-screens"
import { Features } from "@/components/sections/features"
import { Trust } from "@/components/sections/trust"
import { PostersMarquee } from "@/components/sections/posters-marquee"
import { Programme } from "@/components/sections/programme"

export default function Page() {
  return (
    <main>
      <Hero />
      <AppScreens />
      <Features />
      <Trust />
      <PostersMarquee />


      <Programme />

    </main>
  )
}
