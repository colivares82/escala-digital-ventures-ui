/**
 * CalibratedRule — full-width decorative tick rule.
 * Spec: SPEC-POLISH-08 §2 Band 0.
 *
 * Minor ticks throughout, a taller tick every Nth position, and the first
 * tick rendered in the accent color. Purely decorative (aria-hidden) and
 * fully static — no animation, per AC-14.
 *
 * No reusable rule component existed elsewhere in the codebase at the time
 * of writing (verified: no `nth-child(5n` tick pattern in globals.css), so
 * this is a new primitive rather than a reuse of an existing one.
 */
import {
  FOOTER_RULE_MAJOR_TICK_INTERVAL,
  FOOTER_RULE_TICK_COUNT,
} from '@/lib/motion-constants'

export function CalibratedRule({ className }: { className?: string }) {
  const classes = ['calibrated-rule', className].filter(Boolean).join(' ')

  return (
    <div className={classes} aria-hidden="true">
      {Array.from({ length: FOOTER_RULE_TICK_COUNT }, (_, i) => {
        const position = i + 1
        const isMajor = position % FOOTER_RULE_MAJOR_TICK_INTERVAL === 1
        const isFirst = position === 1
        const tickClass = [
          'calibrated-rule__tick',
          isMajor ? 'calibrated-rule__tick--major' : '',
          isFirst ? 'calibrated-rule__tick--accent' : '',
        ]
          .filter(Boolean)
          .join(' ')
        return <i key={position} className={tickClass} />
      })}
    </div>
  )
}
