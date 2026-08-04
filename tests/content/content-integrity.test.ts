/**
 * Content integrity tests.
 * Guard against accidental removal of required keys or empty values.
 * All copy on this site is definitive; these tests enforce it is present.
 */

import { homeContent } from '@/content/es/home'
import { methodContent } from '@/content/es/method'
import { servicesContent } from '@/content/es/services'
import { sharedContent } from '@/content/es/shared'
import { clients } from '@/content/es/clients'
import type { ServiceFigVariant } from '@/content/types'

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

describe('methodContent — Phase 2.1 (SPEC-P2.1 AC-7)', () => {
  it('has valid page meta', () => {
    expect(methodContent.meta.title).toBeTruthy()
    expect(methodContent.meta.description).toBeTruthy()
  })

  it('has exactly 5 execution practices', () => {
    expect(methodContent.executionPractices.practices).toHaveLength(5)
  })

  it('every practice has index, title, body, and tie', () => {
    methodContent.executionPractices.practices.forEach((practice) => {
      expect(practice.index).toBeTruthy()
      expect(practice.title).toBeTruthy()
      expect(practice.body).toBeTruthy()
      expect(practice.tie).toBeTruthy()
    })
  })

  it('practice bodies include Libro-verbatim key phrases', () => {
    const bodies = methodContent.executionPractices.practices.map((p) => p.body).join(' ')
    // FR-4.3 verbatim phrase from Libro Ch. 9 / Spec §5.3
    expect(bodies).toContain('prototipo visual navegable')
  })

  it('has exactly 6 pipeline nodes', () => {
    expect(methodContent.pipeline.nodes).toHaveLength(6)
  })

  it('every pipeline node has a label', () => {
    methodContent.pipeline.nodes.forEach((node) => {
      expect(node.label).toBeTruthy()
    })
  })

  it('pipeline caption references FIG. 06', () => {
    expect(methodContent.pipeline.caption).toContain('FIG. 06')
  })

  it('aiBuild has between 3 and 4 points', () => {
    expect(methodContent.aiBuild.points.length).toBeGreaterThanOrEqual(3)
    expect(methodContent.aiBuild.points.length).toBeLessThanOrEqual(4)
  })

  it('aiBuild lead is verbatim from Libro Ch. 7', () => {
    expect(methodContent.aiBuild.lead).toContain('ingeniería asistida por agentes de IA')
  })

  it('contains no Russian language (AC-7 grep guard)', () => {
    const allText = JSON.stringify(methodContent)
    expect(allText).not.toMatch(/ruso|rusa|русский|russian/i)
  })

  it('finalCta email matches expected domain', () => {
    expect(methodContent.finalCta.email).toMatch(/@escaladigitalventures\.com$/)
  })
})

describe('servicesContent — Phase 2.2 (SPEC-P2.2 AC-7)', () => {
  it('has valid page meta', () => {
    expect(servicesContent.meta.title).toBeTruthy()
    expect(servicesContent.meta.description).toBeTruthy()
  })

  // FR-7.1: exactly 5 service entries
  it('has exactly 5 service entries', () => {
    expect(servicesContent.services).toHaveLength(5)
  })

  it('every service has index, title, problem, deliverable, figVariant, figLabels, figCaption', () => {
    servicesContent.services.forEach((svc) => {
      expect(svc.index).toBeTruthy()
      expect(svc.title).toBeTruthy()
      expect(svc.problem).toBeTruthy()
      expect(svc.deliverable).toBeTruthy()
      expect(svc.figVariant).toBeTruthy()
      expect(svc.figLabels.length).toBeGreaterThanOrEqual(1)
      expect(svc.figCaption).toBeTruthy()
    })
  })

  // AC-4: all figVariants are valid enum values
  const VALID_FIG_VARIANTS: ServiceFigVariant[] = ['capture', 'platform', 'ai', 'product', 'evolve']

  it('every service has a valid figVariant', () => {
    servicesContent.services.forEach((svc) => {
      expect(VALID_FIG_VARIANTS).toContain(svc.figVariant)
    })
  })

  it('all five figVariants are unique (one per service)', () => {
    const variants = servicesContent.services.map((s) => s.figVariant)
    const unique = new Set(variants)
    expect(unique.size).toBe(5)
  })

  it('services are indexed sequentially 01–05', () => {
    const indices = servicesContent.services.map((s) => s.index)
    expect(indices).toEqual(['01', '02', '03', '04', '05'])
  })

  it('each figCaption references the correct FIG. number', () => {
    const captions = servicesContent.services.map((s) => s.figCaption)
    expect(captions[0]).toContain('FIG. 07')
    expect(captions[1]).toContain('FIG. 08')
    expect(captions[2]).toContain('FIG. 09')
    expect(captions[3]).toContain('FIG. 10')
    expect(captions[4]).toContain('FIG. 11')
  })

  // Libro Ch. 11 verbatim copy guards
  it('service 01 problem contains Libro Ch. 11 verbatim phrase', () => {
    expect(servicesContent.services[0]!.problem).toContain('hojas de cálculo')
  })

  it('service 03 deliverable mentions IA with discernment (no vendor names)', () => {
    const del = servicesContent.services[2]!.deliverable
    expect(del).toContain('IA aplicada con criterio')
    // No vendor/model names allowed (FR-4.6 editorial guardrail)
    expect(del).not.toMatch(/GPT|Claude|Gemini|OpenAI|Anthropic/i)
  })

  it('service 05 problem contains verbatim phrase from spec', () => {
    expect(servicesContent.services[4]!.problem).toContain('no evoluciona')
  })

  it('idealClient body contains Libro Ch. 12 verbatim text', () => {
    expect(servicesContent.idealClient.body).toContain('relación de largo plazo')
    expect(servicesContent.idealClient.body).toContain('pymes consolidadas')
  })

  it('pageHeader has problemPrefix defined', () => {
    expect(servicesContent.pageHeader.problemPrefix).toBeTruthy()
  })

  it('finalCta email matches expected domain', () => {
    expect(servicesContent.finalCta.email).toMatch(/@escaladigitalventures\.com$/)
  })

  it('contains no Russian language (AC-7 grep guard)', () => {
    const allText = JSON.stringify(servicesContent)
    expect(allText).not.toMatch(/ruso|rusa|русский|russian/i)
  })
})
