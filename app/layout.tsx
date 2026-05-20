import type { Metadata, Viewport } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { SITE_URL } from "@/lib/constants"

const geist = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" })
const fontMono = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
  icons: {
    icon: [
      { url: "/icon/32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon/64.png", sizes: "64x64", type: "image/png" },
      { url: "/icon/128.png", sizes: "128x128", type: "image/png" },
      { url: "/icon/512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: { url: "/icon/480.png", sizes: "480x480", type: "image/png" },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}