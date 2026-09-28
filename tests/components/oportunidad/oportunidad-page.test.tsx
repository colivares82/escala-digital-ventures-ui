/**
 * LANDING-01 — /oportunidad page composition.
 */
import { render, screen, within } from '@testing-library/react'
import { OportunidadPage } from '@/components/pages/oportunidad'
import { getDictionary } from '@/lib/i18n/dictionary'
import { oportunidadContent as c } from '@/content/es/oportunidad'

const dict = getDictionary('es')

describe('OportunidadPage', () => {
  it('renders sections 00 → 05 in wireframe order, then the site-wide contact block', () => {
    const { container } = render(<OportunidadPage dict={dict} locale="es" />)
    const indexes = [...container.querySelectorAll('.section-index span:first-child')].map(
      (n) => n.textContent,
    )
    expect(indexes).toEqual(['00', '01', '02', '03', '04', '05'])
    const last = container.lastElementChild as HTMLElement
    expect(last).toHaveAttribute('id', 'contacto')
  })

  it('hero H1 uses the shared display scale, not a page-local size', () => {
    render(<OportunidadPage dict={dict} locale="es" />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveClass('oport-hero__title')
  })

  it('renders the two-line H1 with the accent line', () => {
    render(<OportunidadPage dict={dict} locale="es" />)
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toHaveTextContent(c.hero.title1)
    expect(within(h1).getByText(c.hero.title2)).toHaveClass('oport-hero__title-accent')
  })

  it('CTAs point to the in-page anchors, which exist (AC-9)', () => {
    const { container } = render(<OportunidadPage dict={dict} locale="es" />)
    expect(screen.getByRole('link', { name: c.hero.ctaPrimary })).toHaveAttribute('href', '#contacto')
    expect(screen.getByRole('link', { name: c.hero.ctaSecondary })).toHaveAttribute('href', '#escenarios')
    expect(container.querySelector('#contacto')).toBeInTheDocument()
    expect(container.querySelector('#escenarios')).toBeInTheDocument()
  })

  it('renders three scenario cards with the mandatory «ilustrativo» eyebrow', () => {
    const { container } = render(<OportunidadPage dict={dict} locale="es" />)
    const cards = container.querySelectorAll('.scenario-card')
    expect(cards).toHaveLength(3)
    cards.forEach((card) =>
      expect(card.querySelector('.scenario-card__eyebrow')?.textContent).toMatch(/· ilustrativo$/),
    )
  })

  it('reuses the site-wide ContactSection (FinalCTA) as #contacto', () => {
    const { container } = render(<OportunidadPage dict={dict} locale="es" />)
    const contact = container.querySelector('#contacto') as HTMLElement
    expect(contact).toHaveClass('contact-page', 'contact-page--section')
    expect(contact.querySelector('form.contact-form')).toBeInTheDocument()
    expect(within(contact).getByRole('heading', { level: 2 })).toHaveTextContent(
      dict.contact.pageHeader.h1,
    )
  })

  it('§ 03 renders the shared AllianceConstellation with Magupell and BioZero', () => {
    const { container } = render(<OportunidadPage dict={dict} locale="es" />)
    expect(container.querySelector('.alliance-constellation--protagonist')).toBeInTheDocument()
    const fig = container.querySelector('.oport-alliance__fig') as HTMLElement
    expect(fig.closest('section')).toHaveClass('section--dark')
    expect(within(fig).getByText('Magupell')).toBeInTheDocument()
    expect(within(fig).getByText('BioZero')).toBeInTheDocument()
    expect(within(fig).getAllByText('DISPONIBLE')).toHaveLength(3)
    expect(screen.getByText(c.alliance.figCaption)).toBeInTheDocument()
  })

  it('renders planes, «lo que no somos» strip and readouts', () => {
    render(<OportunidadPage dict={dict} locale="es" />)
    c.alliance.planes.forEach((p) => expect(screen.getByText(p.title)).toBeInTheDocument())
    c.alliance.notItems.forEach((item) => expect(screen.getByText(item)).toBeInTheDocument())
    c.about.readouts.forEach((r) => expect(screen.getByText(r.value)).toBeInTheDocument())
  })

  it('links to the localized cases index and shows price + offer', () => {
    render(<OportunidadPage dict={dict} locale="es" />)
    expect(screen.getByRole('link', { name: c.about.link })).toHaveAttribute('href', '/casos-de-exito')
    expect(screen.getByText(c.start.price.value)).toBeInTheDocument()
    expect(screen.getByText(c.start.offer.big)).toBeInTheDocument()
    expect(screen.getByText(c.start.offer.label)).toBeInTheDocument()
  })

  it('renders nothing when the bundle has no ES-only slice (EN/CA)', () => {
    const { container } = render(<OportunidadPage dict={getDictionary('en')} locale="en" />)
    expect(container).toBeEmptyDOMElement()
  })
})
