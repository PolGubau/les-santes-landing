import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { APP_NAME, APP_YEAR } from "@/lib/constants"

export const metadata: Metadata = {
  title: `Pàgina no trobada · ${APP_NAME}`,
  robots: { index: false, follow: false },
}

const POSTERS = ["2024", "2023", "2022", "2019", "2015", "2010", "2005", "1998", "1985", "1970"]

export default function NotFound() {
  return (
    <main className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center overflow-hidden px-6 py-24">

      {/* Blurred poster collage — purely decorative */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {/* Ambient blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/6 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

        {/* Scattered, blurred posters */}
        {POSTERS.map((year, i) => {
          const positions = [
            "top-8 left-4 rotate-[-8deg]",
            "top-24 right-6 rotate-[6deg]",
            "bottom-12 left-8 rotate-[10deg]",
            "bottom-8 right-4 rotate-[-5deg]",
            "top-1/2 left-2 rotate-[-12deg] -translate-y-1/2",
            "top-1/2 right-2 rotate-[9deg] -translate-y-1/2",
            "top-4 left-1/3 rotate-[4deg]",
            "bottom-4 right-1/3 rotate-[-7deg]",
            "top-16 left-1/2 rotate-[3deg]",
            "bottom-16 left-1/4 rotate-[-4deg]",
          ]
          return (
            <div
              key={year}
              className={`absolute w-20 sm:w-28 opacity-20 blur-[2px] ${positions[i] ?? ""}`}
            >
              <Image
                src={`/posters/${year}.avif`}
                alt=""
                width={112}
                height={160}
                className="rounded-lg object-cover shadow-lg"
              />
            </div>
          )
        })}
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center text-center gap-8 max-w-md">

        {/* 404 big number */}
        <div className="relative select-none">
          <span
            aria-hidden="true"
            className="text-[9rem] sm:text-[12rem] font-black tracking-tighter leading-none text-foreground/5"
          >
            404
          </span>
          {/* Centered icon over the number */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-background border border-border rounded-2xl shadow-xl px-5 py-3 flex items-center gap-3">
              <Image src="/icon.png" alt={APP_NAME} width={36} height={36} className="rounded-xl" />
              <div className="text-left">
                <p className="font-semibold text-sm leading-tight">{APP_NAME}</p>
                <p className="text-xs text-muted-foreground">{APP_YEAR}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            T&apos;has perdut a la festa
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Aquesta pàgina no existeix. Potser és com quan busques la cercavila
            i ja ha passat pel carrer del costat.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <Link
            href="/"
            className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity text-center"
          >
            Torna a l&apos;inici
          </Link>
          <Link
            href="/support"
            className="border border-border bg-card px-6 py-3 rounded-xl font-medium text-sm hover:border-foreground/30 transition-colors text-center"
          >
            Centre de suport
          </Link>
        </div>

        {/* Subtle hint */}
        <p className="text-xs text-muted-foreground/60">
          Error 404 · Pàgina no trobada
        </p>
      </div>
    </main>
  )
}
