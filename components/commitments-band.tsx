/**
 * CommitmentsBand — horizontal band of 5 alliance commitments (Section D).
 *
 * Renders as a bordered grid of 5 equal cells on a paper surface.
 * Each cell: mono ordinal number (mar), mono tag (ambre-dk, AA on paper),
 * body copy, and an ambre tick at the bottom. Reads as a "carta de garantías".
 * Mobile (<768px): collapses to a vertical stack.
 *
 * Commitment 01 MUST use the "A MEDIDA" corrected framing (§0 / FR-6).
 * This component does NOT enforce that — the content dictionary does.
 *
 * All copy received via props — zero literals.
 * Spec: SPEC-P2.4 FR-5
 */

import type { AllianceCommitment } from '@/content/types'
import { Reveal } from '@/components/motion-runtime'

export interface CommitmentsBandProps {
  sectionEyebrow: string
  heading: string
  /** Exactly 5 commitments. items[0].tag must be "A MEDIDA". */
  items: ReadonlyArray<AllianceCommitment>
}

export function CommitmentsBand({
  sectionEyebrow,
  heading,
  items,
}: CommitmentsBandProps) {
  return (
    <section className="commitments-band">
      <div className="page-shell commitments-band__inner">
        <p className="commitments-band__eyebrow">{sectionEyebrow}</p>
        <h2 className="commitments-band__heading">{heading}</h2>

        <div className="commitments-band__grid">
          {items.map((c) => (
            <Reveal key={c.n}>
              <div className="commitments-band__cell">
                <span className="commitments-band__number">{c.n}</span>
                <span className="commitments-band__tag">{c.tag}</span>
                <p className="commitments-band__body">{c.body}</p>
                {/* Ambre tick — decorative confirmation mark at cell bottom */}
                <span className="commitments-band__tick" aria-hidden="true" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
