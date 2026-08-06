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
 */
export const metadata: Metadata = {
  title: {
    default: 'Escala Digital Ventures',
    template: '%s | Escala Digital Ventures',
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
    // lang="es" is the default locale (ES content is the only populated locale in Phase 1).
    // Phase 6 (middleware) will dynamically set the correct lang per request for EN/CA.
    // Interior pages additionally set lang on <main> for EN/CA (see [[...path]]/page.tsx).
    <html
      className={`${archivo.variable} ${instrumentSans.variable} ${ibmPlexMono.variable} bg-background`}
      lang="es"
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
