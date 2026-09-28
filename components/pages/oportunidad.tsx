/**
 * OportunidadPage — /oportunidad (LANDING-01). ES only, noindex, no nav entry.
 * Sections 00 Hero → 01 ¿Te suena? (LANDING-01A) → … → 06 Cómo empezamos,
 * then the site-wide FinalCTA
 * (ContactSection, renders #contacto) — reused as-is, no landing-specific copy.
 * Wireframe: specs/mockups/wireframe-landing01-oportunidad.html
 */
import { FinalCTA } from '@/components/final-cta'
import { OportunidadHero } from '@/components/oportunidad/oportunidad-hero'
import {
  AllianceSection,
  DaySection,
  ScenariosSection,
} from '@/components/oportunidad/oportunidad-story'
import { AboutSection, StartSection } from '@/components/oportunidad/oportunidad-closing'
import { TeSuenaSection } from '@/components/oportunidad/te-suena-section'
import type { Dictionary } from '@/lib/i18n/dictionary'
import { getPath } from '@/lib/i18n/routes'
import type { Locale } from '@/lib/i18n/types'

export function OportunidadPage({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const content = dict.oportunidad
  // ES-only: the router never resolves this page for EN/CA, so this is a
  // type-narrowing guard rather than a reachable branch.
  if (!content) return null

  return (
    <>
      <OportunidadHero content={content.hero} />
      <TeSuenaSection content={content.teSuena} />
      <DaySection content={content.day} />
      <ScenariosSection content={content.scenarios} />
      <AllianceSection content={content.alliance} figure={dict.home.allianceFigure} />
      <AboutSection content={content.about} casesHref={getPath('cases', locale)} />
      <StartSection content={content.start} />
      <FinalCTA dict={dict} locale={locale} />
    </>
  )
}
