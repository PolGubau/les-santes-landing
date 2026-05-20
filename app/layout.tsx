import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import {
  APP_NAME,
  APP_YEAR,
  APP_CITY,
  APP_REGION,
  APP_COUNTRY,
  APP_DATES,
  APP_START_DATE,
  APP_END_DATE,
  AUTHOR_NAME,
  AUTHOR_URL,
  AUTHOR_SAMEAS,
  SITE_URL,
  OFFICIAL_MATARO_URL,
  FESTIVAL_SUBEVENTS,
  FAQS,
} from "@/lib/constants"
import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/sections/footer"

const geist = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" })
const fontMono = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-mono" })

const defaultTitle = `${APP_NAME} ${APP_YEAR} — Programa, horaris i mapa · Festa Major de ${APP_CITY}`
const defaultDescription = `${APP_NAME} ${APP_YEAR}: ${APP_DATES.toLowerCase()}. Programa complet, horaris, mapa interactiu i actes en temps real de la Festa Major de ${APP_CITY}. App gratuïta per a iOS i Android.`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultTitle,
    template: `%s · ${APP_NAME} ${APP_YEAR}`,
  },
  description: defaultDescription,
  applicationName: APP_NAME,
  category: "events",
  keywords: [
    "Les Santes 2026", "Les Santes", "programa Les Santes 2026",
    "Festa Major Mataró 2026", "Festa Major Mataró", "Festa Major de Mataró",
    "agenda Les Santes", "horaris Les Santes", "actes Les Santes",
    "correfoc Mataró", "Nit Boja Mataró", "castell de focs Mataró",
    "gegants Mataró", "castellers Mataró", "havaneres Mataró",
    "cartells Les Santes", "app Les Santes", "mapa Les Santes",
    APP_CITY, APP_NAME, "Festa Major", "festes Mataró 2026",
  ],
  authors: [{ name: AUTHOR_NAME, url: AUTHOR_URL }],
  creator: AUTHOR_NAME,
  publisher: AUTHOR_NAME,
  alternates: {
    canonical: SITE_URL,
    languages: { "ca-ES": SITE_URL, "x-default": SITE_URL },
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
      { url: "/icon/32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon/64.png", sizes: "64x64", type: "image/png" },
      { url: "/icon/128.png", sizes: "128x128", type: "image/png" },
      { url: "/icon/512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: { url: "/icon/480.png", sizes: "480x480", type: "image/png" },
  },
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
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
      publisher: { "@id": `${SITE_URL}/#person` },
      author: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: AUTHOR_NAME,
      url: AUTHOR_URL,
      sameAs: AUTHOR_SAMEAS,
      jobTitle: "Software engineer",
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: APP_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/icon/512.png`,
      founder: { "@id": `${SITE_URL}/#person` },
      sameAs: AUTHOR_SAMEAS,
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
      author: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "Festival",
      "@id": `${SITE_URL}/#festival`,
      name: `${APP_NAME} ${APP_YEAR}`,
      alternateName: [
        `Festa Major de ${APP_CITY} ${APP_YEAR}`,
        `${APP_NAME}`,
      ],
      description: `${APP_NAME} ${APP_YEAR}: la Festa Major de ${APP_CITY} (${APP_REGION}), ${APP_DATES.toLowerCase()}. Cercaviles, correfocs, castellers, havaneres i castell de focs.`,
      startDate: APP_START_DATE,
      endDate: APP_END_DATE,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: APP_CITY,
        address: {
          "@type": "PostalAddress",
          addressLocality: APP_CITY,
          addressRegion: APP_REGION,
          addressCountry: APP_COUNTRY,
        },
      },
      image: [`${SITE_URL}/opengraph-image`, `${SITE_URL}/banner.webp`],
      organizer: {
        "@type": "Organization",
        name: `Ajuntament de ${APP_CITY}`,
        url: OFFICIAL_MATARO_URL,
      },
      isAccessibleForFree: true,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        validFrom: APP_START_DATE,
        url: SITE_URL,
      },
      url: SITE_URL,
      subEvent: FESTIVAL_SUBEVENTS.map((event) => ({
        "@type": "Event",
        name: event.name,
        description: event.description,
        startDate: event.startDate,
        endDate: event.endDate,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        isAccessibleForFree: true,
        location: {
          "@type": "Place",
          name: event.locationName,
          address: {
            "@type": "PostalAddress",
            addressLocality: APP_CITY,
            addressRegion: APP_REGION,
            addressCountry: APP_COUNTRY,
          },
        },
        superEvent: { "@id": `${SITE_URL}/#festival` },
        organizer: { "@id": `${SITE_URL}/#organization` },
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      inLanguage: "ca-ES",
      mainEntity: FAQS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inici", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: `${APP_NAME} ${APP_YEAR}`, item: `${SITE_URL}/#festival` },
      ],
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
        {/* Preconnect & DNS-prefetch to image CDNs to reduce LCP */}
        <link rel="preconnect" href="https://uploads.lessantes.cat" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://uploads.lessantes.cat" />
        <link rel="preconnect" href="https://cdn.appculturamataro.cat" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.appculturamataro.cat" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* Skip-to-content - WCAG 2.4.1 Bypass Blocks */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-9999 focus:bg-background focus:text-foreground focus:px-4 focus:py-2 focus:rounded-lg focus:font-medium focus:ring-2 focus:ring-primary"
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
