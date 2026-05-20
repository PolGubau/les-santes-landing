import Link from "next/link"
import { Logo } from "@/components/logo"
import { APP_NAME, APP_SUBTITLE, APP_YEAR, AUTHOR_NAME, AUTHOR_URL, CONTACT_EMAIL } from "@/lib/constants"
import Image from "next/image"

export function Footer() {
  return (
    <div className="pt-20">
      <div aria-hidden="true" className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
        <Image
          src="/banner.webp"
          alt="Robafaves a Les Santes de Mataró - milers de persones al carrer"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Gradient overlays: top and bottom fade to background */}
        <div className="absolute inset-0 bg-linear-to-b from-background via-transparent to-foreground" />
      </div>
      <footer className="bg-foreground text-background py-16 px-6">
        <div className="max-w-5xl mx-auto">
          {/* CTA band */}
          <div className="border border-white/10 rounded-3xl p-5 sm:p-8 mb-12 flex flex-col sm:flex-row items-center max-sm:text-center justify-between gap-5 bg-white/5">
            <div>
              <h3 className="text-xl font-bold mb-1">Prepara&apos;t per la festa</h3>
              <p className="text-background/60 text-sm text-pretty">L&apos;app estarà disponible abans de {APP_NAME} {APP_YEAR}.</p>
            </div>
            <a
              href={`mailto:${CONTACT_EMAIL.notify}?subject=Avisa'm quan surti l'app de ${APP_NAME}`}
              className="shrink-0 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Avisa&apos;m quan surti
            </a>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <Logo size={36} subtitle={APP_SUBTITLE} className="opacity-90" />

            <nav aria-label="Peu de pàgina" className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-background/60">
              <Link href="/#programa" className="hover:text-background transition-colors">
                Programa
              </Link>
              <Link href="/#faq" className="hover:text-background transition-colors">
                FAQ
              </Link>
              <Link href="/about" className="hover:text-background transition-colors">
                Sobre el projecte
              </Link>
              <Link href="/privacy" className="hover:text-background transition-colors">
                Privacitat
              </Link>
              <Link href="/support" className="hover:text-background transition-colors">
                Suport
              </Link>
              <Link href="/accessibility" className="hover:text-background transition-colors">
                Accessibilitat
              </Link>
            </nav>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-background/40">
            <p>Fem millor {APP_NAME}, fet per <Link href={AUTHOR_URL} target="_blank" className="hover:underline">{AUTHOR_NAME}</Link> · <Link href="/admin" className="hover:text-background/60 transition-colors">Admin</Link></p>
            <div className="flex items-center gap-4">
              <p>Aquest projecte no és oficial</p>
              <Link
                href="/accessibility"
                className="inline-flex items-center gap-1.5 border border-white/20 text-background/60 hover:text-background px-2.5 py-1 rounded-md transition-colors"
                aria-label="Declaració d'accessibilitat WCAG 2.2 AA"
              >
                <svg aria-hidden="true" focusable="false" className="size-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z" />
                </svg>
                WCAG 2.2 AA
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
