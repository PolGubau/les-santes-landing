import { Logo } from "@/components/logo"
import { CONTACT_EMAIL } from "@/lib/constants"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Logo asLink size={28} />

        <nav aria-label="Navegació principal" className="flex items-center gap-4">
          <a
            href="/about"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Sobre el projecte
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL.general}`}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Contacte
          </a>
        </nav>
      </div>
    </header>
  )
}
