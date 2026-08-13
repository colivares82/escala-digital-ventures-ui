/**
 * Alliance model — EN locale.
 * SPEC-P5 FR-1.1 · Glossary: docs/i18n-glossary.md
 * Pending Carlos register review (AC-9).
 *
 * Ownership note: commitment 01 uses the corrected "CUSTOM" framing.
 * DO NOT add any "client owns the code" wording here.
 */
import type { AllianceDictionary } from '@/content/types'

export const allianceContent = {
  // SEO-01 §3.2 — primary term: "technology partner for SMEs".
  meta: {
    title: 'Technology Partner for SMEs — The Alliance Model',
    description:
      'Only five active alliances. Technical, strategic and visionary partnership, an indefinite licence to your platform and full ownership of your data.',
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
        body: 'Every feature is specified and approved before it is built.',
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
   * Q&A block — SEO-01 §5.7 / §5.8.
   * OWNERSHIP: the client owns their DATA and holds an indefinite use LICENCE;
   * IP and source code belong to Escala. Never say the client owns the code.
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
        // Phrased as "belongs to whom" rather than "who owns the code": the
        // ownership guard (tests/content/i18n-coverage.test.ts) rightly blocks
        // the latter pattern, and the guard stays strict — the question is
        // reworded instead of the guard being relaxed. Same intent, and it
        // reads closer to how a prospect actually asks it.
        question: 'The platform we pay for — who does the code belong to, and the data?',
        answer:
          'The data is entirely yours: you own it, you can export it whenever you want, and it is returned to you in full when the relationship ends. Intellectual property and source code belong to Escala, and you receive an exclusive, non-transferable, indefinite licence to operate your platform with unlimited users.',
      },
      {
        question: 'What happens if we stop working together?',
        answer:
          'The use licence survives the end of support: you are never left without your tool. Your data is returned to you in full. Confidentiality obligations and sector restrictions remain in force after the relationship ends.',
      },
      {
        question: 'Could you work with my competitors?',
        answer:
          'Not with the same system. Every alliance includes sector exclusivity: we do not reuse your platform or its improvements for your competitors in your sector. That is the natural counterpart to the intellectual property being ours.',
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
