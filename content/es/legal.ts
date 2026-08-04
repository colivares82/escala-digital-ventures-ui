/**
 * Aviso legal — ES content dictionary.
 * Phase 1 stub: only meta populated. Phase 4 adds LSSI-CE legal content.
 * Spec: SPEC-P1 FR-3.1
 */
import type { LegalDictionary } from '@/content/types'

export const legalContent = {
  meta: {
    title: 'Aviso legal | Escala Digital Ventures',
    description:
      'Aviso legal de Escala Digital Ventures, S.L.U. Información legal e identificación del titular.',
  },
  // Phase 4: full LSSI-CE content (CIF, registro mercantil, etc.) — Carlos to provide
} as const satisfies LegalDictionary

export type LegalContent = typeof legalContent
