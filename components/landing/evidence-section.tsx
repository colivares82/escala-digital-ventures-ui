/**
 * § 04 Evidencia — home only (HOME-V2 §B.3). Bridge "ilustrativo → real".
 *
 * Reuses the existing Readout and ClientChip components with their existing
 * copy. Only DAT.01 / 02 / 04 / 05 render; DAT.03, DAT.06 and the FIG.04
 * timeline stay on the case detail page. The original `index` is passed
 * so the DAT.NN labels keep their numbering.
 */
import { ClientChip } from '@/components/client-chip'
import { GridBackground } from '@/components/grid-background'
import { Readout } from '@/components/readout'
import type { Client } from '@/content/es/clients'
import type { HomeEvidenceContent } from '@/content/types'
import { SectionHead } from './section-head'

/** Zero-based positions of DAT.01, DAT.02, DAT.04 and DAT.05 in proof.readouts. */
export const HOME_EVIDENCE_READOUTS = [0, 1, 3, 4] as const

export interface EvidenceReadout {
  readonly label: string
  readonly value: string
  readonly kind: 'number' | 'phrase'
  readonly caption: string
  readonly plotVariant: string
}

export function EvidenceSection({
  content,
  title,
  readouts,
  cases,
}: {
  content: HomeEvidenceContent
  /** H2 — existing `home.proof.title` («Hechos, no promesas.»). */
  title: string
  readouts: ReadonlyArray<EvidenceReadout>
  /** Case links with locale-resolved hrefs. */
  cases: ReadonlyArray<Client>
}) {
  return (
    <section className="section section--dark dark-surface oport-section oport-section--dark home-evidence">
      <GridBackground />
      <div className="page-shell oport-section__inner">
        <SectionHead sectionIndex={content.sectionIndex} title={title} lead={content.lead} />
        <dl className="readouts home-evidence__readouts">
          {HOME_EVIDENCE_READOUTS.map((i) => {
            const r = readouts[i]
            return r ? (
              <Readout
                key={r.label}
                label={r.label}
                value={r.value}
                kind={r.kind}
                caption={r.caption}
                plotVariant={r.plotVariant}
                index={i}
              />
            ) : null
          })}
        </dl>
        <div className="client-chips home-evidence__cases">
          {cases.map((client, index) => (
            <ClientChip client={client} delayed={index === 1} key={client.name} />
          ))}
        </div>
      </div>
    </section>
  )
}
