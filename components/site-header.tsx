"use client"

import { useState } from "react"
import { Logo } from "@/components/logo"

const NAV_LINKS = [
  { href: "/about", label: "Sobre el projecte" },
  { href: "/privacy", label: "Privacitat" },
  { href: "/support", label: "Suport" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <Logo asLink size={28} />

          {/* Desktop nav */}
          <nav aria-label="Navegació principal" className="hidden sm:flex items-center gap-4">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/about#collabora"
              className="text-sm bg-foreground text-background px-3 py-1.5 rounded-lg hover:opacity-80 transition-opacity"
            >
              Contacte
            </a>
          </nav>

          {/* Mobile: CTA + hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href="/about#collabora"
              className="text-sm bg-foreground text-background px-3 py-1.5 rounded-lg hover:opacity-80 transition-opacity"
            >
              Contacte
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Tanca el menú" : "Obre el menú"}
              aria-expanded={open}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {/* CSS animated hamburger → X */}
              <span className="flex flex-col justify-center gap-1.25 w-5 h-5">
                <span className={`block h-0.5 bg-foreground rounded-full transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-1.75" : ""}`} />
                <span className={`block h-0.5 bg-foreground rounded-full transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
                <span className={`block h-0.5 bg-foreground rounded-full transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-1.75" : ""}`} />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <nav
            aria-label="Menú mòbil"
            className="animate-menu-in sm:hidden border-t border-border bg-background/95 backdrop-blur-md"
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center px-6 py-4 text-sm font-medium text-foreground hover:bg-muted active:bg-muted/80 transition-colors border-b border-border/50 last:border-0"
              >
                {l.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 sm:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}
