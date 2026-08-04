/**
 * Casos de éxito — ES content dictionary.
 * Phase 1 stub: only meta populated. Phase 2 adds full content.
 * Spec: SPEC-P1 FR-3.1
 */
import type { CasesDictionary } from '@/content/types'

export const casesContent = {
  meta: {
    title: 'Casos de éxito | Escala Digital Ventures',
    description:
      'Proyectos reales: MAGUPELL y BioZero. Automatización con resultados verificados.',
  },
  // Phase 2: full content (case index, shared case template per spec §14–16)
} as const satisfies CasesDictionary

export type CasesContent = typeof casesContent
