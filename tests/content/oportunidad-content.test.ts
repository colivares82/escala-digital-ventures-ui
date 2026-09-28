/**
 * LANDING-01 — /oportunidad content, SEO and scope guards.
 * Covers the spec's acceptance criteria that are checkable without a browser.
 */
import { readFileSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { oportunidadContent as c } from '@/content/es/oportunidad'
import { getDictionary } from '@/lib/i18n/dictionary'
import { buildPageMetadata } from '@/lib/seo/page-meta'
import { buildPageGraph } from '@/lib/seo/page-graph'
import sitemap from '@/app/sitemap'

const ROOT = resolve(__dirname, '../..')
const COMPONENT_DIR = join(ROOT, 'components/oportunidad')
const componentSources = readdirSync(COMPONENT_DIR).map((f) =>
  readFileSync(join(COMPONENT_DIR, f), 'utf8'),
)
const contentSource = readFileSync(join(ROOT, 'content/es/oportunidad.ts'), 'utf8')

describe('LANDING-01 · content', () => {
  it('meta fits the SEO limits', () => {
    expect(c.meta.title.length).toBeLessThanOrEqual(60)
    expect(c.meta.description.length).toBeLessThanOrEqual(155)
  })

  it('has 8 phrases, 5 day rows, 3 scenarios, 3 planes, 4 readouts, 3 steps', () => {
    expect(c.teSuena.phrases).toHaveLength(8)
    expect(c.day.table.rows).toHaveLength(5)
    expect(c.scenarios.items).toHaveLength(3)
    expect(c.alliance.planes).toHaveLength(3)
    expect(c.about.readouts).toHaveLength(4)
    expect(c.start.steps).toHaveLength(3)
  })

  it('price is a single figure (D7) and the offer carries its date (D8)', () => {
    expect(c.start.price.value).toBe('Prototipos desde 2.000 €')
    expect(c.start.offer.label).toContain('30.11.2026')
  })

  it('hardcodes no client name — seat names are single-sourced in home.allianceFigure', () => {
    expect(JSON.stringify(c)).not.toMatch(/magupell|biozero/i)
    componentSources.forEach((src) => expect(src).not.toMatch(/magupell|biozero/i))
  })

  it('uses no invoicing language (D10) and no unverified "100+/200+" figures', () => {
    const text = JSON.stringify(c)
    expect(text).not.toMatch(/factura|invoic/i)
    expect(text).not.toMatch(/100\+|200\+/)
  })

  it('experience readouts use the wireframe figures ("+100" spelling for the guard)', () => {
    const values = c.about.readouts.map((r) => r.value)
    expect(values).toEqual(['20+ años', '40.000+', '+100', 'MIT'])
  })

  it('«¿Te suena?» phrases: spec spans/tilts, tilt within ±1.4°, no stored « » marks', () => {
    const { phrases } = c.teSuena
    expect(phrases.map((p) => p.span)).toEqual(['wide', 'half', 'half', 'wide', 'half', 'half', 'wide', 'wide'])
    expect(phrases.map((p) => p.tilt)).toEqual([-1.2, 1.0, 0.6, -0.8, 1.4, -0.5, 0.9, -1.1])
    phrases.forEach((p) => {
      expect(Math.abs(p.tilt)).toBeLessThanOrEqual(1.4)
      expect(p.quote).not.toMatch(/[«»]/)
    })
  })

  it('§ 04 seats come from the shared home figure (Magupell · BioZero · 3 free)', () => {
    const seats = getDictionary('es').home.allianceFigure.seats
    expect(seats.filter((s) => s.state === 'occupied').map((s) => s.name)).toEqual(['Magupell', 'BioZero'])
    expect(seats.filter((s) => s.state === 'free')).toHaveLength(3)
  })
})

describe('LANDING-01 · standards', () => {
  it('components use no hex colours (AC-7)', () => {
    componentSources.forEach((src) => expect(src).not.toMatch(/#[0-9A-Fa-f]{3,6}\b/))
  })

  it('offer date lives only in the dictionary — no date logic in code (D8)', () => {
    componentSources.forEach((src) => expect(src).not.toMatch(/new Date|Date\.now/))
    expect(contentSource).not.toMatch(/new Date|Date\.now/)
  })
})

describe('LANDING-01 · SEO (D2)', () => {
  const meta = buildPageMetadata({
    page: 'oportunidad',
    locale: 'es',
    title: c.meta.title,
    description: c.meta.description,
  })

  it('is noindex, nofollow (AC-3)', () => {
    expect(meta.robots).toEqual({ index: false, follow: false })
  })

  it('emits no hreflang alternates (AC-3)', () => {
    expect(meta.alternates?.languages).toBeUndefined()
    expect(meta.alternates?.canonical).toMatch(/\/oportunidad$/)
  })

  it('is absent from the sitemap (AC-4)', () => {
    expect(sitemap().some((e) => e.url.includes('oportunidad'))).toBe(false)
  })

  it('indexable pages are unaffected (still carry hreflang, no robots)', () => {
    const home = buildPageMetadata({ page: 'home', locale: 'es', title: 't', description: 'd' })
    expect(home.robots).toBeUndefined()
    expect(home.alternates?.languages).toBeDefined()
  })

  it('builds a JSON-LD graph from its own slice', () => {
    const graph = JSON.stringify(buildPageGraph({ dict: getDictionary('es'), page: 'oportunidad', locale: 'es' }))
    expect(graph).toContain(c.meta.title)
  })

  it('is not in the header/footer nav (AC-5)', () => {
    const nav = JSON.stringify(getDictionary('es').shared)
    expect(nav).not.toMatch(/oportunidad/)
  })
})
