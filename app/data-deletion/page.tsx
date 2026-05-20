import { Metadata } from "next"
import { APP_NAME, CONTACT_EMAIL } from "@/lib/constants"
import { PageNav } from "@/components/page-nav"

export const metadata: Metadata = {
  title: `Esborrat de dades - ${APP_NAME}`,
  description: `Com sol·licitar l'esborrat de les teves dades a l'aplicació ${APP_NAME}.`,
  robots: { index: false },
}

export default function DataDeletionPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageNav breadcrumb="Esborrat de dades" />

      <main className="max-w-3xl mx-auto px-6 py-12 space-y-12">
        <header>
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-foreground">Esborrat de dades</h1>
        </header>

        <div className="prose prose-neutral max-w-none space-y-10 text-foreground">
          <p className="text-lg text-muted-foreground leading-relaxed">
            A <strong>{APP_NAME}</strong> ens prenem seriosament la teva privacitat. Com que l&apos;aplicació
            no requereix registre ni compte d&apos;usuari, no emmagatzemem dades personals identificables
            (nom, correu, telèfon, etc.) als nostres servidors.
          </p>

          <Section title="Com esborrar les teves dades">
            <p>
              Pots eliminar tota la informació associada a la teva instal·lació de forma immediata
              seguint aquests passos:
            </p>
            <ul className="list-disc pl-5 space-y-4 text-muted-foreground">
              <li>
                <strong>Dades locals:</strong> Per esborrar els teus favorits, preferències d&apos;idioma
                i l&apos;identificador d&apos;instal·lació, simplement <strong>desinstal·la l&apos;aplicació</strong> del teu dispositiu.
                Això eliminarà tota la memòria cau i l&apos;emmagatzematge local de l&apos;app.
              </li>
              <li>
                <strong>Estadístiques:</strong> Si vols deixar d&apos;enviar estadístiques d&apos;ús anònimes
                sense desinstal·lar l&apos;app, pots fer-ho des de <strong>Ajustos → Estadístiques d&apos;ús</strong>.
              </li>
              <li>
                <strong>Feedback enviat:</strong> Si ens has enviat un comentari a través del formulari
                de feedback i vols que l&apos;eliminem dels nostres registres, contacta amb nosaltres.
              </li>
            </ul>
          </Section>

          <Section title="Sol·licitud d'esborrat manual">
            <p>
              Si vols sol·licitar l&apos;eliminació manual de qualsevol dada que puguis haver enviat
              (per exemple, en un comentari de feedback), envia un correu electrònic a:
            </p>
            <p className="font-mono text-foreground bg-muted p-4 rounded-xl inline-block border border-border">
              {CONTACT_EMAIL.support}
            </p>
            <p className="text-muted-foreground">
              Si us plau, indica la data aproximada en què vas enviar el feedback i, si és possible,
              una part del contingut per poder-lo localitzar, ja que no disposem del teu correu ni nom
              per defecte.
            </p>
          </Section>

          <p className="text-sm text-muted-foreground pt-10 border-t border-border italic">
            Aquesta política d&apos;esborrat de dades compleix amb els requisits de Google Play per a
            aplicacions que recullen dades d&apos;ús o feedback.
          </p>
        </div>
      </main>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
      <div className="space-y-4 leading-relaxed">{children}</div>
    </section>
  )
}
