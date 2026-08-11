/**
 * AllianceConstellation — unit tests.
 * Spec: SPEC-P2.4 FR-3 / AC-3 / AC-4
 */

import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { AllianceConstellation } from '@/components/alliance-constellation'
import type { AllianceSeat } from '@/content/types'

const FIVE_SEATS: AllianceSeat[] = [
  { name: 'Magupell',   state: 'occupied' },
  { name: 'BIOZERO',    state: 'occupied' },
  { name: 'DISPONIBLE', state: 'free' },
  { name: 'DISPONIBLE', state: 'free' },
  { name: 'DISPONIBLE', state: 'free' },
]

describe('AllianceConstellation', () => {
  it('renders an SVG with the aria-label', () => {
    render(
      <AllianceConstellation
        seats={FIVE_SEATS}
        ariaLabel="Constellation de alianzas"
      />
    )
    expect(screen.getByRole('img', { name: 'Constellation de alianzas' })).toBeInTheDocument()
  })

  it('renders the ESCALA core label', () => {
    const { container } = render(
      <AllianceConstellation seats={FIVE_SEATS} ariaLabel="test" />
    )
    const text = container.querySelector('.ac-core-label')
    expect(text).toBeInTheDocument()
    expect(text?.textContent).toBe('ESCALA')
  })

  it('renders one group per seat (5 seats)', () => {
    const { container } = render(
      <AllianceConstellation seats={FIVE_SEATS} ariaLabel="test" />
    )
    const seatGroups = container.querySelectorAll('.ac-seat')
    expect(seatGroups).toHaveLength(5)
  })

  it('renders occupied seats with solid class', () => {
    const { container } = render(
      <AllianceConstellation seats={FIVE_SEATS} ariaLabel="test" />
    )
    const solid = container.querySelectorAll('.ac-seat--occupied')
    expect(solid).toHaveLength(2)
  })

  it('renders free seats with free class', () => {
    const { container } = render(
      <AllianceConstellation seats={FIVE_SEATS} ariaLabel="test" />
    )
    const free = container.querySelectorAll('.ac-seat--free')
    expect(free).toHaveLength(3)
  })

  it('renders ambre pulse dots only for occupied seats', () => {
    const { container } = render(
      <AllianceConstellation seats={FIVE_SEATS} ariaLabel="test" />
    )
    const pulses = container.querySelectorAll('.ac-pulse')
    // One pulse per occupied seat
    expect(pulses).toHaveLength(2)
  })

  it('renders solid connectors for occupied seats', () => {
    const { container } = render(
      <AllianceConstellation seats={FIVE_SEATS} ariaLabel="test" />
    )
    const solid = container.querySelectorAll('.ac-conn--solid')
    expect(solid).toHaveLength(2)
  })

  it('renders dashed connectors for free seats', () => {
    const { container } = render(
      <AllianceConstellation seats={FIVE_SEATS} ariaLabel="test" />
    )
    const dashed = container.querySelectorAll('.ac-conn--dashed')
    expect(dashed).toHaveLength(3)
  })

  it('applies compact class when size is compact', () => {
    const { container } = render(
      <AllianceConstellation seats={FIVE_SEATS} size="compact" ariaLabel="test" />
    )
    expect(container.querySelector('.alliance-constellation--compact')).toBeInTheDocument()
  })

  it('applies large class when size is large', () => {
    const { container } = render(
      <AllianceConstellation seats={FIVE_SEATS} size="large" ariaLabel="test" />
    )
    expect(container.querySelector('.alliance-constellation--large')).toBeInTheDocument()
  })

  it('defaults to compact when size is not specified', () => {
    const { container } = render(
      <AllianceConstellation seats={FIVE_SEATS} ariaLabel="test" />
    )
    expect(container.querySelector('.alliance-constellation--compact')).toBeInTheDocument()
  })

  it('renders seat labels for all 5 seats', () => {
    const { container } = render(
      <AllianceConstellation seats={FIVE_SEATS} ariaLabel="test" />
    )
    const labels = container.querySelectorAll('.ac-label')
    expect(labels).toHaveLength(5)
  })

  it('occupied seat labels use occupied class', () => {
    const { container } = render(
      <AllianceConstellation seats={FIVE_SEATS} ariaLabel="test" />
    )
    const occupied = container.querySelectorAll('.ac-label--occupied')
    expect(occupied).toHaveLength(2)
  })

  it('free seat labels use free class', () => {
    const { container } = render(
      <AllianceConstellation seats={FIVE_SEATS} ariaLabel="test" />
    )
    const free = container.querySelectorAll('.ac-label--free')
    expect(free).toHaveLength(3)
  })

  it('renders seat names as text content', () => {
    render(
      <AllianceConstellation
        seats={[
          { name: 'PARTNER_A', state: 'occupied' },
          { name: 'LIBRE', state: 'free' },
          { name: 'LIBRE', state: 'free' },
          { name: 'LIBRE', state: 'free' },
          { name: 'LIBRE', state: 'free' },
        ]}
        ariaLabel="test"
      />
    )
    // SVG text elements rendered — query by text
    expect(screen.getByText('PARTNER_A')).toBeInTheDocument()
  })
})
