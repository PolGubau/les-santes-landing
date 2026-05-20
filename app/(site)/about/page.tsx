import { PageNav } from "@/components/page-nav"
import { ArrowRightIcon, BuildingsIcon, CodeIcon, HandHeartIcon, MusicNoteIcon, TShirtIcon } from "@phosphor-icons/react/dist/ssr"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { API_URL, APP_NAME, AUTHOR_NAME, AUTHOR_URL, CONTACT_EMAIL, OFFICIAL_MATARO_URL, SITE_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Sobre el projecte",
  description: `L'app ${APP_NAME} és un projecte independent per millorar l'accessibilitat digital de la Festa Major de Mataró. Feta per ${AUTHOR_NAME}. Col·labora amb nosaltres.`,
  alternates: { canonical: `${SITE_URL}/about` },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageNav breadcrumb="Sobre el projecte" />

      <main id="main-content" className="max-w-3xl mx-auto px-6 py-16 space-y-16">
        {/* Header */}
        <header className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
            Les Santes a la butxaca
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Soc en Pol. Vaig créixer a Mataró i <strong>Les Santes</strong> sempre han estat les festes que més gaudeixo. Aquesta app no és oficial, no té subvencions ni afiliació amb l&apos;Ajuntament.
            Simplement volia que tothom pogués gaudir de la festa de manera més fàcil.
          </p>
        </header>

        {/* Not official disclaimer */}
        <section className="bg-amber-50 rounded-2xl p-6 shadow space-y-3" aria-label="Avís important">
          <div className="flex items-start gap-3">
            <span className="text-2xl" role="img" aria-label="Avís">⚠️</span>
            <div className="space-y-2">
              <h2 className="font-semibold text-amber-900">Això no és oficial</h2>
              <p className="text-amber-800 text-sm leading-relaxed">
                L&apos;app <strong>Les Santes</strong> és un projecte personal i independent.
                No estem afiliats a l&apos;Ajuntament de Mataró ni a cap organisme oficial de la
                Festa Major. El programa s&apos;obté de fonts públiques i pot contenir inexactituds.
                Consulta sempre les fonts oficials per a informació definitiva.
              </p>
              <a
                href={OFFICIAL_MATARO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-amber-900 text-sm font-medium hover:underline"
              >
                Web oficial de Mataró <ArrowRightIcon className="size-3" />
              </a>
            </div>
          </div>
        </section>

        {/* Why */}
        <section className="space-y-4">
          <HandHeartIcon weight="fill" className="size-8 text-primary" />
          <h2 className="text-2xl font-bold">Per què existeix aquesta app?</h2>
          <p className="text-muted-foreground leading-relaxed">
            El programa de Les Santes és ric i complex, hi han cercaviles que canvien de posició,
            actes simultanis a llocs allunyats, horaris que s&apos;acumulen... Tota aquesta informació en un pdf de 25 pàgines no és còmode per a consolutar ràpid i la gent es perd coses que li haurien encantat.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Volia fer una eina senzilla que resolgués exactament això: saber <strong>ara mateix</strong> on és
            la cercavila, quins actes queden avui i on s&apos;ha de ser en els propers minuts.
            Accessibilitat digital per a la nostra Festa Major.
          </p>
        </section>

        {/* Collaboration cards */}
        <section id="collabora" className="space-y-5 scroll-mt-24">
          <h2 className="text-2xl font-bold">Col·labora amb nosaltres</h2>
          <p className="text-muted-foreground">
            Tant si ets de l&apos;ajuntament com si fas coses al voltant de Les Santes, m&apos;encantaria parlar amb tu. L&apos;app és més útil quan té dades oficials, col·laboracions i contingut fresc. Parlem?
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Ajuntament */}
            <div className="group bg-card border border-border hover:border-primary/40 hover:shadow-md rounded-2xl p-6 space-y-3 transition-all duration-200">
              <BuildingsIcon weight="fill" className="size-7 text-primary" />
              <h3 className="font-semibold text-lg">Ets de l&apos;Ajuntament?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                M&apos;encantaria treballar amb dades oficials, millorar la precisió del programa
                i fer d&apos;aquesta app un canal digital reconegut per la Festa Major.
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL.collab_official}?subject=Col·laboració oficial - App ${APP_NAME}`}
                className="inline-flex items-center gap-1.5 text-primary text-sm font-medium hover:underline"
              >
                Escriu-me <ArrowRightIcon className="size-3" />
              </a>
            </div>

            {/* Alternatives */}
            <div className="group bg-card border border-border hover:border-primary/40 hover:shadow-md rounded-2xl p-6 space-y-3 transition-all duration-200">
              <div className="flex items-center gap-2">
                <MusicNoteIcon weight="fill" className="size-6 text-primary" />
                <TShirtIcon weight="fill" className="size-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Tens un projecte alternatiu?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Vens samarretes, organitzes un concert no oficial, fas alguna cosa xula al
                voltant de Les Santes? Parlem. Podem publicar-ho a l&apos;app i arribar a més gent.
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL.collab_alt}?subject=Col·laboració alternativa - App ${APP_NAME}`}
                className="inline-flex items-center gap-1.5 text-primary text-sm font-medium hover:underline"
              >
                Escriu-me <ArrowRightIcon className="size-3" />
              </a>
            </div>
          </div>
        </section>

        {/* Open Data */}
        <section className="space-y-4">
          <CodeIcon weight="fill" className="size-8 text-primary" />
          <h2 className="text-2xl font-bold">Dades obertes i API pública</h2>
          <p className="text-muted-foreground leading-relaxed">
            Totes les dades del programa, espais i avisos de Les Santes estan disponibles
            públicament a través d&apos;una API REST gratuïta. Qualsevol developer pot
            construir la seva pròpia app, mapa o visualització amb les mateixes dades que alimenten aquesta web.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Les dades es publiquen sota llicència <strong>CC BY 4.0</strong> — lliures per a qualsevol ús,
            inclòs el comercial, sempre que es mencioni l&apos;autoria.
          </p>
          <Link
            href="/developers"
            className="inline-flex items-center gap-1.5 text-primary text-sm font-medium hover:underline"
          >
            Descobreix l&apos;API i la documentació <ArrowRightIcon className="size-3" />
          </Link>
        </section>

        {/* Author */}
        <section className="bg-muted/40 rounded-2xl p-6 flex items-start gap-5" aria-label="Autor">
          <Image
            className="size-14 rounded-full bg-primary/20 shrink-0"
            alt="Perfil de l'autor"
            src="https://media.licdn.com/dms/image/v2/D4E03AQEyqMF2Z2TdLg/profile-displayphoto-scale_200_200/B4EZ23Gy64IwAY-/0/1776893509671?e=1779321600&v=beta&t=b2jxv8rqatM1rBafGcuvTCTg8qChxliHnFHxwFT5EG0"
            width={56}
            height={56}
            unoptimized
          />

          <div className="space-y-1.5">
            <h3 className="font-semibold">{AUTHOR_NAME}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Enginyer de software mataroní. Aquesta app és un projecte personal fet fora de l&apos;horari
              laboral per a millorar Mataró amb tecnologia.
            </p>
            <a
              href={AUTHOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:underline"
            >
              polgubau.com <ArrowRightIcon className="size-3" />
            </a>
          </div>
        </section>

      </main>
    </div>
  )
}
