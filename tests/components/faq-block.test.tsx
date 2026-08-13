/**
 * FaqBlock — SEO-01 §5.4 constraints.
 *
 * The critical assertions are structural, not cosmetic: answers must be in the
 * server-rendered output (AC-7), questions must be <h3>, and there must be no
 * accordion/<details> anywhere.
 */

import { render, screen } from '@testing-library/react'
import { FaqBlock } from '@/components/faq-block'
import type { FaqBlockContent } from '@/content/types'

const CONTENT: FaqBlockContent = {
  sectionEyebrow: 'C / PREGUNTAS FRECUENTES',
  sectionIndex: 'C',
  heading: 'Preguntas frecuentes',
  items: [
    { question: '¿Primera pregunta?', answer: 'Primera respuesta completa.' },
    { question: '¿Segunda pregunta?', answer: 'Segunda respuesta completa.' },
    { question: '¿Tercera pregunta?', answer: 'Tercera respuesta completa.' },
  ],
}

describe('FaqBlock', () => {
  it('renders the heading as an h2', () => {
    render(<FaqBlock {...CONTENT} />)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent('Preguntas frecuentes')
  })

  it('renders the section index and eyebrow label', () => {
    render(<FaqBlock {...CONTENT} />)
    expect(screen.getByText('C')).toBeInTheDocument()
    expect(screen.getByText('C / PREGUNTAS FRECUENTES')).toBeInTheDocument()
  })

  it('renders every question as an h3', () => {
    render(<FaqBlock {...CONTENT} />)
    const questions = screen.getAllByRole('heading', { level: 3 })
    expect(questions).toHaveLength(CONTENT.items.length)
    expect(questions[0]).toHaveTextContent('¿Primera pregunta?')
  })

  // AC-7: all answers present with no interaction and no JavaScript gating.
  it('renders every answer immediately, with no interaction', () => {
    render(<FaqBlock {...CONTENT} />)
    for (const item of CONTENT.items) {
      expect(screen.getByText(item.answer)).toBeVisible()
    }
  })

  // §5.4: no accordion, no <details>, no JS-gated content.
  it('uses no <details>/<summary> disclosure element', () => {
    const { container } = render(<FaqBlock {...CONTENT} />)
    expect(container.querySelector('details')).toBeNull()
    expect(container.querySelector('summary')).toBeNull()
  })

  // §5.4: each answer is the <p> immediately following its <h3>.
  it('pairs each question with the answer that follows it', () => {
    const { container } = render(<FaqBlock {...CONTENT} />)
    const items = container.querySelectorAll('.faq-block__item')
    expect(items).toHaveLength(CONTENT.items.length)

    items.forEach((item, index) => {
      const question = item.querySelector('h3')
      const answer = question?.nextElementSibling
      expect(question).toHaveTextContent(CONTENT.items[index].question)
      expect(answer?.tagName).toBe('P')
      expect(answer).toHaveTextContent(CONTENT.items[index].answer)
    })
  })

  it('renders nothing for an empty item list but keeps the heading', () => {
    render(<FaqBlock {...CONTENT} items={[]} />)
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { level: 3 })).toBeNull()
  })
})
