/**
 * Home page content — EN locale.
 * SPEC-P5 FR-1.1 · Glossary: docs/i18n-glossary.md
 * Pending Carlos register review (AC-9).
 */
import { sharedContent } from '@/content/en/shared'
import { clients } from '@/content/es/clients'
import type { HomePageDictionary } from '@/content/types'

export const homeContent = {
  meta: {
    title: 'Escala Digital Ventures | Product & Technology',
    description:
      'Product and technology studio that automates operations and builds digital platforms for growing businesses.',
  },

  header: sharedContent.header,

  labels: {
    hero: 'ESCALA DIGITAL VENTURES',
    problem: 'STARTING POINT',
    symptoms: 'Operational symptoms',
    services: 'CAPABILITIES',
    framework: 'THE GROWTH CYCLE',
    frameworkLead: 'TEN PHASES · ONE CONTINUOUS IMPROVEMENT CYCLE',
    frameworkAria: 'Ten-phase growth cycle',
    phasePrefix: 'PHASE',
    proof: 'EVIDENCE',
    proofAttribution: 'VERIFIED EVIDENCE FROM REAL CLIENTS',
    alliance: 'ALLIANCE MODEL',
    allianceLegend: 'EACH ALLIANCE: TECHNICAL · STRATEGIC · VISIONARY LAYER',
  },

  diagrams: {
    hero: 'From manual processes to real, measurable value through a bespoke system',
    problem: 'Fragmented operational flow across spreadsheets, emails and documents',
    proof: 'Verified operational evolution',
    alliance: 'Five alliances, full dedication. Two occupied.',
  },

  /**
   * Hero narrative diagram (FIG.01) — SPEC-POLISH-01.
   * All copy comes from here; no hardcoded strings in the component.
   * Zone numbers and FIG number are not translated (kit grammar §3.3).
   */
  heroFigure: {
    zones: ['01 · MANUAL PROCESSES', '02 · BESPOKE SYSTEM', '03 · REAL, MEASURABLE VALUE'],
    inputs: ['EMAILS', 'SPREADSHEETS', 'NOTES', 'CATALOGUE', 'RECORDS'],
    system: { title: '02 · BESPOKE SYSTEM', innerLabel: 'ORDERS · MODELS' },
    outputs: [
      { label: 'INSIGHT', sub: 'Decisions and data' },
      { label: 'OPTIMISATION', sub: 'of processes' },
    ],
    caption: 'FIG. 01 — FROM MANY MANUAL PROCESSES TO REAL, MEASURABLE VALUE',
  },

  hero: {
    eyebrow:
      'Escala Digital Ventures · Product and Technology Studio · Mataró, Barcelona',
    title: 'We automate your business. We scale with you.',
    description:
      'We turn manual processes into your own platforms that grow with you, with the discipline of global enterprise software.',
    primaryCta: "Let's talk about your business",
    secondaryCta: 'How we work',
  },

  claims: sharedContent.claims,

  /**
   * Problem section (01 / STARTING POINT) — SPEC-POLISH-02.
   * body is a two-paragraph tuple; both paragraphs rendered separately.
   * Pending Carlos register review (AC-9).
   */
  problem: {
    title: 'Your operations have hit their limit — not your ambitions.',
    body: [
      'You have built a business that works. But there comes a point where the operations — spreadsheets, emails, loose documents, knowledge locked in the heads of a few people — can no longer keep up with growth: volume increases, errors multiply and the business depends on nobody being absent.',
      'Escala steps in there: it turns that operational core into your own platform on which you can keep growing.',
    ] as const,
    symptoms: [
      'growing volume',
      'multiplying errors',
      'delayed invoicing',
      'dependency on people',
    ],
  },

  /**
   * Problem flows diagram (FIG.02) — SPEC-POLISH-02.
   * All copy comes from here; no hardcoded strings in the component.
   * Piece labels and core lines are not translated (kit grammar §3.3 — mono labels).
   * Pending Carlos register review (AC-9).
   */
  problemFigure: {
    pieces: [
      'HOJAS DE CÁLCULO',
      'CORREOS',
      'NOTAS',
      'CATÁLOGO',
      'HISTORIAL',
    ] as const,
    core: ['PROCESOS', 'MANUALES'] as const,
    caption: 'FIG. 02 — AN OPERATION DEPENDENT ON MANUAL PROCESSES: FLOWS DO NOT COMPLETE',
    note: 'EACH PIECE TRIES TO CONNECT · THE FLOW BREAKS AT THE MANUAL STEP',
  },

  services: {
    title: 'What we do',
    action: 'See all services',
    items: [
      {
        title: 'Digital transformation and process automation',
        text: 'Critical processes that live in spreadsheets and in people\'s heads.',
      },
      {
        title: 'Platform development',
        text: 'Generic software does not fit your reality.',
      },
      {
        title: 'Automation and applied AI',
        text: 'Everyone talks about AI; few apply it with real return.',
      },
      {
        title: 'Fractional CTO and Product Leadership',
        text: 'You need senior product and technology direction without hiring a full-time profile.',
      },
      {
        title: 'Operation, support and continuous evolution',
        text: 'Software that does not evolve, dies.',
      },
    ],
  },

  framework: {
    title: 'Our own method: the Escala Growth Framework',
    description:
      'Ten phases that connect business, people, processes and technology in a continuous improvement cycle.',
    action: 'How we work',
    phases: [
      {
        name: 'Discover',
        description:
          'Deeply understand the business, its goals, constraints, opportunities and processes. Listen before proposing.',
      },
      {
        name: 'Understand',
        description:
          'Model how the organisation actually works, identify bottlenecks, dependencies and sources of friction.',
      },
      {
        name: 'Simplify',
        description:
          'Remove unnecessary complexity before introducing technology. A bad process automated is still a bad process.',
      },
      {
        name: 'Design',
        description:
          'Design the experience, architecture and operating model with scalability, maintainability and adoption in mind.',
      },
      {
        name: 'Validate',
        description:
          'Validate hypotheses quickly through navigable prototypes, user testing and incremental deliveries to reduce risk before investing in construction.',
      },
      {
        name: 'Build',
        description:
          'Build platforms to high engineering, automation, security and quality standards.',
      },
      {
        name: 'Automate',
        description:
          'Automate complete processes to reduce errors, increase productivity and free up time for higher-value activities.',
      },
      {
        name: 'Scale',
        description:
          'Prepare the platform and the organisation to grow without the need for continuous redesigns.',
      },
      {
        name: 'Measure',
        description:
          'Define business indicators and technical metrics that allow the real impact of each initiative to be measured.',
      },
      {
        name: 'Evolve',
        description:
          'Understand that no product is ever finished. Continuous improvement is part of the Escala collaboration model.',
      },
    ],
  },

  proof: {
    title: 'Facts, not promises.',
    source: 'MAGUPELL',
    figures: [
      {
        value: '100+',
        label: 'REQUIREMENTS',
        caption: 'implemented and verified in production',
      },
      {
        value: '200+',
        label: 'TESTS',
        caption: 'automated over real workflows',
      },
      {
        value: 'JUL 2026',
        label: 'PRODUCTION',
        caption: 'verified go-live date',
      },
      {
        value: 'REAL',
        label: 'OPERATION',
        caption:
          'clients, suppliers and internal management operating on the platform',
      },
    ],
    cases: clients,
  },

  alliance: {
    title: 'Five alliances. Our full dedication.',
    body: 'We deliberately limit the number of active clients to guarantee dedication, closeness and continuous support. It is not a limitation: it is the model.',
    action: 'Discover the alliance model',
  },

  footer: sharedContent.footer,
} as const satisfies HomePageDictionary

export type HomeContent = typeof homeContent
