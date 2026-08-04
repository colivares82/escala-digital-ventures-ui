/**
 * ServiceRow component tests.
 * Verifies three-column layout content, problem prefix/line, and figure slot.
 * Spec: SPEC-P2.2 FR-3
 */

import { render, screen } from '@testing-library/react'
import { ServiceRow } from '@/components/service-row'
import { servicesContent } from '@/content/es/services'

const svc = servicesContent.services[0]!
const PROBLEM_PREFIX = servicesContent.pageHeader.problemPrefix

function renderRow(override?: Partial<Parameters<typeof ServiceRow>[0]>) {
  return render(
    <ServiceRow
      index={svc.index}
      title={svc.title}
      problem={svc.problem}
      problemPrefix={PROBLEM_PREFIX}
      deliverable={svc.deliverable}
      fig={<span data-testid="fig-slot">FIG</span>}
      {...override}
    />,
  )
}

describe('ServiceRow', () => {
  // ── Index ────────────────────────────────────────────────────────────────
  it('renders the service index', () => {
    renderRow()
    expect(screen.getByText(svc.index)).toBeInTheDocument()
  })

  // ── Title ────────────────────────────────────────────────────────────────
  it('renders the service title as h2', () => {
    renderRow()
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent(svc.title)
  })

  // ── Problem line ─────────────────────────────────────────────────────────
  it('renders the problem prefix', () => {
    renderRow()
    // "EL PROBLEMA ·" prefix is rendered in the problem span
    expect(screen.getByText(new RegExp(PROBLEM_PREFIX))).toBeInTheDocument()
  })

  it('renders the problem text', () => {
    renderRow()
    expect(screen.getByText(new RegExp(svc.problem))).toBeInTheDocument()
  })

  // ── Deliverable ──────────────────────────────────────────────────────────
  it('renders the deliverable text', () => {
    renderRow()
    expect(screen.getByText(new RegExp(svc.deliverable.slice(0, 40)))).toBeInTheDocument()
  })

  // ── Figure slot ──────────────────────────────────────────────────────────
  it('renders the fig slot content', () => {
    renderRow()
    expect(screen.getByTestId('fig-slot')).toBeInTheDocument()
  })

  // ── Border modifier ──────────────────────────────────────────────────────
  it('adds service-row--last class when isLast=true', () => {
    const { container } = renderRow({ isLast: true })
    expect(container.querySelector('.service-row--last')).toBeInTheDocument()
  })

  it('does not add service-row--last class by default', () => {
    const { container } = renderRow({ isLast: false })
    expect(container.querySelector('.service-row--last')).not.toBeInTheDocument()
  })

  // ── Semantic element ─────────────────────────────────────────────────────
  it('renders as an article element', () => {
    const { container } = renderRow()
    expect(container.querySelector('article.service-row')).toBeInTheDocument()
  })

  // ── All five services render without error ────────────────────────────────
  it.each(servicesContent.services)(
    'renders service "$index $title" without crashing',
    (service) => {
      const { container } = render(
        <ServiceRow
          index={service.index}
          title={service.title}
          problem={service.problem}
          problemPrefix={PROBLEM_PREFIX}
          deliverable={service.deliverable}
          fig={<span>fig</span>}
        />,
      )
      expect(container.querySelector('.service-row')).toBeInTheDocument()
    },
  )
})
