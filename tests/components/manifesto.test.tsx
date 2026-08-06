/**
 * Manifesto — unit tests.
 * Spec: SPEC-P2.5 FR-7 / FR-8 / AC-5 / AC-7
 */

import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Manifesto } from '@/components/manifesto'

const TEN_BELIEFS = [
  'La tecnología solo tiene sentido cuando mejora la vida de las personas.',
  'El software es un activo estratégico, no un gasto.',
  'La simplicidad es una de las formas más avanzadas de ingeniería.',
  'Negocio, producto y tecnología forman una única disciplina.',
  'La automatización libera el potencial humano para tareas de mayor valor.',
  'La inteligencia artificial debe amplificar las capacidades de las personas.',
  'La calidad no es negociable.',
  'Creemos en relaciones de largo plazo.',
  'El aprendizaje continuo es imprescindible.',
  'El verdadero éxito consiste en ayudar a nuestros clientes a crecer.',
]

const BASE_PROPS = {
  sectionEyebrow: 'E / EL MANIFIESTO',
  heading: 'El Manifiesto de Escala',
  lead: 'DIEZ CREENCIAS · UNA FORMA DE ENTENDER LA TECNOLOGÍA',
  beliefs: TEN_BELIEFS,
  colivaresLine:
    'DIRECCIÓN GENERAL · La trayectoria completa de nuestro Director General está disponible en colivares.com',
}

describe('Manifesto', () => {
  it('renders the section eyebrow', () => {
    render(<Manifesto {...BASE_PROPS} />)
    expect(screen.getByText(BASE_PROPS.sectionEyebrow)).toBeInTheDocument()
  })

  it('renders the H2 heading', () => {
    render(<Manifesto {...BASE_PROPS} />)
    expect(
      screen.getByRole('heading', { level: 2, name: /Manifiesto de Escala/i })
    ).toBeInTheDocument()
  })

  it('renders 10 strata plates', () => {
    const { container } = render(<Manifesto {...BASE_PROPS} />)
    const plates = container.querySelectorAll('.manifesto__plate')
    expect(plates).toHaveLength(10)
  })

  it('renders 10 ambre bars (one per plate)', () => {
    const { container } = render(<Manifesto {...BASE_PROPS} />)
    const bars = container.querySelectorAll('.manifesto__bar')
    expect(bars).toHaveLength(10)
  })

  it('renders all 10 belief texts', () => {
    render(<Manifesto {...BASE_PROPS} />)
    TEN_BELIEFS.forEach((belief) => {
      expect(screen.getByText(belief)).toBeInTheDocument()
    })
  })

  it('renders ghost numbers 01 through 10', () => {
    const { container } = render(<Manifesto {...BASE_PROPS} />)
    const nums = container.querySelectorAll('.manifesto__num')
    expect(nums).toHaveLength(10)
    expect(nums[0]?.textContent).toBe('01')
    expect(nums[9]?.textContent).toBe('10')
  })

  it('renders meta labels 01/10 through 10/10', () => {
    const { container } = render(<Manifesto {...BASE_PROPS} />)
    const metas = container.querySelectorAll('.manifesto__meta')
    expect(metas[0]?.textContent).toBe('01/10')
    expect(metas[9]?.textContent).toBe('10/10')
  })

  it('renders the colivares.com line as plain text (NOT a link) — AC-7', () => {
    render(<Manifesto {...BASE_PROPS} />)
    const colv = screen.getByText(/DIRECCIÓN GENERAL/)
    expect(colv).toBeInTheDocument()
    // Must NOT be inside an anchor element
    expect(colv.tagName.toLowerCase()).not.toBe('a')
    expect(colv.closest('a')).toBeNull()
  })

  it('colivares.com mention is plain text — no href attribute', () => {
    const { container } = render(<Manifesto {...BASE_PROPS} />)
    const links = container.querySelectorAll('a')
    const colivaresLink = Array.from(links).find((a) =>
      a.getAttribute('href')?.includes('colivares.com')
    )
    expect(colivaresLink).toBeUndefined()
  })

  it('renders GridBackground inside the section', () => {
    const { container } = render(<Manifesto {...BASE_PROPS} />)
    expect(container.querySelector('.grid-bg')).toBeInTheDocument()
  })

  it('plates container has data-visible set to "true" by the IO (plate entrance)', () => {
    // data-visible drives the plate ENTRANCE animation (opacity + translateY).
    // The ambre bar is separately hover-driven — NOT scroll-driven.
    // In the test environment the IntersectionObserver mock fires immediately
    // with isIntersecting=true, so data-visible is set to "true" synchronously.
    const { container } = render(<Manifesto {...BASE_PROPS} />)
    const plates = container.querySelector('.manifesto__plates')
    expect(plates?.hasAttribute('data-visible')).toBe(true)
    expect(plates?.getAttribute('data-visible')).toBe('true')
  })

  it('bar is inside the plate (hover-driven, not scroll-driven — wireframe definition)', () => {
    // Each bar is a sibling of the plate content, NOT inside a data-visible wrapper.
    // The hover rule is .manifesto__plate:hover .manifesto__bar { scaleY(1) }.
    const { container } = render(<Manifesto {...BASE_PROPS} />)
    // Bars must be direct children of each plate
    const firstPlate = container.querySelector('.manifesto__plate')
    const bar = firstPlate?.querySelector('.manifesto__bar')
    expect(bar).toBeInTheDocument()
    // Bar is inside the plate (hover-sensitive ancestor), not a standalone element
    expect(bar?.closest('.manifesto__plate')).toBe(firstPlate)
  })

  it('plate 5 has --man-delay set to 240ms', () => {
    // 5th plate (index 4) → 4 * 60ms = 240ms
    const { container } = render(<Manifesto {...BASE_PROPS} />)
    const plates = container.querySelectorAll('.manifesto__plate')
    const plate5 = plates[4] as HTMLElement
    expect(plate5?.style.getPropertyValue('--man-delay')).toBe('240ms')
  })
})
