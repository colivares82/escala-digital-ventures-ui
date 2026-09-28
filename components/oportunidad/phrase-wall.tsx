/**
 * PhraseWall — 8 owner phrases as toggle buttons (LANDING-01A §3.1).
 * Native <button aria-pressed> gives Enter/Space toggling for free.
 * The answer is always in the DOM; CSS collapses it until the card is pressed.
 * Tilt comes from the dictionary (fixed per card, never random).
 */
import type { OportunidadPhrase } from '@/content/types'

type TiltStyle = React.CSSProperties & { '--oport-tilt': string }

export interface PhraseWallProps {
  phrases: ReadonlyArray<OportunidadPhrase>
  answerLabel: string
  marked: ReadonlySet<number>
  onToggle: (index: number) => void
}

export function PhraseWall({ phrases, answerLabel, marked, onToggle }: PhraseWallProps) {
  return (
    <div className="phrase-wall">
      {phrases.map((phrase, i) => {
        const style: TiltStyle = { '--oport-tilt': `${phrase.tilt}deg` }
        return (
          <button
            key={phrase.quote}
            type="button"
            className={`phrase-card phrase-card--${phrase.span}`}
            aria-pressed={marked.has(i)}
            onClick={() => onToggle(i)}
            style={style}
          >
            <span className="phrase-card__check" aria-hidden="true" />
            <span className="phrase-card__quote">«{phrase.quote}»</span>
            <span className="phrase-card__answer">
              <span className="phrase-card__answer-label">{answerLabel}</span>
              {phrase.answer}
            </span>
          </button>
        )
      })}
    </div>
  )
}
