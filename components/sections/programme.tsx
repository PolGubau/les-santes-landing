import Image from "next/image"
import { Clock, MapPin, Star } from "@phosphor-icons/react/dist/ssr"

type Highlight = {
  title: string
  type: string
  emoji: string
  day: string
  time: string
  place: string
  description: string
  image: string
  featured?: boolean
  badge?: string
}

const highlights: Highlight[] = [
  {
    title: "Correfoc",
    type: "Foc",
    emoji: "🔥",
    day: "Dis 26",
    time: "22:30",
    place: "Rambla i carrers del centre",
    description: "Dimonis, dracs i bestiari ignivom surten a cremar la nit de Mataró. L'espectacle de foc més esperat de l'any: música, espurnes i adrenalina en estat pur.",
    image: "https://uploads.lessantes.cat/uploads/medium/bbef407c8987d205751b00506f5b8d24.jpeg",
    featured: true,
    badge: "⭐ Imprescindible",
  },
  {
    title: "Havaneres al port",
    type: "Música",
    emoji: "⛵",
    day: "Div 25",
    time: "22:00",
    place: "Port de Mataró",
    description: "Cremat, brisa marina i les veus d'Havaneres Sirena entonen les cançons de marineria que han acompanyat Mataró des del segle XIX.",
    image: "https://uploads.lessantes.cat/uploads/big/d51cb1d7276befa35d6efe62c17b9d2a.jpeg?p=992",
  },
  {
    title: "Gegantada",
    type: "Cercavila",
    emoji: "👑",
    day: "Dij 24",
    time: "18:00",
    place: "Des de la ronda O'Donnell",
    description: "Els gegants de Mataró encapçalen la cercavila inaugural amb música de gralles i tabals que anuncia que la festa ja ha començat.",
    image: "https://uploads.lessantes.cat/uploads/big/4046d84b2488e6f22f2215aabda59ec6.jpeg?p=992",
  },
  {
    title: "Castell de focs",
    type: "Focs artificials",
    emoji: "✨",
    day: "Diu 27",
    time: "23:00",
    place: "Platja del Varador",
    description: "El cel de Mataró s'il·lumina sobre el mar en un dels castells de focs artificials més bonics de la costa catalana.",
    image: "https://uploads.lessantes.cat/uploads/medium/d4482e719acddb6243435e2fc6743087.jpeg",
  },
  {
    title: "Castellers",
    type: "Castellers",
    emoji: "🏛",
    day: "Dis 26",
    time: "12:00",
    place: "Plaça de Santa Maria",
    description: "Les colles castalleres alcen torres humanes davant la basílica en un dels moments més emocionants i representatius de la cultura catalana.",
    image: "https://uploads.lessantes.cat/uploads/medium/56a2f26b3193a14374e05c0654733ffb.jpeg",
  },
]

function HighlightCard({ h, className = "" }: { h: Highlight; className?: string }) {
  return (
    <div className={`group relative overflow-hidden rounded-2xl bg-foreground ${className}`}>
      {/* Photo */}
      <div className="absolute inset-0">
        <Image
          src={h.image}
          alt={h.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative flex flex-col justify-end h-full p-5 gap-2">
        {/* Top badges */}
        <div className="flex items-center gap-2 flex-wrap">
          {h.badge && (
            <span className="flex items-center gap-1 text-[10px] font-bold bg-primary text-white px-2.5 py-1 rounded-full uppercase tracking-wide">
              <Star weight="fill" className="size-2.5" />
              {h.badge.replace("⭐ ", "")}
            </span>
          )}
          <span className="text-[10px] font-medium bg-white/15 text-white/90 border border-white/20 px-2.5 py-1 rounded-full backdrop-blur-sm">
            {h.emoji} {h.type}
          </span>
        </div>

        <h3 className="font-bold text-white leading-tight text-xl">{h.title}</h3>

        {h.featured && (
          <p className="text-white/75 text-sm leading-relaxed line-clamp-2">{h.description}</p>
        )}

        <div className="flex items-center gap-3 text-xs text-white/60 pt-1">
          <span className="flex items-center gap-1">
            <Clock className="size-3" weight="bold" />
            {h.day} · {h.time}
          </span>
          <span className="flex items-center gap-1 min-w-0">
            <MapPin className="size-3 shrink-0" weight="bold" />
            <span className="truncate">{h.place}</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export function Programme() {
  const featured = highlights.find((h) => h.featured)!
  const rest = highlights.filter((h) => !h.featured)

  return (
    <section className="py-24 px-6" aria-labelledby="programme-heading">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">
            Programa destacat
          </p>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h2 id="programme-heading" className="text-4xl sm:text-5xl font-bold tracking-tight">
              El millor de Les Santes
            </h2>
            <p className="text-muted-foreground text-sm">Del 24 al 29 de juliol · Mataró</p>
          </div>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-[220px]">
          {/* Featured hero — spans 2 cols and 2 rows */}
          <HighlightCard h={featured} className="sm:col-span-2 sm:row-span-2" />

          {/* Rest: 4 cards filling the right column + bottom row */}
          {rest.map((h) => (
            <HighlightCard key={h.title} h={h} />
          ))}
        </div>

        {/* Description strip for featured on mobile / desktop tooltip */}
        <div className="mt-6 bg-muted/50 border border-border rounded-2xl px-5 py-4 flex items-start gap-3">
          <span className="text-2xl shrink-0" aria-hidden="true">🔥</span>
          <div>
            <p className="font-semibold text-foreground text-sm mb-0.5">Correfoc — l&apos;acte estrella</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{highlights[0].description}</p>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          I molts més actes cada dia · Descarrega l&apos;app per veure&apos;l tot
        </p>
      </div>
    </section>
  )
}

