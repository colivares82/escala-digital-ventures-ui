/**
 * ValuesList — unit tests.
 * Spec: SPEC-P2.5 FR-4 / AC-2
 */

import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ValuesList } from '@/components/values-list'
import type { ValuesListItem } from '@/components/values-list'

const ITEMS: ValuesListItem[] = [
  { n: '01', title: 'Compromiso de socio', body: 'Body text 01.' },
  { n: '02', title: 'Excelencia de ingeniería', body: 'Body text 02.' },
  { n: '03', title: 'Producto antes que tecnología', body: 'Body text 03.' },
  { n: '04', title: 'Transparencia radical', body: 'Body text 04.' },
  { n: '05', title: 'Velocidad con criterio', body: 'Body text 05.' },
]

describe('ValuesList', () => {
  it('renders the section eyebrow', () => {
    render(<ValuesList sectionEyebrow="C / VALORES" items={ITEMS} />)
    expect(screen.getByText('C / VALORES')).toBeInTheDocument()
  })

  it('renders all 5 rows', () => {
    const { container } = render(
      <ValuesList sectionEyebrow="C / VALORES" items={ITEMS} />
    )
    const rows = container.querySelectorAll('.values-list__row')
    expect(rows).toHaveLength(5)
  })

  it('renders h3 for each value title', () => {
    render(<ValuesList sectionEyebrow="C / VALORES" items={ITEMS} />)
    const headings = screen.getAllByRole('heading', { level: 3 })
    expect(headings).toHaveLength(5)
  })

  it('renders all ordinal numbers', () => {
    render(<ValuesList sectionEyebrow="C / VALORES" items={ITEMS} />)
    ITEMS.forEach(({ n }) => {
      expect(screen.getByText(n)).toBeInTheDocument()
    })
  })

  it('renders all body texts', () => {
    render(<ValuesList sectionEyebrow="C / VALORES" items={ITEMS} />)
    ITEMS.forEach(({ body }) => {
      expect(screen.getByText(body)).toBeInTheDocument()
    })
  })

  it('first value is Compromiso de socio', () => {
    render(<ValuesList sectionEyebrow="C / VALORES" items={ITEMS} />)
    expect(screen.getByText('Compromiso de socio')).toBeInTheDocument()
  })
})
