/**
 * AnalyticsRuntime — mounts the official SavriProvider in production only.
 * FEAT-01 D2 · D3 · D5 · R1 · R3
 *
 * Enablement is decided in the browser after mount (hostname check), never at
 * build time: the same SSG image serves dev and prod (R1). Before mount — and on
 * any non-production host — children render untouched and no SDK code runs.
 *
 * Pageviews (R3): the site navigates with plain <a href> (full document loads,
 * including locale switches), so the SDK's single init() pageview per load is
 * exactly one pageview per navigation. Do NOT add a pathname-driven pageview
 * effect here — it would double-count every first load.
 *
 * D5: the SDK's automatic tracking props (trackForms, trackOutboundLinks,
 * trackFileDownloads, trackScrollDepth) are deliberately omitted = off.
 */
'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { SavriProvider } from '@savri/tracker/react'
import { isAnalyticsEnabledInBrowser } from '@/lib/analytics'
import { ANALYTICS_API_URL, SAVRI_SITE_ID } from '@/lib/constants/analytics'

export function AnalyticsRuntime({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // Hostname is only knowable client-side; deferring avoids hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(isAnalyticsEnabledInBrowser())
  }, [])

  if (!enabled) return <>{children}</>

  return (
    <SavriProvider siteId={SAVRI_SITE_ID} apiUrl={ANALYTICS_API_URL}>
      {children}
    </SavriProvider>
  )
}
