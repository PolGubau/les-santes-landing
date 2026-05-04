import { Icon } from "@/src/shared/types/common"
import { MapPinIcon, CalendarBlankIcon, LightningIcon, HeartIcon } from "@phosphor-icons/react/dist/ssr"

type Feature = {
  icon: Icon
  glow: string        // radial glow color behind icon
  iconBg: string      // icon wrapper bg
  iconColor: string   // icon color
  title: string
  description: string
  badge: string
}

const features: Feature[] = [
  {
    icon: LightningIcon,
    glow: "oklch(0.75 0.18 85 / 0.15)",
    iconBg: "bg-amber-400/15",
    iconColor: "text-amber-300",
    title: "Ara mateix",
    description: "Descobreix en 2 segons quins actes estan passant en aquest moment. Sense buscar, sense perdre temps.",
    badge: "Temps real",
  },
  {
    icon: MapPinIcon,
    glow: "oklch(0.55 0.22 25 / 0.18)",
    iconBg: "bg-red-400/15",
    iconColor: "text-red-300",
    title: "Mapa interactiu",
    description: "Visualitza tots els actes al mapa de Mataró. Segueix les cercaviles i comparses en temps real.",
    badge: "GPS",
  },
  {
    icon: CalendarBlankIcon,
    glow: "oklch(0.60 0.18 250 / 0.18)",
    iconBg: "bg-blue-400/15",
    iconColor: "text-blue-300",
    title: "Agenda completa",
    description: "Tots els actes dia a dia. Filtra per tipus d'activitat i afegeix els teus favorits.",
    badge: "Tots els dies",
  },
  {
    icon: HeartIcon,
    glow: "oklch(0.60 0.22 10 / 0.18)",
    iconBg: "bg-rose-400/15",
    iconColor: "text-rose-300",
    title: "Favorits",
    description: "Guarda els actes que no vols perdre't. La teva llista personal de Les Santes.",
    badge: "La teva llista",
  },
]

export function Features() {
  return (
    <section className="py-24 lg:py-36 px-6 bg-linear-to-bl from-foreground to-foreground/80 text-background">
      <div className="max-w-5xl mx-auto">
        <div className="scroll-reveal mb-14">
          <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">
            Tot el que necessites
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
            Dissenyada per viure
            <br />
            la festa al màxim
          </h2>
        </div>

        <div className="scroll-reveal-group grid sm:grid-cols-2 gap-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative overflow-hidden rounded-2xl bg-white/5 hover:bg-white/8 border border-white/10 hover:border-white/20 transition-all duration-300 p-6"
            >
              {/* Radial glow behind icon */}
              <div
                className="absolute -top-8 -left-8 size-40 rounded-full blur-2xl pointer-events-none"
                style={{ background: `radial-gradient(circle, ${f.glow}, transparent 70%)` }}
              />

              {/* Icon */}
              <div className={`relative inline-flex p-3 rounded-xl ${f.iconBg} ${f.iconColor} mb-5`}>
                <f.icon weight="fill" className="size-6" />
              </div>

              {/* Text */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-white">{f.title}</h3>
                  <span className="text-[10px] bg-white/10 text-white/50 px-2 py-0.5 rounded-full">
                    {f.badge}
                  </span>
                </div>
                <p className="text-sm text-white/55 leading-relaxed">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
