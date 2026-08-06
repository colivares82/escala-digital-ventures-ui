/**
 * ContactPage — /contacto (Phase 2.6).
 * Thin wrapper: renders ContactSection in page mode (full-viewport, H1).
 * dict + locale passed through for locale-aware copy (SPEC-P5 FR-5).
 */
import { ContactSection } from '@/components/contact-section'
import type { Dictionary } from '@/lib/i18n/dictionary'
import type { Locale } from '@/lib/i18n/types'

export function ContactPage({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return <ContactSection dict={dict} locale={locale} mode="page" />
}
