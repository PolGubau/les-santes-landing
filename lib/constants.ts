export const APP_NAME = "Les Santes"
export const APP_SUBTITLE = "La Festa Major de Mataró"
export const APP_YEAR = 2026
export const APP_DATES = "Del 24 al 29 de juliol"
export const APP_CITY = "Mataró"
export const APP_REGION = "Catalunya"
export const APP_COUNTRY = "ES"
export const APP_START_DATE = "2026-07-24"
export const APP_END_DATE = "2026-07-29"

export const SITE_URL = "https://lessantes.polgubau.com"
export const API_URL = "https://api.lessantes.polgubau.com"
export const OFFICIAL_MATARO_URL = "https://www.mataro.cat"

export const AUTHOR_NAME = "Pol Gubau Amores"
export const AUTHOR_URL = "https://polgubau.com"
export const AUTHOR_SAMEAS: string[] = [
  "https://polgubau.com",
  "https://github.com/PolGubau",
  "https://www.linkedin.com/in/polgubauamores/",
]

/**
 * Sub-events of the festival used for SEO/JSON-LD (`Festival.subEvent`)
 * and answer extraction by AI search. Keep concise, factual, dated.
 */
export const FESTIVAL_SUBEVENTS: ReadonlyArray<{
  id: string
  name: string
  description: string
  startDate: string
  endDate: string
  locationName: string
  type: string
}> = [
  {
    id: "gegantada",
    name: "Gegantada inaugural",
    description:
      "Cercavila inaugural de Les Santes amb els gegants de Mataró, gralles i tabals.",
    startDate: "2026-07-24T18:00:00+02:00",
    endDate: "2026-07-24T20:00:00+02:00",
    locationName: "Ronda O'Donnell, Mataró",
    type: "cercavila",
  },
  {
    id: "nit-boja",
    name: "Nit Boja",
    description:
      "Correfoc nocturn amb dimonis, dracs i bestiari pels carrers del centre de Mataró.",
    startDate: "2026-07-25T23:30:00+02:00",
    endDate: "2026-07-26T01:30:00+02:00",
    locationName: "La Riera i carrers del centre, Mataró",
    type: "correfoc",
  },
  {
    id: "havaneres",
    name: "Havaneres al port",
    description:
      "Cantada d'havaneres al port de Mataró amb cremat i les colles tradicionals.",
    startDate: "2026-07-25T22:00:00+02:00",
    endDate: "2026-07-26T00:00:00+02:00",
    locationName: "Port de Mataró",
    type: "concert",
  },
  {
    id: "castellers",
    name: "Diada castellera de Les Santes",
    description:
      "Actuació castellera davant la basílica de Santa Maria de Mataró.",
    startDate: "2026-07-26T12:00:00+02:00",
    endDate: "2026-07-26T14:00:00+02:00",
    locationName: "Plaça de Santa Maria, Mataró",
    type: "castellera",
  },
  {
    id: "castell-de-focs",
    name: "Castell de focs",
    description:
      "Castell de focs artificials sobre la platja del Varador, un dels més grans de la costa catalana.",
    startDate: "2026-07-27T23:00:00+02:00",
    endDate: "2026-07-27T23:45:00+02:00",
    locationName: "Platja del Varador, Mataró",
    type: "focsartificials",
  },
] as const

/**
 * FAQs reused by the on-page FAQ section and the `FAQPage` JSON-LD.
 * Phrased to match real-user query patterns for SERP/AI Overview extraction.
 */
