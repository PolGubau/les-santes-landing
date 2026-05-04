import { MapPin, CalendarBlank, Lightning, Heart } from "@phosphor-icons/react/dist/ssr"

const features = [
  {
    icon: Lightning,
    color: "bg-amber-100 text-amber-700",
    title: "Ara mateix",
    description: "Descobreix en 2 segons quins actes estan passant en aquest moment. Sense buscar, sense perdre temps.",
    badge: "Temps real",
  },
  {
    icon: MapPin,
    color: "bg-red-100 text-red-700",
    title: "Mapa interactiu",
    description: "Visualitza tots els actes al mapa de Mataró. Segueix les cercaviles i comparses en temps real.",
    badge: "GPS",
  },
  {
    icon: CalendarBlank,
    color: "bg-blue-100 text-blue-700",
    title: "Agenda completa",
    description: "Tots els actes dia a dia. Filtra per tipus d'activitat i afegeix els teus favorits.",
    badge: "Tots els dies",
  },
  {
    icon: Heart,
    color: "bg-rose-100 text-rose-700",
    title: "Favorits",
    description: "Guarda els actes que no vols perdre't. La teva llista personal de Les Santes.",
    badge: "La teva llista",
  },
]

export function Features() {
  return (
    <section className="py-24 px-6 bg-foreground text-background">
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

        <div className="scroll-reveal-group grid sm:grid-cols-2 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="group bg-white/5 hover:bg-white/8 border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className={`${f.color} p-3 rounded-xl shrink-0`}>
                  <f.icon weight="fill" className="size-5" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-background">{f.title}</h3>
                    <span className="inline-flex items-center gap-1 text-[10px] bg-white/10 text-background/70 px-2 py-0.5 rounded-full">
                      <f.icon weight="fill" className="size-2.5" />
                      {f.badge}
                    </span>
                  </div>
                  <p className="text-sm text-background/60 leading-relaxed">{f.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
