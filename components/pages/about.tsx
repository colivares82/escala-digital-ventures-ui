/**
 * AboutPage — /sobre-escala (Phase 2.5).
 * All copy from content/es/about.ts via Dictionary props — zero literals.
 * Spec: SPEC-P2.5 FR-1 through FR-8
 */

import { CeremonialHeader } from '@/components/ceremonial-header'
import { DnaBlock } from '@/components/dna-block'
import { ValuesList } from '@/components/values-list'
import { ExpertiseGrid } from '@/components/expertise-grid'
import { Manifesto } from '@/components/manifesto'
import { FinalCTA } from '@/components/final-cta'
import type { Dictionary } from '@/lib/i18n/dictionary'
import type { Locale } from '@/lib/i18n/types'

export function AboutPage({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const { about } = dict
  const {
    ceremonial,
    dna,
    values,
    divider,
    expertise,
    manifesto,
    colivaresLine,
  } = about

  return (
    <>
      <CeremonialHeader
        kicker={ceremonial.kicker}
        h1={ceremonial.h1}
        sub={ceremonial.sub}
      />

      <DnaBlock
        sectionEyebrow={dna.sectionEyebrow}
        missionLabel={dna.missionLabel}
        mission={dna.mission}
        visionLabel={dna.visionLabel}
        vision={dna.vision}
        quote={dna.quote}
      />

      <ValuesList
        sectionEyebrow={values.sectionEyebrow}
        items={values.items}
      />

      <ExpertiseGrid
        sectionEyebrow={expertise.sectionEyebrow}
        heading={expertise.heading}
        lead={expertise.lead}
        areas={expertise.areas}
        divider={divider}
      />

      <Manifesto
        sectionEyebrow={manifesto.sectionEyebrow}
        heading={manifesto.heading}
        lead={manifesto.lead}
        beliefs={manifesto.beliefs}
        colivaresLine={colivaresLine}
      />

      <FinalCTA dict={dict} locale={locale} />
    </>
  )
}
