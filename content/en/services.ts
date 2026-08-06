/**
 * What we do — EN locale.
 * SPEC-P5 FR-1.1 · Glossary: docs/i18n-glossary.md
 * Pending Carlos register review (AC-9).
 */
import type { ServicesDictionary } from '@/content/types'

export const servicesContent = {
  meta: {
    title: 'What we do | Escala Digital Ventures',
    description:
      'Automation, custom platforms, applied AI and fractional CTO for growing businesses.',
  },

  pageHeader: {
    eyebrow: 'A / WHAT WE DO',
    title: 'What we do',
    lead: 'We do not offer a service catalogue: we design each collaboration around your business goals. These are the five lines that almost always combine within a single alliance.',
    problemPrefix: 'THE PROBLEM',
  },

  services: [
    {
      index: '01',
      title: 'Digital transformation and process automation',
      problem: 'Critical processes that live in spreadsheets and in people\'s heads.',
      deliverable:
        'We analyse processes, tools and workflows to simplify, automate and modernise: from data capture at source through to invoicing and the final report.',
      figVariant: 'capture',
      figLabels: ['SHEET', 'EMAIL', 'DATA', 'PROCESS', 'REPORT', 'INVOICE'],
      figCaption: 'FIG. 07 — CAPTURE TO REPORT',
    },
    {
      index: '02',
      title: 'Platform development',
      problem: 'Generic software does not fit your reality.',
      deliverable:
        'We design and build custom web applications and platforms — not templates — with users and roles, your own domain, transactional email, document generation and integrated billing. A solution built around your business: you receive an indefinite use licence over your platform and ownership of your data. Intellectual property and source code belong to Escala.',
      figVariant: 'platform',
      figLabels: ['PLATFORM', 'USERS · ROLES', 'DOMAIN', 'EMAIL', 'DOCUMENTS', 'BILLING'],
      figCaption: 'FIG. 08 — MODULAR ARCHITECTURE',
    },
    {
      index: '03',
      title: 'Automation and applied AI',
      problem: 'Everyone talks about AI; few apply it with real return.',
      deliverable:
        'We integrate language and vision models where they generate real, measurable value: fewer repetitive tasks, image analysis, better decisions. AI applied with judgement: where it adds value, not where it decorates.',
      figVariant: 'ai',
      figLabels: ['INPUT', 'PROCESS', 'DECISION', 'AI', 'WHERE IT ADDS VALUE'],
      figCaption: 'FIG. 09 — AI IN THE PROCESS',
    },
    {
      index: '04',
      title: 'Fractional CTO and Product Leadership',
      problem: 'You need senior product and technology direction without hiring a full-time profile.',
      deliverable:
        'Technology vision, roadmap, functional specification, prioritisation, supplier management and innovation initiatives, with real executive experience.',
      figVariant: 'product',
      figLabels: ['NOW', 'NEXT', 'LATER', 'PRIORITY'],
      figCaption: 'FIG. 10 — PRODUCT DIRECTION',
    },
    {
      index: '05',
      title: 'Operation, support and continuous evolution',
      problem: 'Software that does not evolve, dies.',
      deliverable:
        'We keep your platform in production, resolve incidents and improve it every month based on real feedback from your users. With full traceability of the work done.',
      figVariant: 'evolve',
      figLabels: ['USE', 'FEEDBACK', 'IMPROVEMENT'],
      figCaption: 'FIG. 11 — CONTINUOUS EVOLUTION',
    },
  ],

  idealClient: {
    eyebrow: 'B / DO WE FIT?',
    title: 'Do we fit?',
    body: 'We work with solid businesses whose operations have grown faster than their systems: established family businesses and SMEs, niche B2B businesses and companies that want to incorporate AI with real return. The most important requirement is not the sector or the size: it is the willingness to build a long-term relationship.',
    cta: "Let's talk about your business",
  },
} as const satisfies ServicesDictionary

export type ServicesContent = typeof servicesContent
