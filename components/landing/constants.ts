/**
 * In-page anchors for the landing sections, shared by /oportunidad and the
 * home (HOME-V2 §B.2).
 */
export const OPORTUNIDAD_ANCHORS = {
  // Must match the id ContactSection (mode="section", via FinalCTA) renders.
  CONTACTO: 'contacto',
  ESCENARIOS: 'escenarios',
  TE_SUENA: 'te-suena',
  ALIANZA: 'alianza',
  // Home hero only — the header brand link targets it (lib/routes ANCHORS.INICIO).
  INICIO: 'inicio',
} as const

/** Alliance model cap: five seats (home hero dot indicator). */
export const ALLIANCE_SEATS = 5

/**
 * «¿Te suena?» result bands (LANDING-01A A3): the message switches exactly at
 * these marked counts — 0 · 1–2 · 3–5 · 6–8.
 */
export const DIAGNOSIS_BAND_MIN = {
  LOW: 1,
  MID: 3,
  HIGH: 6,
} as const

export const toHash = (id: string): string => `#${id}`
