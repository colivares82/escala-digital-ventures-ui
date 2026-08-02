/**
 * Canonical route constants for escaladigitalventures.com (ES default locale).
 * All internal links must use these constants — never inline string literals.
 * EN/CA slug maps live in lib/i18n/routes.ts (to be added with locale routing).
 */
export const ROUTES = {
  HOME: '/',
  SERVICES: '/que-hacemos',
  METHOD: '/como-trabajamos',
  CASE_STUDIES: '/casos-de-exito',
  CASE_MAGUPELL: '/casos-de-exito/magupell',
  CASE_BIOZERO: '/casos-de-exito/biozero',
  ALLIANCE: '/modelo-de-alianza',
  ABOUT: '/sobre-escala',
  CONTACT: '/contacto',
  LEGAL: '/aviso-legal',
  PRIVACY: '/privacidad',
} as const

export type Route = (typeof ROUTES)[keyof typeof ROUTES]

/** Anchor IDs for in-page navigation on the home page. */
export const ANCHORS = {
  INICIO: '#inicio',
  PROBLEMA: '#problema',
  QUE_HACEMOS: '#que-hacemos',
  METODO: '#metodo',
  CASOS: '#casos',
  ALIANZA: '#alianza',
  CONTACTO: '#contacto',
} as const
