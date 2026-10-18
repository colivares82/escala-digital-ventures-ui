/**
 * Pure helpers for the «¿Te suena?» self-diagnosis (LANDING-01A).
 * No storage, no network: state lives only in React memory.
 */
import type { DiagnosisMessages } from '@/content/types'
import { DIAGNOSIS_BAND_MIN } from './constants'

export type DiagnosisBand = keyof DiagnosisMessages

export function diagnosisBand(count: number): DiagnosisBand {
  if (count >= DIAGNOSIS_BAND_MIN.HIGH) return 'high'
  if (count >= DIAGNOSIS_BAND_MIN.MID) return 'mid'
  if (count >= DIAGNOSIS_BAND_MIN.LOW) return 'low'
  return 'none'
}

/** Returns a new set with `index` toggled — never mutates the input. */
export function toggleIndex(marked: ReadonlySet<number>, index: number): Set<number> {
  const next = new Set(marked)
  if (next.has(index)) next.delete(index)
  else next.add(index)
  return next
}
