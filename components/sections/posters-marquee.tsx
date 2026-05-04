import Image from "next/image"
import { ImageSquare, Envelope, MusicNote, GameController, Lock } from "@phosphor-icons/react/dist/ssr"

const ALL_POSTERS = [
  "1892", "1920", "1934", "1950", "1960", "1970", "1980", "1985", "1990", "2000",
  "2010", "2015", "2018", "2020", "2022", "2023", "2024", "2025", "2026",
]
const row1 = ALL_POSTERS.slice(0, 10)
const row2 = ALL_POSTERS.slice(9).reverse() // reverse for visual variety

const resources = [
  {
    icon: ImageSquare,
    label: "Cartells",
    count: "100+",
    detail: "Des de 1892",
    available: true,
    color: "bg-amber-100 text-amber-800 border-amber-200",
  },
  {
    icon: Envelope,
    label: "Postals",
    count: "41",
    detail: "1985 – 2025",
    available: true,
    color: "bg-rose-100 text-rose-800 border-rose-200",
  },
  {
    icon: MusicNote,
    label: "Cançons",
    count: null,
    detail: "Aviat",
    available: false,
    color: "bg-muted text-muted-foreground border-border",
  },
  {
    icon: GameController,
    label: "Jocs",
    count: null,
    detail: "Aviat",
    available: false,
    color: "bg-muted text-muted-foreground border-border",
  },
]

function PosterStrip({ years, reverse }: { years: string[]; reverse?: boolean }) {
  // Triple the array — the seam is 1 full set away, never visible during animation
  const tripled = [...years, ...years, ...years]
  return (
    <div
      className="overflow-hidden w-full"
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <div className={`flex gap-4 w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {tripled.map((year, i) => (
          <div
            key={`${year}-${i}`}
            className="relative shrink-0 w-36 h-52 rounded-2xl overflow-hidden border border-border/60 shadow-md group"
          >
            <Image
              src={`/posters/${year}.avif`}
              alt={`Cartell Les Santes ${year}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="144px"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />
            <span className="absolute bottom-2.5 left-3 text-white text-xs font-bold tracking-wide drop-shadow">{year}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function PostersMarquee() {
  return (
    <section className="py-24 overflow-hidden">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">
          Dins de l&apos;app
        </p>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Més que un programa
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-lg">
              L&apos;app inclou un arxiu viu de recursos sobre Les Santes: cartells des de 1892,
              postals de les germanes d&apos;arreu de Catalunya, i en un futur cançons, jocs
              tradicionals i molt més.
            </p>
          </div>

          {/* Resource chips */}
          <div className="grid grid-cols-2 gap-2 lg:shrink-0">
            {resources.map((r) => (
              <div
                key={r.label}
                className={`flex items-center gap-2.5 border rounded-xl px-3.5 py-2.5 ${r.color} ${!r.available ? "opacity-60" : ""}`}
              >
                <r.icon weight="fill" className="size-4 shrink-0" />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold">{r.label}</span>
                    {!r.available && <Lock className="size-2.5 opacity-60" />}
                  </div>
                  <div className="text-[10px] opacity-70 leading-none mt-0.5">
                    {r.count ? <><strong>{r.count}</strong> · {r.detail}</> : r.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="space-y-3">
        <PosterStrip years={row1} />
        <PosterStrip years={row2} reverse />
      </div>

      {/* Caption */}
      <p className="text-center text-xs text-muted-foreground mt-6 px-6">
        Una mostra dels cartells oficials de Les Santes · Consulta&apos;ls tots a l&apos;app
      </p>
    </section>
  )
}
