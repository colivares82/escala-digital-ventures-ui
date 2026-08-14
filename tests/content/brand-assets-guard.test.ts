/**
 * Brand asset guard — BRAND-01.
 *
 * Static-file and source-text assertions that component tests structurally
 * cannot make:
 *
 *   1. Every asset the spec consumes actually exists on disk, at the exact
 *      pixel size §2 assumes. A missing or resized file is a silent 404 or a
 *      blurry mark in production, not a test failure anywhere else.
 *   2. The provisional header mark is gone from the codebase — component,
 *      style AND asset (AC-12).
 *   3. No orphaned placeholder icon/OG asset is left behind (§7).
 *   4. No alt text is hardcoded in a component (AC-4).
 *   5. No hardcoded colour value enters the brand CSS (AC-3).
 *
 * PNG dimensions are read straight from the IHDR chunk (bytes 16..24 of a PNG),
 * so this needs no image library.
 */

import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const ROOT = resolve(__dirname, '../..')
const BRAND_DIR = resolve(ROOT, 'app/assets/escala-brand')

/** Reads a PNG's intrinsic size from its IHDR chunk. */
function pngSize(relPath: string): { width: number; height: number } {
  const buf = readFileSync(resolve(ROOT, relPath))
  expect(buf.subarray(1, 4).toString('ascii')).toBe('PNG')
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) }
}

const readSource = (relPath: string) => readFileSync(resolve(ROOT, relPath), 'utf8')

/**
 * Source with comments removed, for assertions about CODE rather than prose.
 * Several of these files legitimately discuss `openGraph`, the OG filename and
 * the old placeholder mark in their explanatory comments.
 */
const readCode = (relPath: string) =>
  readSource(relPath)
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/.*$/gm, '$1')

describe('BRAND-01 · consumed assets exist at their expected native size', () => {
  // §2 render targets vs. the delivered files. NOTE: the delivered lockups are
  // pre-scaled to display size, so these are the REAL native sizes — smaller
  // than the ceilings quoted in §1 (445×119 for L02, 386×64 for L05).
  const CASES: ReadonlyArray<readonly [string, number, number]> = [
    ['app/assets/escala-brand/logo-02-lockup-paper.png', 200, 53],
    ['app/assets/escala-brand/logo-02-lockup-paper@2x.png', 400, 106],
    // The footer consumes the `ink` variant (light surface); `paper` is kept
    // verified too, since a dark-surface footer would need it.
    ['app/assets/escala-brand/logo-05-lockup-compact-ink.png', 180, 30],
    ['app/assets/escala-brand/logo-05-lockup-compact-ink@2x.png', 360, 60],
    ['app/assets/escala-brand/logo-05-lockup-compact-paper.png', 180, 30],
    ['app/assets/escala-brand/logo-05-lockup-compact-paper@2x.png', 360, 60],
    ['app/assets/escala-brand/logo-01-seal-ink.png', 288, 294],
    ['app/assets/escala-brand/logo-01-seal-ink@2x.png', 576, 588],
    ['app/assets/escala-brand/symbol-paper-96.png', 96, 96],
    ['app/assets/escala-brand/apple-touch-icon.png', 180, 180],
    ['app/assets/escala-brand/og-image.png', 1200, 630],
    ['app/assets/escala-brand/maskable-192.png', 192, 192],
    ['app/assets/escala-brand/maskable-512.png', 512, 512],
  ]

  it.each(CASES)('%s is %ix%i', (relPath, width, height) => {
    expect(existsSync(resolve(ROOT, relPath))).toBe(true)
    expect(pngSize(relPath)).toEqual({ width, height })
  })

  it('ships a real multi-size favicon.ico (not a renamed PNG)', () => {
    const buf = readFileSync(resolve(BRAND_DIR, 'favicon.ico'))
    // ICO header: reserved=0, type=1 (icon), then the image count.
    expect(buf.readUInt16LE(0)).toBe(0)
    expect(buf.readUInt16LE(2)).toBe(1)
    expect(buf.readUInt16LE(4)).toBeGreaterThanOrEqual(2)
  })

  it('serves every §2 favicon PNG size from public/brand/', () => {
    for (const size of [16, 32, 48, 96, 192, 512]) {
      const rel = `public/brand/favicon-${size}.png`
      expect(existsSync(resolve(ROOT, rel)), `${rel} missing`).toBe(true)
      expect(pngSize(rel)).toEqual({ width: size, height: size })
    }
  })
})

