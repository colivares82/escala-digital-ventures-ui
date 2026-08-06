/**
 * ContactPage — /contacto (Phase 2.6).
 * Thin wrapper: renders ContactSection in page mode (full-viewport, H1).
 */
import { ContactSection } from '@/components/contact-section'
import type { Dictionary } from '@/lib/i18n/dictionary'

// dict is kept for future locale-aware copy; currently contactContent is ES-only
export function ContactPage({ dict: _dict }: { dict: Dictionary }) {
  return <ContactSection mode="page" />
}
