import { FAQS } from "@/lib/constants"

/**
 * Public FAQ section.
 *
 * The same data backs the `FAQPage` JSON-LD in `app/layout.tsx`, so what
 * Google / AI search engines extract here is identical to what users read.
 * Plain semantic markup (h2 / h3 / p) maximises answer extractability.
 */
export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative w-full px-6 py-24 md:py-32"
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

        <ol className="divide-y divide-border/60 border-y border-border/60">
          {FAQS.map((item, index) => (
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
      </div>
    </section>
  )
}
