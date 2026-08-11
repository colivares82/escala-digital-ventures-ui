/**
 * AllianceConstellation — unit tests.
 * Spec: SPEC-P2.4 FR-3 / AC-3 / AC-4 · SPEC-POLISH-04
 */

import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { AllianceConstellation } from '@/components/alliance-constellation'
import type { AllianceSeat } from '@/content/types'

const FIVE_SEATS: AllianceSeat[] = [
  { name: 'Magupell',   state: 'occupied' },
  { name: 'BioZero',    state: 'occupied' },
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

  it('renders ambre pulse dots only for occupied seats (compact/large)', () => {
    const { container } = render(
      <AllianceConstellation seats={FIVE_SEATS} ariaLabel="test" size="compact" />
    )
    const pulses = container.querySelectorAll('.ac-pulse')
    // One static pulse per occupied seat in compact/large mode
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

// ---------------------------------------------------------------------------
// Protagonist size — SPEC-POLISH-04
// ---------------------------------------------------------------------------

describe('AllianceConstellation — protagonist size', () => {
  it('applies protagonist class when size is protagonist', () => {
    const { container } = render(
      <AllianceConstellation seats={FIVE_SEATS} size="protagonist" ariaLabel="test" />
    )
    expect(container.querySelector('.alliance-constellation--protagonist')).toBeInTheDocument()
  })

  it('renders with 100% width (responsive) in protagonist mode', () => {
    const { container } = render(
      <AllianceConstellation seats={FIVE_SEATS} size="protagonist" ariaLabel="test" />
    )
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('width')).toBe('100%')
  })

  it('uses 960×620 viewBox in protagonist mode', () => {
    const { container } = render(
      <AllianceConstellation seats={FIVE_SEATS} size="protagonist" ariaLabel="test" />
    )
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('viewBox')).toBe('0 0 960 620')
  })

  it('renders corner ticks in protagonist mode', () => {
    const { container } = render(
      <AllianceConstellation seats={FIVE_SEATS} size="protagonist" ariaLabel="test" />
    )
    // Corner ticks are in a <g aria-hidden="true"> with 4 <path> elements
    const tickGroup = container.querySelector('g[aria-hidden="true"]')
    expect(tickGroup).toBeInTheDocument()
    const paths = tickGroup?.querySelectorAll('path')
    expect(paths).toHaveLength(4)
  })

  it('renders coreSubLabel when provided in protagonist mode', () => {
    render(
      <AllianceConstellation
        seats={FIVE_SEATS}
        size="protagonist"
        ariaLabel="test"
        coreSubLabel="2 ALIANZAS ACTIVAS · 3 DISPONIBLES"
      />
    )
    expect(screen.getByText('2 ALIANZAS ACTIVAS · 3 DISPONIBLES')).toBeInTheDocument()
  })

  it('does not render coreSubLabel when not provided', () => {
    const { container } = render(
      <AllianceConstellation seats={FIVE_SEATS} size="protagonist" ariaLabel="test" />
    )
    expect(container.querySelector('.ac-core-sublabel')).not.toBeInTheDocument()
  })

  it('renders traveling pulse elements for occupied seats in protagonist mode', () => {
    const { container } = render(
      <AllianceConstellation seats={FIVE_SEATS} size="protagonist" ariaLabel="test" />
    )
    // Traveling pulses have class ac-pulse-travel
    const travelPulses = container.querySelectorAll('.ac-pulse-travel')
    expect(travelPulses).toHaveLength(2)
  })

  it('does NOT render static pulse dots in protagonist mode', () => {
    const { container } = render(
      <AllianceConstellation seats={FIVE_SEATS} size="protagonist" ariaLabel="test" />
    )
    // Static .ac-pulse dots are only for compact/large
    const staticPulses = container.querySelectorAll('.ac-pulse')
    expect(staticPulses).toHaveLength(0)
  })

  it('traveling pulses are aria-hidden', () => {
    const { container } = render(
      <AllianceConstellation seats={FIVE_SEATS} size="protagonist" ariaLabel="test" />
    )
    const travelPulses = container.querySelectorAll('.ac-pulse-travel')
    travelPulses.forEach((pulse) => {
      expect(pulse).toHaveAttribute('aria-hidden', 'true')
    })
  })

  it('renders 5 seat groups in protagonist mode', () => {
    const { container } = render(
      <AllianceConstellation seats={FIVE_SEATS} size="protagonist" ariaLabel="test" />
    )
    expect(container.querySelectorAll('.ac-seat')).toHaveLength(5)
  })

  it('renders seat names in protagonist mode', () => {
    render(
      <AllianceConstellation seats={FIVE_SEATS} size="protagonist" ariaLabel="test" />
    )
    expect(screen.getByText('Magupell')).toBeInTheDocument()
    expect(screen.getByText('BioZero')).toBeInTheDocument()
  })
})
