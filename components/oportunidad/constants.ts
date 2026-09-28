/**
 * In-page anchors for /oportunidad (LANDING-01 §2). Page-local on purpose:
 * lib/routes.ts ANCHORS belong to the home page and are out of scope.
 */
export const OPORTUNIDAD_ANCHORS = {
  CONTACTO: 'contacto',
  ESCENARIOS: 'escenarios',
} as const

export const toHash = (id: string): string => `#${id}`