export const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "Quan són Les Santes 2026?",
    a: "Les Santes 2026, la Festa Major de Mataró, se celebren del 24 al 29 de juliol de 2026.",
  },
  {
    q: "On se celebren Les Santes?",
    a: "Les Santes se celebren a Mataró (Maresme, Catalunya), amb actes a la Riera, la plaça de Santa Maria, el port i la platja del Varador, entre d'altres.",
  },
  {
    q: "Quin és el programa de Les Santes 2026?",
    a: "El programa inclou la gegantada inaugural, la Nit Boja (correfoc), havaneres al port, diada castellera i el castell de focs a la platja del Varador, a més de cercaviles, concerts i actes familiars cada dia del 24 al 29 de juliol.",
  },
  {
    q: "A quina hora és el correfoc de Les Santes (Nit Boja)?",
    a: "La Nit Boja, el correfoc gran de Les Santes, comença habitualment cap a les 23:30 del 25 de juliol al centre de Mataró.",
  },
  {
    q: "A quina hora és el castell de focs de Les Santes?",
    a: "El castell de focs s'acostuma a fer cap a les 23:00 a la platja del Varador de Mataró durant Les Santes.",
  },
  {
    q: "L'app Les Santes és gratuïta?",
    a: "Sí, l'app Les Santes és totalment gratuïta, sense publicitat ni compres dins l'app, disponible per a iOS i Android.",
  },
  {
    q: "L'app Les Santes és oficial de l'Ajuntament de Mataró?",
    a: "No. És un projecte independent fet per Pol Gubau Amores. Per a informació oficial cal consultar mataro.cat.",
  },
  {
    q: "Què és Les Santes?",
    a: "Les Santes és la Festa Major de Mataró, en honor a les patrones Juliana i Semproniana. Se celebra cada any a finals de juliol des de fa més d'un segle i és una de les festes majors més importants de Catalunya.",
  },
] as const

/**
 * App-specific FAQs for the /support page.
 * Focused on practical questions about the app, not the festival itself.
 */
export const SUPPORT_FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "L'app és gratuïta i sense publicitat?",
    a: "Sí, completament gratuïta. Sense publicitat, sense compres dins l'app i sense registre obligatori.",
  },
  {
    q: "En quines plataformes estarà disponible?",
    a: `iOS (iPhone i iPad) i Android. Estarà disponible a l'App Store i Google Play abans de Les Santes ${APP_YEAR}.`,
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
    q: "Recopileu les meves dades personals?",
    a: "No. L'app no requereix registre i no emmagatzemem cap dada personal. Els favorits es guarden localment al teu dispositiu.",
  },
  {
    q: "L'app és oficial de l'Ajuntament de Mataró?",
    a: "No. És un projecte independent fet per Pol Gubau Amores. El programa prové de fonts públiques de l'Ajuntament, però l'app no té afiliació oficial. Per a informació oficial, consulta mataro.cat.",
  },
] as const

/**
 * Plus-addressed emails: all land in gubaupol@gmail.com
 * but the suffix lets us know which part of the site originated the contact.
 */
export const CONTACT_EMAIL = {
  /** Generic contact / hero nav */
  general: "gubaupol+lessantes@gmail.com",
  /** Footer notify-me CTA */
  notify: "gubaupol+lessantes-notify@gmail.com",
  /** About page - town-hall collaboration */
  collab_official: "gubaupol+lessantes-oficial@gmail.com",
  /** About page - alternative / unofficial collaboration */
  collab_alt: "gubaupol+lessantes-alt@gmail.com",
  /** Privacy & support pages */
  support: "gubaupol+lessantes-support@gmail.com",
  /** Bug reports */
  bug: "gubaupol+lessantes-bug@gmail.com",
  /** Closed-testing program */
  tester: "gubaupol+lessantes-tester@gmail.com",
} as const

/**
 * Closed-testing program (Google Play). Centralised so testers' links can be
 * rotated without touching the page markup.
 */
export const TESTER_PROGRAM = {
  /** Google Play opt-in link for the closed-testing track. */
  playOptInUrl: "https://play.google.com/apps/testing/com.lessantes.app",
  /** Public Play Store listing (visible only to opted-in testers). */
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.lessantes.app",
  /** Structured feedback form (Google Forms / Tally / Notion). */
  feedbackUrl: "https://forms.gle/REPLACE_WITH_REAL_FORM_ID",
  /** Total testing window in days, per Google Play requirements. */
  durationDays: 14,
  /** Minimum number of active testers Google expects to grant production access. */
  minTesters: 12,
} as const

