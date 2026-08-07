/**
 * 404 not-found page tests — SPEC-P4 FR-5.
 *
 * Verifies:
 * - Renders the error code line
 * - Renders the H1 "Fuera del sistema."
 * - Renders the body paragraph
 * - Renders the CTA link pointing to "/"
 * - Renders the SVG diagram with aria-label
 */

import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import NotFound from '@/app/not-found'

// Mock GridBackground (no-op in tests)
vi.mock('@/components/grid-background', () => ({
  GridBackground: () => null,
}))

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}))

describe('NotFound (404 page)', () => {
  it('renders the error code line', () => {
    render(<NotFound />)
    expect(screen.getByText('ERROR 404 · RUTA NO ENCONTRADA')).toBeInTheDocument()
  })

  it('renders the H1 "Fuera del sistema."', () => {
    render(<NotFound />)
    expect(screen.getByRole('heading', { level: 1, name: 'Fuera del sistema.' })).toBeInTheDocument()
  })

  it('renders the body paragraph', () => {
    render(<NotFound />)
    expect(
      screen.getByText('La página que buscas no existe o se ha movido. Volvamos a un lugar conocido.'),
    ).toBeInTheDocument()
  })

  it('renders the CTA link pointing to "/"', () => {
    render(<NotFound />)
    const cta = screen.getByRole('link', { name: 'VOLVER AL INICIO ↗' })
    expect(cta).toBeInTheDocument()
    expect(cta).toHaveAttribute('href', '/')
  })

  it('renders the SVG diagram with aria-label', () => {
    render(<NotFound />)
    const svg = screen.getByRole('img')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('aria-label')
  })
})
