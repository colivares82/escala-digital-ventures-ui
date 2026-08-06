/**
 * LegalPage — /aviso-legal page compositor.
 * Renders the LegalDoc layout with the legal content dictionary.
 * Spec: SPEC-P4 FR-1, FR-2
 */

import { LegalDoc } from '@/components/legal-doc'
import type { Dictionary } from '@/lib/i18n/dictionary'

export function LegalPage({ dict }: { dict: Dictionary }) {
  return <LegalDoc content={dict.legal} />
}
