/**
 * Contacto — ES content dictionary.
 * Phase 1 stub: only meta populated. Phase 3 adds the full contact-page content.
 * Spec: SPEC-P1 FR-3.1
 */
import type { ContactDictionary } from '@/content/types'

export const contactContent = {
  meta: {
    title: 'Contacto | Escala Digital Ventures',
    description:
      'Hablemos de tu negocio. Cuéntanos qué frena tu crecimiento. Mataró, Barcelona.',
  },
  // Phase 3: full page content + contact form wiring
} as const satisfies ContactDictionary

export type ContactContent = typeof contactContent
