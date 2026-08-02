import {
  COUNT_UP_DURATION_MS,
  COUNT_UP_THRESHOLD,
  DIAGRAM_REVEAL_THRESHOLD,
  PHASE_CYCLE_VISIBLE_THRESHOLD,
  REDUCED_MOTION_QUERY,
  REVEAL_THRESHOLD,
  WORD_REVEAL_THRESHOLD,
} from '@/lib/motion-constants'

describe('motion constants', () => {
  it('all thresholds are between 0 and 1 inclusive', () => {
    const thresholds = [
      REVEAL_THRESHOLD,
      DIAGRAM_REVEAL_THRESHOLD,
      WORD_REVEAL_THRESHOLD,
      COUNT_UP_THRESHOLD,
      PHASE_CYCLE_VISIBLE_THRESHOLD,
    ]
    thresholds.forEach((t) => {
      expect(t).toBeGreaterThanOrEqual(0)
      expect(t).toBeLessThanOrEqual(1)
    })
  })

  it('count-up duration is a positive number of ms', () => {
    expect(COUNT_UP_DURATION_MS).toBeGreaterThan(0)
  })

  it('reduced-motion query includes prefers-reduced-motion', () => {
    expect(REDUCED_MOTION_QUERY).toContain('prefers-reduced-motion')
  })

  it('reduced-motion query includes mobile breakpoint', () => {
    expect(REDUCED_MOTION_QUERY).toContain('max-width')
  })
})
