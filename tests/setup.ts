import '@testing-library/jest-dom'

// Mock lenis/react — smooth scroll is a progressive enhancement; tests run in jsdom.
vi.mock('lenis/react', () => ({
  ReactLenis: ({ children }: { children: React.ReactNode }) => children,
}))

// Mock lenis/dist/lenis.css — CSS imports are not relevant in jsdom.
vi.mock('lenis/dist/lenis.css', () => ({}))

/*
 * IntersectionObserver mock — not available in jsdom.
 * Must be a class (constructor function) because components call `new IntersectionObserver(...)`.
 * Immediately fires the callback with isIntersecting: true so reveal/visible hooks
 * resolve synchronously in tests without needing timers.
 */
class MockIntersectionObserver {
  private readonly callback: IntersectionObserverCallback

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback
  }

  observe(target: Element) {
    this.callback(
      [{ isIntersecting: true, target } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    )
  }

  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
})

// Mock window.matchMedia — jsdom does not implement it.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

/*
 * requestAnimationFrame mock — jsdom does not implement it.
 * Passes a timestamp 10 000ms ahead of now so count-up animation loops
 * complete on the very first tick (progress ≥ 1 → no recursive calls).
 */
Object.defineProperty(window, 'requestAnimationFrame', {
  writable: true,
  value: (cb: FrameRequestCallback) => {
    cb(performance.now() + 10_000)
    return 0
  },
})
