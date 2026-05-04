import Link from "next/link"
import { CONTACT_EMAIL } from "@/lib/constants"
import {
  ShieldCheck,
  Globe,
  DeviceMobile,
  Wheelchair,
  Gift,
  Database,
  ArrowRight,
  type Icon,
} from "@phosphor-icons/react/dist/ssr"

const stats = [
  { value: "Gratu\u00efta", label: "Sense cap cost" },
  { value: "0 anuncis", label: "Sense publicitat" },
  { value: "iOS & Android", label: "Tots els dispositius" },
  { value: "ca \u00b7 en", label: "2 idiomes" },
]

type Credential = {
  icon: Icon
  iconColor: string
  title: string
  description: string
  link?: string
  linkLabel?: string
}

const credentials: Credential[] = [
  {
    icon: ShieldCheck,
    iconColor: "text-green-600",
    title: "Privacitat total",
    description:
      "Cap seguiment, cap publicitat, cap venda de dades. Funciona sense compte d'usuari ni informaci\u00f3 personal.",
    link: "/privacy",
    linkLabel: "Pol\u00edtica de privacitat",
  },
  {
    icon: Wheelchair,
    iconColor: "text-blue-600",
    title: "Accessible WCAG 2.1 AA",
    description:
      "Lectors de pantalla, navegaci\u00f3 per teclat i contrast suficient. Dissenyada perqu\u00e8 tothom pugui usar-la.",
    link: "/accessibility",
    linkLabel: "Veure declaraci\u00f3",
  },
  {
    icon: Gift,
    iconColor: "text-primary",
    title: "100% gratu\u00efta, sempre",
    description:
      "Sense subscripcions, sense compres dins l'app. Un servei p\u00fablic per a la comunitat de Matar\u00f3.",
  },
  {
    icon: Globe,
    iconColor: "text-violet-600",
    title: "Multiling\u00fce",
    description:
      "Catal\u00e0 i angl\u00e8s amb detecci\u00f3 autom\u00e0tica de l'idioma del dispositiu. Per als mataroners i els visitants.",
  },
  {
    icon: Database,
    iconColor: "text-amber-600",
    title: "Open data ready",
    description:
      "Arquitectura preparada per connectar-se a l'API oficial de l'Ajuntament. El programa s'actualitza en temps real.",
  },
  {
    icon: DeviceMobile,
    iconColor: "text-slate-500",
    title: "iOS i Android",
    description:
      "Una sola app. Disseny nadiu que respecta les guies d'Apple i Google per a la millor experi\u00e8ncia.",
  },
]

export function Trust() {
  return (
    <section className="py-24 px-6" aria-labelledby="trust-heading">
      <div className="max-w-5xl mx-auto">

        {/* Header + stats side by side */}
        <div className="scroll-reveal flex flex-col lg:flex-row lg:items-end gap-10 lg:gap-16 mb-20">
          <div className="lg:flex-1">
            <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">Per tothom</p>
            <h2 id="trust-heading" className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
              Feta per la comunitat,
              <br />
              <span className="text-primary">a l&apos;al&ccedil;ada institucional</span>
            </h2>
          </div>

          {/* Stats - large text, no boxes */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-5 lg:shrink-0 lg:border-l lg:border-border lg:pl-12">
            {stats.map((s, i) => (
              <div key={i}>
                <div className="font-bold text-foreground text-base">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Credentials - clean list with dividers */}
        <div className="scroll-reveal divide-y divide-border">
          {credentials.map((c) => (
            <div key={c.title} className="flex items-start gap-5 py-5 first:pt-0 last:pb-0">
              <c.icon weight="duotone" className={`size-5 shrink-0 mt-0.5 ${c.iconColor}`} />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-sm mb-1">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.description}</p>
              </div>
              {c.link && (
                <Link
                  href={c.link}
                  className="shrink-0 flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors mt-0.5 whitespace-nowrap"
                >
                  {c.linkLabel}
                  <ArrowRight className="size-3" />
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Institutional CTA - minimal */}
        <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-foreground text-sm mb-1">Ets de l&apos;Ajuntament de Matar&oacute;?</p>
            <p className="text-sm text-muted-foreground">
              Estem oberts a col&middot;laborar per fer d&apos;aquesta app el canal oficial de Les Santes.
            </p>
          </div>
          <a
            href={`mailto:${CONTACT_EMAIL.collab_official}?subject=Col%C2%B7laboraci%C3%B3 Les Santes - Ajuntament de Matar%C3%B3`}
            className="shrink-0 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Contactar <ArrowRight className="size-3.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
