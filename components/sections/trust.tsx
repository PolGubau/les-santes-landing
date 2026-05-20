import Link from "next/link"
import { CONTACT_EMAIL } from "@/lib/constants"
import {
  ShieldCheckIcon,
  GlobeIcon,
  DeviceMobileIcon,
  WheelchairIcon,
  GiftIcon,
  DatabaseIcon,
  ArrowRightIcon,
} from "@phosphor-icons/react/dist/ssr"
import { Icon } from "@/src/shared/types/common"

const stats = [
  { value: "Gratu\u00efta", label: "Sense cap cost" },
  { value: "0 anuncis", label: "Sense publicitat" },
  { value: "iOS & Android", label: "Tots els dispositius" },
  { value: "ca \u00b7 en", label: "En el teu idioma" },
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
    icon: ShieldCheckIcon,
    iconColor: "text-green-600",
    title: "Privacitat total",
    description:
      "Cap seguiment, cap publicitat, cap venda de dades. Funciona sense compte d'usuari ni informaci\u00f3 personal.",
    link: "/privacy",
    linkLabel: "Pol\u00edtica de privacitat",
  },
  {
    icon: WheelchairIcon,
    iconColor: "text-blue-600",
    title: "Accessible WCAG 2.2 AA",
    description:
      "Lectors de pantalla, navegaci\u00f3 per teclat i contrast suficient. Dissenyada perqu\u00e8 tothom pugui usar-la.",
    link: "/accessibility",
    linkLabel: "Veure declaraci\u00f3",
  },
  {
    icon: GiftIcon,
    iconColor: "text-primary",
    title: "100% gratu\u00efta, sempre",
    description:
      "Sense subscripcions, sense compres dins l'app. Un servei p\u00fablic per a la comunitat de Matar\u00f3.",
  },
  {
    icon: GlobeIcon,
    iconColor: "text-violet-600",
    title: "Multiling\u00fce",
    description:
      "Catal\u00e0 i angl\u00e8s amb detecci\u00f3 autom\u00e0tica de l'idioma del dispositiu. Per als mataroners i els visitants.",
  },
  {
    icon: DatabaseIcon,
    iconColor: "text-amber-600",
    title: "Open data ready",
    description:
      "Arquitectura preparada per connectar-se a l'API oficial de l'Ajuntament. El programa s'actualitza en temps real.",
  },
  {
    icon: DeviceMobileIcon,
    iconColor: "text-slate-500",
    title: "iOS i Android",
    description:
      "Una sola app. Disseny nadiu que respecta les guies d'Apple i Google per a la millor experi\u00e8ncia.",
  },
]

export function Trust() {
  return (
    <section className="py-16 sm:py-24 px-6" aria-labelledby="trust-heading">
      <div className="max-w-5xl mx-auto">

        {/* Header + stats */}
        <div className="scroll-reveal flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-16 mb-12 sm:mb-20">
          <div className="lg:flex-1">
            <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">Per tothom</p>
            <h2 id="trust-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              Feta per la comunitat,
              <br />
              <span className="text-primary">a l&apos;al&ccedil;ada institucional</span>
            </h2>
          </div>

          {/* Stats strip — horizontal scroll on mobile, grid on lg */}
          <div className="gap-6 grid grid-cols-2 lg:gap-x-8 lg:gap-y-5 lg:shrink-0 rounded-xl bg-muted p-4 lg:border-border scrollbar-none">
            {stats.map((s, i) => (
              <div key={i} className="shrink-0">
                <div className="font-bold text-foreground text-base whitespace-nowrap">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5 whitespace-nowrap">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Credentials — 2-col grid on sm+, stacked on mobile */}
        <div className="scroll-reveal grid sm:grid-cols-2 gap-0 sm:gap-x-12 divide-y divide-border sm:divide-y-0">
          {credentials.map((c) => (
            <div key={c.title} className="flex flex-col gap-2 py-5 sm:py-6 sm:border-b sm:border-border">
              <div className="flex items-center gap-2.5">
                <c.icon weight="duotone" className={`size-4 shrink-0 ${c.iconColor}`} />
                <h3 className="font-semibold text-foreground text-sm">{c.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.description}</p>
              {c.link && (
                <Link
                  href={c.link}
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors w-fit"
                >
                  {c.linkLabel}
                  <ArrowRightIcon className="size-3" />
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Institutional CTA */}
        <div className="mt-12 sm:mt-14 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
            Contactar <ArrowRightIcon className="size-3.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
