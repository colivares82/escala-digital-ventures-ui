/**
 * Política de privacidad — ES content dictionary.
 * Phase 1 stub: only meta populated. Phase 4 adds RGPD content.
 * Spec: SPEC-P1 FR-3.1
 */
import type { PrivacyDictionary } from '@/content/types'

export const privacyContent = {
  meta: {
    title: 'Privacidad | Escala Digital Ventures',
    description:
      'Política de privacidad de Escala Digital Ventures, S.L.U. Tratamiento de datos conforme al RGPD.',
  },
  // Phase 4: full RGPD content (controller, purpose, legal basis, retention, rights)
} as const satisfies PrivacyDictionary

export type PrivacyContent = typeof privacyContent
