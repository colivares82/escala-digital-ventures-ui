/**
 * Home v2 sections 00–08 — ES master (HOME-V2 §B.2/§B.3).
 * Wireframe: specs/mockups/wireframe-home-v2.html
 *
 * Everything not listed as a delta in §B.3 is the /oportunidad copy VERBATIM,
 * so it is spread from that dictionary instead of being copy-pasted: the two
 * pages cannot drift. Only the deltas are authored here.
 *
 * Price rule (§B.3): no price, amount, currency, discount or offer wording.
 * `start` deliberately omits `price` and `offer`.
 */
import { oportunidadContent as o } from '@/content/es/oportunidad'
import type { HomeLandingContent } from '@/content/types'

export const homeLandingContent = {
  hero: {
    sectionIndex: o.hero.sectionIndex,
    // H1 = primary claim, brand asset (SEO-01) — must stay the H1.
    title1: 'Automatizamos tu negocio. Escalamos contigo.',
    kicker: 'Tu negocio crece. Tu operativa también debería.',
    lead: o.hero.lead,
    ctaPrimary: 'Cuéntanos tu caso ↗',
    ctaSecondary: '¿Te suena? Haz la prueba ↓',
    badge: o.hero.badge,
    fig: o.hero.fig,
  },

  // 01–03: as-is from /oportunidad (the «¿Te suena?» read-more already targets #alianza).
  teSuena: o.teSuena,
  day: o.day,
  scenarios: o.scenarios,

  evidence: {
    sectionIndex: { index: '04', label: 'Evidencia' },
    lead: 'Esto ya no es ilustrativo: es lo que funciona hoy en producción, con datos verificados en un cliente real.',
  },

  alliance: {
    ...o.alliance,
    sectionIndex: { index: '05', label: o.alliance.sectionIndex.label },
    link: 'Conoce el modelo de alianza ↗',
  },

  about: {
    ...o.about,
    sectionIndex: { index: '06', label: o.about.sectionIndex.label },
    link: 'Conoce Escala ↗',
  },

  start: {
    sectionIndex: { index: '07', label: o.start.sectionIndex.label },
    title: o.start.title,
    lead: o.start.lead,
    steps: [
      o.start.steps[0],
      // Home only: «y cuánto cuesta» removed (price rule).
      { ...o.start.steps[1], body: 'Te devolvemos qué haríamos y en qué orden. Claro y por etapas.' },
      o.start.steps[2],
    ],
    cta: { primary: 'Hablemos de tu negocio ↗', secondary: 'Cómo trabajamos ↗' },
  },

  deepLinks: {
    sectionIndex: { index: '08', label: 'A fondo' },
    items: [
      { label: 'Qué hacemos', title: 'Cinco líneas, una alianza', line: 'Del proceso manual a la plataforma propia.', page: 'services' },
      { label: 'Cómo trabajamos', title: 'Escala Growth Framework', line: 'Diez fases, un ciclo continuo de mejora.', page: 'method' },
      { label: 'Casos de éxito', title: 'Magupell y BioZero', line: 'Contados con datos verificables.', page: 'cases' },
      { label: 'Modelo de alianza', title: 'Cinco alianzas', line: 'Toda nuestra dedicación.', page: 'alliance' },
      { label: 'Sobre Escala', title: 'ADN y manifiesto', line: 'La experiencia detrás de Escala.', page: 'about' },
    ],
  },
} as const satisfies HomeLandingContent
