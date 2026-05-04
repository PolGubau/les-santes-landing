import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })
const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "Les Santes — La Festa Major de Mataró",
  description:
    "Tota l'agenda, el mapa i els actes en temps real de Les Santes de Mataró. L'app oficial de la Festa Major.",
  keywords: ["Les Santes", "Mataró", "Festa Major", "agenda", "mapa", "actes", "app"],
  authors: [{ name: "Pol Gubau Amores", url: "https://polgubau.com" }],
  creator: "Pol Gubau Amores",
  openGraph: {
    title: "Les Santes — La Festa Major de Mataró",
    description: "Tota l'agenda, el mapa i els actes en temps real de Les Santes de Mataró.",
    url: "https://lessantes.polgubau.com",
    siteName: "Les Santes",
    locale: "ca_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Les Santes — La Festa Major de Mataró",
    description: "Tota l'agenda, el mapa i els actes en temps real de Les Santes de Mataró.",
    creator: "@polgubau",
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ca"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable)}
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
