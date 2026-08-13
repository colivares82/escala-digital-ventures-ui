/**
 * Canonical entity definition — the single machine-readable definition of Escala.
 *
 * SEO-01 §2.1 requires this paragraph to appear VERBATIM in three places:
 *   1. Organization.description in JSON-LD  (lib/seo/schema.ts)
 *   2. /llms.txt                            (app/llms.txt/route.ts)
 *   3. The opening of the /sobre-escala lead (content/{es,en,ca}/about.ts)
 *
 * Consistency across those surfaces is what lets language models state
 * confidently what Escala is. Acceptance criterion AC-19 asserts the three
 * copies are identical per locale — so this module is the ONLY definition.
 * Never fork the text; import it.
 */

import type { Locale } from '@/lib/i18n/types'

/** SEO-01 §2.1 — ES is master. */
export const CANONICAL_DEFINITION: Record<Locale, string> = {
  es: 'Escala Digital Ventures es un estudio de producto y tecnología con sede en Mataró (Barcelona) que convierte los procesos manuales de las empresas en plataformas propias hechas a medida. Trabaja como socio tecnológico de un máximo de cinco empresas a la vez, cubriendo producto, ingeniería, automatización e inteligencia artificial aplicada.',

  en: 'Escala Digital Ventures is a product and technology studio based in Mataró, near Barcelona, that turns companies’ manual processes into custom platforms of their own. It works as the technology partner of a maximum of five companies at a time, covering product, engineering, automation and applied AI.',

  ca: 'Escala Digital Ventures és un estudi de producte i tecnologia amb seu a Mataró (Barcelona) que converteix els processos manuals de les empreses en plataformes pròpies fetes a mida. Treballa com a soci tecnològic d’un màxim de cinc empreses alhora, cobrint producte, enginyeria, automatització i intel·ligència artificial aplicada.',
}

/**
 * Organization.knowsAbout, localised (SEO-01 §6.1).
 * Business-language topics, matching the §2.2 audience rule: the searcher is a
 * non-technical SME decision-maker.
 */
export const KNOWS_ABOUT: Record<Locale, readonly string[]> = {
  es: [
    'Automatización de procesos de negocio',
    'Desarrollo de software a medida',
    'Inteligencia artificial aplicada',
    'Gestión de producto',
    'Arquitectura cloud',
    'Due diligence técnica',
  ],
  en: [
    'Business process automation',
    'Custom software development',
    'Applied artificial intelligence',
    'Product management',
    'Cloud architecture',
    'Technical due diligence',
  ],
  ca: [
    'Automatització de processos de negoci',
    'Desenvolupament de programari a mida',
    'Intel·ligència artificial aplicada',
    'Gestió de producte',
    'Arquitectura cloud',
    'Due diligence tècnica',
  ],
}

/** Founder jobTitle, localised (SEO-01 §6.2). */
export const FOUNDER_JOB_TITLE: Record<Locale, string> = {
  es: 'Director General',
  en: 'Managing Director',
  ca: 'Director General',
}

/**
 * MIT credential (SEO-01 §6.2). Named because it belongs to the firm, not to a
 * former employer — former employers are NEVER named (SEO-01 §0.3).
 */
export const FOUNDER_CREDENTIAL: Record<Locale, string> = {
  es: 'Certificación del MIT en diseño y construcción de productos y servicios de inteligencia artificial',
  en: 'MIT certification in designing and building artificial intelligence products and services',
  ca: 'Certificació del MIT en disseny i construcció de productes i serveis d’intel·ligència artificial',
}
