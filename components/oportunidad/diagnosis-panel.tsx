/**
 * DiagnosisPanel — live result for «¿Te suena?» (LANDING-01A §3.2).
 * Dark abisal card with the shared GridBackground texture. Sticky on desktop,
 * sticky bottom bar below 1024px (CSS only).
 */
import { GridBackground } from '@/components/grid-background'
import type { DiagnosisPanelContent } from '@/content/types'
import { diagnosisBand } from './diagnosis'
import { OPORTUNIDAD_ANCHORS, toHash } from './constants'

export interface DiagnosisPanelProps {
  count: number
  total: number
  content: DiagnosisPanelContent
}

export function DiagnosisPanel({ count, total, content }: DiagnosisPanelProps) {
  return (
    <aside className="diagnosis-panel dark-surface">
      <GridBackground cellSize="1.75rem" radialGradient={false} />
      <p className="diagnosis-panel__label">{content.label}</p>
      {/* Meter + scale are aria-hidden, so only count and message are announced. */}
      <div className="diagnosis-panel__live" aria-live="polite">
        <p className="diagnosis-panel__count">
          <span className="diagnosis-panel__n">{count}</span>
          <span className="diagnosis-panel__of">{content.of}</span>
        </p>
        <div className="diagnosis-panel__meter" aria-hidden="true">
          {Array.from({ length: total }, (_, i) => (
            <i key={i} className={i < count ? 'is-on' : undefined} />
          ))}
        </div>
        <p className="diagnosis-panel__scale" aria-hidden="true">
          <span>{content.scaleLow}</span>
          <span>{content.scaleHigh}</span>
        </p>
        <p className="diagnosis-panel__msg">{content.messages[diagnosisBand(count)]}</p>
      </div>
      <a className="oport-cta diagnosis-panel__cta" href={toHash(OPORTUNIDAD_ANCHORS.CONTACTO)}>
        {content.cta}
      </a>
      <a className="diagnosis-panel__more" href={toHash(OPORTUNIDAD_ANCHORS.ALIANZA)}>
        {content.more}
      </a>
    </aside>
  )
}
