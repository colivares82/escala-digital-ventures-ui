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
  meta: {
    title: 'Alliance model | Escala Digital Ventures',
    description:
      'Five active alliances. Full dedication. Three layers: technical, strategic and visionary. The commitments of each alliance.',
  },

  pageHeader: {
    eyebrow: 'A / ALLIANCE MODEL',
    title: 'Five alliances. Our full dedication.',
    lead: 'We do not look for projects; we look for partners. And we choose our partners as much as they choose us.',
  },

  whyFive: {
    sectionEyebrow: 'B / WHY ONLY FIVE',
    heading: 'Why only five',
    body: 'We deliberately limit the number of active clients — approximately five alliances — to guarantee dedication, closeness and continuous support. It is not a limitation: it is the business model. Each client receives deep involvement and direct access to accumulated strategic knowledge.',
    constellationAria: 'FIG. 05 — Alliance constellation: five seats around Escala, two occupied (Magupell, BioZero) and three available.',
  },

  seats: [
    { name: 'Magupell', state: 'occupied' },
    { name: 'BIOZERO',  state: 'occupied' },
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
} as const satisfies AllianceDictionary

export type AllianceContent = typeof allianceContent
