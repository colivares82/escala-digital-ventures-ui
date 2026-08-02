import { SystemDiagram } from '@/components/system-diagram'

export function StairFigure({ label }: { label: string }) {
  return <SystemDiagram kind="proof" label={label} />
}

export function AllianceConstellation({ label }: { label: string }) {
  return <SystemDiagram kind="outcome" label={label} />
}
