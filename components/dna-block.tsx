/**
 * DnaBlock — B · Nuestro ADN section for /sobre-escala (paper surface).
 *
 * Two columns: left = mission + vision paragraphs (Libro Ch. 1 condensed);
 * right = ten-year pull-quote (Archivo, ambre left border).
 * All copy from props (content/es/about.ts) — zero literals.
 * Spec: SPEC-P2.5 FR-3
 */

export interface DnaBlockProps {
  /** Section eyebrow: "B / NUESTRO ADN" */
  sectionEyebrow: string
  /** Bold label before the mission paragraph: "Misión." */
  missionLabel: string
  /** Mission paragraph — Libro Ch. 1 */
  mission: string
  /** Bold label before the vision paragraph: "Visión." */
  visionLabel: string
  /** Vision paragraph — Libro Ch. 1 */
  vision: string
  /** Pull-quote (right column): the ten-year question — Libro Ch. 1 */
  quote: string
}

export function DnaBlock({
  sectionEyebrow,
  missionLabel,
  mission,
  visionLabel,
  vision,
  quote,
}: DnaBlockProps) {
  return (
    <section className="dna-block">
      <div className="page-shell dna-block__inner">
        <p className="dna-block__eyebrow">{sectionEyebrow}</p>
        <div className="dna-block__grid">
          <div className="dna-block__text">
            <p className="dna-block__para">
              <strong>{missionLabel}</strong> {mission}
            </p>
            <p className="dna-block__para">
              <strong>{visionLabel}</strong> {vision}
            </p>
          </div>
          <blockquote className="dna-block__quote">{quote}</blockquote>
        </div>
      </div>
    </section>
  )
}
