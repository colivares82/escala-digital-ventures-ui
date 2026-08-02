/**
 * Content integrity tests.
 * Guard against accidental removal of required keys or empty values.
 * All copy on this site is definitive; these tests enforce it is present.
 */

import { homeContent } from '@/content/es/home'
import { sharedContent } from '@/content/es/shared'
import { clients } from '@/content/es/clients'

describe('sharedContent', () => {
  it('has required metadata fields', () => {
    expect(sharedContent.metadata.title).toBeTruthy()
    expect(sharedContent.metadata.description).toBeTruthy()
  })

  it('has exactly three locales', () => {
    expect(sharedContent.header.locales).toHaveLength(3)
    expect(sharedContent.header.locales).toContain('ES')
    expect(sharedContent.header.locales).toContain('EN')
    expect(sharedContent.header.locales).toContain('CA')
  })

  it('has at least 4 navigation items in the header', () => {
    expect(sharedContent.header.nav.length).toBeGreaterThanOrEqual(4)
  })

  it('has at least 4 approved key claims', () => {
    expect(sharedContent.claims.length).toBeGreaterThanOrEqual(4)
  })

  it('has all contact-form fields defined', () => {
    const { fields, errors } = sharedContent.contactForm
    expect(fields.name).toBeTruthy()
    expect(fields.company).toBeTruthy()
    expect(fields.email).toBeTruthy()
    expect(fields.blocker).toBeTruthy()
    expect(errors.name).toBeTruthy()
    expect(errors.company).toBeTruthy()
    expect(errors.emailRequired).toBeTruthy()
    expect(errors.emailInvalid).toBeTruthy()
    expect(errors.blocker).toBeTruthy()
    expect(errors.consent).toBeTruthy()
  })

  it('has both legal footer links', () => {
    const hrefs = sharedContent.footer.legal.map((l) => l.href)
    expect(hrefs).toContain('/aviso-legal')
    expect(hrefs).toContain('/privacidad')
  })
})

describe('homeContent', () => {
  it('has all 7 home section keys', () => {
    expect(homeContent.hero).toBeTruthy()
    expect(homeContent.problem).toBeTruthy()
    expect(homeContent.services).toBeTruthy()
    expect(homeContent.framework).toBeTruthy()
    expect(homeContent.proof).toBeTruthy()
    expect(homeContent.alliance).toBeTruthy()
    expect(homeContent.finalCta).toBeTruthy()
  })

  it('has exactly 10 Escala Growth Framework phases', () => {
    expect(homeContent.framework.phases).toHaveLength(10)
  })

  it('every framework phase has a name and description', () => {
    homeContent.framework.phases.forEach((phase) => {
      expect(phase.name).toBeTruthy()
      expect(phase.description).toBeTruthy()
    })
  })

  it('has exactly 5 service lines', () => {
    expect(homeContent.services.items).toHaveLength(5)
  })

  it('every service item has a title and text', () => {
    homeContent.services.items.forEach((item) => {
      expect(item.title).toBeTruthy()
      expect(item.text).toBeTruthy()
    })
  })

  it('has exactly 4 proof readout figures', () => {
    expect(homeContent.proof.figures).toHaveLength(4)
  })

  it('proof source is defined and non-empty', () => {
    expect(homeContent.proof.source).toBeTruthy()
  })

  it('finalCta email matches expected placeholder domain', () => {
    expect(homeContent.finalCta.email).toMatch(/@escaladigitalventures\.com$/)
  })

  it('has all required label keys', () => {
    const { labels } = homeContent
    expect(labels.hero).toBeTruthy()
    expect(labels.problem).toBeTruthy()
    expect(labels.services).toBeTruthy()
    expect(labels.framework).toBeTruthy()
    expect(labels.frameworkLead).toBeTruthy()
    expect(labels.frameworkAria).toBeTruthy()
    expect(labels.phasePrefix).toBeTruthy()
    expect(labels.proof).toBeTruthy()
    expect(labels.alliance).toBeTruthy()
  })

  it('hero title contains the primary claim', () => {
    expect(homeContent.hero.title).toContain('Automatizamos')
    expect(homeContent.hero.title).toContain('Escalamos')
  })
})

describe('clients', () => {
  it('has at least 2 client entries', () => {
    expect(clients.length).toBeGreaterThanOrEqual(2)
  })

  it('every client has required fields', () => {
    clients.forEach((client) => {
      expect(client.name).toBeTruthy()
      expect(client.eyebrow).toBeTruthy()
      expect(client.href).toMatch(/^\/casos-de-exito\//)
      expect(client.status).toBeTruthy()
    })
  })

  it('MAGUPELL is the first client (production-proven proof point)', () => {
    expect(clients[0].name).toBe('MAGUPELL')
  })
})
