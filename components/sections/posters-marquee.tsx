import Image from "next/image"

const row1 = ["1892", "1920", "1950", "1960", "1970", "1980", "1990", "2000"]
const row2 = ["2010", "2015", "2018", "2020", "2022", "2023", "2024", "2025"]

function PosterStrip({ years, reverse }: { years: string[]; reverse?: boolean }) {
  const doubled = [...years, ...years]
  return (
    <div className="overflow-hidden w-full">
      <div className={`flex gap-4 w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {doubled.map((year, i) => (
          <div
            key={`${year}-${i}`}
            className="relative shrink-0 w-36 h-52 rounded-2xl overflow-hidden border border-border shadow-sm group"
          >
            <Image
              src={`/posters/${year}.avif`}
              alt={`Cartell Les Santes ${year}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="144px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span className="absolute bottom-2 left-3 text-white text-xs font-bold">{year}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function PostersMarquee() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 mb-10">
        <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">
          Història gràfica
        </p>
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Cartells des de 1892
          </h2>
          <p className="text-muted-foreground text-base max-w-xs leading-relaxed">
            Més de 130 anys de cultura i tradició a Mataró, reflectits en cada cartell.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <PosterStrip years={row1} />
        <PosterStrip years={row2} reverse />
      </div>
    </section>
  )
}
