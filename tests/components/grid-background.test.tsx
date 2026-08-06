/**
 * GridBackground — unit tests.
 * Spec: SPEC-P2.5 FR-6
 */

import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { GridBackground } from '@/components/grid-background'

describe('GridBackground', () => {
  it('renders an aria-hidden span', () => {
    const { container } = render(<GridBackground />)
    const el = container.querySelector('.grid-bg')
    expect(el).toBeInTheDocument()
    expect(el?.getAttribute('aria-hidden')).toBe('true')
  })

  it('has the grid-bg--radial modifier by default', () => {
    const { container } = render(<GridBackground />)
    const el = container.querySelector('.grid-bg')
    expect(el?.classList.contains('grid-bg--radial')).toBe(true)
  })

  it('omits radial modifier when radialGradient=false', () => {
    const { container } = render(<GridBackground radialGradient={false} />)
    const el = container.querySelector('.grid-bg')
    expect(el?.classList.contains('grid-bg--radial')).toBe(false)
  })

  it('sets --gb-cell custom property from cellSize prop', () => {
    const { container } = render(<GridBackground cellSize="4rem" />)
    const el = container.querySelector('.grid-bg') as HTMLElement
    expect(el?.style.getPropertyValue('--gb-cell')).toBe('4rem')
  })

  it('sets --gb-opacity custom property from lineOpacity prop', () => {
    const { container } = render(<GridBackground lineOpacity={0.03} />)
    const el = container.querySelector('.grid-bg') as HTMLElement
    expect(el?.style.getPropertyValue('--gb-opacity')).toBe('0.03')
  })

  it('does not interfere with pointer events (pointer-events:none via CSS)', () => {
    // The span has no onClick / tabIndex — verify no interactive attrs
    const { container } = render(<GridBackground />)
    const el = container.querySelector('.grid-bg')
    expect(el?.getAttribute('tabIndex')).toBeNull()
    expect(el?.getAttribute('role')).toBeNull()
  })

  it('renders a span element (not a div — no layout impact)', () => {
    const { container } = render(<GridBackground />)
    expect(container.querySelector('span.grid-bg')).toBeInTheDocument()
  })
})
