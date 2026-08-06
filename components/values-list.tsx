/**
 * ValuesList — C · Valores section for /sobre-escala (paper surface).
 *
 * Five numbered editorial rows (three-column: number / title / body),
 * separated by 1px top rules. Libro Ch. 1 copy, all from props.
 * Spec: SPEC-P2.5 FR-4
 */

export interface ValuesListItem {
  /** Zero-padded ordinal: "01"–"05" */
  n: string
  title: string
  body: string
}

export interface ValuesListProps {
  /** Section eyebrow: "C / VALORES" */
  sectionEyebrow: string
  /** Exactly 5 value rows. */
  items: ReadonlyArray<ValuesListItem>
}

export function ValuesList({ sectionEyebrow, items }: ValuesListProps) {
  return (
    <section className="values-list">
      <div className="page-shell values-list__inner">
        <p className="values-list__eyebrow">{sectionEyebrow}</p>
        <div className="values-list__rows">
          {items.map(({ n, title, body }) => (
            <div key={n} className="values-list__row">
              <span className="values-list__n">{n}</span>
              <h3 className="values-list__title">{title}</h3>
              <p className="values-list__body">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
