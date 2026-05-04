import Link from "next/link"
import { CONTACT_EMAIL } from "@/lib/constants"
import {
  ShieldCheck,
  Globe,
  DeviceMobile,
  Wheelchair,
  Gift,
  Database,
} from "@phosphor-icons/react/dist/ssr"

const stats = [
  { value: "Gratuïta", label: "Sense cost" },
  { value: "Sense publicitat", label: "100% net" },
  { value: "iOS & Android", label: "Universal" },
  { value: "Català · English", label: "2 idiomes" },
]

const credentials = [
  {
    icon: Wheelchair,
    color: "bg-blue-50 text-blue-700 border-blue-200",
    title: "Accessible WCAG 2.1 AA",
    description:
      "Dissenyada perquè tothom pugui usar-la: lectors de pantalla, navegació per teclat i contrast suficient en tota la interfície.",
    badge: "Compliment legal",
    badgeColor: "bg-blue-100 text-blue-700",
    link: "/accessibility",
    linkLabel: "Veure declaració",
  },
  {
    icon: ShieldCheck,
    color: "bg-green-50 text-green-700 border-green-200",
    title: "Privacitat total",
    description:
      "Cap seguiment, cap publicitat, cap venda de dades. L'app funciona sense compte d'usuari ni recopilació d'informació personal.",
    badge: "RGPD compliant",
    badgeColor: "bg-green-100 text-green-700",
    link: "/privacy",
    linkLabel: "Política de privacitat",
  },
  {
    icon: Globe,
    color: "bg-violet-50 text-violet-700 border-violet-200",
    title: "Multilingüe",
    description:
      "Disponible en català i anglès, amb detecció automàtica de l'idioma del dispositiu. Preparat per acollir visitants d'arreu.",
    badge: "ca · en",
    badgeColor: "bg-violet-100 text-violet-700",
  },
  {
    icon: Database,
    color: "bg-amber-50 text-amber-700 border-amber-200",
    title: "Open data ready",
    description:
      "Arquitectura preparada per connectar-se a dades oficials de l'Ajuntament via API. El programa pot actualitzar-se en temps real sense reimplantar l'app.",
    badge: "API first",
    badgeColor: "bg-amber-100 text-amber-700",
  },
  {
    icon: Gift,
    color: "bg-rose-50 text-rose-700 border-rose-200",
    title: "100% gratuïta",
    description:
      "Sense subscripcions, sense compres dins l'app, sense anuncis. Un servei públic per a la comunitat de Mataró i els seus visitants.",
    badge: "Servei públic",
    badgeColor: "bg-rose-100 text-rose-700",
  },
  {
    icon: DeviceMobile,
    color: "bg-slate-100 text-slate-700 border-slate-200",
    title: "iOS i Android",
    description:
      "Una sola app per a tots els dispositius. Disseny nadiu que respecta les guies d'Apple i Google per a la millor experiència possible.",
    badge: "Cross-platform",
    badgeColor: "bg-slate-100 text-slate-600",
  },
]

export function Trust() {
  return (
    <section className="py-24 px-6 bg-muted/30 border-y border-border" aria-labelledby="trust-heading">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">
            Per tothom
          </p>
          <h2 id="trust-heading" className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-4">
            Feta per la comunitat,
            <br />
            <span className="text-primary">a l'alçada institucional</span>
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
            Gratuïta i sense publicitat per als ciutadans. Accessible, multilingüe i transparent per a l'Ajuntament.
          </p>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
          {stats.map((s) => (
            <div key={s.value} className="bg-background border border-border rounded-2xl px-4 py-4 text-center">
              <div className="font-bold text-foreground text-sm mb-0.5">{s.value}</div>
              <div className="text-[11px] text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Credential cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {credentials.map((c) => (
            <div key={c.title} className="bg-background border border-border rounded-2xl p-5 flex flex-col gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <div className="flex items-center gap-3">
                <div className={`${c.color} border p-2.5 rounded-xl shrink-0`}>
                  <c.icon weight="fill" className="size-4" />
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${c.badgeColor}`}>
                  {c.badge}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm mb-1">{c.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{c.description}</p>
              </div>
              {c.link && (
                <Link href={c.link} className="text-xs text-primary font-medium hover:underline mt-auto">
                  {c.linkLabel} →
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Institutional CTA */}
        <div className="mt-12 bg-primary/5 border border-primary/20 rounded-2xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-foreground text-sm mb-1">Ets de l'Ajuntament de Mataró?</p>
            <p className="text-xs text-muted-foreground max-w-md">
              Estem oberts a col·laborar per fer d'aquesta app el canal oficial de Les Santes. Contacta'ns.
            </p>
          </div>
          <a
            href={`mailto:${CONTACT_EMAIL.collab_official}?subject=Col·laboració Les Santes — Ajuntament de Mataró`}
            className="shrink-0 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Contactar
          </a>
        </div>
      </div>
    </section>
  )
}
