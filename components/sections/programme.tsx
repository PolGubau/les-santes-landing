import { Clock, MapPin } from "@phosphor-icons/react/dist/ssr"

const events = [
  { day: "Dij 24", time: "18:00", name: "Gegantada", place: "Des de la ronda O'Donnell", type: "Cercavila" },
  { day: "Div 25", time: "20:00", name: "Crida de Festa Major", place: "Ajuntament", type: "Institucional" },
  { day: "Div 25", time: "23:30", name: "Desvetllament Bellugós", place: "Ajuntament", type: "Nit Boja" },
  { day: "Dis 26", time: "18:00", name: "Tarda Guillada", place: "Ajuntament", type: "Familiar" },
  { day: "Diu 27", time: "18:00", name: "La Passada", place: "Des de l'Ajuntament", type: "Cercavila" },
  { day: "Diu 27", time: "23:00", name: "Castell de focs", place: "Platja del Varador", type: "Focs" },
  { day: "Dil 28", time: "21:30", name: "Ball de Dracs", place: "Pl. Santa Maria", type: "Cercavila" },
  { day: "Dim 29", time: "24:00", name: "Tronada de fi de festa", place: "Nou Parc Central", type: "Final" },
]

const typeColors: Record<string, string> = {
  Cercavila: "bg-amber-100 text-amber-800",
  Institucional: "bg-red-100 text-red-800",
  "Nit Boja": "bg-indigo-100 text-indigo-800",
  Familiar: "bg-green-100 text-green-800",
  Focs: "bg-orange-100 text-orange-800",
  Final: "bg-purple-100 text-purple-800",
}

export function Programme() {
  return (
    <section className="py-24 px-6 bg-muted/40">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">
            Programa destacat
          </p>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              El millor de Les Santes
            </h2>
            <p className="text-muted-foreground text-sm">Del 24 al 29 de juliol · Mataró</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {events.map((ev) => (
            <div
              key={`${ev.day}-${ev.name}`}
              className="bg-card border border-border rounded-2xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      {ev.day}
                    </span>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${typeColors[ev.type] ?? "bg-muted text-muted-foreground"}`}>
                      {ev.type}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground text-sm leading-tight">{ev.name}</h3>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" />
                      {ev.time}
                    </span>
                    <span className="flex items-center gap-1 min-w-0">
                      <MapPin className="size-3 shrink-0" />
                      <span className="truncate">{ev.place}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          I molts més actes cada dia · Descarrega l&apos;app per veure&apos;l tot
        </p>
      </div>
    </section>
  )
}
