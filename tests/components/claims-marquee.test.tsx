import { render, screen } from '@testing-library/react'
import { ClaimsMarquee } from '@/components/claims-marquee'
import { sharedContent } from '@/content/es/shared'

const CLAIMS = ['Claim A', 'Claim B', 'Claim C'] as const

describe('ClaimsMarquee', () => {
  it('renders with the accessible key-messages label', () => {
    render(<ClaimsMarquee claims={CLAIMS} />)
    // The marquee div has aria-label from sharedContent
    expect(
      screen.getByLabelText(sharedContent.accessibility.keyMessages),
    ).toBeInTheDocument()
  })

  it('renders each claim text at least once', () => {
    render(<ClaimsMarquee claims={CLAIMS} />)
    expect(screen.getAllByText('Claim A').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Claim B').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Claim C').length).toBeGreaterThanOrEqual(1)
  })

  it('duplicates claims for seamless loop (renders 2× the count)', () => {
    render(<ClaimsMarquee claims={CLAIMS} />)
    // Each claim appears twice (original + duplicate for CSS loop)
    expect(screen.getAllByText('Claim A')).toHaveLength(2)
  })

  it('marks duplicated items as aria-hidden', () => {
    const { container } = render(<ClaimsMarquee claims={CLAIMS} />)
    const hiddenSpans = container.querySelectorAll('[aria-hidden="true"]')
    // Duplicate set (3 spans) + the icon <i> elements
    expect(hiddenSpans.length).toBeGreaterThanOrEqual(CLAIMS.length)
  })
})
