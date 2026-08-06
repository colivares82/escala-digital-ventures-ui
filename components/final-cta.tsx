/**
 * FinalCTA — dossier contact section at the end of every interior page.
 *
 * Renders the exact same two-column dossier design as /contacto:
 * LEFT: eyebrow + H2 + lead + affinity filter + meta
 * RIGHT: FICHA DE CONTACTO formcard + trust line
 *
 * Single source: ContactSection (mode="section") reads from contactContent.
 * Zero per-page configuration needed — just <FinalCTA />.
 */
import { ContactSection } from '@/components/contact-section'

export function FinalCTA() {
  return <ContactSection mode="section" />
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
