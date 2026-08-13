/**
 * JSON-LD builders — SEO-01 §6 acceptance criteria.
 *
 * These tests encode the non-negotiables:
 *   AC-9  no streetAddress / postalCode anywhere in the output
 *   AC-10 Organization.sameAs carries no personal profile, no colivares.com
 *   §6.1  no telephone node
 *   §10.1 no vatID/taxID while /aviso-legal holds placeholder tokens
 */

import {
  buildArticle,
  buildBreadcrumbs,
  buildContactPage,
  buildFaqPage,
  buildFounder,
  buildOrganization,
  buildService,
  buildWebPage,
  buildWebSite,
} from '@/lib/seo/schema'
import { CANONICAL_DEFINITION } from '@/lib/seo/entity'
import { SCHEMA_IDS } from '@/lib/constants/seo'
import { LOCALES } from '@/lib/i18n/types'

const SLOGAN = 'Automatizamos tu negocio. Escalamos contigo.'

describe('buildOrganization', () => {
  const org = buildOrganization('es', { slogan: SLOGAN })

  it('is typed as both Organization and ProfessionalService', () => {
    expect(org['@type']).toEqual(['Organization', 'ProfessionalService'])
  })

  it('uses the stable @id so other pages can reference it', () => {
    expect(org['@id']).toBe(SCHEMA_IDS.organization)
  })

  it('carries the legalName read from /aviso-legal, never invented', () => {
    expect(org.legalName).toBe('Escala Digital Ventures, S.L.U.')
  })

  // AC-19: description must be the canonical definition verbatim.
  it.each(LOCALES)('description is the canonical definition (%s)', (locale) => {
    const node = buildOrganization(locale, { slogan: SLOGAN })
    expect(node.description).toBe(CANONICAL_DEFINITION[locale])
  })

  // AC-9: locality-level address only.
  it('has locality-level address only — no street, no postal code', () => {
    const address = org.address as Record<string, unknown>
    expect(address.addressLocality).toBe('Mataró')
    expect(address.addressRegion).toBe('Barcelona')
    expect(address.addressCountry).toBe('ES')
    expect(address).not.toHaveProperty('streetAddress')
    expect(address).not.toHaveProperty('postalCode')
  })

  it('emits no streetAddress anywhere in the serialised node', () => {
    expect(JSON.stringify(org)).not.toMatch(/streetAddress|postalCode/)
  })

  // §6.1: no telephone.
  it('has no telephone node', () => {
    expect(org).not.toHaveProperty('telephone')
  })

  // AC-10 + §10.2.
  it('omits sameAs entirely while the company LinkedIn does not exist', () => {
    expect(org).not.toHaveProperty('sameAs')
  })

  it('never references a personal profile or colivares.com', () => {
    const json = JSON.stringify(org)
    expect(json).not.toMatch(/linkedin\.com\/in\//)
    expect(json).not.toMatch(/colivares\.com/)
    expect(json).not.toMatch(/github\.com/)
  })

  /**
   * §10.1: /aviso-legal still holds {{NIF_B88767520}} and
   * {{REGISTRO_MERCANTIL}} placeholders, so vatID/taxID are omitted entirely
   * rather than emitting an unresolved token into structured data.
   *
   * The pattern matches a placeholder TOKEN — `{{IDENTIFIER}}` — not a bare
   * `}}`, because JSON.stringify legitimately produces `}}` whenever two
   * objects close together.
   */
  it('emits no vatID/taxID and no unresolved placeholder token', () => {
    expect(org).not.toHaveProperty('vatID')
    expect(org).not.toHaveProperty('taxID')
    expect(JSON.stringify(org)).not.toMatch(/\{\{[A-Z_0-9]+\}\}/)
  })

  it('omits numberOfEmployees (§6.1)', () => {
    expect(org).not.toHaveProperty('numberOfEmployees')
  })

  it('omits logo when no asset URL is supplied (§10.5)', () => {
    expect(org).not.toHaveProperty('logo')
  })

  it('includes logo and image when an asset URL is supplied', () => {
    const withLogo = buildOrganization('es', {
      slogan: SLOGAN,
      logoUrl: 'https://example.test/logo.png',
    })
    expect(withLogo.logo).toEqual({
      '@type': 'ImageObject',
      url: 'https://example.test/logo.png',
    })
    expect(withLogo.image).toBe('https://example.test/logo.png')
  })

  it('references the founder node rather than inlining it', () => {
    expect(org.founder).toEqual({ '@id': SCHEMA_IDS.founder })
  })
})

describe('buildFounder', () => {
  const person = buildFounder('es')

  it('carries the confirmed LinkedIn handle and GitHub', () => {
    expect(person.sameAs).toEqual([
      'https://www.linkedin.com/in/carlosolivaresve/',
      'https://github.com/colivares82',
    ])
  })

  it('localises the job title', () => {
    expect(buildFounder('es').jobTitle).toBe('Director General')
    expect(buildFounder('en').jobTitle).toBe('Managing Director')
  })

  it('names the MIT credential', () => {
    expect(JSON.stringify(person)).toMatch(/MIT/)
  })

  it('links back to the organization', () => {
    expect(person.worksFor).toEqual({ '@id': SCHEMA_IDS.organization })
  })
})

describe('buildWebSite', () => {
  it('has no SearchAction — there is no site search (§6.3)', () => {
    const site = buildWebSite('es')
    expect(site).not.toHaveProperty('potentialAction')
    expect(JSON.stringify(site)).not.toMatch(/SearchAction/)
  })

  it('sets inLanguage per locale', () => {
    expect(buildWebSite('en').inLanguage).toBe('en-GB')
    expect(buildWebSite('ca').inLanguage).toBe('ca-ES')
  })
})

describe('buildWebPage', () => {
  const page = buildWebPage({
    url: 'https://escaladigitalventures.com/que-hacemos',
    name: 'Title',
    description: 'Description',
    locale: 'es',
  })

  it('derives its @id from the page URL', () => {
    expect(page['@id']).toBe(
      'https://escaladigitalventures.com/que-hacemos#webpage',
    )
  })

  it('links to the website and the organization', () => {
    expect(page.isPartOf).toEqual({ '@id': SCHEMA_IDS.website })
    expect(page.about).toEqual({ '@id': SCHEMA_IDS.organization })
  })

  it('omits primaryImageOfPage when no image is given', () => {
    expect(page).not.toHaveProperty('primaryImageOfPage')
  })
})

describe('buildBreadcrumbs', () => {
  it('numbers positions from 1 in order', () => {
    const crumbs = buildBreadcrumbs([
      { name: 'ESCALA', url: 'https://escaladigitalventures.com/' },
      {
        name: 'Casos',
        url: 'https://escaladigitalventures.com/casos-de-exito',
      },
    ])
    const items = crumbs.itemListElement as Record<string, unknown>[]
    expect(items).toHaveLength(2)
    expect(items[0].position).toBe(1)
    expect(items[1].position).toBe(2)
    expect(items[1].item).toContain('/casos-de-exito')
  })
})

describe('buildService', () => {
  it('attributes the service to the organization', () => {
    const service = buildService({
      name: 'Automatización',
      description: 'Descripción existente',
      locale: 'es',
      serviceType: 'Automatización',
    })
    expect(service.provider).toEqual({ '@id': SCHEMA_IDS.organization })
    expect(service['@type']).toBe('Service')
  })
})

describe('buildArticle', () => {
  const article = buildArticle({
    url: 'https://escaladigitalventures.com/casos-de-exito/magupell',
    headline: 'Caso Magupell',
    description: 'Descripción',
    locale: 'es',
    about: 'SECTOR PIEL',
  })

  it('never emits Review or AggregateRating (§6.7)', () => {
    expect(JSON.stringify(article)).not.toMatch(/Review|AggregateRating/)
  })

  it('omits datePublished when none is recorded — no invented dates', () => {
    expect(article).not.toHaveProperty('datePublished')
  })

  it('includes datePublished when one is supplied', () => {
    const dated = buildArticle({
      url: 'https://escaladigitalventures.com/casos-de-exito/magupell',
      headline: 'H',
      description: 'D',
      locale: 'es',
      about: 'S',
      datePublished: '2026-07-01',
    })
    expect(dated.datePublished).toBe('2026-07-01')
  })
})

describe('buildFaqPage', () => {
  it('mirrors question and answer text exactly (AC-11)', () => {
    const faq = buildFaqPage([{ question: '¿Pregunta?', answer: 'Respuesta.' }])
    const entities = faq.mainEntity as Record<string, unknown>[]
    expect(entities[0].name).toBe('¿Pregunta?')
    expect((entities[0].acceptedAnswer as Record<string, unknown>).text).toBe(
      'Respuesta.',
    )
  })
})

describe('buildContactPage', () => {
  it('points mainEntity at the organization (§6.9)', () => {
    const contact = buildContactPage({
      url: 'https://escaladigitalventures.com/contacto',
      name: 'Contacto',
      description: 'D',
      locale: 'es',
    })
    expect(contact['@type']).toBe('ContactPage')
    expect(contact.mainEntity).toEqual({ '@id': SCHEMA_IDS.organization })
  })
})
