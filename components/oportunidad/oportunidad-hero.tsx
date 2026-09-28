/**
 * § 00 Hero — dark abisal surface + GridBackground (reused as-is).
 * Two columns ≥1024px (LANDING-01B): copy left, vertical FIG. 01 right.
 */
import { GridBackground } from '@/components/grid-background'
import { SectionIndex } from '@/components/section-index'
import type { OportunidadDictionary } from '@/content/types'
import { OportunidadHeroFig } from './oportunidad-hero-fig'
import { OPORTUNIDAD_ANCHORS, toHash } from './constants'

export function OportunidadHero({ content }: { content: OportunidadDictionary['hero'] }) {
  return (
    <section className="oport-hero dark-surface">
      <GridBackground />
      <div className="page-shell oport-hero__inner">
        <div className="oport-hero__copy">
          <SectionIndex index={content.sectionIndex.index} label={content.sectionIndex.label} />
          <h1 className="oport-hero__title">
            <span>{content.title1}</span>
            <span className="oport-hero__title-accent">{content.title2}</span>
          </h1>
          <p className="oport-hero__lead">{content.lead}</p>
          <div className="hero__actions oport-hero__actions">
            <a className="oport-cta" href={toHash(OPORTUNIDAD_ANCHORS.CONTACTO)}>
              {content.ctaPrimary}
            </a>
            <a className="text-link" href={toHash(OPORTUNIDAD_ANCHORS.ESCENARIOS)}>
              {content.ctaSecondary}
            </a>
          </div>
          <p className="oport-badge">
            <span className="oport-badge__dot" aria-hidden="true" />
            {content.badge}
          </p>
        </div>
        <OportunidadHeroFig content={content.fig} />
      </div>
    </section>
  )
}
