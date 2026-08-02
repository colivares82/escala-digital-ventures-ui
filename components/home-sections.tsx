import type { homeContent } from '@/content/es/home'
import { FrameworkDiagram, HeroSystemDiagram, ProblemDiagram, ProofChart } from '@/components/system-diagrams'

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <p className={dark ? 'eyebrow eyebrow--dark' : 'eyebrow'}>{children}</p>
}

export function Hero({ content }: { content: typeof homeContent.hero }) {
  return (
    <section className='surface-dark hero-section' id='hero'>
      <div className='section-container hero-grid'>
        <div className='hero-copy'>
          <Eyebrow dark>{content.eyebrow}</Eyebrow>
          <h1 className='display-title hero-title'>{content.title}</h1>
          <p className='hero-lead'>{content.description}</p>
          <div className='action-row'>
            <a className='button button--amber' href='#contacto'>{content.primaryCta}</a>
            <a className='text-link text-link--dark' href='#metodo'>{content.secondaryCta}</a>
          </div>
        </div>
        <HeroSystemDiagram />
      </div>
    </section>
  )
}

export function ProblemSection({ content }: { content: typeof homeContent.problem }) {
  return (
    <section className='surface-light content-section' id='problema'>
      <div className='section-container section-grid'>
        <div className='section-copy'>
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h2 className='display-title section-title'>{content.title}</h2>
          <p className='section-body'>{content.body}</p>
        </div>
        <ProblemDiagram />
      </div>
    </section>
  )
}

export function FrameworkSection({ content }: { content: typeof homeContent.framework }) {
  return (
    <section className='surface-light framework-section' id='metodo'>
      <div className='section-container'>
        <div className='framework-heading'>
          <div className='section-copy'>
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h2 className='display-title section-title'>{content.title}</h2>
          </div>
          <p className='section-body'>{content.description}</p>
        </div>
        <FrameworkDiagram phases={content.phases} />
      </div>
    </section>
  )
}

export function ProofSection({ content }: { content: typeof homeContent.proof }) {
  return (
    <section className='surface-dark proof-section' id='prueba'>
      <div className='section-container'>
        <div className='proof-heading'>
          <div className='section-copy'>
            <Eyebrow dark>{content.eyebrow}</Eyebrow>
            <h2 className='display-title section-title'>{content.title}</h2>
          </div>
          <p className='proof-client'>{content.client}</p>
        </div>
        <div className='proof-grid'>
          <ProofChart />
          <dl className='readout-grid'>
            {content.figures.map((figure) => (
              <div className='readout' key={figure.label}>
                <dt>{figure.label}</dt>
                <dd>{figure.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

export function FinalCta({ content }: { content: typeof homeContent.finalCta }) {
  return (
    <section className='surface-light final-cta' id='contacto'>
      <div className='section-container final-cta__inner'>
        <p className='eyebrow'>04 · CONVERSEMOS</p>
        <h2 className='display-title final-cta__title'>{content.title}</h2>
        <div className='final-cta__footer'>
          <p className='section-body'>{content.body}</p>
          <a className='button button--mar' href='mailto:hola@escaladigitalventures.com'>{content.action}</a>
        </div>
      </div>
    </section>
  )
}
