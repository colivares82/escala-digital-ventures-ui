/**
 * In-page anchors for /oportunidad (LANDING-01 §2). Page-local on purpose:
 * lib/routes.ts ANCHORS belong to the home page and are out of scope.
 */
export const OPORTUNIDAD_ANCHORS = {
  // Must match the id ContactSection (mode="section", via FinalCTA) renders.
  CONTACTO: 'contacto',
  ESCENARIOS: 'escenarios',
  TE_SUENA: 'te-suena',
  ALIANZA: 'alianza',
} as const

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
