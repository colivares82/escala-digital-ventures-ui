import type { Metadata } from 'next'
import { AiBuildBlock } from '@/components/ai-build-block'
import { AllianceConstellation } from '@/components/alliance-constellation'
import { AlliancePlanes } from '@/components/alliance-planes'
import { BrandHeader } from '@/components/brand-header'
import { CapabilityGrid } from '@/components/capability-grid'
import { CaseCard } from '@/components/case-card'
import { ClaimsMarquee } from '@/components/claims-marquee'
import { ClientChip } from '@/components/client-chip'
import { CommitmentsBand } from '@/components/commitments-band'
import { ContactForm } from '@/components/contact-form'
import { DossierField } from '@/components/dossier-field'
import { ExecutionPipelineFig } from '@/components/execution-pipeline-fig'
import { ExecutionPractices } from '@/components/execution-practices'
import { FinalCTA } from '@/components/final-cta'
import { IdealClientNote } from '@/components/ideal-client-note'
import { PageHeader } from '@/components/page-header'
import { Readout } from '@/components/readout'
import { ReadoutStrip } from '@/components/readout-strip'
import { SectionIndex } from '@/components/section-index'
import { ServiceFig } from '@/components/service-fig'
import { ServiceRow } from '@/components/service-row'
import { SystemDiagram } from '@/components/system-diagram'
import { clients } from '@/content/es/clients'
import { cases } from '@/content/data/cases'
import { casesContent } from '@/content/es/cases'
import { homeContent } from '@/content/es/home'
import { sharedContent } from '@/content/es/shared'
import { getDictionary } from '@/lib/i18n/dictionary'
import { methodContent } from '@/content/es/method'
import { servicesContent } from '@/content/es/services'
import { CeremonialHeader } from '@/components/ceremonial-header'
import { ExpertiseGrid } from '@/components/expertise-grid'
import { GridBackground } from '@/components/grid-background'
import { Manifesto } from '@/components/manifesto'
import { ValuesList } from '@/components/values-list'
import { aboutContent } from '@/content/es/about'
import { allianceContent } from '@/content/es/alliance'
import { AnchorNav } from '@/components/anchor-nav'
import { LegalDoc } from '@/components/legal-doc'
import { legalContent } from '@/content/es/legal'
import { privacyContent } from '@/content/es/privacy'

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

const esDict = getDictionary('es')

