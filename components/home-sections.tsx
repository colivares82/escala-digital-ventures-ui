/**
 * Home page section components.
 * All labels, diagrams, and claims come from the locale-aware dictionary via props.
 * No direct ES content imports — SPEC-P5 FR-5.
 */
import { ClaimsMarquee } from '@/components/claims-marquee'
import { ClientChip } from '@/components/client-chip'
import { FinalCTA } from '@/components/final-cta'
import { PhaseCycle } from '@/components/phase-cycle'
import { Readout } from '@/components/readout'
import { SectionIndex } from '@/components/section-index'
import { SystemDiagram } from '@/components/system-diagram'
import { Reveal, WordReveal } from '@/components/motion-runtime'
import { ANCHORS, ROUTES } from '@/lib/routes'
import { getPath } from '@/lib/i18n/routes'
import type { homeContent as homeContentType } from '@/content/es/home'
import type { Dictionary } from '@/lib/i18n/dictionary'
import type { Locale } from '@/lib/i18n/types'
import type { HeroFigureContent } from '@/components/hero-narrative-fig'
import type { ProblemFlowsFigContent } from '@/components/problem-flows-fig'

type HomeLabels = typeof homeContentType.labels
type HomeDiagrams = typeof homeContentType.diagrams

export function Hero({
  content,
  claims,
  labels,
  diagrams,
  heroFigure,
  claimsAriaLabel,
}: {
  content: typeof homeContentType.hero
  claims: typeof homeContentType.claims
  labels: HomeLabels
  diagrams: HomeDiagrams
  heroFigure?: HeroFigureContent
  claimsAriaLabel: string
}) {
  return (
    <>
      <section className="hero dark-surface" id="inicio">
        <div className="page-shell hero__grid">
          <SectionIndex index="00" label={labels.hero} />

          <div className="hero__claim">
            <WordReveal as="h1" text={content.title} />
            <p>{content.description}</p>
            <div className="hero__actions">
              <a className="primary-link" href={ANCHORS.CONTACTO}>
                {content.primaryCta}
                <span aria-hidden="true">↗</span>
              </a>
              <a className="text-link" href={ANCHORS.METODO}>
                {content.secondaryCta}
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <div className="hero__diagram">
            <p className="hero__eyebrow">{content.eyebrow}</p>
            <SystemDiagram kind="hero" label={diagrams.hero} heroFigure={heroFigure} />
          </div>
        </div>
      </section>

      <ClaimsMarquee claims={claims} ariaLabel={claimsAriaLabel} />
    </>
  )
}

export function ProblemSection({
  content,
  labels,
  diagrams,
  problemFigure,
}: {
  content: typeof homeContentType.problem
  labels: HomeLabels
  diagrams: HomeDiagrams
  /** Problem flows diagram content (SPEC-POLISH-02). Passed to SystemDiagram. */
  problemFigure?: ProblemFlowsFigContent
}) {
  return (
    <section className="section section--light" id="problema">
      <div className="page-shell">
        <SectionIndex index="01" label={labels.problem} />

        {/* Full-width headline band */}
        <WordReveal text={content.title} />

        {/* Symptoms strip + divider */}
        <ul
          className="problem-symptoms"
          aria-label={labels.symptoms}
        >
          {content.symptoms.map((symptom, i) => (
            <Reveal
              key={symptom}
              className={`problem-symptom problem-symptom--${i + 1}`}
            >
              <li>
                <i aria-hidden="true" />
                {symptom}
              </li>
            </Reveal>
          ))}
        </ul>

        {/* Two balanced columns: body | diagram */}
        <div className="problem-cols">
          <div className="problem-cols__body">
            <Reveal>
              <p className="lead-copy">{content.body[0]}</p>
            </Reveal>
            <Reveal>
              <p className="lead-copy">{content.body[1]}</p>
            </Reveal>
          </div>
          <SystemDiagram
            kind="problem"
            label={diagrams.problem}
            problemFigure={problemFigure}
          />
        </div>
      </div>
    </section>
  )
}

export function ServicesPreview({
  content,
  labels,
  servicesHref,
}: {
  content: typeof homeContentType.services
  labels: HomeLabels
  servicesHref: string
}) {
  return (
    <section className="section section--light services" id="que-hacemos">
      <div className="page-shell">
        <SectionIndex index="02" label={labels.services} />

        <div className="split-heading">
          <WordReveal text={content.title} />
          <a className="text-link text-link--dark" href={servicesHref}>
            {content.action}
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <ol className="services__list">
          {content.items.map((item, i) => (
            <li key={item.title}>
              <p>{String(i + 1).padStart(2, '0')}</p>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <span aria-hidden="true">↗</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function FrameworkSection({
  content,
  labels,
  methodHref,
}: {
  content: typeof homeContentType.framework
  labels: HomeLabels
  methodHref: string
}) {
  return (
    <section
      className="section section--dark dark-surface framework-cycle"
      id="metodo"
    >
      <PhaseCycle
        phases={content.phases}
        title={content.title}
        action={content.action}
        sectionLabel={labels.framework}
        lead={labels.frameworkLead}
        ariaLabel={labels.frameworkAria}
        phasePrefix={labels.phasePrefix}
        methodHref={methodHref}
      />
    </section>
  )
}

export function ProofSection({
  content,
  labels,
  diagrams,
}: {
  content: typeof homeContentType.proof
  labels: HomeLabels
  diagrams: HomeDiagrams
}) {
  return (
    <section className="section section--light proof" id="casos">
      <div className="page-shell">
        <SectionIndex index="04" label={labels.proof} />

        <div className="split-heading proof__grid">
          <div>
            <WordReveal text={content.title} />
            <p className="proof__attribution">{labels.proofAttribution}</p>
            <div className="client-chips">
              {content.cases.map((client, index) => (
                <ClientChip
                  client={client}
                  delayed={index === 1}
                  key={client.name}
                />
              ))}
            </div>
          </div>
          <SystemDiagram kind="proof" label={diagrams.proof} />
        </div>

        <dl className="readouts">
          {content.figures.map((figure, i) => (
            <Readout
              key={figure.label}
              {...figure}
              source={content.source}
              index={i}
            />
          ))}
        </dl>
      </div>
    </section>
  )
}

export function AllianceTeaser({
  content,
  labels,
  diagrams,
  allianceHref,
}: {
  content: typeof homeContentType.alliance
  labels: HomeLabels
  diagrams: HomeDiagrams
  allianceHref: string
}) {
  return (
    <section
      className="section section--dark alliance dark-surface"
      id="alianza"
    >
      <div className="page-shell">
        <SectionIndex index="05" label={labels.alliance} />

        <div className="split-heading">
          <WordReveal text={content.title} />
          <div>
            <p className="lead-copy">{content.body}</p>
            <a className="primary-link" href={allianceHref}>
              {content.action}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="alliance-figure">
          <SystemDiagram kind="outcome" label={diagrams.alliance} />
          <p className="alliance-legend">{labels.allianceLegend}</p>
        </div>
      </div>
    </section>
  )
}

export { FinalCTA }
