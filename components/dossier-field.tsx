/**
 * DossierField — two-column case-file field row.
 * Left: ordinal number + field name in ambre-dk mono.
 * Right: body text (≤60ch, 1.65 leading).
 * Separated by a 1px top rule — the "expediente técnico" treatment.
 * Spec: SPEC-P2.3 FR-4.3
 */

interface DossierFieldProps {
  /** Zero-padded ordinal string: "01", "02", … */
  num: string
  /** Field label: "CONTEXTO", "PROBLEMA", etc. */
  fieldKey: string
  /** Body text — max 60ch recommended. */
  body: string
}

export function DossierField({ num, fieldKey, body }: DossierFieldProps) {
  return (
    <div className="dossier-field">
      <div className="dossier-field__key">
        <span className="dossier-field__num" aria-hidden="true">
          {num}
        </span>
        <span className="dossier-field__name">{fieldKey}</span>
      </div>
      <p className="dossier-field__body">{body}</p>
    </div>
  )
}
