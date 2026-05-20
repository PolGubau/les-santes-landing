import type { Metadata } from "next"
import { PageNav } from "@/components/page-nav"
import { APP_NAME, CONTACT_EMAIL, SUPPORT_FAQS } from "@/lib/constants"
import { FaqList } from "@/components/sections/faq"

export const metadata: Metadata = {
  title: "Suport",
  description: `Centre d'ajuda de l'app ${APP_NAME}. Preguntes freqüents, reportar errors i contacte.`,
  alternates: { canonical: "https://lessantes.polgubau.com/support" },
}

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageNav breadcrumb="Suport" />

      <main id="main-content" className="max-w-3xl mx-auto p-6 space-y-14">
        <header>
          <h1 className="text-4xl font-semibold tracking-tight mb-3">Centre de Suport</h1>
          <p className="text-muted-foreground text-lg">
            Estem aquí per ajudar-te. Si no trobes el que busques, escriu-nos.
          </p>
        </header>

        {/* Contact card */}
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div>
            <h2 className="font-semibold mb-1">Contacte directe</h2>
            <p className="text-muted-foreground text-sm">Responem en menys de 48 hores.</p>
          </div>
          <a
            href={`mailto:${CONTACT_EMAIL.support}`}
            className="shrink-0 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Escriu-nos
          </a>
        </div>

        {/* FAQ */}
        <section aria-labelledby="support-faq-heading">
          <h2 id="support-faq-heading" className="text-2xl font-semibold mb-8">
            Preguntes freqüents
          </h2>
          <FaqList items={SUPPORT_FAQS} />
        </section>

        {/* Bug report */}
        <section className="bg-muted/50 rounded-2xl p-6 space-y-3">
          <h2 className="text-xl font-semibold">Trobes un error?</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Si l&apos;app es comporta de manera inesperada o trobes informació incorrecta al programa,
            envia&apos;ns un correu indicant:
          </p>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>El dispositiu i la versió del sistema operatiu</li>
            <li>La versió de l&apos;app</li>
            <li>Una descripció del problema</li>
            <li>Si és possible, una captura de pantalla</li>
          </ul>
          <a
            href={`mailto:${CONTACT_EMAIL.bug}?subject=Bug report - ${APP_NAME} app`}
            className="inline-block mt-2 text-primary text-sm font-medium hover:underline"
          >
            Reportar un error →
          </a>
        </section>
      </main>
    </div>
  )
}
