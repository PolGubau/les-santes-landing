import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { APP_NAME, APP_YEAR, APP_CITY, APP_START_DATE, APP_END_DATE, AUTHOR_NAME, AUTHOR_URL, SITE_URL, OFFICIAL_MATARO_URL } from "@/lib/constants"
import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/sections/footer"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })
const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

const defaultTitle = `${APP_NAME} ${APP_YEAR} · App de la Festa Major de Mataró`
const defaultDescription = `App gratuïta de Les Santes ${APP_YEAR}. Agenda, mapa interactiu i actes en temps real de la Festa Major de Mataró. iOS i Android.`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultTitle,
    template: `%s · ${APP_NAME}`,
  },
  description: defaultDescription,
  keywords: [
    "Les Santes", "Les Santes 2026", "Festa Major Mataró", "Festa Major Mataró 2026",
    "programa Les Santes", "agenda Les Santes", "actes Les Santes",
    "app Festa Major", "app Les Santes", "correfoc Mataró", "gegants Mataró",
    "castellers Mataró", "havaneres Mataró", "cartells Les Santes",
    APP_CITY, APP_NAME, "Festa Major",
  ],
  authors: [{ name: AUTHOR_NAME, url: AUTHOR_URL }],
  creator: AUTHOR_NAME,
  alternates: {
    canonical: SITE_URL,
    languages: { "ca-ES": SITE_URL },
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: SITE_URL,
    siteName: APP_NAME,
    locale: "ca_ES",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: defaultTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    creator: "@polgubau",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [
      { url: "/icon/32.png",  sizes: "32x32",   type: "image/png" },
      { url: "/icon/64.png",  sizes: "64x64",   type: "image/png" },
      { url: "/icon/128.png", sizes: "128x128", type: "image/png" },
      { url: "/icon/512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: { url: "/icon/480.png", sizes: "480x480", type: "image/png" },
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: APP_NAME,
      url: SITE_URL,
      description: defaultDescription,
      inLanguage: "ca-ES",
      author: { "@type": "Person", name: AUTHOR_NAME, url: AUTHOR_URL },
    },
    {
      "@type": "MobileApplication",
      "@id": `${SITE_URL}/#app`,
      name: APP_NAME,
      description: defaultDescription,
      operatingSystem: "iOS, Android",
      applicationCategory: "LifestyleApplication",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      inLanguage: "ca-ES",
    },
    {
      "@type": "Festival",
      "@id": `${SITE_URL}/#festival`,
      name: `${APP_NAME} ${APP_YEAR}`,
      description: `La Festa Major de ${APP_CITY}, una de les festes majors més importants de Catalunya.`,
      startDate: APP_START_DATE,
      endDate: APP_END_DATE,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "City",
        name: APP_CITY,
        addressCountry: "ES",
        addressRegion: "Catalunya",
      },
      organizer: { "@type": "Organization", name: `Ajuntament de ${APP_CITY}`, url: OFFICIAL_MATARO_URL },
      isAccessibleForFree: true,
      url: SITE_URL,
    },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ca"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable)}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* Skip-to-content - WCAG 2.4.1 Bypass Blocks */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-background focus:text-foreground focus:px-4 focus:py-2 focus:rounded-lg focus:font-medium focus:ring-2 focus:ring-primary"
        >
          Salta al contingut principal
        </a>
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
          <SiteHeader />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
