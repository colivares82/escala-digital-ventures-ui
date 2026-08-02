export function SectionIndex({ index, label }: { index: string; label: string }) {
  return <p className="section-index"><span>{index}</span><span aria-hidden="true">/</span><span>{label}</span></p>
}
