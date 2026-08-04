/**
 * AlliancePlanes — unit tests.
 * Spec: SPEC-P2.4 FR-4 / AC-5
 */

import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { AlliancePlanes } from '@/components/alliance-planes'
import type { AlliancePlane } from '@/content/types'

const THREE_PLANES: AlliancePlane[] = [
  {
    index: '01',
    title: 'Técnico',
    body: 'Descripción del plano técnico.',
    depth: 'ARQUITECTURA · CÓDIGO · OPERACIÓN',
  },
  {
    index: '02',
    title: 'Estratégico',
    body: 'Descripción del plano estratégico.',
    depth: 'ROADMAP · PRIORIDAD · IMPACTO',
  },
  {
    index: '03',
    title: 'Visionario',
    body: 'Descripción del plano visionario.',
    depth: 'ANTICIPACIÓN · DATOS · IA',
  },
]

describe('AlliancePlanes', () => {
  it('renders the section heading', () => {
    render(
      <AlliancePlanes
        sectionEyebrow="C / TRES PLANOS"
        heading="Tres planos de acompañamiento"
        lead="Acompañamiento simultáneo."
        items={THREE_PLANES}
      />
    )
    expect(screen.getByRole('heading', { level: 2, name: 'Tres planos de acompañamiento' })).toBeInTheDocument()
  })

  it('renders the section eyebrow', () => {
    render(
      <AlliancePlanes
        sectionEyebrow="C / TRES PLANOS"
        heading="Heading"
        lead="Lead"
        items={THREE_PLANES}
      />
    )
    expect(screen.getByText('C / TRES PLANOS')).toBeInTheDocument()
  })

  it('renders the lead paragraph', () => {
    render(
      <AlliancePlanes
        sectionEyebrow="C / TRES PLANOS"
        heading="Heading"
        lead="Acompañamiento simultáneo en tres planos."
        items={THREE_PLANES}
      />
    )
    expect(screen.getByText('Acompañamiento simultáneo en tres planos.')).toBeInTheDocument()
  })

  it('renders exactly 3 column containers', () => {
    const { container } = render(
      <AlliancePlanes
        sectionEyebrow="C / TRES PLANOS"
        heading="Heading"
        lead="Lead"
        items={THREE_PLANES}
      />
    )
    const cols = container.querySelectorAll('.alliance-planes__col')
    expect(cols).toHaveLength(3)
  })

  it('renders H3 for each plane title', () => {
    render(
      <AlliancePlanes
        sectionEyebrow="C / TRES PLANOS"
        heading="Heading"
        lead="Lead"
        items={THREE_PLANES}
      />
    )
    expect(screen.getByRole('heading', { level: 3, name: 'Técnico' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Estratégico' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Visionario' })).toBeInTheDocument()
  })

  it('renders the depth line for each plane', () => {
    render(
      <AlliancePlanes
        sectionEyebrow="C / TRES PLANOS"
        heading="Heading"
        lead="Lead"
        items={THREE_PLANES}
      />
    )
    expect(screen.getByText('ARQUITECTURA · CÓDIGO · OPERACIÓN')).toBeInTheDocument()
    expect(screen.getByText('ROADMAP · PRIORIDAD · IMPACTO')).toBeInTheDocument()
    expect(screen.getByText('ANTICIPACIÓN · DATOS · IA')).toBeInTheDocument()
  })

  it('applies highlighted class to the middle column only (index 1)', () => {
    const { container } = render(
      <AlliancePlanes
        sectionEyebrow="C / TRES PLANOS"
        heading="Heading"
        lead="Lead"
        items={THREE_PLANES}
      />
    )
    const highlighted = container.querySelectorAll('.alliance-planes__col--highlighted')
    expect(highlighted).toHaveLength(1)
    // The highlighted column contains the strategic plane title
    expect(highlighted[0]?.textContent).toContain('Estratégico')
  })

  it('renders the PLANO label for each column', () => {
    render(
      <AlliancePlanes
        sectionEyebrow="C / TRES PLANOS"
        heading="Heading"
        lead="Lead"
        items={THREE_PLANES}
      />
    )
    expect(screen.getByText('PLANO · 01')).toBeInTheDocument()
    expect(screen.getByText('PLANO · 02')).toBeInTheDocument()
    expect(screen.getByText('PLANO · 03')).toBeInTheDocument()
  })

  it('renders in a dark-surface section', () => {
    const { container } = render(
      <AlliancePlanes
        sectionEyebrow="C / TRES PLANOS"
        heading="Heading"
        lead="Lead"
        items={THREE_PLANES}
      />
    )
    const section = container.querySelector('section')
    expect(section?.classList.contains('dark-surface')).toBe(true)
  })

  it('renders body text for each plane', () => {
    render(
      <AlliancePlanes
        sectionEyebrow="C / TRES PLANOS"
        heading="Heading"
        lead="Lead"
        items={THREE_PLANES}
      />
    )
    expect(screen.getByText('Descripción del plano técnico.')).toBeInTheDocument()
    expect(screen.getByText('Descripción del plano estratégico.')).toBeInTheDocument()
    expect(screen.getByText('Descripción del plano visionario.')).toBeInTheDocument()
  })
})
