/**
 * MobileMenu tests — SPEC-POLISH-07 §4.
 * Covers: open/close, Escape, focus trap, scroll lock, nav completeness,
 * active-page marking, and the desktop-resize guard.
 */
import { act, render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MobileMenu } from '@/components/mobile-menu'
import { sharedContent } from '@/content/es/shared'
import { HEADER_DESKTOP_MEDIA_QUERY } from '@/lib/motion-constants'

const { header, accessibility, finalCta } = sharedContent
const email = finalCta.email

function renderMenu(isOpen: boolean, onClose: () => void) {
  const triggerRef = { current: document.createElement('button') } as React.RefObject<HTMLButtonElement>
  document.body.appendChild(triggerRef.current as HTMLButtonElement)
  return render(
    <MobileMenu
      isOpen={isOpen}
      onClose={onClose}
      content={header}
      accessibility={accessibility}
      currentPage="alliance"
      locale="es"
      contactHref="/contacto"
      email={email}
      brandHref="/"
      triggerRef={triggerRef}
    />,
  )
}

/** Registers a mock matchMedia so the resize-guard listener can be exercised. */
function mockMatchMedia() {
  const listeners: Array<(e: MediaQueryListEvent) => void> = []
  const mql = {
    matches: false,
    media: HEADER_DESKTOP_MEDIA_QUERY,
    addEventListener: (_: string, cb: (e: MediaQueryListEvent) => void) => {
      listeners.push(cb)
    },
    removeEventListener: (_: string, cb: (e: MediaQueryListEvent) => void) => {
      const i = listeners.indexOf(cb)
      if (i >= 0) listeners.splice(i, 1)
    },
  }
  window.matchMedia = ((query: string) => ({
    ...mql,
    media: query,
  })) as unknown as typeof window.matchMedia
  return { listeners, mql }
}

describe('MobileMenu', () => {
  beforeEach(() => {
    mockMatchMedia()
  })

  it('renders nothing when closed', () => {
    const { container } = renderMenu(false, vi.fn())
    expect(container).toBeEmptyDOMElement()
  })

  it('renders all five nav items with mono indices 01–05', () => {
    renderMenu(true, vi.fn())
    header.nav.forEach((item, i) => {
      expect(screen.getByRole('link', { name: item.label })).toBeInTheDocument()
      expect(screen.getByText(String(i + 1).padStart(2, '0'))).toBeInTheDocument()
    })
  })

  it('marks the active page item with aria-current', () => {
    renderMenu(true, vi.fn())
    const activeItem = screen.getByRole('link', { name: 'Modelo de alianza' })
    expect(activeItem).toHaveAttribute('aria-current', 'page')
  })

  it('renders the contact CTA, locale switcher, and email', () => {
    renderMenu(true, vi.fn())
    expect(screen.getByRole('link', { name: header.contact })).toBeInTheDocument()
    expect(screen.getByText('ES')).toBeInTheDocument()
    expect(screen.getByText('EN')).toBeInTheDocument()
    expect(screen.getByText('CA')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: email })).toBeInTheDocument()
  })

  it('renders a close button with the correct accessible label', () => {
    renderMenu(true, vi.fn())
    expect(screen.getByRole('button', { name: accessibility.menuClose })).toBeInTheDocument()
  })

  it('calls onClose when the close button is clicked', async () => {
    const onClose = vi.fn()
    renderMenu(true, onClose)
    await userEvent.click(screen.getByRole('button', { name: accessibility.menuClose }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose on Escape key', () => {
    const onClose = vi.fn()
    renderMenu(true, onClose)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when a nav item is clicked', async () => {
    const onClose = vi.fn()
    renderMenu(true, onClose)
    await userEvent.click(screen.getByRole('link', { name: 'Qué hacemos' }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('locks body scroll while open and restores it on unmount', () => {
    Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 240 })
    const { unmount } = renderMenu(true, vi.fn())
    expect(document.body.style.position).toBe('fixed')
    expect(document.body.style.top).toBe('-240px')
    unmount()
    expect(document.body.style.position).toBe('')
  })

  it('moves focus to the close button on open', () => {
    renderMenu(true, vi.fn())
    expect(document.activeElement).toBe(
      screen.getByRole('button', { name: accessibility.menuClose }),
    )
  })

  it('traps Tab focus within the overlay (wraps from last to first)', () => {
    // Focusable order: brand link → close → 5 nav links → CTA → 3 locales → email.
    renderMenu(true, vi.fn())
    const emailLink = screen.getByRole('link', { name: email })
    const brandLink = screen.getByRole('link', { name: accessibility.homeLabel })
    emailLink.focus()
    fireEvent.keyDown(document, { key: 'Tab' })
    expect(document.activeElement).toBe(brandLink)
  })

  it('traps Shift+Tab focus within the overlay (wraps from first to last)', () => {
    renderMenu(true, vi.fn())
    const brandLink = screen.getByRole('link', { name: accessibility.homeLabel })
    const emailLink = screen.getByRole('link', { name: email })
    brandLink.focus()
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true })
    expect(document.activeElement).toBe(emailLink)
  })

  it('force-closes when the viewport crosses into desktop width while open', () => {
    const onClose = vi.fn()
    const { listeners } = mockMatchMedia()
    renderMenu(true, onClose)
    act(() => {
      listeners.forEach((cb) => cb({ matches: true } as MediaQueryListEvent))
    })
    expect(onClose).toHaveBeenCalled()
  })
})
