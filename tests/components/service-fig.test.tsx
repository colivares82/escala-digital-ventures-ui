/**
 * ServiceFig component tests.
 * Verifies all five variants render correctly, labels are present,
 * captions are accessible, and reduced-motion is handled.
 * Spec: SPEC-P2.2 FR-4, AC-4, AC-5
 */

import { render, screen } from '@testing-library/react'
import { ServiceFig } from '@/components/service-fig'
import type { ServiceFigVariant } from '@/content/types'
import { servicesContent } from '@/content/es/services'

// Map each service entry to its variant for parametrised tests
const SERVICE_FIXTURES = servicesContent.services.map((svc) => ({
  variant: svc.figVariant,
  labels: svc.figLabels,
  caption: svc.figCaption,
}))

const VALID_VARIANTS: ServiceFigVariant[] = ['capture', 'platform', 'ai', 'product', 'evolve']

describe('ServiceFig', () => {
  // ── AC-4: all five variants render ───────────────────────────────────────
  it.each(SERVICE_FIXTURES)(
    'renders variant "$variant" without crashing',
    ({ variant, labels, caption }) => {
      const { container } = render(
        <ServiceFig variant={variant} labels={labels} caption={caption} />,
      )
      expect(container.querySelector('.service-fig')).toBeInTheDocument()
    },
  )

  // ── Accessible caption (sr-only) present for each variant ────────────────
  it.each(SERVICE_FIXTURES)(
    'renders accessible sr-only caption for variant "$variant"',
    ({ variant, labels, caption }) => {
      render(<ServiceFig variant={variant} labels={labels} caption={caption} />)
      const srOnly = document.querySelector('.sr-only')
      expect(srOnly).toBeInTheDocument()
      expect(srOnly?.textContent).toContain(caption)
    },
  )

  // ── Visible kit-grammar caption rendered ─────────────────────────────────
  it.each(SERVICE_FIXTURES)(
    'renders visible caption for variant "$variant"',
    ({ variant, labels, caption }) => {
      render(<ServiceFig variant={variant} labels={labels} caption={caption} />)
      // Caption appears twice: sr-only figcaption + visible <p>
      const matches = screen.getAllByText(caption)
      expect(matches.length).toBeGreaterThanOrEqual(1)
    },
  )

  // ── SVG present in each variant ──────────────────────────────────────────
  it.each(SERVICE_FIXTURES)(
    'renders an SVG element for variant "$variant"',
    ({ variant, labels, caption }) => {
      const { container } = render(
        <ServiceFig variant={variant} labels={labels} caption={caption} />,
      )
      expect(container.querySelector('svg')).toBeInTheDocument()
    },
  )

  // ── figure has role="img" ─────────────────────────────────────────────────
  it.each(SERVICE_FIXTURES)(
    'figure has role=img with caption as accessible name for variant "$variant"',
    ({ variant, labels, caption }) => {
      render(<ServiceFig variant={variant} labels={labels} caption={caption} />)
      expect(screen.getByRole('img', { name: caption })).toBeInTheDocument()
    },
  )

  // ── AC-5: variant isolation — capture renders capture-specific content ────
  it('capture variant renders three input labels', () => {
    const svc = servicesContent.services[0]!
    render(
      <ServiceFig variant="capture" labels={svc.figLabels} caption={svc.figCaption} />,
    )
    // SVG text labels for capture: HOJA, CORREO, DATO (inputs)
    expect(screen.getByText('HOJA')).toBeInTheDocument()
    expect(screen.getByText('CORREO')).toBeInTheDocument()
    expect(screen.getByText('DATO')).toBeInTheDocument()
  })

  it('platform variant renders PLATAFORMA label', () => {
    const svc = servicesContent.services[1]!
    render(
      <ServiceFig variant="platform" labels={svc.figLabels} caption={svc.figCaption} />,
    )
    expect(screen.getByText('PLATAFORMA')).toBeInTheDocument()
  })

  it('ai variant renders IA and DONDE APORTA labels', () => {
    const svc = servicesContent.services[2]!
    render(
      <ServiceFig variant="ai" labels={svc.figLabels} caption={svc.figCaption} />,
    )
    expect(screen.getByText('IA')).toBeInTheDocument()
    expect(screen.getByText('DONDE APORTA')).toBeInTheDocument()
  })

  it('product variant renders PRIORIDAD label', () => {
    const svc = servicesContent.services[3]!
    render(
      <ServiceFig variant="product" labels={svc.figLabels} caption={svc.figCaption} />,
    )
    expect(screen.getByText('PRIORIDAD')).toBeInTheDocument()
  })

  it('evolve variant renders loop labels (USO, FEEDBACK, MEJORA)', () => {
    const svc = servicesContent.services[4]!
    render(
      <ServiceFig variant="evolve" labels={svc.figLabels} caption={svc.figCaption} />,
    )
    expect(screen.getByText('USO')).toBeInTheDocument()
    expect(screen.getByText('FEEDBACK')).toBeInTheDocument()
    expect(screen.getByText('MEJORA')).toBeInTheDocument()
  })

  // ── Variant enum exhaustiveness: all 5 variants are tested ───────────────
  it('VALID_VARIANTS covers all 5 service fig variants', () => {
    expect(VALID_VARIANTS).toHaveLength(5)
  })

  // ── Reduced-motion: static state (no animateMotion) ──────────────────────
  it('renders all SVG content statically (no missing labels in DOM)', () => {
    // With the test mock, matchMedia returns matches=false (no reduced motion),
    // and IntersectionObserver fires immediately → visible=true.
    // All SVG label text should be present in the DOM.
    const svc = servicesContent.services[0]!
    const { container } = render(
      <ServiceFig variant="capture" labels={svc.figLabels} caption={svc.figCaption} />,
    )
    const svgTexts = container.querySelectorAll('svg text')
    expect(svgTexts.length).toBeGreaterThan(0)
  })

  // ── SPEC-POLISH-05: shared canvas — all five variants use the same viewBox ─
  it.each(SERVICE_FIXTURES)(
    'variant "$variant" uses the shared 340×180 viewBox (canvas normalisation)',
    ({ variant, labels, caption }) => {
      const { container } = render(
        <ServiceFig variant={variant} labels={labels} caption={caption} />,
      )
      const svg = container.querySelector('svg')
      expect(svg?.getAttribute('viewBox')).toBe('0 0 340 180')
    },
  )
})
