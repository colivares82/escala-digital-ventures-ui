/**
 * Casos de éxito — ES content dictionary (index page).
 * Per-case dossier content lives in content/data/cases.ts.
 * Spec: SPEC-P2.3 FR-6.1
 */
import type { CasesDictionary } from '@/content/types'

export const casesContent = {
  // SEO-01 §3.1 — primary term: "casos de digitalización de procesos".
  meta: {
    title: 'Casos de éxito: procesos manuales hechos plataforma',
    description:
      'Magupell y BioZero: dos empresas que sustituyeron su operativa manual por una plataforma propia. Datos verificables, publicados con permiso del cliente.',
  },
  pageHeader: {
    eyebrow: 'A / CASOS DE ÉXITO',
    title: 'Casos de éxito',
    lead: 'Más que proyectos: transformación empresarial. Contamos cada caso con datos verificables y con el permiso del cliente.',
  },
  card: {
    expedienteLabel: 'EXPEDIENTE',
    openLabel: 'ABRIR EXPEDIENTE ↗',
  },
  visitLabel: 'visitar sitio ↗',
  capabilitiesLabel: 'CAPACIDADES ENTREGADAS',
  nextLabel: 'SIGUIENTE EXPEDIENTE ↓',
  backLabel: 'VOLVER AL ÍNDICE ↑',
} as const satisfies CasesDictionary

export type CasesContent = typeof casesContent
