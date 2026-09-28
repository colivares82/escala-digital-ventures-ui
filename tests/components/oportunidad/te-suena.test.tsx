/**
 * LANDING-01A — «¿Te suena?» self-diagnosis (AC-3, AC-4, A4).
 */
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TeSuenaSection } from '@/components/oportunidad/te-suena-section'
import { diagnosisBand, toggleIndex } from '@/components/oportunidad/diagnosis'
import { oportunidadContent as c } from '@/content/es/oportunidad'

const t = c.teSuena

function setup() {
  const user = userEvent.setup()
  const utils = render(<TeSuenaSection content={t} />)
  const cards = screen.getAllByRole('button')
  const live = utils.container.querySelector('[aria-live="polite"]') as HTMLElement
  return { user, cards, live, ...utils }
}

describe('diagnosisBand', () => {
  it('switches exactly at 0, 1, 3 and 6 (AC-4)', () => {
    const bands = Array.from({ length: 9 }, (_, n) => diagnosisBand(n))
    expect(bands).toEqual(['none', 'low', 'low', 'mid', 'mid', 'mid', 'high', 'high', 'high'])
  })
})

describe('toggleIndex', () => {
  it('adds, removes and never mutates the input set', () => {
    const start = new Set([1])
    expect([...toggleIndex(start, 2)]).toEqual([1, 2])
    expect([...toggleIndex(start, 1)]).toEqual([])
    expect([...start]).toEqual([1])
  })
})

describe('TeSuenaSection', () => {
  it('renders 8 unpressed cards with quotes wrapped in « » and every answer in the DOM', () => {
    const { cards } = setup()
    expect(cards).toHaveLength(8)
    cards.forEach((card, i) => {
      expect(card).toHaveAttribute('type', 'button')
      expect(card).toHaveAttribute('aria-pressed', 'false')
      expect(card).toHaveTextContent(`«${t.phrases[i].quote}»`)
      expect(card).toHaveTextContent(t.phrases[i].answer)
    })
  })

  it('applies the dictionary tilt and span to each card', () => {
    const { cards } = setup()
    expect(cards[0].style.getPropertyValue('--oport-tilt')).toBe('-1.2deg')
    expect(cards[0]).toHaveClass('phrase-card--wide')
    expect(cards[1]).toHaveClass('phrase-card--half')
  })

  it('starts at 0 / 8 with the «none» message and no meter bar on', () => {
    const { live } = setup()
    expect(within(live).getByText('0')).toBeInTheDocument()
    expect(within(live).getByText(t.panel.messages.none)).toBeInTheDocument()
    expect(live.querySelectorAll('.diagnosis-panel__meter i')).toHaveLength(8)
    expect(live.querySelectorAll('.diagnosis-panel__meter i.is-on')).toHaveLength(0)
  })

  it('click toggles aria-pressed and updates count, meter and message (AC-3)', async () => {
    const { user, cards, live } = setup()
    await user.click(cards[0])
    expect(cards[0]).toHaveAttribute('aria-pressed', 'true')
    expect(within(live).getByText('1')).toBeInTheDocument()
    expect(within(live).getByText(t.panel.messages.low)).toBeInTheDocument()
    expect(live.querySelectorAll('.diagnosis-panel__meter i.is-on')).toHaveLength(1)

    await user.click(cards[0])
    expect(cards[0]).toHaveAttribute('aria-pressed', 'false')
    expect(within(live).getByText(t.panel.messages.none)).toBeInTheDocument()
  })

  it('Enter and Space toggle a focused card (AC-3)', async () => {
    const { user, cards } = setup()
    cards[2].focus()
    await user.keyboard('{Enter}')
    expect(cards[2]).toHaveAttribute('aria-pressed', 'true')
    await user.keyboard(' ')
    expect(cards[2]).toHaveAttribute('aria-pressed', 'false')
  })

  it('reaches the «mid» band at 3 and the «high» band at 6 marks (AC-4)', async () => {
    const { user, cards, live } = setup()
    for (const card of cards.slice(0, 3)) await user.click(card)
    expect(within(live).getByText(t.panel.messages.mid)).toBeInTheDocument()
    for (const card of cards.slice(3, 6)) await user.click(card)
    expect(within(live).getByText(t.panel.messages.high)).toBeInTheDocument()
    expect(live.querySelectorAll('.diagnosis-panel__meter i.is-on')).toHaveLength(6)
  })

  it('marks the section as enhanced after hydration (no-JS fallback hook)', () => {
    const { container } = setup()
    expect(container.querySelector('#te-suena')).toHaveAttribute('data-enhanced', 'true')
  })

  it('panel CTA goes to #contacto and renders the closing with its accent', () => {
    setup()
    expect(screen.getByRole('link', { name: t.panel.cta })).toHaveAttribute('href', '#contacto')
    expect(screen.getByText(t.closing.accent).tagName).toBe('EM')
  })
})
