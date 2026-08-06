/**
 * About Escala — EN locale.
 * SPEC-P5 FR-1.1 · Glossary: docs/i18n-glossary.md
 * Pending Carlos register review (AC-9).
 *
 * Anonymization rule (Ch. 19): no former-employer names.
 * Ownership rule (SPEC-FIX-01): no code-ownership wording.
 */
import type { AboutDictionary } from '@/content/types'

export const aboutContent = {
  meta: {
    title: 'About Escala | Escala Digital Ventures',
    description:
      'DNA, values, the 10 principles and the experience behind Escala. Mataró, Barcelona.',
  },

  ceremonial: {
    kicker: 'A · ABOUT ESCALA · PRODUCT AND TECHNOLOGY STUDIO',
    h1: 'We build capabilities, not applications.',
    sub: 'Escala Digital Ventures, S.L.U. is a product and technology studio based in Mataró (Barcelona), incorporated in 2026. We exist so that a select number of companies can grow through technology understood as business strategy.',
  },

  dna: {
    sectionEyebrow: 'B / OUR DNA',
    missionLabel: 'Mission.',
    mission:
      'To automate business systems and processes, foster scalability and efficiency, and do so through growth alliances in which we accompany each client hand in hand — at a technical, strategic and visionary level.',
    visionLabel: 'Vision.',
    vision:
      'To be the reference technology partner of a select group of companies, acting as their external technology, innovation and product department, and participating in their growth as if we were part of the business itself.',
    quote:
      '"Every decision must answer one question: will it still be adding value in ten years?"',
  },

  values: {
    sectionEyebrow: 'C / VALUES',
    items: [
      {
        n: '01',
        title: 'Partner commitment',
        body: 'We do not deliver a project and disappear: we stay, operate, improve and evolve the product alongside the client.',
      },
      {
        n: '02',
        title: 'Engineering excellence',
        body: 'Tested code, solid architecture, automated deployments and reusable proprietary standards. Production stability is a baseline requirement.',
      },
      {
        n: '03',
        title: 'Product before technology',
        body: 'We think first about the problem, the user and the return, and then about the tool.',
      },
      {
        n: '04',
        title: 'Radical transparency',
        body: 'Specifications before building, clear scope, honest communication and traceable billing.',
      },
      {
        n: '05',
        title: 'Speed with judgement',
        body: 'Specification-driven methodology and AI-assisted workflow: the speed of much larger teams, without sacrificing control.',
      },
    ],
  },

  divider: '— — —  FROM IDENTITY TO EXPERIENCE  — — —',

  expertise: {
    sectionEyebrow: 'D / THE EXPERIENCE BEHIND ESCALA',
    heading: 'More than two decades, six disciplines',
    lead: 'The experience underpinning Escala spans more than twenty years building and leading global enterprise software platforms — solutions used by tens of thousands of companies in more than a hundred countries. What matters is not the chronology, but the result: six disciplines operating together.',
    areas: [
      {
        index: '01',
        title: 'Full-stack engineering',
        body: 'Frontend, backend, data, cloud, security, testing and deployment automation. Designing and also executing.',
        figVariant: 'fullstack',
      },
      {
        index: '02',
        title: 'Platform architecture',
        body: 'Modular, scalable and extensible systems built to last years: clear APIs, observability, evolution without redesigns.',
        figVariant: 'hub',
      },
      {
        index: '03',
        title: 'Product direction',
        body: 'Vision, strategy, roadmap, impact-based prioritisation, functional specification and business-engineering-UX alignment.',
        figVariant: 'bars',
      },
      {
        index: '04',
        title: 'Leadership and transformation',
        body: 'Years leading multidisciplinary teams and transforming technical organisations into product-oriented organisations.',
        figVariant: 'nodes',
      },
      {
        index: '05',
        title: 'Developer experience',
        body: 'Tooling, testing and continuous integration: the discipline of making building, deploying and maintaining fast and reliable.',
        figVariant: 'signal',
      },
      {
        index: '06',
        title: 'Applied AI and cloud-native',
        body: 'Modern, cloud-native and AI-first platforms, with specific training in AI product design (MIT certification).',
        figVariant: 'insertion',
      },
    ],
  },

  manifesto: {
    sectionEyebrow: 'E / THE MANIFESTO',
    heading: 'The Escala Manifesto',
    lead: 'TEN BELIEFS · ONE WAY OF UNDERSTANDING TECHNOLOGY',
    beliefs: [
      'Technology only makes sense when it improves people\'s lives and the way businesses operate.',
      'Software is a strategic asset, not an expense.',
      'Simplicity is one of the most advanced forms of engineering.',
      'Business, product and technology form a single discipline.',
      'Automation frees human potential for higher-value tasks.',
      'Artificial intelligence must amplify people\'s capabilities, not replace them.',
      'Quality is non-negotiable: today\'s technical decisions determine tomorrow\'s success.',
      'We believe in long-term relationships built on trust, transparency and commitment.',
      'Continuous learning is essential to maintaining a competitive advantage.',
      'True success means helping our clients grow sustainably.',
    ],
  },

  colivaresLine:
    'GENERAL MANAGEMENT · The complete career of our General Manager is available as a public reference at colivares.com',
} as const satisfies AboutDictionary

export type AboutContent = typeof aboutContent
