/**
 * What we do — EN locale.
 * SPEC-P5 FR-1.1 · Glossary: docs/i18n-glossary.md
 * Pending Carlos register review (AC-9).
 */
import type { ServicesDictionary } from '@/content/types'

export const servicesContent = {
  // SEO-01 §3.2 — primary term: "custom platform development".
  meta: {
    title: 'Process Automation, Custom Platforms and Applied AI',
    description:
      'We automate processes, build custom platforms and apply AI where it returns value. Plus fractional CTO and product leadership for growing companies.',
  },

  pageHeader: {
    eyebrow: 'A / WHAT WE DO',
    title: 'What we do',
    // SEO-01 §4.3 — category stated plainly before the brand framing.
    lead: 'Process automation, custom platform development and applied AI for companies that have grown faster than their systems. We do not offer a service catalogue: we design each collaboration around your business goals. These are the five lines that almost always combine within a single alliance.',
    problemPrefix: 'THE PROBLEM',
  },

  services: [
    {
      index: '01',
      title: 'Digital transformation and process automation',
      problem: 'Critical processes that live in spreadsheets and in people\'s heads.',
      deliverable:
        // SEO-01 §4.4 — must contain "business process automation".
        'End-to-end business process automation: we analyse processes, tools and workflows to simplify, automate and modernise, from data capture at source through to invoicing and the final report.',
      figVariant: 'capture',
      figLabels: ['SHEET', 'EMAIL', 'DATA', 'PROCESS', 'REPORT', 'INVOICE'],
      figCaption: 'FIG. 07 — CAPTURE TO REPORT',
    },
    {
      index: '02',
      title: 'Platform development',
      problem: 'Generic software does not fit your reality.',
      deliverable:
        // CONTENT-11 C1 — ownership/licence terms are never published.
        'We design and build custom web applications and platforms —not templates—, with users and roles, your own domain, transactional email, document generation and integrated billing. An architecture built to evolve over years, not to stop at its first version.',
      figVariant: 'platform',
      figLabels: ['PLATFORM', 'USERS · ROLES', 'DOMAIN', 'EMAIL', 'DOCUMENTS', 'BILLING'],
      figCaption: 'FIG. 08 — MODULAR ARCHITECTURE',
    },
    {
      index: '03',
      title: 'Automation and applied AI',
      problem: 'Everyone talks about AI; few apply it with real return.',
      deliverable:
        // SEO-01 §4.5 — "applied artificial intelligence" spelled out at least
        // once, not only the "AI" abbreviation.
        'Applied artificial intelligence for your operations: we integrate language and vision models where they generate real, measurable value: fewer repetitive tasks, image analysis, better decisions. AI applied with judgement: where it adds value, not where it decorates.',
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

  /**
   * Q&A block — SEO-01 §5.5 / §5.8. Recrafted as a European prospect would ask,
   * not translated word for word. Question 5 deliberately uses "fractional CTO",
   * the recognised search term in this market (§5.8).
   * British register (§8). Figures per §0.4; EN formatting: 1,803.
   */
  faq: {
    sectionEyebrow: 'C / FREQUENTLY ASKED QUESTIONS',
    sectionIndex: 'C',
    heading: 'Frequently asked questions',
    items: [
      {
        question:
          "What's the difference between a custom platform and off-the-shelf software?",
        answer:
          'Off-the-shelf software makes your company adapt to how somebody else imagined the work. A custom platform is built on your actual process, with your roles and your vocabulary, and it changes when your business does. The difference shows most in the processes no catalogue product covers well: the ones living in spreadsheets and in two people\u2019s heads.',
      },
      {
        question: 'How do I know my company is ready to automate its processes?',
        answer:
          'Usually it is ready when volume has outgrown the systems: the same errors recur, information has to be hunted across several tools, and the operation depends on nobody being away. You do not need anything digitised beforehand. What you do need is a process that exists and somebody inside who knows it thoroughly.',
      },
      {
        question: 'How long does a custom platform take to reach production?',
        answer:
          'It depends on scope, but a full cycle is measured in months, not years. The Magupell platform went from first conversation to production in about seven months, between December 2025 and July 2026, including an approved prototype, development and pre-production.',
      },
      {
        question: 'Where does it make sense to apply AI in my business?',
        answer:
          'Where there is repetitive volume, or decisions that today rely on expert judgement scattered across people: image analysis, classifying and extracting information, generating documents, internal search. We integrate language and vision models only when the return is measurable. Applied AI with judgement: where it contributes, not where it decorates.',
      },
      {
        question: 'Do I need to hire a full-time CTO?',
        answer:
          'Not always. Many companies need senior product and technology judgement a few hours a month rather than a full-time salary: deciding what to build, in what order, with which suppliers and on what architecture. That is what a fractional CTO and product leadership engagement covers.',
      },
      {
        question: 'Do you work with companies outside Barcelona?',
        answer:
          'Yes. We are based in Mataró, near Barcelona, and work with companies across Spain and Europe. The model is remote, with time on site when the project calls for it, and it has never been a limitation.',
      },
    ],
  },
} as const satisfies ServicesDictionary

export type ServicesContent = typeof servicesContent
