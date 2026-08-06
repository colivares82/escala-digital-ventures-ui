/**
 * 404 — identity-branded not-found page.
 *
 * Uses the abisal surface + GridBackground + kit micro-diagram (dashed path
 * INICIO → lost node "?") per the approved wireframe.
 *
 * Locale: defaults to ES — not-found.tsx cannot resolve locale in App Router
 * (no params available). Copy lives in content/es/shared.ts notFound block.
 *
 * noindex: Next.js automatically adds noindex to not-found pages (AC-6).
 * Reduced-motion: all elements are static (no animation classes). (AC-6)
 * AA contrast: ambre on abisal passes AA for large text; paper on abisal passes AA.
 *
 * Spec: SPEC-P4 FR-5
 */

import Link from 'next/link'
import { GridBackground } from '@/components/grid-background'
import { sharedContent } from '@/content/es/shared'

const { notFound: nf } = sharedContent

export default function NotFound() {
  return (
    <div className="not-found">
      <GridBackground />
      <div className="not-found__inner">
        <p className="not-found__code">{nf.code}</p>
        <h1 className="not-found__h1">{nf.h1}</h1>

        {/* Kit micro-diagram: dashed path INICIO → lost node "?" */}
        <svg
          aria-label={nf.diagramAria}
          className="not-found__diagram"
          fill="none"
          height="70"
          role="img"
          viewBox="0 0 200 70"
          width="200"
        >
          <g stroke="var(--paper)" strokeWidth="1.5">
            <rect height="18" width="40" x="10" y="26" />
            <text
              fill="var(--paper)"
              fontFamily="var(--font-ibm-plex-mono)"
              fontSize="9"
              x="18"
              y="39"
            >
              INICIO
            </text>
            <path d="M50 35 L90 35" strokeDasharray="4 3" />
            <path d="M110 35 L150 35" opacity="0.4" strokeDasharray="4 3" />
          </g>
          {/* Lost node — ambre */}
          <circle cx="100" cy="35" r="9" stroke="var(--ambre)" strokeWidth="1.5" />
          <text
            fill="var(--ambre)"
            fontFamily="var(--font-ibm-plex-mono)"
            fontSize="9"
            x="96.5"
            y="38.5"
          >
            ?
          </text>
          {/* Destination node — faded */}
          <circle
            cx="170"
            cy="35"
            r="6"
            stroke="rgba(247,247,244,0.35)"
            strokeDasharray="3 3"
            strokeWidth="1.2"
          />
        </svg>

        <p className="not-found__body">{nf.body}</p>
        <Link className="not-found__cta" href="/">
          {nf.ctaLabel}
        </Link>
      </div>
    </div>
  )
}