export default function StyleGuidePage() {
  const { proof, claims } = homeContent

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

      <ClaimsMarquee claims={claims} ariaLabel={sharedContent.accessibility.keyMessages} />

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
          {proof.readouts.map((readout, index) => (
            <Readout
              key={readout.label}
              label={readout.label}
              value={readout.value}
              kind={readout.kind}
              caption={readout.caption}
              plotVariant={readout.plotVariant}
              index={index}
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
              <ContactForm copy={sharedContent.contactForm} privacyHref="/privacidad" email={sharedContent.finalCta.email} />
            </div>
            <div>
              <h2>Error</h2>
              <ContactForm copy={sharedContent.contactForm} privacyHref="/privacidad" email={sharedContent.finalCta.email} initialState="error" />
            </div>
            <div>
              <h2>Confirmación</h2>
              <ContactForm copy={sharedContent.contactForm} privacyHref="/privacidad" email={sharedContent.finalCta.email} initialState="success" />
            </div>
            <div>
              <h2>Dossier (confirmación)</h2>
              <ContactForm
                copy={sharedContent.contactForm}
                privacyHref="/privacidad"
                email={sharedContent.finalCta.email}
                variant="dossier"
                dossierRef="ESCALA · REF. CONTACTO"
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
        <FinalCTA dict={esDict} locale="es" />

        {/* PageHeader — surface: abisal */}
        <PageHeader
          eyebrow="02 / MÉTODO"
          title="Cómo trabajamos."
          lead="El Escala Growth Framework conecta negocio, personas y tecnología en un ciclo continuo."
          surface="abisal"
        />
      </section>

      {/* ── Section 06: Phase 2.1 components (SPEC-P2.1 AC-8) ── */}
      <section aria-label="Componentes Fase 2.1" style={{ borderTop: '2px solid var(--ambre)' }}>
        <div className="page-shell" style={{ paddingBlock: '3rem' }}>
          <SectionIndex index="06" label="COMPONENTES FASE 2.1" />
          <p style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--mar)', marginBottom: '2rem' }}>
            ExecutionPractices · ExecutionPipelineFig · AiBuildBlock — SPEC-P2.1 AC-8.
          </p>
        </div>

        {/* ExecutionPractices — 2 sample panels */}
        <ExecutionPractices
          sectionIndex={methodContent.executionPractices.sectionIndex}
          sectionLabel={methodContent.executionPractices.sectionEyebrow}
          title={methodContent.executionPractices.title}
          lead={methodContent.executionPractices.lead}
          practices={methodContent.executionPractices.practices.slice(0, 2)}
        />

        {/* ExecutionPipelineFig — FIG.06 (PROVISIONAL VISUAL) */}
        <ExecutionPipelineFig
          sectionIndex={methodContent.pipeline.sectionIndex}
          sectionLabel={methodContent.pipeline.sectionEyebrow}
          sectionTitle={methodContent.pipeline.sectionTitle}
          nodes={methodContent.pipeline.nodes}
          caption={methodContent.pipeline.caption}
          legend={methodContent.pipeline.legend}
          ariaLabel={methodContent.pipeline.ariaLabel}
          returnArcLabel={methodContent.pipeline.returnArcLabel}
        />

        {/* AiBuildBlock — sober, no protagonist */}
        <AiBuildBlock
          sectionIndex={methodContent.aiBuild.sectionIndex}
          sectionLabel={methodContent.aiBuild.sectionEyebrow}
          title={methodContent.aiBuild.title}
          lead={methodContent.aiBuild.lead}
          points={methodContent.aiBuild.points}
          diagram={methodContent.aiBuild.diagram}
        />
      </section>

      {/* ── Section 07: Phase 2.2 components (SPEC-P2.2 AC-8/AC-9) ── */}
      <section aria-label="Componentes Fase 2.2" style={{ borderTop: '2px solid var(--ambre)' }}>
        <div className="page-shell" style={{ paddingBlock: '3rem' }}>
          <SectionIndex index="07" label="COMPONENTES FASE 2.2" />
          <p style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--mar)', marginBottom: '2rem' }}>
            ServiceFig (5 variantes) · ServiceRow (1 muestra) · IdealClientNote — SPEC-P2.2 AC-9.
          </p>

          {/* ServiceFig family — all five variants together for visual QA of coherence (AC-4) */}
          <h2 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 600, fontSize: '1.25rem', marginBottom: '1.5rem' }}>
            ServiceFig — familia de cinco variantes
          </h2>
          <p style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '0.62rem', color: 'var(--mar)', marginBottom: '2rem' }}>
            DRAFT VISUAL — iterated per service (PLAN 2.2). Cambiar una variante no afecta a las demás. AC-5.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            {servicesContent.services.map((svc) => (
              <div key={svc.index} style={{ border: '1px solid var(--line)', padding: '1.5rem' }}>
                <p style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '0.6rem', color: 'var(--mar)', marginBottom: '1rem', letterSpacing: '0.06em' }}>
                  {svc.index} — {svc.figVariant.toUpperCase()}
                </p>
                <ServiceFig
                  variant={svc.figVariant}
                  labels={svc.figLabels}
                  caption={svc.figCaption}
                />
              </div>
            ))}
          </div>

          {/* ServiceRow — one sample (service 01) */}
          <h2 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 600, fontSize: '1.25rem', marginBottom: '1.5rem' }}>
            ServiceRow — muestra (servicio 01)
          </h2>
          <div style={{ marginBottom: '4rem' }}>
            <ServiceRow
              index={servicesContent.services[0]!.index}
              title={servicesContent.services[0]!.title}
              problem={servicesContent.services[0]!.problem}
              problemPrefix={servicesContent.pageHeader.problemPrefix}
              deliverable={servicesContent.services[0]!.deliverable}
              isLast
              fig={
                <ServiceFig
                  variant={servicesContent.services[0]!.figVariant}
                  labels={servicesContent.services[0]!.figLabels}
                  caption={servicesContent.services[0]!.figCaption}
                />
              }
            />
          </div>
        </div>

        {/* IdealClientNote — abisal section sample */}
        <IdealClientNote
          eyebrow={servicesContent.idealClient.eyebrow}
          sectionIndex="B"
          title={servicesContent.idealClient.title}
          body={servicesContent.idealClient.body}
          cta={servicesContent.idealClient.cta}
          ctaHref="#contacto"
        />
      </section>

      {/* ── Section 08: Phase 2.3 — Casos de éxito (SPEC-P2.3 AC-8) ── */}
      <section className="styleguide__section page-shell">
        <SectionIndex index="08" label="CASOS DE ÉXITO — EXPEDIENTE TÉCNICO" />

        {/* CaseCard index grid — both cases */}
        <h2 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 600, fontSize: '1.25rem', marginBottom: '1rem' }}>
          CaseCard — índice de expedientes
        </h2>
        <p style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '0.65rem', color: 'var(--mar)', marginBottom: '2rem' }}>
          Grid 2 columnas · data-driven · añadir un 3er caso solo requiere datos
        </p>
        <div className="cases-index-grid" style={{ marginBottom: '4rem' }}>
          {[...cases].sort((a, b) => a.order - b.order).map((c) => (
            <CaseCard
              key={c.slug}
              caseStudy={c}
              locale="es"
              expedienteLabel={casesContent.card.expedienteLabel}
              openLabel={casesContent.card.openLabel}
            />
          ))}
        </div>

        {/* BrandHeader — real logo (MAGUPELL) */}
        <h2 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 600, fontSize: '1.25rem', marginBottom: '1rem' }}>
          BrandHeader — con logo real (MAGUPELL)
        </h2>
        <div style={{ border: '1px solid var(--line)', padding: '2rem', marginBottom: '2rem' }}>
          <BrandHeader
            sector={cases[0]!.sector}
            brand={cases[0]!.brand}
            title={cases[0]!.content.es.title}
            plate={cases[0]!.plate}
            visitLabel={casesContent.visitLabel}
          />
        </div>

        {/* BrandHeader — placeholder state (null logo) */}
        <h2 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 600, fontSize: '1.25rem', marginBottom: '1rem' }}>
          BrandHeader — estado placeholder (logo nulo)
        </h2>
        <div style={{ border: '1px solid var(--line)', padding: '2rem', marginBottom: '3rem' }}>
          <BrandHeader
            sector="EXPEDIENTE 03 · SECTOR EJEMPLO"
            brand={{ name: 'CLIENTE FUTURO', logo: null, url: 'https://ejemplo.com' }}
            title="Placeholder para un futuro expediente"
            plate="FIG. EXP-03\nESCALA · 2026"
            visitLabel={casesContent.visitLabel}
          />
        </div>

        {/* ReadoutStrip — 4 columns (data-forward) */}
        <h2 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 600, fontSize: '1.25rem', marginBottom: '0.5rem' }}>
          ReadoutStrip — 4 columnas (data-forward, MAGUPELL)
        </h2>
        <ReadoutStrip readouts={cases[0]!.readouts} />

        {/* ReadoutStrip — 2 columns (capability-forward) */}
        <h2 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 600, fontSize: '1.25rem', marginBottom: '0.5rem', marginTop: '3rem' }}>
          ReadoutStrip — 2 columnas (capability-forward, BioZero)
        </h2>
        <ReadoutStrip readouts={cases[1]!.readouts} />

        {/* CapabilityGrid */}
        <h2 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 600, fontSize: '1.25rem', marginBottom: '0.5rem', marginTop: '3rem' }}>
          CapabilityGrid — BioZero (3 capacidades)
        </h2>
        {cases[1]!.capabilities && (
          <CapabilityGrid
            sectionLabel={casesContent.capabilitiesLabel}
            capabilities={cases[1]!.capabilities}
          />
        )}

        {/* DossierField samples */}
        <h2 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 600, fontSize: '1.25rem', marginBottom: '0.5rem', marginTop: '3rem' }}>
          DossierField — campos de expediente
        </h2>
        <div style={{ marginBottom: '4rem' }}>
          {cases[0]!.fields.map((field, idx) => (
            <DossierField
              key={field.key}
              num={String(idx + 1).padStart(2, '0')}
              fieldKey={field.key}
              body={field.body}
            />
          ))}
        </div>
      </section>

      {/* ── Section 09: Phase 2.4 — Modelo de alianza (SPEC-P2.4 AC-9) ── */}
      <section aria-label="Componentes Fase 2.4" style={{ borderTop: '2px solid var(--ambre)' }}>
        <div className="page-shell" style={{ paddingBlock: '3rem' }}>
          <SectionIndex index="09" label="MODELO DE ALIANZA — FASE 2.4" />
          <p style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--mar)', marginBottom: '2rem' }}>
            AllianceConstellation (compact + large) · AlliancePlanes · CommitmentsBand — SPEC-P2.4 AC-9.
          </p>

          {/* AllianceConstellation — compact instance (as on home, inside dark band) */}
          <h2 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 600, fontSize: '1.25rem', marginBottom: '1rem' }}>
            AllianceConstellation — compact (280px, home)
          </h2>
        </div>

        <div className="dark-surface" style={{ padding: '4rem 0', display: 'flex', justifyContent: 'center' }}>
          <AllianceConstellation
            seats={allianceContent.seats}
            size="compact"
            ariaLabel={allianceContent.whyFive.constellationAria}
          />
        </div>

        <div className="page-shell" style={{ paddingBlock: '3rem' }}>
          {/* AllianceConstellation — large instance (as on /modelo-de-alianza) */}
          <h2 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 600, fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2rem' }}>
            AllianceConstellation — large (420px, /modelo-de-alianza)
          </h2>
        </div>

        <div className="dark-surface" style={{ padding: '4rem 0', display: 'flex', justifyContent: 'center' }}>
          <AllianceConstellation
            seats={allianceContent.seats}
            size="large"
            ariaLabel={allianceContent.whyFive.constellationAria}
          />
        </div>
      </section>

      {/* AlliancePlanes — full section */}
      <AlliancePlanes
        sectionEyebrow={allianceContent.planes.sectionEyebrow}
        heading={allianceContent.planes.heading}
        lead={allianceContent.planes.lead}
        items={allianceContent.planes.items}
      />

      {/* CommitmentsBand — full section */}
      <CommitmentsBand
        sectionEyebrow={allianceContent.commitments.sectionEyebrow}
        heading={allianceContent.commitments.heading}
        items={allianceContent.commitments.items}
      />

      {/* ── Section 10: Phase 2.5 — Sobre Escala (SPEC-P2.5 AC-10) ── */}
      <section aria-label="Componentes Fase 2.5" style={{ borderTop: '2px solid var(--ambre)' }}>
        <div className="page-shell" style={{ paddingBlock: '3rem' }}>
          <SectionIndex index="10" label="SOBRE ESCALA — FASE 2.5" />
          <p style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--mar)', marginBottom: '2rem' }}>
            CeremonialHeader · ValuesList · GridBackground · ExpertiseGrid (6 micro-figs) · Manifesto — SPEC-P2.5 AC-10.
          </p>
        </div>

        {/* CeremonialHeader — oversized H1, brand-document tone */}
        <div style={{ borderBottom: '1px solid var(--line)', marginBottom: '3rem' }}>
          <p style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '0.65rem', color: 'var(--mar)', padding: '0 max(1.5rem, calc((100vw - 88rem) / 2)) 1rem' }}>
            CeremonialHeader — NOT the standard PageHeader (deliberate: brand-document tone)
          </p>
          <CeremonialHeader
            kicker={aboutContent.ceremonial.kicker}
            h1={aboutContent.ceremonial.h1}
            sub={aboutContent.ceremonial.sub}
          />
        </div>

        {/* ValuesList — five editorial rows */}
        <div className="page-shell" style={{ paddingBottom: '1rem' }}>
          <p style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '0.65rem', color: 'var(--mar)', marginBottom: '1rem' }}>
            ValuesList — cinco filas editoriales numeradas
          </p>
        </div>
        <ValuesList
          sectionEyebrow={aboutContent.values.sectionEyebrow}
          items={aboutContent.values.items}
        />

        {/* GridBackground — options demo (abisal band) */}
        <div
          style={{
            position: 'relative',
            background: 'var(--abisal)',
            padding: '3rem max(1.5rem, calc((100vw - 88rem) / 2))',
            marginTop: '2rem',
          }}
        >
          <GridBackground />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '0.65rem', color: 'var(--ambre)', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>
              GridBackground — default (cellSize=3rem, lineOpacity=0.05, radialGradient=true)
            </p>
            <p style={{ color: 'var(--paper)', opacity: 0.7, margin: 0 }}>
              Reusable abisal grid overlay. Place as first child of position:relative section.
            </p>
          </div>
        </div>
        <div
          style={{
            position: 'relative',
            background: 'var(--abisal)',
            padding: '3rem max(1.5rem, calc((100vw - 88rem) / 2))',
            marginTop: '1px',
          }}
        >
          <GridBackground cellSize="6rem" lineOpacity={0.08} radialGradient={false} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '0.65rem', color: 'var(--ambre)', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>
              GridBackground — cellSize=6rem, lineOpacity=0.08, radialGradient=false
            </p>
            <p style={{ color: 'var(--paper)', opacity: 0.7, margin: 0 }}>
              Larger cells, higher opacity, no radial gradient.
            </p>
          </div>
        </div>

        {/* ExpertiseGrid — full 6-area grid with micro-figs */}
        <ExpertiseGrid
          sectionEyebrow={aboutContent.expertise.sectionEyebrow}
          heading={aboutContent.expertise.heading}
          lead={aboutContent.expertise.lead}
          areas={aboutContent.expertise.areas}
          divider={aboutContent.divider}
        />

        {/* Manifesto — 10 strata plates (3 plates shown for styleguide brevity) */}
        <div className="page-shell" style={{ paddingTop: '3rem' }}>
          <p style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '0.65rem', color: 'var(--mar)', marginBottom: '1rem' }}>
            Manifesto — 10 láminas estrato con barra ámbar. Aquí se muestran todas las 10.
          </p>
        </div>
        <Manifesto
          sectionEyebrow={aboutContent.manifesto.sectionEyebrow}
          heading={aboutContent.manifesto.heading}
          lead={aboutContent.manifesto.lead}
          beliefs={aboutContent.manifesto.beliefs}
          colivaresLine={aboutContent.colivaresLine}
        />
      </section>

      {/* ── Section 11: Phase 4 — Legal doc + AnchorNav (SPEC-P4 AC-2) ── */}
      <section aria-label="Componentes Fase 4 — Legal" style={{ borderTop: '2px solid var(--ambre)' }}>
        <div className="page-shell" style={{ paddingBlock: '3rem' }}>
          <SectionIndex index="11" label="LEGAL DOC — FASE 4" />
          <p style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--mar)', marginBottom: '2rem' }}>
            LegalDoc + AnchorNav — layout dos columnas (ancla lateral + columna ≤70ch). SPEC-P4 AC-2.
          </p>

          {/* AnchorNav — standalone demo */}
          <h2 style={{ fontFamily: 'var(--font-archivo)', fontWeight: 600, fontSize: '1.25rem', marginBottom: '1rem' }}>
            AnchorNav — navegación lateral
          </h2>
          <div style={{ maxWidth: '230px', border: '1px solid var(--line)', padding: '1.5rem', marginBottom: '3rem' }}>
            <AnchorNav
              label="EN ESTA PÁGINA"
              items={legalContent.sections.map((s) => ({ id: s.id, index: s.index, name: s.name }))}
            />
          </div>
        </div>

        {/* LegalDoc — /aviso-legal */}
        <div style={{ borderTop: '1px solid var(--line)', marginBottom: '2rem' }}>
          <div className="page-shell" style={{ paddingTop: '2rem' }}>
            <p style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '0.65rem', color: 'var(--mar)', marginBottom: '1rem' }}>
              LegalDoc — /aviso-legal (5 secciones, placeholders visibles en ámbar)
            </p>
          </div>
          <LegalDoc content={legalContent} />
        </div>

        {/* LegalDoc — /privacidad */}
        <div style={{ borderTop: '1px solid var(--line)' }}>
          <div className="page-shell" style={{ paddingTop: '2rem' }}>
            <p style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '0.65rem', color: 'var(--mar)', marginBottom: '1rem' }}>
              LegalDoc — /privacidad (6 secciones, sin cookies de seguimiento)
            </p>
          </div>
          <LegalDoc content={privacyContent} />
        </div>
      </section>
    </main>
  )
}
