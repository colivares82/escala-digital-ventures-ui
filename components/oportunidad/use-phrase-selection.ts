'use client'

/**
 * Marked-phrase state for «¿Te suena?», lifted to the section so the wall and
 * the panel share it (LANDING-01A §3). `enhanced` flips to true after
 * hydration: until then (SSR / no-JS) CSS shows every answer and hides the
 * counter, so the section is fully readable without JavaScript.
 */
import { useCallback, useState, useSyncExternalStore } from 'react'
import { toggleIndex } from './diagnosis'

// Hydration flag without setState-in-effect: server snapshot false, client true.
const noopSubscribe = () => () => {}
const clientSnapshot = () => true
const serverSnapshot = () => false

export function usePhraseSelection() {
  const [marked, setMarked] = useState<ReadonlySet<number>>(() => new Set())
  const enhanced = useSyncExternalStore(noopSubscribe, clientSnapshot, serverSnapshot)

  const toggle = useCallback((index: number) => {
    setMarked((prev) => toggleIndex(prev, index))
  }, [])

  return { marked, count: marked.size, toggle, enhanced }
}
