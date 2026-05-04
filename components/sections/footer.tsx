import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* CTA band */}
        <div className="border border-white/10 rounded-3xl p-8 mb-12 flex flex-col sm:flex-row items-center justify-between gap-6 bg-white/5">
          <div>
            <h3 className="text-xl font-bold mb-1">Prepara&apos;t per la festa</h3>
            <p className="text-background/60 text-sm">L&apos;app estarà disponible abans de Les Santes 2026.</p>
          </div>
          <a
            href="mailto:gubaupol@gmail.com?subject=Notifica'm quan estigui disponible l'app de les Santes"
            className="shrink-0 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Avisa&apos;m quan surti
          </a>
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image src="/icon.png" alt="Les Santes" width={36} height={36} className="rounded-xl opacity-90" />
            <div>
              <div className="font-semibold text-sm">Les Santes</div>
              <div className="text-background/50 text-xs">La Festa Major de Mataró</div>
            </div>
          </div>

          <nav className="flex items-center gap-6 text-sm text-background/60">
            <Link href="/privacy" className="hover:text-background transition-colors">
              Privacitat
            </Link>
            <Link href="/support" className="hover:text-background transition-colors">
              Suport
            </Link>
            <a
              href="https://polgubau.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-background transition-colors"
            >
              Autor
            </a>
          </nav>
        </div>

       
      </div>
    </footer>
  )
}
