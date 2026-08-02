import { homeContent } from '@/content/es/home'
import { ClaimsMarquee } from '@/components/claims-marquee'
import { ClientChip } from '@/components/client-chip'
import { FinalCTA } from '@/components/final-cta'
import { PhaseCycle } from '@/components/phase-cycle'
import { Readout } from '@/components/readout'
import { SectionIndex } from '@/components/section-index'
import { SystemDiagram } from '@/components/system-diagram'
import { Reveal, WordReveal } from '@/components/motion-runtime'
import { ANCHORS, ROUTES } from '@/lib/routes'

export function Hero({
  content,
  claims,
}: {
  content: typeof homeContent.hero
  claims: typeof homeContent.claims
}) {
  const { labels, diagrams } = homeContent

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
            <SystemDiagram kind="hero" label={diagrams.hero} />
          </div>
        </div>
      </section>

      <ClaimsMarquee claims={claims} />
    </>
  )
}

export function ProblemSection({
  content,
}: {
  content: typeof homeContent.problem
}) {
  const { labels, diagrams } = homeContent

  return (
    <section className="section section--light" id="problema">
      <div className="page-shell">
        <SectionIndex index="01" label={labels.problem} />

        <div className="problem-layout">
          <div>
            <WordReveal text={content.title} />
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
          </div>

          <div className="problem-layout__narrative">
            <Reveal>
              <p className="lead-copy">{content.body}</p>
            </Reveal>
            <SystemDiagram kind="problem" label={diagrams.problem} />
          </div>
        </div>
      </div>
    </section>
  )
}

export function ServicesPreview({
  content,
}: {
  content: typeof homeContent.services
}) {
  const { labels } = homeContent

  return (
    <section className="section section--light services" id="que-hacemos">
      <div className="page-shell">
        <SectionIndex index="02" label={labels.services} />

        <div className="split-heading">
          <WordReveal text={content.title} />
          <a className="text-link text-link--dark" href={ROUTES.SERVICES}>
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
}: {
  content: typeof homeContent.framework
}) {
  const { labels } = homeContent

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
      />
    </section>
  )
}

export function ProofSection({
  content,
}: {
  content: typeof homeContent.proof
}) {
  const { labels, diagrams } = homeContent

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
}: {
  content: typeof homeContent.alliance
}) {
  const { labels, diagrams } = homeContent

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
            <a className="primary-link" href={ROUTES.ALLIANCE}>
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
