import { PageNav } from "@/components/page-nav"
import type { Metadata } from "next"
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ChatCircleTextIcon,
  DeviceMobileIcon,
  FlaskIcon,
  ProhibitIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react/dist/ssr"
import { APP_NAME, CONTACT_EMAIL, SITE_URL, TESTER_PROGRAM } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Testers · Programa de proves",
  description: `Uneix-te al test tancat de l'app ${APP_NAME}. Instal·la, prova-la 14 dies i ajuda'ns a millorar-la abans del llançament.`,
  alternates: { canonical: `${SITE_URL}/testers` },
  robots: { index: true, follow: true },
}

const STEPS = [
  {
    n: 1,
    title: "Instal·la l'app",
    desc: "Clica el botó d'instal·lació, accepta el test i baixa-la des de Google Play com qualsevol app.",
  },
  {
    n: 2,
    title: "Obre-la i explora 2–3 minuts",
    desc: "Mira l'agenda, prova el mapa i navega lliurement. No cal registre.",
  },
  {
    n: 3,
    title: "Torna-la a obrir durant els 14 dies",
    desc: "Amb obrir-la 3 o 4 cops repartits ja n'hi ha prou. Vols anar a un concert? Mira-ho a l'app.",
  },
] as const

const NOT_REQUIRED = [
  "Registrar-te ni crear cap compte",
  "Usar-la cada dia ni gaire estona",
  "Saber res tècnic",
  "Reportar bugs formalment (només si vols)",
] as const

export default function TestersPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageNav breadcrumb="Testers" />

      <main id="main-content" className="max-w-3xl mx-auto px-6 py-16 space-y-14">

        {/* Header */}
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
            <FlaskIcon weight="fill" className="size-3.5" />
            Test tancat · {TESTER_PROGRAM.durationDays} dies
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
            Ajuda'ns a provar l'app
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Estàs a punt de provar una versió primerenca de l'app de <strong>{APP_NAME} 2026</strong>.
            Només cal instal·lar-la i fer-la servir alguns dies. En 30 segons ja estàs dins.
          </p>
        </header>

        {/* Primary CTA */}
        <section className="bg-foreground text-background rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-medium opacity-80">
            <DeviceMobileIcon weight="fill" className="size-4" /> Només Android (de moment)
          </div>
          <h2 className="text-2xl font-semibold">Instal·la l'app en 2 passos</h2>
          <ol className="text-sm space-y-1.5 opacity-90 list-decimal list-inside">
            <li>Clica el botó i accepta unir-te al test tancat.</li>
            <li>Espera 1–2 minuts i instal·la-la des de Google Play.</li>
          </ol>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={TESTER_PROGRAM.playOptInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-background text-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Unir-me al test <ArrowRightIcon className="size-3.5" />
            </a>
            <a
              href={TESTER_PROGRAM.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-background/30 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-background/10 transition-colors"
            >
              Obrir Play Store
            </a>
          </div>
        </section>

        {/* Steps */}
        <section className="space-y-5">
          <h2 className="text-xl font-bold">Què has de fer</h2>
          <ol className="space-y-3">
            {STEPS.map(({ n, title, desc }) => (
              <li
                key={n}
                className="flex items-start gap-4 bg-card border border-border rounded-xl px-5 py-4"
              >
                <span className="shrink-0 size-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">
                  {n}
                </span>
                <div className="min-w-0">
                  <p className="font-semibold">{title}</p>
                  <p className="text-muted-foreground text-sm mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* What you DON'T need */}
        <section className="bg-muted/40 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <ProhibitIcon weight="fill" className="size-5 text-muted-foreground" />
            Què NO has de fer
          </h2>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {NOT_REQUIRED.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="shrink-0 mt-1.5 size-1 rounded-full bg-muted-foreground/60" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Feedback */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ChatCircleTextIcon weight="fill" className="size-5 text-primary" />
            Deixa'ns feedback
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Opcional, però molt útil. Tarda menys d'un minut i ens ajuda a polir l'app abans del llançament a Les Santes 2026.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={TESTER_PROGRAM.feedbackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Omplir formulari <ArrowRightIcon className="size-3.5" />
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL.tester}?subject=Feedback%20test%20${APP_NAME}`}
              className="inline-flex items-center gap-1.5 border border-border px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-muted transition-colors"
            >
              Escriu-nos un email
            </a>
          </div>
        </section>

        {/* Project status / credibility */}
        <section className="border border-border rounded-2xl p-6 space-y-3">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <ShieldCheckIcon weight="fill" className="size-5 text-primary" />
            Estat del projecte
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[
              "App en test tancat oficial a Google Play",
              "Validació amb usuaris reals de Mataró i rodalies",
              `Preparació pel llançament a ${APP_NAME} 2026`,
              "Projecte independent, codi i dades obertes",
            ].map((line) => (
              <li key={line} className="flex items-start gap-2">
                <CheckCircleIcon weight="fill" className="size-4 text-primary mt-0.5 shrink-0" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Footer note */}
        <p className="text-xs text-muted-foreground text-center">
          Gràcies per dedicar-nos uns minuts. Cada instal·lació compta. 🙌
        </p>

      </main>
    </div>
  )
}
