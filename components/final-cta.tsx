/**
 * FinalCTA — dossier contact section at the end of every interior page.
 *
 * Renders the exact same two-column dossier design as /contacto:
 * LEFT: eyebrow + H2 + lead + affinity filter + meta
 * RIGHT: FICHA DE CONTACTO formcard + trust line
 *
 * Single source: ContactSection (mode="section") reads from dict.contact + dict.shared.
 * dict + locale must be passed from the page compositor (SPEC-P5 FR-5).
 */
import { ContactSection } from '@/components/contact-section'
import type { Dictionary } from '@/lib/i18n/dictionary'
import type { Locale } from '@/lib/i18n/types'

export function FinalCTA({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return <ContactSection dict={dict} locale={locale} mode="section" />
}

/**
 * @deprecated FinalCtaContent is no longer used — FinalCTA renders ContactSection.
 * Kept for backward-compat type imports only; remove in Phase 5.
 */
export interface FinalCtaContent {
  readonly title: string
  readonly body: string
  readonly success: string
  readonly email: string
  readonly location: string
  readonly languages: string
}