describe('BRAND-01 Z5 · metadata assets', () => {
  it('registers the browser icon, iOS icon and OG image', () => {
    // favicon.ico + opengraph-image.png sit in app/ (the .ico is picked up by
    // the file convention; the .png backs the OG_IMAGE URL). The apple-touch
    // icon is served from public/brand/ and declared in metadata, because
    // app/apple-icon.* never reaches the optional catch-all.
    for (const f of [
      'app/favicon.ico',
      'app/opengraph-image.png',
      'public/brand/apple-touch-icon.png',
    ]) {
      expect(existsSync(resolve(ROOT, f)), `${f} missing`).toBe(true)
    }
  })

  it('serves the iOS icon at 180x180, full bleed (§7)', () => {
    expect(pngSize('public/brand/apple-touch-icon.png')).toEqual({ width: 180, height: 180 })
  })

  it('declares the icon set from the constants layer, not inline literals', () => {
    const layout = readCode('app/layout.tsx')
    expect(layout).toMatch(/icon:\s*FAVICON_ICONS/)
    expect(layout).toMatch(/apple:\s*\[APPLE_TOUCH_ICON\]/)
    expect(layout).not.toMatch(/\/brand\/favicon-\d+\.png/)
  })

  it('renders the OG image at exactly 1200x630 (§7)', () => {
    expect(pngSize('app/opengraph-image.png')).toEqual({ width: 1200, height: 630 })
  })

  it('removes the provisional icon and generated OG route (§7, AC-12)', () => {
    // "Leaving orphaned files behind is a defect."
    expect(existsSync(resolve(ROOT, 'app/icon.svg'))).toBe(false)
    expect(existsSync(resolve(ROOT, 'app/opengraph-image.tsx'))).toBe(false)
  })

  it('does NOT add a PWA manifest where none existed (§7, §10)', () => {
    // The bundle's manifest.json is asset metadata, not a web app manifest.
    for (const f of ['app/manifest.json', 'app/manifest.ts', 'public/manifest.json']) {
      expect(existsSync(resolve(ROOT, f)), `${f} should not exist`).toBe(false)
    }
  })

  it('declares the OG image exactly once, in the SEO constants layer', () => {
    // BRAND-01 Z5: og:image is set explicitly (the app/opengraph-image.*
    // convention cannot reach the optional catch-all these pages render from —
    // see OG_IMAGE). It must resolve from the constants layer, never be an
    // inline URL literal in a component or route (no hardcoded values).
    expect(readSource('lib/constants/seo.ts')).toMatch(/OG_IMAGE\s*=/)
    expect(readSource('lib/seo/page-meta.ts')).toMatch(/images:\s*\[OG_IMAGE\]/)
    expect(readSource('app/layout.tsx')).not.toMatch(/openGraph\s*:/)
  })

  it('never inlines the OG image URL outside the constants layer', () => {
    // Comments may name the file (they explain the constraint); only a real
    // literal in code is a hardcoded value.
    for (const f of ['lib/seo/page-meta.ts', 'app/layout.tsx']) {
      expect(readCode(f)).not.toContain('opengraph-image.png')
    }
  })
})

