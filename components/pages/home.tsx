/**
 * HomePage — `/`, `/en`, `/ca` (HOME-V2). Wireframe: specs/mockups/wireframe-home-v2.html
 *
 * 00 Hero · 01 ¿Te suena? · 02 Un lunes · 03 Escenarios · 04 Evidencia ·
 * 05 Alianza · 06 Quién · 07 Cómo empezamos · 08 A fondo · A Contacto.
 *
 * Sections 00–03 and 05–07 are the shared landing components that /oportunidad
 * also renders (components/landing). Copy comes from `dict.home.landing`;
 * contact is the unchanged site-wide FinalCTA (ContactSection, #contacto).
 */
import { FinalCTA } from '@/components/final-cta'
import { DeepLinks } from '@/components/landing/deep-links'
import { EvidenceSection } from '@/components/landing/evidence-section'
import { OportunidadHero } from '@/components/landing/oportunidad-hero'
import { AboutSection, StartSection } from '@/components/landing/oportunidad-closing'
import { AllianceSection, DaySection, ScenariosSection } from '@/components/landing/oportunidad-story'
import { TeSuenaSection } from '@/components/landing/te-suena-section'
import { cases } from '@/content/data/cases'
import type { Client } from '@/content/es/clients'
import type { Dictionary } from '@/lib/i18n/dictionary'
import { getPath } from '@/lib/i18n/routes'
import type { Locale } from '@/lib/i18n/types'

/**
 * The dictionary handed to the (client) contact module, minus the ES-only
 * /oportunidad slice. ContactSection only reads `contact` + `shared`, but as a
 * client component its whole `dict` prop is serialized into the page's RSC
 * payload — which would ship /oportunidad's price + offer copy inside the home
 * HTML (HOME-V2 AC-B4). Same component, same prop type: only the data narrows.
 */
function withoutLandingOnlySlices(dict: Dictionary): Dictionary {
  const { oportunidad: _landingOnly, ...rest } = dict
  void _landingOnly
  return rest
}

/** Case links with locale copy + localized href (the legacy adapter is ES-only). */
function localizedCases(locale: Locale): Client[] {
  return cases.map((c) => ({
    name: c.name,
    href: getPath('caseDetail', locale, { slug: c.slug }),
    ...c.content[locale],
  }))
}

export function HomePage({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const { home } = dict
  const content = home.landing
  const occupiedSeats = home.allianceFigure.seats.filter((s) => s.state === 'occupied').length

  return (
    <>
      <OportunidadHero content={content.hero} variant="home" occupiedSeats={occupiedSeats} />
      <TeSuenaSection content={content.teSuena} />
      <DaySection content={content.day} />
      <ScenariosSection content={content.scenarios} />
      <EvidenceSection
        content={content.evidence}
        title={home.proof.title}
        readouts={home.proof.readouts}
        cases={localizedCases(locale)}
      />
      <AllianceSection
        content={content.alliance}
        figure={home.allianceFigure}
        allianceHref={getPath('alliance', locale)}
      />
      <AboutSection content={content.about} linkHref={getPath('about', locale)} />
      <StartSection content={content.start} methodHref={getPath('method', locale)} />
      <DeepLinks content={content.deepLinks} locale={locale} />
      <FinalCTA dict={withoutLandingOnlySlices(dict)} locale={locale} />
    </>
  )
}
