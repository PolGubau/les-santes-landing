import type { Metadata } from "next"
import { PageNav } from "@/components/page-nav"

export const metadata: Metadata = {
  title: "Accessibilitat",
  description: "Declaració d'accessibilitat de l'app i la web de Les Santes. Conformitat WCAG 2.2 AA.",
  alternates: { canonical: "https://lessantes.polgubau.com/accessibility" },
}

const criteria = [
  { code: "1.1.1", name: "Contingut no textual", level: "A", status: "Conforme", note: "Imatges decoratives amb aria-hidden, icones amb aria-label." },
  { code: "1.3.1", name: "Informació i relacions", level: "A", status: "Conforme", note: "Estructura semàntica amb h1–h3, nav, main, section, footer." },
  { code: "1.4.3", name: "Contrast (mínim)", level: "AA", status: "Conforme", note: "Ràtio mínim 4.5:1 per a text normal, 3:1 per a text gran." },
  { code: "2.1.1", name: "Teclat", level: "A", status: "Conforme", note: "Tots els elements interactius accessibles per teclat." },
  { code: "2.4.1", name: "Ometre blocs", level: "A", status: "Conforme", note: "Enllaç 'Salta al contingut principal' al principi de cada pàgina." },
  { code: "2.4.2", name: "Títol de la pàgina", level: "A", status: "Conforme", note: "Totes les pàgines tenen <title> descriptiu i únic." },
  { code: "2.4.6", name: "Capçaleres i etiquetes", level: "AA", status: "Conforme", note: "Capçaleres descriptives en totes les seccions." },
  { code: "3.1.1", name: "Idioma de la pàgina", level: "A", status: "Conforme", note: "lang='ca' al document arrel." },
  { code: "3.2.1", name: "En focus", level: "A", status: "Conforme", note: "Canvis de context no es produeixen en rebre focus." },
  { code: "4.1.2", name: "Nom, funció, valor", level: "A", status: "Conforme", note: "Elements interactius amb role, aria-label i aria-state correctes." },
]

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageNav breadcrumb="Accessibilitat" />

      <main id="main-content" className="max-w-3xl mx-auto px-6 py-6 space-y-12">
        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 text-xs font-semibold px-3 py-1.5 rounded-full">
            <svg aria-hidden="true" focusable="false" className="size-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z" />
            </svg>
            WCAG 2.2 AA - Declaració de Conformitat
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Declaració d&apos;Accessibilitat</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            El projecte <strong>Les Santes</strong> s&apos;ha dissenyat amb l&apos;objectiu de complir les{" "}
            <strong>Pautes d&apos;Accessibilitat per al Contingut Web (WCAG) 2.2 al nivell AA</strong>, seguint
            les recomanacions del W3C i el Reial Decret 1112/2018 sobre accessibilitat digital.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Estat de conformitat</h2>
          <p className="text-muted-foreground">
            Aquesta pàgina web i l&apos;aplicació mòbil compleixen <strong>parcialment</strong> les WCAG 2.2 al nivell AA.
            Les àrees que no compleixen es detallen a la secció de limitacions.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-800 text-sm font-medium px-3 py-1.5 rounded-lg">
              ✅ Nivell A - Complert
            </span>
            <span className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-800 text-sm font-medium px-3 py-1.5 rounded-lg">
              ✅ Nivell AA - Complert en les àrees clau
            </span>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Criteris implementats</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th scope="col" className="text-left px-4 py-3 font-semibold text-foreground">Criteri</th>
                  <th scope="col" className="text-left px-4 py-3 font-semibold text-foreground">Nivell</th>
                  <th scope="col" className="text-left px-4 py-3 font-semibold text-foreground">Estat</th>
                  <th scope="col" className="text-left px-4 py-3 font-semibold text-foreground hidden sm:table-cell">Nota</th>
                </tr>
              </thead>
              <tbody>
                {criteria.map((c, i) => (
                  <tr key={c.code} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{c.code}<br /><span className="font-sans text-foreground font-medium">{c.name}</span></td>
                    <td className="px-4 py-3"><span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">{c.level}</span></td>
                    <td className="px-4 py-3"><span className="text-green-700 font-medium">✓ {c.status}</span></td>
                    <td className="px-4 py-3 text-muted-foreground hidden max-w-xs sm:table-cell">{c.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Limitacions conegudes</h2>
          <div className="bg-amber-50 shadow rounded-xl p-5 space-y-2">
            <p className="text-amber-900 text-sm font-semibold">L&apos;app mòbil (iOS/Android)</p>
            <ul className="list-disc pl-5 text-amber-800 text-sm space-y-1">
              <li>Els mapes interactius poden presentar limitacions per a usuaris de lectors de pantalla. Es proporcionen alternatives textuals a la pestanya Agenda.</li>
              <li>Algunes animacions no respecten la preferència <code>prefers-reduced-motion</code> a la versió actual. Es millorarà en futures versions.</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Com contactar-nos</h2>
          <p className="text-muted-foreground leading-relaxed">
            Si trobes alguna barrera d&apos;accessibilitat o tens suggeriments per millorar-la, posa&apos;t en contacte amb nosaltres:
          </p>
          <a
            href="mailto:lessantes@polgubau.com?subject=Accessibilitat - Les Santes"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Reportar un problema d&apos;accessibilitat
          </a>
          <p className="text-muted-foreground text-sm">Responem en menys de 48 hores.</p>
        </section>

        <section className="space-y-2 text-sm text-muted-foreground border-t border-border pt-8">
          <p><strong>Data de la darrera revisió:</strong> Maig de 2026</p>
          <p><strong>Tecnologies de suport provades:</strong> VoiceOver (iOS/macOS), TalkBack (Android), NVDA (Windows)</p>
          <p>
            Referència: <a href="https://www.w3.org/WAI/WCAG22/quickref/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">WCAG 2.2 Quick Reference (W3C)</a>
          </p>
        </section>

      </main>
    </div>
  )
}