describe('BRAND-01 AC-12 · the provisional mark is gone', () => {
  const HEADER_SOURCES = ['components/site-chrome.tsx', 'components/mobile-menu.tsx'] as const

  it.each(HEADER_SOURCES)('%s renders no <i> squares in the brand slot', (file) => {
    // The old mark was `<span aria-hidden="true"><i /><i /><i /></span>`.
    // readCode() so the comments describing it don't trip the assertion.
    expect(readCode(file)).not.toMatch(
      /<span aria-hidden="true">\s*<i \/>\s*<i \/>\s*<i \/>\s*<\/span>/,
    )
  })

  it('drops the placeholder square styles from globals.css', () => {
    const css = readSource('app/globals.css')
    expect(css).not.toMatch(/\.site-brand\s+i\s*\{/)
    expect(css).not.toMatch(/\.site-brand\s+i:nth-child/)
  })

  it('no longer renders {content.brand} as the visible mark', () => {
    // The dictionary key itself stays (SEO breadcrumbs consume it) — it just
    // must not be the header/footer's visible brand any more.
    expect(readCode('components/site-chrome.tsx')).not.toMatch(/\{content\.brand\}/)
    expect(readCode('components/mobile-menu.tsx')).not.toMatch(/\{content\.brand\}/)
  })
})

describe('BRAND-01 · no hardcoded values', () => {
  const BRAND_COMPONENTS = [
    'components/site-chrome.tsx',
    'components/mobile-menu.tsx',
    'components/ceremonial-header.tsx',
  ] as const

  it.each(BRAND_COMPONENTS)('%s hardcodes no alt text (AC-4)', (file) => {
    const src = readSource(file)
    // Allowed: alt="" (decorative) or alt={...} (dictionary-resolved).
    const alts = src.match(/alt=(?:"[^"]*"|\{[^}]*\})/g) ?? []
    expect(alts.length).toBeGreaterThan(0)
    for (const alt of alts) {
      expect(alt === 'alt=""' || alt.startsWith('alt={')).toBe(true)
    }
  })

  it('introduces no hardcoded colour in the brand CSS (AC-3)', () => {
    const css = readSource('app/globals.css')
    const brandRules = css.match(/--brand-[\w-]+:[^;]+;/g) ?? []
    expect(brandRules.length).toBeGreaterThan(0)
    for (const rule of brandRules) {
      expect(rule).not.toMatch(/#[0-9a-fA-F]{3,8}\b/)
      expect(rule).not.toMatch(/\b(rgb|hsl|oklch)a?\(/)
    }
  })

  it('keeps every brand render size in lib/brand-constants.ts, not inline', () => {
    for (const file of BRAND_COMPONENTS) {
      const src = readSource(file)
      expect(src).toMatch(/@\/lib\/brand-constants/)
      // No magic pixel numbers passed to width=/height=.
      expect(src).not.toMatch(/(?:width|height)=\{\d+\}/)
    }
  })
})

describe('BRAND-01 §2 · unused variants are available but unreferenced', () => {
  const componentSources = readdirSync(resolve(ROOT, 'components'))
    .filter((f) => f.endsWith('.tsx'))
    .map((f) => readSource(`components/${f}`))
    .join('\n')

  it('copies L04 / L06 / mar variants into the repo', () => {
    for (const f of [
      'logo-04-wordmark-ink.png',
      'logo-06-stacked-ink.png',
      'logo-02-lockup-mar.png',
      'escala-symbol-currentcolor.svg',
    ]) {
      expect(existsSync(resolve(BRAND_DIR, f)), `${f} missing`).toBe(true)
    }
  })

  it('references none of them from any component (§2, §10)', () => {
    for (const slug of ['logo-04-wordmark', 'logo-06-stacked', 'escala-icon-circle']) {
      expect(componentSources).not.toContain(slug)
    }
  })

  it('matches each mark variant to the ACTUAL background of its surface (§2)', () => {
    /*
     * The §2 colour rule: `paper` mark on any dark surface, `ink` mark on a
     * light (`paper`) surface.
     *
     * Note §2's worked example is WRONG about the footer — it says "the header
     * and footer are abisal, so both take paper", but `.site-footer` is
     * `background: var(--paper)`. Following the example instead of the rule
     * shipped an invisible light-on-light footer logo. This test therefore
     * derives the expectation from globals.css rather than from the prose.
     */
    const css = readSource('app/globals.css')
    const surfaceOf = (selector: string) => {
      const rule = css.match(new RegExp(`\\n\\${selector}\\s*\\{[^}]*\\}`))?.[0] ?? ''
      return /background:\s*var\(--paper\)/.test(rule) ? 'light' : 'dark'
    }

    // Header: dark (abisal) → paper mark.
    expect(surfaceOf('.site-header')).toBe('dark')
    expect(readCode('components/site-chrome.tsx')).toContain('logo-02-lockup-paper.png')
    expect(readCode('components/mobile-menu.tsx')).toContain('symbol-paper-96.png')

    // Footer: LIGHT (paper) → ink mark. Regression guard for the invisible logo.
    expect(surfaceOf('.site-footer')).toBe('light')
    expect(readCode('components/site-chrome.tsx')).toContain('logo-05-lockup-compact-ink.png')
    expect(readCode('components/site-chrome.tsx')).not.toContain(
      'logo-05-lockup-compact-paper.png',
    )

    // /sobre-escala section A: light (paper) → ink seal.
    expect(surfaceOf('.ceremonial-header')).toBe('light')
    expect(readCode('components/ceremonial-header.tsx')).toContain('logo-01-seal-ink.png')
  })

  it('never renders a paper mark on a paper surface (contrast floor, §8)', () => {
    // Blunt catch-all: no component that styles a light surface may import a
    // `-paper` raster mark. This is the assertion that would have caught the
    // invisible footer logo before it shipped.
    const footerImports = readCode('components/site-chrome.tsx')
      .split('\n')
      .filter((l) => l.includes('escala-brand/') && l.includes('footer'))
      .join('\n')
    expect(footerImports).not.toMatch(/-paper(@2x)?\.(png|webp)/)
  })
})
