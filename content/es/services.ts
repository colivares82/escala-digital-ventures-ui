/**
 * Qué hacemos — ES content dictionary.
 * Phase 1 stub: only meta populated. Phase 2 adds full content.
 * Spec: SPEC-P1 FR-3.1
 */
import type { ServicesDictionary } from '@/content/types'

export const servicesContent = {
  meta: {
    title: 'Qué hacemos | Escala Digital Ventures',
    description:
      'Automatización, plataformas a medida, IA aplicada y CTO fraccional para empresas en crecimiento.',
  },
  // Phase 2: full content (service lines, problem-first narrative per spec §7)
} as const satisfies ServicesDictionary

export type ServicesContent = typeof servicesContent
