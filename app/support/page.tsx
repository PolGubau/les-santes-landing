import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Suport · Les Santes",
  description: "Centre de suport i ajuda de l'app Les Santes.",
}

const faqs = [
  {
    q: "L'app és gratuïta?",
    a: "Sí, completament gratuïta. Sense publicitat i sense compres dins l'app.",
  },
  {
    q: "En quines plataformes estarà disponible?",
    a: "iOS (iPhone i iPad) i Android. Estarà disponible a l'App Store i Google Play abans de Les Santes 2026.",
  },
  {
    q: "El programa s'actualitza en temps real?",
    a: "El programa base es carrega des dels nostres servidors i s'actualitza quan publiquem canvis. La posició estimada de les cercaviles és en temps real basada en la ruta i l'hora.",
  },
  {
    q: "Puc usar l'app sense internet?",
    a: "Parcialment. Els actes guardats i els favorits estan disponibles offline. El mapa i les actualitzacions del programa necessiten connexió.",
  },
  {
    q: "Recopileu les meves dades?",
    a: "No. L'app no requereix registre i no emmagatzemem cap dada personal. Els favorits es guarden al teu dispositiu.",
  },
  {
    q: "El programa és oficial de l'Ajuntament de Mataró?",
    a: "El programa prové de fonts públiques de l'Ajuntament, però l'app és independent i no té afiliació oficial.",
  },
]

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image src="/icon.png" alt="Les Santes" width={28} height={28} className="rounded-lg" />
            <span className="font-semibold text-sm">Les Santes</span>
          </Link>
          <span className="text-muted-foreground text-sm">/</span>
          <span className="text-sm text-muted-foreground">Suport</span>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16 space-y-14">
        <header>
          <h1 className="text-4xl font-bold tracking-tight mb-3">Centre de Suport</h1>
          <p className="text-muted-foreground text-lg">
            Estem aquí per ajudar-te. Si no trobes el que busques, escriu-nos.
          </p>
        </header>

        {/* Contact card */}
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div>
            <h2 className="font-semibold mb-1">Contacte directe</h2>
            <p className="text-muted-foreground text-sm">Responem en menys de 48 hores.</p>
          </div>
          <a
            href="mailto:lessantes@polgubau.com"
            className="shrink-0 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Escriu-nos
          </a>
        </div>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold mb-8">Preguntes freqüents</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="border border-border rounded-xl p-5 space-y-2">
                <h3 className="font-semibold text-foreground">{faq.q}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bug report */}
        <section className="bg-muted/50 rounded-2xl p-6 space-y-3">
          <h2 className="text-xl font-semibold">Trobes un error?</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Si l&apos;app es comporta de manera inesperada o trobes informació incorrecta al programa,
            envia&apos;ns un correu indicant:
          </p>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>El dispositiu i la versió del sistema operatiu</li>
            <li>La versió de l&apos;app</li>
            <li>Una descripció del problema</li>
            <li>Si és possible, una captura de pantalla</li>
          </ul>
          <a
            href="mailto:lessantes@polgubau.com?subject=Bug report - Les Santes app"
            className="inline-block mt-2 text-primary text-sm font-medium hover:underline"
          >
            Reportar un error →
          </a>
        </section>

        <footer className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>
            Les Santes · Fet per{" "}
            <a href="https://polgubau.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:underline">
              Pol Gubau Amores
            </a>{" "}
            ·{" "}
            <Link href="/privacy" className="hover:underline">
              Privacitat
            </Link>
          </p>
        </footer>
      </main>
    </div>
  )
}
