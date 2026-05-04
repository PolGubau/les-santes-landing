import Image from "next/image"
import { ClockIcon, MapPinIcon, StarIcon, FireIcon, WavesIcon, CrownIcon, SparkleIcon, BuildingsIcon } from "@phosphor-icons/react/dist/ssr"
import { Icon } from "@/src/shared/types/common"

type Highlight = {
  title: string
  type: string
  icon: Icon
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
    title: "Nit Boja",
    type: "Foc",
    icon: FireIcon,
    day: "Dis 25",
    time: "23:30",
    place: "La Riera i carrers del centre",
    description: "Dimonis, dracs i bestiari surten a cremar la nit de Mataró. L'espectacle de foc més esperat de l'any: música, espurnes i adrenalina.",
    image: "https://uploads.lessantes.cat/uploads/medium/bbef407c8987d205751b00506f5b8d24.jpeg",
    featured: true,
    badge: "Imprescindible",
  },
  {
    title: "Havaneres al port",
    type: "Música",
    icon: WavesIcon,
    day: "Div 25",
    time: "22:00",
    place: "Port de Mataró",
    description: "Cremat, brisa marina i les veus d'Havaneres Sirena entonen les cançons de marineria que han acompanyat Mataró des del segle XIX.",
    image: "https://cdn.appculturamataro.cat/medias/agenda/2025/c_crop,x_0,y_0,w_2146,h_1191%7Cc_fit,w_768,h_426%7Cp_1920/c22c63569648f5d08561ef4ecfc55e8f.jpeg",
  },
  {
    title: "Gegantada",
    type: "Cercavila",
    icon: CrownIcon,
    day: "Dij 24",
    time: "18:00",
    place: "Des de la ronda O'Donnell",
    description: "Els gegants de Mataró encapçalen la cercavila inaugural amb música de gralles i tabals que anuncia que la festa ja ha començat.",
    image: "https://uploads.lessantes.cat/uploads/big/4046d84b2488e6f22f2215aabda59ec6.jpeg?p=992",
  },
  {
    title: "Castell de focs",
    type: "Focs artificials",
    icon: SparkleIcon,
    day: "Diu 27",
    time: "23:00",
    place: "Platja del Varador",
    description: "El cel de Mataró s'il·lumina sobre el mar en un dels castells de focs artificials més bonics de la costa catalana.",
    image: "https://cdn.appculturamataro.cat/medias/agenda/2023/c_crop,x_29,y_69,w_768,h_426%7Cc_fit,w_768,h_426%7Cp_1920/b839be03d4c49c226a3dfac1073c4672.jpeg",
  },
  {
    title: "Castellers",
    type: "Castellers",
    icon: BuildingsIcon,
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
          className="object-cover transition-transform duration-500"
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
              <StarIcon weight="fill" className="size-2.5" />
              {h.badge}
            </span>
          )}
          <span className="flex items-center gap-1 text-[10px] font-medium bg-white/15 text-white/90 border border-white/20 px-2.5 py-1 rounded-full backdrop-blur-sm">
            <h.icon weight="fill" className="size-3 shrink-0" />
            {h.type}
          </span>
        </div>

        <h3 className="font-bold text-white leading-tight text-xl">{h.title}</h3>

        {h.featured && (
          <p className="text-white/75 text-sm leading-relaxed line-clamp-2">{h.description}</p>
        )}

        <div className="flex items-center gap-3 text-xs text-white/60 pt-1">
          <span className="flex items-center gap-1">
            <ClockIcon className="size-3" weight="bold" />
            {h.day} · {h.time}
          </span>
          <span className="flex items-center gap-1 min-w-0">
            <MapPinIcon className="size-3 shrink-0" weight="bold" />
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
        <div className="scroll-reveal mb-12">
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
        <div className="scroll-reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-[180px] sm:auto-rows-[220px]">
          {/* Featured hero - spans 2 rows on mobile, 2 cols + 2 rows on sm+ */}
          <HighlightCard h={featured} className="row-span-2 sm:col-span-2 sm:row-span-2" />

          {/* Rest: 4 cards filling the right column + bottom row */}
          {rest.map((h) => (
            <HighlightCard key={h.title} h={h} />
          ))}
        </div>



        <p className="mt-6 text-center text-sm text-muted-foreground">
          I molts més actes cada dia · Descarrega l&apos;app per veure&apos;l tot
        </p>
      </div>
    </section>
  )
}

