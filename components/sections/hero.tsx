import { ArrowDown, Sparkle } from "@phosphor-icons/react/dist/ssr"
import { APP_CITY, APP_NAME, APP_YEAR } from "@/lib/constants"

export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center px-6 pt-12 pb-16">
      {/* Background texture — purely decorative */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-64 h-64 bg-primary/5 rounded-full blur-2xl" />
      </div>

      <div id="main-content" className="max-w-4xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div className="space-y-6 animate-fade-up text-center lg:text-left">
          <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-medium px-3 py-1.5 rounded-full border border-primary/20">
            <Sparkle weight="fill" className="size-3" />
            Festa Major {APP_YEAR} · {APP_CITY}
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
            La Festa Major
            <br />
            <span className="text-primary">a la teva</span>
            <br />
            butxaca
          </h1>

          <p className="text-muted-foreground text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
            Tota l&apos;agenda, el mapa interactiu i els actes en temps real de{" "}
            <strong className="text-foreground">{APP_NAME} de {APP_CITY}</strong>. Decideix en
            segons on anar.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <button
              disabled
              aria-disabled="true"
              aria-label="App Store — Aviat disponible"
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
              aria-label="Google Play — Aviat disponible"
              className="flex items-center justify-center gap-2 border border-border bg-card px-6 py-3.5 rounded-xl font-medium text-sm opacity-50 cursor-not-allowed"
            >
              <svg aria-hidden="true" focusable="false" className="size-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.18 23.76c.3.17.64.22.99.14l12.6-7.27-2.75-2.75zm15.16-10.38L15.37 11 12.1 14.27l3.27 3.27 2.99-1.72c.85-.49.85-1.65-.02-2.14zM1.97 1.48A1.04 1.04 0 0 0 1.5 2.35v19.3c0 .36.18.68.47.87l.11.06 10.82-10.82v-.24zm10.66 11.28-10.8 10.8.11.07c.3.17.64.22.99.14l.11-.07 12.09-6.97z" />
              </svg>
              Google Play · Aviat
            </button>
          </div>

          <p className="text-xs text-muted-foreground">
            Disponible properament · Gratis · Sense publicitat
          </p>
        </div>

        {/* Phone mockup — decorative illustration */}
        <div aria-hidden="true" className="flex justify-center animate-fade-up-delay-1">
          <div className="relative animate-float">
            <div className="w-64 h-[520px] bg-foreground rounded-[3rem] shadow-2xl shadow-foreground/20 flex flex-col overflow-hidden border-4 border-foreground">
              {/* Status bar */}
              <div className="flex items-center justify-between px-6 pt-4 pb-2 shrink-0">
                <span className="text-background text-xs font-medium">9:41</span>
                <div className="flex gap-1 items-center">
                  <div className="w-4 h-1.5 bg-background/70 rounded-sm" />
                  <div className="w-1 h-1.5 bg-background/50 rounded-sm" />
                </div>
              </div>
              {/* App content mockup */}
              <div className="flex-1 bg-[oklch(0.985_0.006_85)] flex flex-col">
                <div className="px-4 pt-4 pb-2">
                  <div className="text-xs text-muted-foreground mb-1">Ara mateix</div>
                  <div className="font-bold text-foreground text-sm">{APP_NAME} {APP_YEAR}</div>
                </div>
                <div className="px-4 space-y-2 flex-1">
                  {[
                    { name: "La Crida", time: "20:00", place: "Ajuntament", active: true },
                    { name: "Diada Castellera", time: "18:00", place: "Pl. Santa Anna", active: false },
                    { name: "Nit Boja", time: "23:30", place: "La Riera", active: false },
                    { name: "Havaneres", time: "22:00", place: "Pg. Callao", active: false },
                  ].map((ev) => (
                    <div
                      key={ev.name}
                      className={`rounded-xl p-3 flex items-start gap-2 ${ev.active ? "bg-primary/15 border border-primary/30" : "bg-card border border-border"}`}
                    >
                      <div className={`size-2 rounded-full mt-1 shrink-0 ${ev.active ? "bg-primary" : "bg-muted-foreground/40"}`} />
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-foreground truncate">{ev.name}</div>
                        <div className="text-[10px] text-muted-foreground">{ev.time} · {ev.place}</div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Tab bar */}
                <div className="border-t border-border bg-card px-4 py-3 flex justify-around">
                  {["Ara", "Agenda", "Mapa", "Més"].map((tab, i) => (
                    <div key={tab} className={`text-[10px] font-medium ${i === 0 ? "text-primary" : "text-muted-foreground"}`}>{tab}</div>
                  ))}
                </div>
              </div>
            </div>
            {/* Decorative badge */}
            <div className="absolute -right-8 top-16 bg-card border border-border rounded-2xl px-3 py-2 shadow-lg shadow-foreground/10 animate-float-slow">
              <div className="text-xs font-semibold text-foreground">⚡ Ara</div>
              <div className="text-[10px] text-muted-foreground">La Crida</div>
            </div>
            <div className="absolute -left-10 bottom-24 bg-primary text-primary-foreground rounded-2xl px-3 py-2 shadow-lg animate-float-slow" style={{ animationDelay: "1s" }}>
              <div className="text-xs font-semibold">🗺 Mapa</div>
              <div className="text-[10px] opacity-80">12 actes avui</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint — decorative */}
      <div aria-hidden="true" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
        <ArrowDown className="size-4" />
      </div>
    </section>
  )
}
