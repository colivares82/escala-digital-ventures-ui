import type { Metadata, Viewport } from 'next'
import { Archivo, IBM_Plex_Mono, Instrument_Sans } from 'next/font/google'
import './globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-archivo',
  display: 'swap',
})

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-instrument-sans',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
})

/**
 * Site-wide fallback metadata.
 * Per-page titles, descriptions, canonical, and hreflang are set in
 * generateMetadata inside app/[[...path]]/page.tsx.
 *
 * NO title template (SEO-01 §3 / AC-2).
 * The previous `template: '%s | Escala Digital Ventures'` double-branded every
 * page, because dictionary titles already carry their own brand suffix — the
 * rendered output was e.g. "Qué hacemos | Escala Digital Ventures | Escala
 * Digital Ventures", blowing past the 60-character budget on all 27 routes.
 * Titles are now authored complete in content/{es,en,ca}/*.ts and emitted
 * verbatim. `default` still covers routes with no dictionary meta.
 */
export const metadata: Metadata = {
  title: {
    default: 'Escala Digital Ventures',
    template: '%s',
  },
  description:
    'Estudio de producto y tecnología que automatiza operaciones y construye plataformas digitales.',
  /**
   * metadataBase is required for Next.js to resolve absolute OG image URLs.
   * Falls back to localhost in dev; NEXT_PUBLIC_SITE_URL is set in production.
   * Spec: SPEC-P4 FR-6.2
   */
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ),
}

export const viewport: Viewport = {
  colorScheme: 'light',
  // --abisal design token: deep Mediterranean sea (#0a2b45), darker shade used for themeColor
  themeColor: '#0a2b45',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // lang="es" is the default locale (ES is served at root with no prefix).
    // Phase 5: interior pages set lang on <main> for EN/CA (see [[...path]]/page.tsx).
    // Phase 6 (middleware) will dynamically set the correct lang on <html> per request.
    <html
      className={`${archivo.variable} ${instrumentSans.variable} ${ibmPlexMono.variable} bg-background`}
      lang="es"
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
