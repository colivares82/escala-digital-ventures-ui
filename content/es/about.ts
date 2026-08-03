/**
 * Sobre Escala — ES content dictionary.
 * Phase 1 stub: only meta populated. Phase 2 adds full content.
 * Spec: SPEC-P1 FR-3.1
 */
import type { AboutDictionary } from '@/content/types'

export const aboutContent = {
  meta: {
    title: 'Sobre Escala | Escala Digital Ventures',
    description:
      'ADN, valores, los 10 principios y la trayectoria del equipo. Mataró, Barcelona.',
  },
  // Phase 2: full content (DNA, values, manifesto, anonymized experience per spec §1–4)
} as const satisfies AboutDictionary

export type AboutContent = typeof aboutContent
