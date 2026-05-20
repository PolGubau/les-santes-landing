import { PageNav } from "@/components/page-nav"
import { ArrowRightIcon, CodeIcon, CopyIcon, DatabaseIcon, LockOpenIcon } from "@phosphor-icons/react/dist/ssr"
import type { Metadata } from "next"
import { API_URL, APP_NAME, AUTHOR_NAME, AUTHOR_URL, SITE_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Developers · API Open Data",
  description: `API REST pública i gratuïta amb les dades de ${APP_NAME}. Programa, espais, avisos i més. CC BY 4.0.`,
  alternates: { canonical: `${SITE_URL}/developers` },
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="bg-muted rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto text-foreground/80 leading-relaxed">
      <code>{children}</code>
    </pre>
  )
}

export default function DevelopersPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageNav breadcrumb="Developers" />

      <main id="main-content" className="max-w-3xl mx-auto px-6 py-16 space-y-16">

        {/* Header */}
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
            <span className="size-1.5 rounded-full bg-primary animate-pulse" />
            API v1 · Live
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
            Open Data API
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            API REST pública, gratuïta i sense autenticació amb totes les dades del programa de{" "}
            <strong>{APP_NAME}</strong>. Construeix la teva pròpia app, mapa o visualització.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href={`${API_URL}/docs`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-foreground text-background px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity"
            >
              Documentació interactiva <ArrowRightIcon className="size-3.5" />
            </a>
            <a
              href={`${API_URL}/doc`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-border px-4 py-2 rounded-lg text-sm font-medium hover:bg-muted transition-colors"
            >
              OpenAPI JSON <CopyIcon className="size-3.5" />
            </a>
          </div>
        </header>

        {/* Base URL */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <CodeIcon weight="fill" className="size-5 text-primary" /> Base URL
          </h2>
          <CodeBlock>{API_URL}</CodeBlock>
        </section>

        {/* Endpoints */}
        <section className="space-y-5">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <DatabaseIcon weight="fill" className="size-5 text-primary" /> Endpoints principals
          </h2>
          <div className="divide-y divide-border border border-border rounded-xl overflow-hidden">
            {[
              { method: "GET", path: "/v1/events", desc: "Llista d'actes amb filtres (dia, tipus, cerca)" },
              { method: "GET", path: "/v1/events/{id}", desc: "Detall d'un acte" },
              { method: "GET", path: "/v1/festival", desc: "Metadades de la festa (nom, dates, edició)" },
              { method: "GET", path: "/v1/days", desc: "Dies del festival amb recompte d'actes" },
              { method: "GET", path: "/v1/locations", desc: "Espais i punts d'interès" },
              { method: "GET", path: "/v1/announcements", desc: "Avisos d'última hora" },
            ].map(({ method, path, desc }) => (
              <div key={path} className="flex items-start gap-4 px-5 py-4 bg-card hover:bg-muted/50 transition-colors">
                <span className="shrink-0 text-xs font-mono font-bold bg-primary/10 text-primary px-2 py-0.5 rounded mt-0.5">
                  {method}
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-sm font-medium truncate">{path}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Exemples */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">Exemples d&apos;ús</h2>
          <CodeBlock>{`curl ${API_URL}/v1/festival`}</CodeBlock>
          <CodeBlock>{`curl "${API_URL}/v1/events?day=2026-07-25&type=concert"`}</CodeBlock>
          <CodeBlock>{`curl "${API_URL}/v1/announcements"`}</CodeBlock>
        </section>

        {/* Llicència */}
        <section className="bg-muted/40 rounded-2xl p-6 space-y-3">
          <LockOpenIcon weight="fill" className="size-6 text-primary" />
          <h2 className="text-lg font-bold">Llicències</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            <strong>Codi:</strong> MIT — lliure per a qualsevol ús, inclòs el comercial. Mantén el copyright.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            <strong>Dades:</strong>{" "}
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              CC BY 4.0
            </a>{" "}
            — lliures per a qualsevol ús, inclòs el comercial, amb atribució obligatòria a{" "}
            <a href={AUTHOR_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
              {AUTHOR_NAME}
            </a>.
          </p>
          <p className="text-muted-foreground text-sm">
            Exemple d&apos;atribució: <em>&ldquo;Dades de Les Santes via lessantes.polgubau.com (CC BY 4.0)&rdquo;</em>
          </p>
        </section>

      </main>
    </div>
  )
}
