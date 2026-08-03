import type { Metadata } from 'next'
import { ClaimsMarquee } from '@/components/claims-marquee'
import { ClientChip } from '@/components/client-chip'
import { ContactForm } from '@/components/contact-form'
import { FinalCTA } from '@/components/final-cta'
import { PageHeader } from '@/components/page-header'
import { Readout } from '@/components/readout'
import { SectionIndex } from '@/components/section-index'
import { SystemDiagram } from '@/components/system-diagram'
import { clients } from '@/content/es/clients'
import { homeContent } from '@/content/es/home'

export const metadata: Metadata = {
  title: 'Style guide | Escala Digital Ventures',
  robots: { index: false, follow: false },
}

const COLOR_SWATCHES = [
  ['Papel', 'var(--paper)'],
  ['Tinta', 'var(--ink)'],
  ['Mar', 'var(--mar)'],
  ['Abisal', 'var(--abisal)'],
  ['Ámbar', 'var(--ambre)'],
] as const

export default function StyleGuidePage() {
  const { proof, claims, finalCta } = homeContent

  return (
    <main className="styleguide">
      <header className="styleguide__hero dark-surface">
        <div className="page-shell">
          <SectionIndex index="SG" label="SISTEMA DE DISEÑO" />
          <h1>Escala UI</h1>
          <p>
            Referencia interna de tokens, componentes, estados y figuras aprobadas.
          </p>
        </div>
      </header>

      <ClaimsMarquee claims={claims} />

      <section className="styleguide__section page-shell">
        <SectionIndex index="01" label="TOKENS" />
        <h2>Color</h2>
        <div className="styleguide__swatches">
          {COLOR_SWATCHES.map(([name, value]) => (
            <figure key={name}>
              <i style={{ background: value }} />
              <figcaption>
                {name}
                <code>{value}</code>
              </figcaption>
            </figure>
          ))}
        </div>
        <h2>Tipografía</h2>
        <div className="styleguide__type">
          <p className="styleguide__display-xl">Display XL</p>
          <p className="styleguide__display-lg">Display LG</p>
          <p className="styleguide__figure">Figure</p>
          <p>
            Texto de cuerpo para explicar decisiones con claridad, ritmo y
            suficiente contraste.
          </p>
          <code>DAT.01 / MONO / LABEL</code>
        </div>
      </section>

      <section className="styleguide__section styleguide__dark dark-surface">
        <div className="page-shell">
          <SectionIndex index="02" label="DIAGRAMAS" />
          <div className="styleguide__diagrams">
            <SystemDiagram
              kind="hero"
              label="Sistema manual que se transforma en una plataforma ordenada"
            />
            <SystemDiagram
              kind="problem"
              label="Flujo operativo fragmentado entre hojas, correos y documentos"
            />
            <SystemDiagram
              kind="proof"
              label="Evolución verificada de la operación"
            />
            <SystemDiagram
              kind="outcome"
              label="Cinco alianzas, dedicación completa. Dos ocupadas."
            />
          </div>
        </div>
      </section>

      <section className="styleguide__section page-shell">
        <SectionIndex index="03" label="EVIDENCIA" />
        <div className="client-chips">
          {clients.map((client, index) => (
            <ClientChip
              client={client}
              delayed={index === 1}
              key={client.name}
            />
          ))}
        </div>
        <dl className="readouts">
          {proof.figures.map((figure, index) => (
            <Readout
              {...figure}
              source={proof.source}
              index={index}
              key={figure.label}
            />
          ))}
        </dl>
      </section>

      <section className="styleguide__section styleguide__dark dark-surface">
        <div className="page-shell">
          <SectionIndex index="04" label="FORMULARIO" />
          <div className="styleguide__forms">
            <div>
              <h2>Por defecto</h2>
              <ContactForm
                email={finalCta.email}
                success={finalCta.success}
              />
            </div>
            <div>
              <h2>Error</h2>
              <ContactForm
                email={finalCta.email}
                success={finalCta.success}
                initialState="error"
              />
            </div>
            <div>
              <h2>Confirmación</h2>
              <ContactForm
                email={finalCta.email}
                success={finalCta.success}
                initialState="success"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 05: Page template skeleton (AC-8 visual validation point) ── */}
      <section aria-label="Plantilla de página interior" style={{ borderTop: '2px solid var(--ambre)' }}>
        <div className="page-shell" style={{ paddingBlock: '3rem' }}>
          <SectionIndex index="05" label="PLANTILLA DE PÁGINA" />
          <p style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--mar)', marginBottom: '4rem' }}>
            PageHeader (ambas superficies) + Section + FinalCTA — esqueleto de página interior. AC-8.
          </p>
        </div>

        {/* PageHeader — surface: paper */}
        <PageHeader
          eyebrow="01 / CAPACIDADES"
          title="Qué hacemos y por qué funciona."
          lead="Cinco líneas de servicio orientadas a resultados. Sin relleno de tecnología, sin promesas vacías."
          surface="paper"
        />

        {/* Interior section placeholder */}
        <section className="section page-shell">
          <SectionIndex index="01" label="CONTENIDO INTERIOR" />
          <p className="lead-copy">
            Sección de contenido de página interior. Las páginas interiores usan
            el mismo vocabulario visual que la home: Section, SectionIndex,
            Reveal, y el sistema de diagramas FIG.
          </p>
        </section>

        {/* FinalCTA on paper surface for reference */}
        <FinalCTA content={finalCta} />

        {/* PageHeader — surface: abisal */}
        <PageHeader
          eyebrow="02 / MÉTODO"
          title="Cómo trabajamos."
          lead="El Escala Growth Framework conecta negocio, personas y tecnología en un ciclo continuo."
          surface="abisal"
        />
      </section>
    </main>
  )
}
