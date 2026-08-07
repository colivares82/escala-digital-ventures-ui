/**
 * LegalDoc component tests — SPEC-P4 FR-1, FR-4.
 *
 * Verifies:
 * - Renders H1, eyebrow, updated date
 * - Renders all sections with correct headings and IDs
 * - Renders KV rows for sections that have them
 * - Highlights {{PLACEHOLDER}} tokens with the .legal-doc__placeholder class
 * - Renders the mobile index nav
 */

import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { LegalDoc } from '@/components/legal-doc'
import type { LegalDictionary } from '@/content/types'

// Mock AnchorNav (client component) to avoid IntersectionObserver in tests.
vi.mock('@/components/anchor-nav', () => ({
  AnchorNav: ({ label, items }: { label: string; items: Array<{ id: string; index: string; name: string }> }) => (
    <nav aria-label={label}>
      {items.map((item) => (
        <a key={item.id} href={`#${item.id}`}>
          {item.index} · {item.name}
        </a>
      ))}
    </nav>
  ),
}))

const mockLegalContent: LegalDictionary = {
  meta: {
    title: 'Aviso legal | Escala Digital Ventures',
    description: 'Aviso legal de Escala Digital Ventures.',
  },
  header: {
    eyebrow: '· AVISO LEGAL',
    h1: 'Aviso legal',
    updatedLabel: 'ÚLTIMA ACTUALIZACIÓN ·',
    updatedDate: '{{FECHA_ACTUALIZACION}}',
  },
  anchorLabel: 'EN ESTA PÁGINA',
  sections: [
    {
      id: 'titular',
      index: '01',
      name: 'TITULAR',
      title: 'Titular del sitio web',
      body: 'Información del titular.',
      kv: [
        { key: 'Denominación', value: 'Escala Digital Ventures, S.L.U.' },
        { key: 'NIF', value: '{{NIF_B88767520}}' },
      ],
    },
    {
      id: 'objeto',
      index: '02',
      name: 'OBJETO',
      title: 'Objeto',
      body: 'El objeto del sitio web.',
    },
  ],
}

describe('LegalDoc', () => {
  it('renders the H1 heading', () => {
    render(<LegalDoc content={mockLegalContent} />)
    expect(screen.getByRole('heading', { level: 1, name: 'Aviso legal' })).toBeInTheDocument()
  })

  it('renders the eyebrow', () => {
    render(<LegalDoc content={mockLegalContent} />)
    expect(screen.getByText('· AVISO LEGAL')).toBeInTheDocument()
  })

  it('renders the updated label', () => {
    render(<LegalDoc content={mockLegalContent} />)
    expect(screen.getByText(/ÚLTIMA ACTUALIZACIÓN/)).toBeInTheDocument()
  })

  it('renders all section H2 headings', () => {
    render(<LegalDoc content={mockLegalContent} />)
    expect(screen.getByRole('heading', { level: 2, name: 'Titular del sitio web' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'Objeto' })).toBeInTheDocument()
  })

  it('renders section IDs as anchor targets', () => {
    const { container } = render(<LegalDoc content={mockLegalContent} />)
    expect(container.querySelector('#titular')).toBeInTheDocument()
    expect(container.querySelector('#objeto')).toBeInTheDocument()
  })

  it('renders KV rows for sections that have them', () => {
    render(<LegalDoc content={mockLegalContent} />)
    expect(screen.getByText('Denominación')).toBeInTheDocument()
    expect(screen.getByText('Escala Digital Ventures, S.L.U.')).toBeInTheDocument()
  })

  it('highlights {{PLACEHOLDER}} tokens with the placeholder class', () => {
    const { container } = render(<LegalDoc content={mockLegalContent} />)
    const marks = container.querySelectorAll('.legal-doc__placeholder')
    // Expect at least 2: {{FECHA_ACTUALIZACION}} and {{NIF_B88767520}}
    expect(marks.length).toBeGreaterThanOrEqual(2)
  })

  it('renders the mobile index nav with anchor label', () => {
    render(<LegalDoc content={mockLegalContent} />)
    // The mobile index nav has the anchorLabel as its aria-label
    const navs = screen.getAllByRole('navigation', { name: 'EN ESTA PÁGINA' })
    expect(navs.length).toBeGreaterThanOrEqual(1)
  })

  it('renders section body text', () => {
    render(<LegalDoc content={mockLegalContent} />)
    expect(screen.getByText('Información del titular.')).toBeInTheDocument()
    expect(screen.getByText('El objeto del sitio web.')).toBeInTheDocument()
  })
})
