/**
 * CaseDossier — canonical rendering path tests (SPEC-CASE-01).
 * Unlike case-dossier.test.tsx (which mocks @/content/data/cases with legacy
 * fixtures to cover the fallback path), this file renders CaseDossier against
 * the REAL Magupell and BioZero data to verify the canonical
 * CaseReadoutGrid + CaseNarrative rendering end to end.
 */
import { render, screen } from '@testing-library/react'
import { CaseDossier } from '@/components/case-dossier'
import { getDictionary } from '@/lib/i18n/dictionary'
import { cases } from '@/content/data/cases'

const DICT = getDictionary('es')
const magupell = cases.find((c) => c.slug === 'magupell')!
const biozero = cases.find((c) => c.slug === 'biozero')!

// Mock next/image — real logo assets are static imports, irrelevant to this test.
vi.mock('next/image', () => ({
  default: ({ alt }: { alt?: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src="" />
  ),
}))

// Mock FinalCTA to isolate CaseDossier tests
vi.mock('@/components/final-cta', () => ({
  FinalCTA: () => <div data-testid="final-cta-mock" />,
}))

describe('CaseDossier — Magupell canonical rendering (real data)', () => {
  beforeEach(() => {
    render(<CaseDossier caseStudy={magupell} dict={DICT.cases} locale="es" fullDict={DICT} />)
  })

  it('renders the canonical 6-cell readout grid (DAT.01–DAT.06)', () => {
    expect(screen.getByText('DAT.01 / REQUISITOS')).toBeInTheDocument()
    expect(screen.getByText('DAT.06 / OPERATIVA')).toBeInTheDocument()
  })

  it('renders the verified §2 figures, not the retired placeholders', () => {
    expect(screen.getByText('167 → 216')).toBeInTheDocument()
    expect(screen.getByText('1.803')).toBeInTheDocument()
    expect(screen.queryByText('100+')).not.toBeInTheDocument()
    expect(screen.queryByText('200+')).not.toBeInTheDocument()
  })

  it('renders all 7 numbered narrative sections', () => {
    const nums = screen.getAllByText(/^0[1-7]$/, { selector: '.case-narrative__num' })
    expect(nums.map((el) => el.textContent)).toEqual(['01', '02', '03', '04', '05', '06', '07'])
  })

  it('renders the role cards (section 04)', () => {
    expect(screen.getByText('Administración')).toBeInTheDocument()
    expect(screen.getByText('Inspector')).toBeInTheDocument()
    expect(screen.getByText('Cliente')).toBeInTheDocument()
    expect(screen.getByText('Proveedor')).toBeInTheDocument()
  })

  it('renders the governance cards (section 05)', () => {
    expect(screen.getByText('ACCESO')).toBeInTheDocument()
    expect(screen.getByText('CAMBIOS SEGUROS')).toBeInTheDocument()
  })

  it('renders the operational-flow figure (FIG. EXP-02)', () => {
    expect(screen.getByText(/FIG\. EXP-02/)).toBeInTheDocument()
    expect(screen.getByText('Catálogo')).toBeInTheDocument()
    expect(screen.getByText('Cobro')).toBeInTheDocument()
  })

  it('renders the chronology ladder (FIG. EXP-03)', () => {
    expect(screen.getByText(/FIG\. EXP-03/)).toBeInTheDocument()
    expect(screen.getByText('JUL 2026')).toBeInTheDocument()
  })

  it('never renders invoicing language', () => {
    const html = document.body.innerHTML
    expect(html).not.toMatch(/factura|facturaci[oó]n|facturar/i)
  })
})

describe('CaseDossier — BioZero canonical rendering (real, migrated data)', () => {
  beforeEach(() => {
    render(<CaseDossier caseStudy={biozero} dict={DICT.cases} locale="es" fullDict={DICT} />)
  })

  it('renders the canonical readout grid (2 cells)', () => {
    expect(screen.getByText('DAT.01 / ESTADO')).toBeInTheDocument()
    expect(screen.getByText('DAT.02 / RELACIÓN')).toBeInTheDocument()
  })

  it('still renders the capability grid via the capabilities narrative variant', () => {
    // Label appears twice: once as the narrative section label, once as the
    // CapabilityGrid's own sectionLabel eyebrow — both are expected.
    expect(screen.getAllByText('CAPACIDADES ENTREGADAS').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('Historiales clínicos colaborativos')).toBeInTheDocument()
  })

  it('is capability-framed, never diagnostic (AC-10 preserved after migration)', () => {
    const html = document.body.innerHTML
    expect(html).not.toMatch(/diagnos/i)
  })
})
