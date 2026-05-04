"use client"

import { useState } from "react"
import Image from "next/image"

function PhoneScreen({ src, alt, emoji }: { src: string; alt: string; emoji: string }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className="relative w-full h-full">
      {failed ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted gap-2">
          <span className="text-5xl">{emoji}</span>
          <span className="text-[10px] text-muted-foreground font-medium tracking-wide uppercase">
            Screenshot aviat
          </span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
          sizes="256px"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  )
}

const screens = [
  {
    id: "ara",
    tab: "⚡ Ara",
    title: "Ara mateix",
    description:
      "Obre l'app i en 2 segons saps quins actes estan passant en aquest moment. Sense navegar, sense buscar: la festa al moment.",
    src: "/screenshots/ara.png",
    accent: "bg-amber-100 text-amber-800 border-amber-200",
    dot: "bg-amber-500",
  },
  {
    id: "mapa",
    tab: "🗺 Mapa",
    title: "Mapa interactiu",
    description:
      "Tots els actes pinats al mapa de Mataró. Veu d'un cop d'ull on és cada cosa i quant trigaràs a arribar-hi.",
    src: "/screenshots/mapa.png",
    accent: "bg-blue-100 text-blue-800 border-blue-200",
    dot: "bg-blue-500",
  },
  {
    id: "agenda",
    tab: "📅 Agenda",
    title: "Agenda completa",
    description:
      "Tot el programa, dia a dia i filtrat per categories. Marca els teus favorits per no perdre't res.",
    src: "/screenshots/agenda.png",
    accent: "bg-green-100 text-green-800 border-green-200",
    dot: "bg-green-500",
  },
  {
    id: "recursos",
    tab: "🖼 Recursos",
    title: "Arxiu de recursos",
    description:
      "Cartells oficials des de 1892, postals de les germanes d'arreu de Catalunya i molt més per descobrir la història de Les Santes.",
    src: "/screenshots/recursos.png",
    accent: "bg-rose-100 text-rose-800 border-rose-200",
    dot: "bg-rose-500",
  },
]

export function AppScreens() {
  const [active, setActive] = useState(screens[0].id)
  const current = screens.find((s) => s.id === active) ?? screens[0]

  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">
            Veu l&apos;app
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Quatre pantalles,
            <br />
            tota la festa
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 flex-wrap mb-10">
          {screens.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${active === s.id
                ? s.accent
                : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
                }`}
            >
              {s.tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Phone frame */}
          <div className="flex justify-center order-2 lg:order-1">
            <div className="relative w-64 rounded-[3rem] overflow-hidden border-4 border-foreground shadow-2xl shadow-foreground/15 bg-foreground aspect-9/19.5">
              <PhoneScreen
                key={current.id}
                src={current.src}
                alt={`Pantalla ${current.title}`}
                emoji={current.tab.split(" ")[0]}
              />
            </div>
          </div>

          {/* Description */}
          <div className="order-1 lg:order-2 space-y-5">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium ${current.accent}`}>
              <span className={`size-2 rounded-full ${current.dot}`} />
              {current.tab}
            </div>
            <h3 className="text-3xl font-bold tracking-tight">{current.title}</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">{current.description}</p>

            {/* Mini nav dots */}
            <div className="flex gap-2 pt-2">
              {screens.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${active === s.id ? `w-6 ${s.dot}` : "w-1.5 bg-border"
                    }`}
                  aria-label={s.title}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
