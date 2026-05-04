import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Política de Privacitat · Les Santes",
  description: "Política de privacitat de l'app Les Santes de Mataró.",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image src="/icon.png" alt="Les Santes" width={28} height={28} className="rounded-lg" />
            <span className="font-semibold text-sm">Les Santes</span>
          </Link>
          <span className="text-muted-foreground text-sm">/</span>
          <span className="text-sm text-muted-foreground">Privacitat</span>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16 space-y-10">
        <header>
          <h1 className="text-4xl font-bold tracking-tight mb-3">Política de Privacitat</h1>
          <p className="text-muted-foreground">Darrera actualització: maig de 2026</p>
        </header>

        <div className="prose prose-neutral max-w-none space-y-8 text-foreground">
          <Section title="1. Qui som">
            <p>
              <strong>Les Santes</strong> és una aplicació mòbil independent creada per{" "}
              <strong>Pol Gubau Amores</strong> per facilitar la consulta del programa de la
              Festa Major de Mataró. No estem afiliats a l&apos;Ajuntament de Mataró ni a cap
              organisme oficial.
            </p>
            <p>Contacte: <a href="mailto:lessantes@polgubau.com" className="text-primary hover:underline">lessantes@polgubau.com</a></p>
          </Section>

          <Section title="2. Dades que recopilem">
            <p><strong>No recopilem cap dada personal.</strong></p>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>No requerim registre ni compte d&apos;usuari.</li>
              <li>No emmagatzemem noms, correus ni dades de contacte.</li>
              <li>No fem servir analítica de tercers ni publicitat.</li>
              <li>Les preferències (favorits) es guarden únicament al teu dispositiu.</li>
            </ul>
          </Section>

          <Section title="3. Permisos de l'app">
            <p>L&apos;app pot demanar els permisos següents:</p>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li><strong>Localització (opcional):</strong> Per mostrar la teva posició al mapa. Mai s&apos;envia als nostres servidors.</li>
              <li><strong>Internet:</strong> Per carregar el programa actualitzat i les imatges del mapa.</li>
            </ul>
          </Section>

          <Section title="4. Serveis de tercers">
            <p>L&apos;app utilitza els serveis següents, cadascun amb la seva pròpia política de privacitat:</p>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li><strong>Supabase:</strong> Base de dades del programa d&apos;actes. Dades anonimitzades. <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Llegir política</a></li>
              <li><strong>MapLibre / OpenStreetMap:</strong> Mapa base. <a href="https://www.openstreetmap.org/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Llegir política</a></li>
            </ul>
          </Section>

          <Section title="5. Retenció de dades">
            <p>
              Com que no recopilem dades personals, no hi ha res a retenir ni a eliminar.
              Les dades locals (favorits) poden esborrar-se desinstal·lant l&apos;aplicació.
            </p>
          </Section>

          <Section title="6. Menors d'edat">
            <p>
              L&apos;app és apta per a tots els públics. No recollim dades de menors ni de cap altra persona.
            </p>
          </Section>

          <Section title="7. Canvis en aquesta política">
            <p>
              Si actualitzem aquesta política, publicarem la nova versió en aquesta mateixa pàgina
              amb la data de revisió actualitzada. T&apos;aconsellem revisar-la periòdicament.
            </p>
          </Section>

          <Section title="8. Contacte">
            <p>
              Per a qualsevol dubte sobre privacitat, posa&apos;t en contacte amb nosaltres:{" "}
              <a href="mailto:lessantes@polgubau.com" className="text-primary hover:underline">
                lessantes@polgubau.com
              </a>
            </p>
          </Section>
        </div>
      </main>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="space-y-3 text-muted-foreground leading-relaxed">{children}</div>
    </section>
  )
}
