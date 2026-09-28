/**
 * OportunidadPage — /oportunidad (LANDING-01). ES only, noindex, no nav entry.
 * Seven sections in wireframe order: 00 Hero → 06 Hablemos.
 * Wireframe: specs/mockups/wireframe-landing01-oportunidad.html
 */
import { OportunidadHero } from '@/components/oportunidad/oportunidad-hero'
import {
  AllianceSection,
  DaySection,
  ScenariosSection,
} from '@/components/oportunidad/oportunidad-story'
import {
  AboutSection,
  ContactBlock,
  StartSection,
} from '@/components/oportunidad/oportunidad-closing'
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
      <DaySection content={content.day} />
      <ScenariosSection content={content.scenarios} />
      <AllianceSection content={content.alliance} />
      <AboutSection content={content.about} casesHref={getPath('cases', locale)} />
      <StartSection content={content.start} />
      <ContactBlock
        content={content.contact}
        formCopy={dict.shared.contactForm}
        privacyHref={getPath('privacy', locale)}
        email={dict.contact.directMeta.email}
      />
    </>
  )
}
