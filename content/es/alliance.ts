/**
 * Modelo de alianza — ES content dictionary.
 * Phase 1 stub: only meta populated. Phase 2 adds full content.
 * Spec: SPEC-P1 FR-3.1
 */
import type { AllianceDictionary } from '@/content/types'

export const allianceContent = {
  meta: {
    title: 'Modelo de alianza | Escala Digital Ventures',
    description:
      'Cinco alianzas activas. Dedicación completa. Tres planos de colaboración: técnico, estratégico y visionario.',
  },
  // Phase 2: full content (constellation, three planes, commitments per spec §11–13)
} as const satisfies AllianceDictionary

export type AllianceContent = typeof allianceContent
