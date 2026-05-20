import { FAQS } from "@/lib/constants"

interface FaqItem {
  q: string
  a: string
}

/** Reusable FAQ list — semantic numbered markup for SEO extractability. */
export function FaqList({ items }: { items: readonly FaqItem[] }) {
  return (
    <ol className="divide-y divide-border/60 border-y border-border/60">
      {items.map((item, index) => (
        <li key={item.q} className="py-6">
          <article>
            <h3 className="text-pretty text-lg font-medium leading-snug md:text-xl">
              <span
                aria-hidden="true"
                className="mr-3 text-sm font-mono text-muted-foreground"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              {item.q}
            </h3>
            <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground">
              {item.a}
            </p>
          </article>
        </li>
      ))}
    </ol>
  )
}

/**
 * Public FAQ section — homepage.
 * The same data backs the `FAQPage` JSON-LD in `app/layout.tsx`.
 */
export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative w-full px-6 py-24 md:py-32 scroll-mt-20"
    >
      <div className="mx-auto max-w-3xl">
        <header className="mb-12 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Preguntes freqüents
          </p>
          <h2
            id="faq-heading"
            className="text-balance text-3xl font-semibold tracking-tight md:text-4xl"
          >
            Tot el que vols saber sobre Les Santes
          </h2>
        </header>
        <FaqList items={FAQS} />
      </div>
    </section>
  )
}
