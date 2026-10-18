/**
 * § 00 Hero — dark abisal surface + GridBackground (reused as-is).
 * Two columns ≥1024px (LANDING-01B): copy left, vertical FIG. 01 right.
 *
 * Shared by /oportunidad and the home (HOME-V2 §B.1). The single explicit
 * variant is `variant`:
 *   - 'oportunidad' (default): two-line H1, CTA → #escenarios, pulsing badge.
 *   - 'home': H1 = primary claim, amber kicker below it, CTA → #te-suena,
 *     section id #inicio (header brand link), 5-dot alliance indicator.
 */
import { TrackedLink } from '@/components/analytics/tracked-link'
import { GridBackground } from '@/components/grid-background'
import { SectionIndex } from '@/components/section-index'
import { ANALYTICS_EVENTS, ANALYTICS_LOCATIONS } from '@/lib/constants/analytics'
import type { OportunidadDictionary } from '@/content/types'
import { OportunidadHeroFig } from './oportunidad-hero-fig'
import { ALLIANCE_SEATS, OPORTUNIDAD_ANCHORS, toHash } from './constants'

export type LandingVariant = 'oportunidad' | 'home'

export interface OportunidadHeroProps {
  content: OportunidadDictionary['hero']
  variant?: LandingVariant
  /** Occupied seats for the home dot indicator (single-sourced from allianceFigure). */
  occupiedSeats?: number
}

function SeatDots({ occupied }: { occupied: number }) {
  return (
    <span className="oport-dots" aria-hidden="true">
      {Array.from({ length: ALLIANCE_SEATS }, (_, i) => (
        <i key={i} className={i < occupied ? 'is-on' : undefined} />
      ))}
    </span>
  )
}

export function OportunidadHero({ content, variant = 'oportunidad', occupiedSeats = 0 }: OportunidadHeroProps) {
  const isHome = variant === 'home'
  return (
    <section
      className={`oport-hero dark-surface${isHome ? ' oport-hero--home' : ''}`}
      id={isHome ? OPORTUNIDAD_ANCHORS.INICIO : undefined}
    >
      <GridBackground />
      <div className="page-shell oport-hero__inner">
        <div className="oport-hero__copy">
          <SectionIndex index={content.sectionIndex.index} label={content.sectionIndex.label} />
          <h1 className="oport-hero__title">
            <span>{content.title1}</span>
            {content.title2 && <span className="oport-hero__title-accent">{content.title2}</span>}
          </h1>
          {content.kicker && <p className="oport-hero__kicker">{content.kicker}</p>}
          <p className="oport-hero__lead">{content.lead}</p>
          <div className="hero__actions oport-hero__actions">
            <TrackedLink
              event={ANALYTICS_EVENTS.CTA_CLICK}
              location={isHome ? ANALYTICS_LOCATIONS.HERO : ANALYTICS_LOCATIONS.OPORTUNIDAD_HERO}
              className="oport-cta"
              href={toHash(OPORTUNIDAD_ANCHORS.CONTACTO)}
            >
              {content.ctaPrimary}
            </TrackedLink>
            <a
              className="text-link"
              href={toHash(isHome ? OPORTUNIDAD_ANCHORS.TE_SUENA : OPORTUNIDAD_ANCHORS.ESCENARIOS)}
            >
              {content.ctaSecondary}
            </a>
          </div>
          <p className="oport-badge">
            {isHome ? (
              <SeatDots occupied={occupiedSeats} />
            ) : (
              <span className="oport-badge__dot" aria-hidden="true" />
            )}
            {content.badge}
          </p>
        </div>
        <OportunidadHeroFig content={content.fig} />
      </div>
    </section>
  )
}
