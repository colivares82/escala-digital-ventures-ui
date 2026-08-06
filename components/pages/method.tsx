/**
 * MethodPage — /como-trabajamos (Phase 2.1).
 * Sections: A·PageHeader (paper) → B·PhaseCycle (abisal) → C·ExecutionPractices (paper)
 *            → D·ExecutionPipelineFig (abisal) → E·AiBuildBlock (abisal) → FinalCTA.
 * All copy from content dictionary via props (zero literals in JSX).
 * Spec: SPEC-P2.1
 */

import { AiBuildBlock } from '@/components/ai-build-block'
import { ExecutionPipelineFig } from '@/components/execution-pipeline-fig'
import { ExecutionPractices } from '@/components/execution-practices'
import { FinalCTA } from '@/components/final-cta'
import { PageHeader } from '@/components/page-header'
import { PhaseCycle } from '@/components/phase-cycle'
import { homeContent } from '@/content/es/home'
import type { Dictionary } from '@/lib/i18n/dictionary'

export function MethodPage({ dict }: { dict: Dictionary }) {
  const { method } = dict
  // Phases shared from homeContent.framework.phases — no duplication (FR-3.2)
  const phases = homeContent.framework.phases

  return (
    <>
      {/* A · PageHeader (paper surface) */}
      <PageHeader
        eyebrow={method.pageHeader.eyebrow}
        title={method.pageHeader.title}
        lead={method.pageHeader.lead}
        surface="paper"
      />

      {/* B · El Ciclo de Crecimiento (abisal) — reused PhaseCycle, unchanged internals */}
      <section className="section section--dark dark-surface framework-cycle">
        <PhaseCycle
          phases={phases}
          title={method.phaseCycle.title}
          sectionLabel={method.phaseCycle.sectionEyebrow}
          sectionIndex={method.phaseCycle.sectionIndex}
          lead={method.phaseCycle.lead}
          ariaLabel={method.phaseCycle.ariaLabel}
          phasePrefix={method.phaseCycle.phasePrefix}
          // action intentionally omitted — self-link suppressed on the method page (FR-3.3)
        />
      </section>

      {/* C · La ejecución, en el día a día (paper) */}
      <ExecutionPractices
        sectionIndex={method.executionPractices.sectionIndex}
        sectionLabel={method.executionPractices.sectionEyebrow}
        title={method.executionPractices.title}
        lead={method.executionPractices.lead}
        practices={method.executionPractices.practices}
      />

      {/* D · El flujo de ejecución / FIG.06 (abisal) — PROVISIONAL VISUAL */}
      <ExecutionPipelineFig
        sectionIndex={method.pipeline.sectionIndex}
        sectionLabel={method.pipeline.sectionEyebrow}
        sectionTitle={method.pipeline.sectionTitle}
        nodes={method.pipeline.nodes}
        caption={method.pipeline.caption}
        legend={method.pipeline.legend}
        ariaLabel={method.pipeline.ariaLabel}
        returnArcLabel={method.pipeline.returnArcLabel}
      />

      {/* E · Cómo construimos (abisal) */}
      <AiBuildBlock
        sectionIndex={method.aiBuild.sectionIndex}
        sectionLabel={method.aiBuild.sectionEyebrow}
        title={method.aiBuild.title}
        lead={method.aiBuild.lead}
        points={method.aiBuild.points}
        diagram={method.aiBuild.diagram}
      />

      {/* FinalCTA — reused, embedded ContactForm (Phase 3 will switch to /contacto link) */}
      <FinalCTA />
    </>
  )
}
