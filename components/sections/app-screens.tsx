"use client"

import { useState } from "react"
import Image from "next/image"

type Screen = {
  id: string
  label: string
  title: string
  description: string
  src: string
  accent: string
  dot: string
}

const screens: Screen[] = [
  {
    id: "ara",
    label: "Ara",
    title: "Ara mateix",
    description:
      "Obre l'app i en un instant saps quins actes estan passant en aquest moment. Sense navegar ni buscar.",
    src: "/screenshots/ara.avif",
    accent: "bg-amber-100 text-amber-800 border-amber-200",
    dot: "bg-amber-500",
  },
  {
    id: "agenda",
    label: "Agenda",
    title: "Agenda completa",
    description:
      "Tot el programa, dia a dia i filtrat per categories. Navega per tots els actes i troba el que més t'agradi.",
    src: "/screenshots/agenda.avif",
    accent: "bg-green-100 text-green-800 border-green-200",
    dot: "bg-green-500",
  },
  {
    id: "agenda-favs",
    label: "Favorits",
    title: "Els teus favorits",
    description:
      "Marca els actes que no vols perdre't i consulta la teva agenda personalitzada en qualsevol moment.",
    src: "/screenshots/agenda-favs.avif",
    accent: "bg-pink-100 text-pink-800 border-pink-200",
    dot: "bg-pink-500",
  },
  {
    id: "mapa",
    label: "Mapa",
    title: "Mapa interactiu",
    description:
      "Tots els actes pinats al mapa de Mataró. Veu d'un cop d'ull on és cada cosa i quant trigaràs a arribar-hi.",
    src: "/screenshots/mapa.avif",
    accent: "bg-blue-100 text-blue-800 border-blue-200",
    dot: "bg-blue-500",
  },
  {
    id: "recursos",
    label: "Recursos",
    title: "Arxiu de recursos",
    description:
      "Cartells oficials, postals dels gegans i molt més per descobrir la història de Les Santes des de 1892.",
    src: "/screenshots/recursos.avif",
    accent: "bg-orange-100 text-orange-800 border-orange-200",
    dot: "bg-orange-500",
  },
  {
    id: "cartells",
    label: "Cartells",
    title: "Cartells històrics",
    description:
      "Tots els cartells oficials des de fa més d'un segle. Un arxiu visual únic de la història de la festa.",
    src: "/screenshots/cartells.avif",
    accent: "bg-rose-100 text-rose-800 border-rose-200",
    dot: "bg-rose-500",
  },
  {
    id: "postals",
    label: "Postals",
    title: "Postals de les Santes",
    description:
      "Totes les postals d'altres gegans de Les Santes digitalitzades.",
    src: "/screenshots/postals.avif",
    accent: "bg-purple-100 text-purple-800 border-purple-200",
    dot: "bg-purple-500",
  },
]

export function AppScreens() {
  const [activeIdx, setActiveIdx] = useState(0)
  const current = screens[activeIdx]

  return (
    <section className="py-24 lg:py-36 px-6 bg-linear-to-b from-background to-muted overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-14 text-center lg:text-left">

          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            La festa,
            <br />
            a la teva mà
          </h2>
        </div>

        <div className="grid lg:grid-cols-[auto_1fr] gap-12 items-center">
          {/* Single phone */}
          <div className="flex justify-center order-2 lg:order-1">
            <div className="relative w-64 bg-background aspect-135/300
            rounded-3xl overflow-hidden border-2 border-foreground shadow-2xl shadow-foreground/20">
              <div className="absolute top-1 left-1/2 -translate-x-1/2 h-2 w-8 rounded-full bg-foreground z-10" />

              {screens.map((s, i) => (
                <Image
                  key={s.id}
                  src={s.src}
                  alt={`App Les Santes - ${s.title}`}
                  fill
                  className={`object-contain object-top transition-opacity duration-400 ${i === activeIdx ? "opacity-100" : "opacity-0"}`}
                  sizes="224px"
                  priority={i === 0}
                />
              ))}
            </div>
          </div>

          {/* Info panel */}
          <div className="order-1 lg:order-2 flex flex-col gap-6">
            {/* Top block: badge + title + description - min-h on <p> prevents layout shift */}
            <div className="space-y-4">
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${current.accent}`}>
                {current.label}
              </div>
              <h3 className="text-3xl font-bold tracking-tight">{current.title}</h3>
              <p className="min-h-28 text-muted-foreground text-lg leading-relaxed">{current.description}</p>
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-2 pt-2 flex-wrap">
              {screens.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setActiveIdx(i)}
                  aria-label={s.label}
                  className={`relative w-10 aspect-135/300 rounded-md overflow-hidden border-2 transition-all duration-200 ${i === activeIdx ? "border-foreground scale-110 shadow-md" : "border-border opacity-50 hover:opacity-80"}`}
                >
                  <div className="absolute top-px left-1/2 -translate-x-1/2 h-0.75 w-2 rounded-full bg-foreground/80 z-10" />
                  <Image src={s.src} alt={s.label} fill className="object-cover object-top" sizes="40px" />
                </button>
              ))}
            </div>

            {/* Arrow nav */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setActiveIdx((activeIdx - 1 + screens.length) % screens.length)}
                className="size-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                aria-label="Anterior"
              >
                ←
              </button>
              <button
                onClick={() => setActiveIdx((activeIdx + 1) % screens.length)}
                className="size-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                aria-label="Següent"
              >
                →
              </button>
              <span className="self-center text-sm text-muted-foreground tabular-nums">
                {activeIdx + 1} / {screens.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
