/**
 * PrivacyPage — /privacidad page compositor.
 * Renders the LegalDoc layout with the privacy content dictionary.
 * Spec: SPEC-P4 FR-1, FR-3
 */

import { LegalDoc } from '@/components/legal-doc'
import type { Dictionary } from '@/lib/i18n/dictionary'

export function PrivacyPage({ dict }: { dict: Dictionary }) {
  return <LegalDoc content={dict.privacy} />
}
