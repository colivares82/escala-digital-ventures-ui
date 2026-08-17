/**
 * Alliance model — EN locale.
 * SPEC-P5 FR-1.1 · Glossary: docs/i18n-glossary.md
 * Pending Carlos register review (AC-9).
 *
 * CONTENT-11: commercial terms are NEVER published on this site. They are
 * agreed privately with each client during commercial negotiation. Do not
 * reintroduce contractual wording here — the blocklist in
 * tests/content/ownership-guard.test.ts fails the build on any such term.
 */
import type { AllianceDictionary } from '@/content/types'

export const allianceContent = {
  // SEO-01 §3.2 — primary term: "technology partner for SMEs".
  meta: {
    title: 'Technology Partner for SMEs — The Alliance Model',
    description:
      'Only five active alliances. Technical, strategic and visionary partnership, exclusivity in your sector and continuous support with full traceability.',
  },

  pageHeader: {
    eyebrow: 'A / ALLIANCE MODEL',
    title: 'Five alliances. Our full dedication.',
    // SEO-01 §4.6 — must contain "technology partner" explicitly.
    lead: 'We work as the technology partner of a small number of companies. We do not look for projects; we look for partners. And we choose our partners as much as they choose us.',
  },

  whyFive: {
    sectionEyebrow: 'B / WHY ONLY FIVE',
    heading: 'Why only five',
    body: 'We deliberately limit the number of active clients — approximately five alliances — to guarantee dedication, closeness and continuous support. It is not a limitation: it is the business model. Each client receives deep involvement and direct access to accumulated strategic knowledge.',
    constellationAria: 'FIG. 05 — Alliance constellation: five seats around Escala, two occupied (Magupell, BioZero) and three available.',
  },

  seats: [
    { name: 'Magupell', state: 'occupied' },
    { name: 'BioZero',  state: 'occupied' },
    { name: 'AVAILABLE', state: 'free' },
    { name: 'AVAILABLE', state: 'free' },
    { name: 'AVAILABLE', state: 'free' },
  ],

  planes: {
    sectionEyebrow: 'C / THREE LAYERS OF PARTNERSHIP',
    heading: 'Three layers of partnership',
    lead: 'Each alliance receives simultaneous support across three layers.',
    items: [
      {
        index: '01',
        title: 'Technical',
        body: 'We design, build, deploy and operate your platform from end to end: architecture, full-stack development, cloud, security, testing, monitoring and continuous support. The capability of a complete technical department without having to build one.',
        depth: 'ARCHITECTURE · CODE · OPERATION',
      },
      {
        index: '02',
        title: 'Strategic',
        body: 'External product and technology direction: we prioritise the roadmap, translate business needs into executable specifications, decide what to build, what not to and in what order, and measure the impact of each iteration.',
        depth: 'ROADMAP · PRIORITY · IMPACT',
      },
      {
        index: '03',
        title: 'Visionary',
        body: 'We bring perspective on where software, automation and AI are heading, and help you anticipate: which processes to automate next, what data to capture today to exploit tomorrow, which AI capabilities make sense for your sector and which are noise.',
        depth: 'ANTICIPATION · DATA · AI',
      },
    ],
  },

  commitments: {
    sectionEyebrow: 'D / COMMITMENTS OF EACH ALLIANCE',
    heading: 'Commitments of each alliance',
    items: [
      {
        n: '01',
        tag: 'CUSTOM',
        body: 'Solutions tailored to the real needs and opportunities of your business — not templates.',
      },
      {
        n: '02',
        tag: 'SPECIFICATION',
        body: 'Nothing is built without a prior specification: requirements, edge cases and acceptance criteria.',
      },
      {
        n: '03',
        tag: 'QUALITY',
        body: 'Demonstrated with automated tests and production stability, not promises.',
      },
      {
        n: '04',
        tag: 'SUPPORT',
        body: 'Continuous, traceable and transparent in its billing.',
      },
      {
        n: '05',
        tag: 'MEASURED',
        body: 'One single final indicator: the growth and efficiency of your business.',
      },
    ],
  },

  /**
   * Q&A block — SEO-01 §5.7 / §5.8. Exactly 5 items.
   *
   * CONTENT-11: contractual ownership and licence terms are never published
   * here. Item 2 is an onboarding question ("How does an alliance start?");
   * item 3 answers continuity in operational terms only.
   */
  faq: {
    sectionEyebrow: 'E / FREQUENTLY ASKED QUESTIONS',
    sectionIndex: 'E',
    heading: 'Frequently asked questions',
    items: [
      {
        question: 'Why only five clients?',
        answer:
          'Because dedication cannot be divided indefinitely. With five active alliances we can know each business thoroughly, respond quickly and support it technically, strategically and with a view of what comes next. It is not a capacity limit: it is the business model, and it is what separates a partner from a supplier.',
      },
      {
        question: 'How does an alliance start?',
        answer:
          'With a conversation about your business, not about technology. If there is a fit, we analyse in depth the process that holds you back the most and define a first, bounded scope — with its specification and its prototype — before committing to anything larger. That produces a concrete proposal: what gets built first, in how long, and at what investment.',
      },
      {
        question: 'What happens if we stop working together?',
        answer:
          'Your platform keeps running and your data is returned to you in full, in standard formats and with nothing held back. Continuity conditions are agreed in writing at the start of the alliance, not when the moment arrives.',
      },
      {
        question: 'Could you work with my competitors?',
        answer:
          'Not with the same system. Every alliance includes sector exclusivity: we do not reuse your platform or its improvements for competitors of yours in your sector.',
      },
      {
        question: 'What exactly does an alliance include?',
        answer:
          'Design, build, deployment and operation of your platform; external product and technology leadership to decide what to build and in what order; and perspective on what to automate next and which data to start capturing today. All of it with a specification up front, verifiable quality and traceable billing of the time spent.',
      },
    ],
  },
} as const satisfies AllianceDictionary

export type AllianceContent = typeof allianceContent
