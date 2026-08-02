import { ROUTES, ANCHORS } from '@/lib/routes'

describe('ROUTES', () => {
  it('home is the root path', () => {
    expect(ROUTES.HOME).toBe('/')
  })

  it('all routes start with /', () => {
    Object.values(ROUTES).forEach((route) => {
      expect(route).toMatch(/^\//)
    })
  })

  it('services route matches spec §4.1', () => {
    expect(ROUTES.SERVICES).toBe('/que-hacemos')
  })

  it('method route matches spec §4.1', () => {
    expect(ROUTES.METHOD).toBe('/como-trabajamos')
  })

  it('alliance route matches spec §4.1', () => {
    expect(ROUTES.ALLIANCE).toBe('/modelo-de-alianza')
  })

  it('case study routes are nested under case-studies', () => {
    expect(ROUTES.CASE_MAGUPELL).toContain(ROUTES.CASE_STUDIES)
    expect(ROUTES.CASE_BIOZERO).toContain(ROUTES.CASE_STUDIES)
  })

  it('legal routes are defined', () => {
    expect(ROUTES.LEGAL).toBeTruthy()
    expect(ROUTES.PRIVACY).toBeTruthy()
  })
})

describe('ANCHORS', () => {
  it('all anchors start with #', () => {
    Object.values(ANCHORS).forEach((anchor) => {
      expect(anchor).toMatch(/^#/)
    })
  })

  it('contacto anchor exists', () => {
    expect(ANCHORS.CONTACTO).toBe('#contacto')
  })
})
