/**
 * OG image — generic site-wide Open Graph image.
 *
 * Rendered via Next.js ImageResponse (1200×630).
 * Identity: abisal background, grid motif, claim in Archivo, ambre accent.
 * Used as the fallback OG image for all pages that don't define their own.
 *
 * Spec: SPEC-P4 FR-6.2
 * Note: Fonts are loaded from the public directory at build time.
 * TODO(P7): Replace with final approved OG artwork if needed.
 */

import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Escala Digital Ventures — Automatizamos tu negocio. Escalamos contigo.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#0a2b45',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: '72px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Grid motif — subtle lines */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.05,
            backgroundImage:
              'linear-gradient(#f7f7f4 1px, transparent 1px), linear-gradient(90deg, #f7f7f4 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Ambre accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '4px',
            height: '100%',
            background: '#ffb703',
          }}
        />

        {/* Brand mark — four squares */}
        <div
          style={{
            position: 'absolute',
            top: '64px',
            right: '80px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          <div style={{ display: 'flex', gap: '6px' }}>
            <div style={{ width: '18px', height: '18px', background: '#f7f7f4' }} />
            <div style={{ width: '18px', height: '18px', background: '#f7f7f4' }} />
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <div style={{ width: '18px', height: '18px', background: '#ffb703' }} />
            <div style={{ width: '18px', height: '18px', background: '#f7f7f4' }} />
          </div>
        </div>

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', zIndex: 1 }}>
          {/* Eyebrow */}
          <p
            style={{
              fontFamily: 'monospace',
              fontSize: '14px',
              color: '#ffb703',
              letterSpacing: '0.15em',
              margin: 0,
              textTransform: 'uppercase',
            }}
          >
            ESCALA DIGITAL VENTURES
          </p>

          {/* Claim */}
          <h1
            style={{
              fontFamily: 'sans-serif',
              fontSize: '56px',
              fontWeight: 600,
              color: '#f7f7f4',
              lineHeight: 1.05,
              margin: 0,
              maxWidth: '800px',
            }}
          >
            Automatizamos tu negocio. Escalamos contigo.
          </h1>

          {/* Sub-line */}
          <p
            style={{
              fontFamily: 'sans-serif',
              fontSize: '22px',
              color: 'rgba(247,247,244,0.7)',
              margin: 0,
              marginTop: '8px',
            }}
          >
            Estudio de producto y tecnología · escaladigitalventures.com
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}
