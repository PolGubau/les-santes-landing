import type { Metadata } from "next"
import { PageNav } from "@/components/page-nav"
import { APP_CITY, APP_NAME, AUTHOR_NAME, CONTACT_EMAIL } from "@/lib/constants"
import { SITE_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Política de Privacitat",
  description: `Política de privacitat de l'app ${APP_NAME} de ${APP_CITY}. Com tractem les teves dades i els teus drets.`,
  alternates: { canonical: `${SITE_URL}/privacy` },
  robots: { index: true },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageNav breadcrumb="Privacitat" />

      <main id="main-content" className="max-w-3xl mx-auto px-6 py-6 space-y-14">
        <header>
          <h1 className="text-4xl font-bold tracking-tight mb-3">Política de Privacitat</h1>
          <p className="text-muted-foreground">Darrera actualització: maig de 2026</p>
        </header>

        <div className="prose prose-neutral max-w-none space-y-8 text-foreground">
          <Section title="1. Qui som">
            <p>
              <strong>{APP_NAME}</strong> és una aplicació mòbil independent creada per{" "}
              <strong>{AUTHOR_NAME}</strong> per facilitar la consulta del programa de la
              Festa Major de Mataró. No estem afiliats a l&apos;Ajuntament de Mataró ni a cap
              organisme oficial.
            </p>
            <p>Contacte: <a href={`mailto:${CONTACT_EMAIL.support}`} className="text-primary hover:underline">{CONTACT_EMAIL.support}</a></p>
          </Section>

          <Section title="2. Dades que recopilem">
            <p>
              <strong>No recopilem cap dada personal identificable.</strong> No requerim registre,
              no demanem nom, correu ni telèfon, i no fem servir publicitat ni analítica de tercers.
            </p>
            <p>
              Per millorar l&apos;app i poder detectar errors, sí que enviem les dades següents als
              nostres servidors (Supabase, hostatjat a la UE):
            </p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>
                <strong>Estadístiques d&apos;ús anònimes:</strong> esdeveniments tècnics (per
                exemple, obertura de l&apos;app, pantalla visitada, acció completada) acompanyats
                d&apos;un identificador aleatori d&apos;instal·lació, la versió de l&apos;app i la
                plataforma (iOS/Android). No estan vinculats a la teva identitat i pots
                <strong> desactivar-los des d&apos;Ajustos → Estadístiques d&apos;ús</strong>.
                <br />
                Base legal: interès legítim per millorar l&apos;app. Retenció: 12 mesos màxim.
              </li>
              <li>
                <strong>Feedback (opcional):</strong> si ens envies un comentari des de
                l&apos;app, guardem la valoració, el text que escrius, les etiquetes
                seleccionades i el context tècnic (versió, plataforma, idioma). Mai et demanem
                el nom ni el correu — t&apos;encoratgem a no incloure dades personals al missatge.
                <br />
                Base legal: consentiment (l&apos;enviament és voluntari). Retenció: fins que es
                resolgui la incidència, màxim 24 mesos.
              </li>
              <li>
                <strong>Preferències locals:</strong> els favorits, la configuració d&apos;idioma
                i l&apos;estat d&apos;onboarding es guarden únicament al teu dispositiu i mai
                surten d&apos;ell.
              </li>
            </ul>
          </Section>

          <Section title="3. Permisos de l'app">
            <p>L&apos;app pot demanar els permisos següents. Tots són opcionals i es demanen en el moment d&apos;ús:</p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>
                <strong>Localització (opcional):</strong> Per mostrar la teva posició al mapa del festival
                i calcular distàncies als actes. La ubicació mai s&apos;envia als nostres servidors ni es comparteix.
              </li>
              <li>
                <strong>Notificacions (opcional):</strong> Per recordar-te actes propers. Es
                programen i es processen localment al dispositiu. No registrem el teu token
                d&apos;identificador push als nostres servidors.
              </li>
              <li>
                <strong>Calendari (opcional):</strong> Per afegir actes del festival al calendari del dispositiu.
                Només s&apos;escriu l&apos;acte que tu selecciones explícitament. No llegim ni modifiquem cap event existent.
              </li>
              <li>
                <strong>Internet:</strong> Per carregar el programa actualitzat, les imatges del mapa i els recursos del festival.
              </li>
            </ul>
          </Section>

          <Section title="4. Serveis de tercers">
            <p>L&apos;app utilitza els serveis següents, cadascun amb la seva pròpia política de privacitat:</p>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li><strong>Supabase:</strong> Base de dades del programa d&apos;actes. Dades anonimitzades. <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Llegir política</a></li>
              <li><strong>MapLibre / OpenStreetMap:</strong> Mapa base. <a href="https://www.openstreetmap.org/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Llegir política</a></li>
            </ul>
          </Section>

          <Section title="5. Els teus drets i retenció de dades">
            <p>
              Com que no et podem identificar (no demanem registre ni emmagatzemem
              identificadors personals), les sol·licituds d&apos;accés, rectificació o
              supressió no es poden vincular a un usuari concret. Tot i així:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>
                Pots <strong>desactivar les estadístiques en qualsevol moment</strong> des
                d&apos;Ajustos. A partir d&apos;aquell moment, l&apos;app deixa d&apos;enviar
                esdeveniments.
              </li>
              <li>
                Pots eliminar totes les dades locals (favorits, preferències, identificador
                d&apos;instal·lació) <strong>desinstal·lant l&apos;app</strong>. La pròxima
                instal·lació generarà un identificador nou no relacionat.
              </li>
              <li>
                Si vols sol·licitar l&apos;esborrat manual de dades o el feedback enviat, consulta la nostra pàgina d&apos;{" "}
                <a href="/data-deletion" className="text-primary hover:underline">
                  Esborrat de dades
                </a> o escriu-nos a{" "}
                <a href={`mailto:${CONTACT_EMAIL.support}`} className="text-primary hover:underline">
                  {CONTACT_EMAIL.support}
                </a>{" "}
                indicant la data aproximada i el contingut.
              </li>
            </ul>
            <p>
              Retenció màxima: 12 mesos per a estadístiques d&apos;ús, 24 mesos per a feedback.
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
              <a href={`mailto:${CONTACT_EMAIL.support}`} className="text-primary hover:underline">
                {CONTACT_EMAIL.support}
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
