/**
 * AboutPage — /sobre-escala (Phase 2.5).
 *
 * Page structure per SPEC-P2.5 §3 (tone descends ceremonial → technical):
 *   A · CeremonialHeader (paper) — oversized H1, kicker, sub
 *   B · DnaBlock (paper) — mission/vision + ten-year pull-quote
 *   C · ValuesList (paper) — five numbered editorial rows
 *   ← tone-shift divider embedded in ExpertiseGrid (section D) →
 *   D · ExpertiseGrid (abisal) — 6 areas with micro-figs + GridBackground
 *   E · Manifesto (abisal) — 10 strata plates + colivares.com line + GridBackground
 *   FinalCTA (abisal, reused)
 *
 * All copy from content/es/about.ts via Dictionary props — zero literals.
 * Exactly one H1 on the page (CeremonialHeader). D/E use H2.
 * Spec: SPEC-P2.5 FR-1 through FR-8
 */

import { CeremonialHeader } from '@/components/ceremonial-header'
import { DnaBlock } from '@/components/dna-block'
import { ValuesList } from '@/components/values-list'
import { ExpertiseGrid } from '@/components/expertise-grid'
import { Manifesto } from '@/components/manifesto'
import { FinalCTA } from '@/components/final-cta'
import type { Dictionary } from '@/lib/i18n/dictionary'

export function AboutPage({ dict }: { dict: Dictionary }) {
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
      {/* A · CeremonialHeader — oversized, brand-document tone (paper) */}
      <CeremonialHeader
        kicker={ceremonial.kicker}
        h1={ceremonial.h1}
        sub={ceremonial.sub}
      />

      {/* B · Nuestro ADN — mission/vision + pull-quote (paper) */}
      <DnaBlock
        sectionEyebrow={dna.sectionEyebrow}
        missionLabel={dna.missionLabel}
        mission={dna.mission}
        visionLabel={dna.visionLabel}
        vision={dna.vision}
        quote={dna.quote}
      />

      {/* C · Valores — five numbered editorial rows (paper) */}
      <ValuesList
        sectionEyebrow={values.sectionEyebrow}
        items={values.items}
      />

      {/* D · La experiencia detrás de Escala (abisal + GridBackground) */}
      {/* tone-shift divider is embedded inside ExpertiseGrid */}
      <ExpertiseGrid
        sectionEyebrow={expertise.sectionEyebrow}
        heading={expertise.heading}
        lead={expertise.lead}
        areas={expertise.areas}
        divider={divider}
      />

      {/* E · El Manifiesto (abisal + GridBackground) + colivares.com line */}
      <Manifesto
        sectionEyebrow={manifesto.sectionEyebrow}
        heading={manifesto.heading}
        lead={manifesto.lead}
        beliefs={manifesto.beliefs}
        colivaresLine={colivaresLine}
      />

      {/* FinalCTA — reused (abisal) */}
      <FinalCTA />
    </>
  )
}
