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

  it('input connectors run from the box right edge to the core left edge', () => {
    const { container } = render(<OportunidadHeroFig content={c.hero.fig} />)
    const coreX = Number(container.querySelector('.oport-hero-fig__core')?.getAttribute('x'))
    const boxes = container.querySelectorAll('.oport-hero-fig__input')
    container.querySelectorAll('.oport-hero-fig__flow-in').forEach((line, i) => {
      const boxRight = Number(boxes[i].getAttribute('x')) + Number(boxes[i].getAttribute('width'))
      expect(Number(line.getAttribute('x1'))).toBeCloseTo(boxRight)
      expect(Number(line.getAttribute('x2'))).toBe(coreX)
    })
  })

  it('draws connectors before boxes so lines sit behind nodes', () => {
    const { container } = render(<OportunidadHeroFig content={c.hero.fig} />)
    const all = [...container.querySelectorAll('svg > *')]
    const lastLine = all.map((n) => n.tagName).lastIndexOf('line')
    const firstGroup = all.findIndex((n) => n.tagName === 'g')
    expect(lastLine).toBeLessThan(firstGroup)
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
