export const APP_NAME = "Les Santes"
export const APP_SUBTITLE = "La Festa Major de Mataró"
export const APP_YEAR = 2026
export const APP_DATES = "Del 24 al 29 de juliol"
export const APP_CITY = "Mataró"
export const APP_START_DATE = "2026-07-24"
export const APP_END_DATE = "2026-07-29"

export const SITE_URL = "https://lessantes.polgubau.com"
export const OFFICIAL_MATARO_URL = "https://www.mataro.cat"

export const AUTHOR_NAME = "Pol Gubau Amores"
export const AUTHOR_URL = "https://polgubau.com"

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
} as const

export const SOCIAL = {
  author: AUTHOR_URL,
  mataro: OFFICIAL_MATARO_URL,
} as const
