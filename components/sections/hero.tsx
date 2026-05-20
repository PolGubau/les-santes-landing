import { APP_CITY, APP_DATES, APP_NAME, APP_YEAR } from "@/lib/constants"
import { ArrowDownIcon, ArrowRightIcon, FlaskIcon, LightningIcon, MapPinIcon } from "@phosphor-icons/react/dist/ssr"
import Image from "next/image"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col items-center center px-6 pt-[20vh] pb-16">
      {/* Background - blurred poster collage + ambient blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {/* Scattered blurred posters */}
        {[
          { year: "2024", pos: "top-6 left-2 rotate-[-7deg] " },
          { year: "2020", pos: "top-20 right-4 rotate-[5deg]" },
          { year: "2015", pos: "bottom-10 left-6 rotate-[9deg]" },
          { year: "2026", pos: "bottom-12 right-8 rotate-[-6deg] " },
          { year: "2018", pos: "top-1/2 left-0 rotate-[-11deg] -translate-y-1/2" },
          { year: "2022", pos: "top-1/2 right-0 rotate-[8deg] -translate-y-1/2" },
          { year: "2023", pos: "top-2 left-1/3 rotate-[3deg]" },
          { year: "2025", pos: "bottom-2 right-1/3 rotate-[-5deg]" },
        ].map(({ year, pos }) => (
          <div key={year} className={`absolute w-20 sm:w-28 opacity-15 blur-[2px] ${pos}`}>
            <Image
              src={`/posters/${year}.avif`}
              alt=""
              width={112}
              height={160}
              className="rounded-lg object-cover shadow-lg"
            />
          </div>
        ))}
        {/* Ambient colour blobs on top */}
        <div className="absolute top-0 left-1/4 size-96 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 size-80 bg-accent/15 rounded-full blur-3xl" />
      </div>

      <div id="main-content" className="max-w-4xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div className="space-y-6 animate-fade-up text-center lg:text-left">

          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3 py-1 text-[11px] font-semibold text-primary uppercase tracking-wider">
              Festa Major de {APP_CITY} {APP_YEAR}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-muted/60 px-3 py-1 text-[11px] font-medium text-muted-foreground">
              {APP_DATES}
            </span>

          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
            Les Santes
            <br />
            <span className="text-primary">a la teva</span>
            <br />
            butxaca
          </h1>

          <p className="text-muted-foreground text-lg text-balance leading-relaxed max-w-md mx-auto lg:mx-0">
            Tota l&apos;agenda, el mapa interactiu i els actes en temps real de{" "}
            <strong className="text-foreground">{APP_NAME} de {APP_CITY}</strong>. Decideix en
            segons on anar.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <button
              disabled
              aria-disabled="true"
              aria-label="App Store - Aviat disponible"
              className="flex items-center justify-center gap-2 bg-foreground text-background px-6 py-3.5 rounded-xl font-medium text-sm opacity-50 cursor-not-allowed"
            >
              <svg aria-hidden="true" focusable="false" className="size-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11" />
              </svg>
              App Store · Aviat
            </button>
            <button
              disabled
              aria-disabled="true"
              aria-label="Google Play - Aviat disponible"
              className="flex items-center justify-center gap-2 border border-border bg-card px-6 py-3.5 rounded-xl font-medium text-sm opacity-50 cursor-not-allowed"
            >
       
              <svg  aria-hidden="true" focusable="false" className="size-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"
viewBox="0 0 466 511.98">
 <g id="Layer_x0020_1">
  <path fill="#EA4335" fill-rule="nonzero" d="M199.9 237.8l-198.5 232.37c7.22,24.57 30.16,41.81 55.8,41.81 11.16,0 20.93,-2.79 29.3,-8.37l0 0 244.16 -139.46 -130.76 -126.35z"/>
  <path fill="#FBBC04" fill-rule="nonzero" d="M433.91 205.1l0 0 -104.65 -60 -111.61 110.22 113.01 108.83 104.64 -58.6c18.14,-9.77 30.7,-29.3 30.7,-50.23 -1.4,-20.93 -13.95,-40.46 -32.09,-50.22z"/>
  <path fill="#34A853" fill-rule="nonzero" d="M199.42 273.45l129.85 -128.35 -241.37 -136.73c-8.37,-5.58 -19.54,-8.37 -30.7,-8.37 -26.5,0 -50.22,18.14 -55.8,41.86 0,0 0,0 0,0l198.02 231.59z"/>
  <path fill="#4285F4" fill-rule="nonzero" d="M1.39 41.86c-1.39,4.18 -1.39,9.77 -1.39,15.34l0 397.64c0,5.57 0,9.76 1.4,15.34l216.27 -214.86 -216.28 -213.46z"/>
 </g>
</svg>

              Google Play · Aviat
            </button>
          </div>

          <p className="text-xs text-muted-foreground">
            Disponible properament · Gratis · Sense publicitat
          </p>

          <Link
            href="/testers"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-amber-600 dark:text-amber-400 hover:underline underline-offset-4"
          >
            <FlaskIcon weight="fill" className="size-3.5 shrink-0" />
            Vols provar-la ja? Uneix-te al test tancat
            <ArrowRightIcon className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Phone mockup - decorative illustration */}
        <div aria-hidden="true" className="flex justify-center animate-fade-up-delay-1">
          <div className="relative animate-float">
            <div className="relative w-64 bg-background aspect-135/300
            rounded-3xl overflow-hidden border-4 border-foreground/80 shadow-2xl shadow-foreground/20">
              <div className="absolute top-1 left-1/2 -translate-x-1/2 h-2 w-8 rounded-full bg-foreground z-10" />
              <Image
                src="/screenshots/ara.avif"
                alt="App Les Santes - pantalla Ara"
                fill
                className="object-cover object-top"
                sizes="256px"
                priority
                fetchPriority="high"
              />
            </div>
            {/* Decorative badges - hidden on mobile to avoid overflow */}
            <div className="hidden sm:block absolute -right-8 top-16 bg-card border border-border rounded-lg px-4 py-2 shadow-lg shadow-foreground/10 animate-float-slow">
              <div className="text-xs font-semibold text-foreground">
                <LightningIcon weight="fill" className="size-3 mr-1 inline" />
                Ara</div>
              <div className="text-[10px] text-muted-foreground">La Crida</div>
            </div>
            <div className="hidden sm:block absolute -left-10 bottom-24 bg-primary text-primary-foreground rounded-xl px-4 py-2 shadow-lg animate-float-slow" style={{ animationDelay: "1s" }}>
              <div className="text-xs font-semibold">
                <MapPinIcon weight="fill" className="size-3 mr-1 inline" />
                Mapa</div>
              <div className="text-[10px] opacity-80">12 actes avui</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint - decorative */}
      <div aria-hidden="true" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
        <ArrowDownIcon className="size-4" />
      </div>
    </section>
  )
}
