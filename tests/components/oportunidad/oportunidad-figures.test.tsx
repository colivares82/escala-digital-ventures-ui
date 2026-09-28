/**
 * LANDING-01 — page-local figures and table.
 */
import { render, screen } from '@testing-library/react'
import { OportunidadHeroFig } from '@/components/oportunidad/oportunidad-hero-fig'
import { DayComparison } from '@/components/oportunidad/day-comparison'
import { ScenarioFlow } from '@/components/oportunidad/scenario-flow'
import { oportunidadContent as c } from '@/content/es/oportunidad'

describe('OportunidadHeroFig', () => {
  it('renders 5 inputs, core and 2 outputs with an accessible label', () => {
    const { container } = render(<OportunidadHeroFig content={c.hero.fig} />)
    expect(screen.getByRole('img', { name: c.hero.fig.aria })).toBeInTheDocument()
    expect(container.querySelectorAll('.oport-hero-fig__input')).toHaveLength(5)
    expect(container.querySelectorAll('.oport-hero-fig__flow-in')).toHaveLength(5)
    expect(container.querySelectorAll('.oport-hero-fig__output')).toHaveLength(2)
    expect(screen.getByText(c.hero.fig.caption)).toBeInTheDocument()
  })

  // LANDING-01B — vertical figure: chip bottom-centre → distinct points on the core's top edge.
  it('inbound links run from each chip bottom-centre to a distinct, ordered core top-edge point', () => {
    const { container } = render(<OportunidadHeroFig content={c.hero.fig} />)
    const core = container.querySelector('.oport-hero-fig__core') as SVGRectElement
    const [coreX, coreY, coreW] = ['x', 'y', 'width'].map((a) => Number(core.getAttribute(a)))
    const chips = container.querySelectorAll('.oport-hero-fig__input')
    const ends = [...container.querySelectorAll('.oport-hero-fig__flow-in')].map((path, i) => {
      const nums = (path.getAttribute('d') ?? '').match(/-?\d+(\.\d+)?/g)!.map(Number)
      const [sx, sy] = nums
      const [ex, ey] = nums.slice(-2)
      const chipX = Number(chips[i].getAttribute('x'))
      const chipW = Number(chips[i].getAttribute('width'))
      expect(sx).toBeCloseTo(chipX + chipW / 2)
      expect(sy).toBeCloseTo(Number(chips[i].getAttribute('y')) + Number(chips[i].getAttribute('height')))
      expect(ey).toBe(coreY)
      expect(ex).toBeGreaterThan(coreX)
      expect(ex).toBeLessThan(coreX + coreW)
      return ex
    })
    // Same order as the chips and strictly increasing → the five links never cross.
    expect(ends).toEqual([...ends].sort((a, b) => a - b))
    expect(new Set(ends).size).toBe(5)
  })

  it('draws every link before any box so lines sit behind nodes', () => {
    const { container } = render(<OportunidadHeroFig content={c.hero.fig} />)
    const all = [...container.querySelectorAll('svg *')]
    const lastLink = Math.max(
      ...all.map((n, i) => (n.matches('.oport-hero-fig__flow-in, .oport-hero-fig__flow-out') ? i : -1)),
    )
    const firstBox = all.findIndex((n) => n.tagName === 'rect')
    expect(lastLink).toBeLessThan(firstBox)
  })

  it('renders only the two mono labels (no «UN SOLO LUGAR»)', () => {
    const { container } = render(<OportunidadHeroFig content={c.hero.fig} />)
    expect([...container.querySelectorAll('.oport-hero-fig__header')].map((n) => n.textContent)).toEqual([
      'HOY · TODO REPARTIDO',
      'LO QUE GANAS',
    ])
  })
})

describe('DayComparison', () => {
  it('renders a semantic table with one row per time slot', () => {
    render(<DayComparison content={c.day.table} />)
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getAllByRole('columnheader')).toHaveLength(3)
    expect(screen.getAllByRole('rowheader').map((n) => n.textContent)).toEqual(
      c.day.table.rows.map((r) => r.time),
    )
  })

  it('carries the mobile inline labels from the dictionary', () => {
    const { container } = render(<DayComparison content={c.day.table} />)
    expect(container.querySelector('.day-comparison__before')).toHaveAttribute('data-label', c.day.table.mobileBefore)
    expect(container.querySelector('.day-comparison__after')).toHaveAttribute('data-label', c.day.table.mobileAfter)
  })
})

describe('ScenarioFlow', () => {
  const s = c.scenarios.items[0]

  it('dashed before-row broken twice; solid after-row with arrows and one amber bar', () => {
    const { container } = render(<ScenarioFlow before={s.before} after={s.after} labels={c.scenarios.flowLabels} />)
    expect(container.querySelectorAll('.scenario-flow__box--dashed')).toHaveLength(3)
    expect(container.querySelectorAll('.scenario-flow__break')).toHaveLength(2)
    expect(container.querySelectorAll('.scenario-flow__box--solid')).toHaveLength(3)
    expect(container.querySelectorAll('.scenario-flow__arrow')).toHaveLength(2)
    expect(container.querySelectorAll('.scenario-flow__bar')).toHaveLength(1)
  })

  it('prints every label', () => {
    render(<ScenarioFlow before={s.before} after={s.after} labels={c.scenarios.flowLabels} />)
    ;[...s.before, ...s.after].forEach((label) => expect(screen.getByText(label)).toBeInTheDocument())
  })
})
