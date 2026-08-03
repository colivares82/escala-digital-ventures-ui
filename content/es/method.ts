/**
 * Cómo trabajamos — ES content dictionary.
 * Phase 1 stub: only meta populated. Phase 2 adds full content.
 * Spec: SPEC-P1 FR-3.1
 */
import type { MethodDictionary } from '@/content/types'

export const methodContent = {
  meta: {
    title: 'Cómo trabajamos | Escala Digital Ventures',
    description:
      'El Escala Growth Framework: diez fases que conectan negocio, personas, procesos y tecnología.',
  },
  // Phase 2: full content (framework narrative, PhaseCycle wiring per spec §9)
} as const satisfies MethodDictionary

export type MethodContent = typeof methodContent
