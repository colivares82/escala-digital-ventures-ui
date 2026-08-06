/**
 * AnchorNav component tests — SPEC-P4 FR-1.3.
 *
 * Verifies:
 * - Renders the nav with the correct aria-label
 * - Renders all items as links with correct hrefs
 * - First item is active by default
 * - Clicking a link updates the active state
 */

import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { AnchorNav } from '@/components/anchor-nav'

const mockItems = [
  { id: 'titular', index: '01', name: 'TITULAR' },
  { id: 'objeto', index: '02', name: 'OBJETO' },
  { id: 'propiedad-intelectual', index: '03', name: 'PROPIEDAD INTELECTUAL' },
]

describe('AnchorNav', () => {
  it('renders the nav with the correct aria-label', () => {
    render(<AnchorNav label="EN ESTA PÁGINA" items={mockItems} />)
    expect(screen.getByRole('navigation', { name: 'EN ESTA PÁGINA' })).toBeInTheDocument()
  })

  it('renders the label text', () => {
    render(<AnchorNav label="EN ESTA PÁGINA" items={mockItems} />)
    expect(screen.getByText('EN ESTA PÁGINA')).toBeInTheDocument()
  })

  it('renders all items as links', () => {
    render(<AnchorNav label="EN ESTA PÁGINA" items={mockItems} />)
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(3)
  })

  it('renders links with correct hrefs', () => {
    render(<AnchorNav label="EN ESTA PÁGINA" items={mockItems} />)
    expect(screen.getByRole('link', { name: /TITULAR/ })).toHaveAttribute('href', '#titular')
    expect(screen.getByRole('link', { name: /OBJETO/ })).toHaveAttribute('href', '#objeto')
  })

  it('first item is active by default', () => {
    render(<AnchorNav label="EN ESTA PÁGINA" items={mockItems} />)
    const firstLink = screen.getByRole('link', { name: /TITULAR/ })
    expect(firstLink).toHaveClass('anchor-nav__link--active')
    expect(firstLink).toHaveAttribute('aria-current', 'location')
  })

  it('clicking a link sets it as active', () => {
    render(<AnchorNav label="EN ESTA PÁGINA" items={mockItems} />)
    const secondLink = screen.getByRole('link', { name: /OBJETO/ })
    fireEvent.click(secondLink)
    expect(secondLink).toHaveClass('anchor-nav__link--active')
    expect(secondLink).toHaveAttribute('aria-current', 'location')
  })

  it('clicking a link removes active from the previous item', () => {
    render(<AnchorNav label="EN ESTA PÁGINA" items={mockItems} />)
    const firstLink = screen.getByRole('link', { name: /TITULAR/ })
    const secondLink = screen.getByRole('link', { name: /OBJETO/ })
    fireEvent.click(secondLink)
    expect(firstLink).not.toHaveClass('anchor-nav__link--active')
    expect(firstLink).not.toHaveAttribute('aria-current')
  })

  it('renders with empty items without crashing', () => {
    render(<AnchorNav label="EN ESTA PÁGINA" items={[]} />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})
