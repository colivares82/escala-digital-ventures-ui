/**
 * MethodPage — /como-trabajamos.
 * Sections: A·PageHeader (paper) → B·ExecutionCycleFig (abisal) → C·ExecutionPractices (paper)
 *            → D·AiBuildBlock (abisal) → E·PhaseCycle (abisal) → FinalCTA.
 * B/C order is an approved deliberate deviation from SPEC-POLISH-06 §1.1 (which had the
 * execution-cycle figure AFTER the practices) — Carlos requested "El flujo de ejecución"
 * before "La ejecución, en el día a día" post-implementation. The Escala Growth Framework
 * (PhaseCycle) remains the LAST content section before FinalCTA per §1 — its own
 * copy/component/figure content is unchanged, only its position and section letter moved.
 * All copy from content dictionary via props (zero literals in JSX).
 * Phases shared from dict.home.framework.phases — no duplication (FR-3.2).
 * Spec: SPEC-POLISH-06
 */

import { AiBuildBlock } from '@/components/ai-build-block'
import { ExecutionCycleFig } from '@/components/execution-cycle-fig'
import { ExecutionPractices } from '@/components/execution-practices'
import { FinalCTA } from '@/components/final-cta'
import { PageHeader } from '@/components/page-header'
import { PhaseCycle } from '@/components/phase-cycle'
import { getPath } from '@/lib/i18n/routes'
import type { Dictionary } from '@/lib/i18n/dictionary'
import type { Locale } from '@/lib/i18n/types'

export function MethodPage({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const { method } = dict
  // Phases shared from dict.home.framework.phases — no duplication (FR-3.2)
  const phases = dict.home.framework.phases

  return (
    <>
      {/* A · PageHeader (paper surface) */}
      <PageHeader
        eyebrow={method.pageHeader.eyebrow}
        title={method.pageHeader.title}
        lead={method.pageHeader.lead}
        surface="paper"
      />

      {/* B · De la especificación al feedback / FIG.06 (abisal) — closed execution cycle */}
      <ExecutionCycleFig
        sectionIndex={method.pipeline.sectionIndex}
        sectionLabel={method.pipeline.sectionEyebrow}
        sectionTitle={method.pipeline.sectionTitle}
        lead={method.pipeline.lead}
        stations={method.pipeline.stations}
        centre={method.pipeline.centre}
        returnLabel={method.pipeline.returnLabel}
        caption={method.pipeline.caption}
        ariaLabel={method.pipeline.ariaLabel}
      />

      {/* C · La ejecución, en el día a día (paper) */}
      <ExecutionPractices
        sectionIndex={method.executionPractices.sectionIndex}
        sectionLabel={method.executionPractices.sectionEyebrow}
        title={method.executionPractices.title}
        lead={method.executionPractices.lead}
        practices={method.executionPractices.practices}
      />

      {/* D · Ingeniería con criterio, acelerada por agentes / FIG.12 (abisal) */}
      <AiBuildBlock
        sectionIndex={method.aiBuild.sectionIndex}
        sectionLabel={method.aiBuild.sectionEyebrow}
        title={method.aiBuild.title}
        body={method.aiBuild.body}
        figure={method.aiBuild.figure}
        legend={method.aiBuild.legend}
      />

      {/* E · Un método propio: el Escala Growth Framework (abisal) — moved per §1 */}
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

      <FinalCTA dict={dict} locale={locale} />
    </>
  )
}
