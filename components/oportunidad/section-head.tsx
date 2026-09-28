/**
 * Shared 2-col section header for /oportunidad: eyebrow, then H2 | lead.
 * Composes the site's existing SectionIndex + split-heading + lead-copy.
 */
import { SectionIndex } from '@/components/section-index'
import type { OportunidadSectionIndex } from '@/content/types'

export function SectionHead({
  sectionIndex,
  title,
  lead,
}: {
  sectionIndex: OportunidadSectionIndex
  title: string
  lead: string
}) {
  return (
    <>
      <SectionIndex index={sectionIndex.index} label={sectionIndex.label} />
      <div className="split-heading oport-head">
        <h2 className="oport-head__title">{title}</h2>
        <p className="lead-copy oport-head__lead">{lead}</p>
      </div>
    </>
  )
}
