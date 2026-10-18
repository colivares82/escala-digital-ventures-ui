/**
 * Home page content — EN locale.
 * SPEC-P5 FR-1.1 · Glossary: docs/i18n-glossary.md
 * Pending Carlos register review (AC-9).
 */
import { sharedContent } from '@/content/en/shared'
import { homeLandingContent } from '@/content/en/home-landing'
import type { HomePageDictionary } from '@/content/types'

export const homeContent = {
  // SEO-01 §3.2 — primary term: "business process automation".
  meta: {
    title: 'Business Process Automation & Custom Software | Escala',
    description:
      'We turn your company’s manual processes into a custom platform of its own. Technology partner for SMEs across Europe. Five alliances, full dedication.',
  },

  header: sharedContent.header,

  claims: sharedContent.claims,

  framework: {
    // Consumed by /como-trabajamos (components/pages/method.tsx).
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

  /**
   * Magupell readouts (SPEC-POLISH-03). Consumed by home 04 Evidencia
   * (HOME-V2: title = H2; DAT.01/02/04/05 rendered) and /styleguide.
   */
  proof: {
    title: 'Facts, not promises.',
    readouts: [
      {
        label: 'REQUIREMENTS',
        value: '167 → 216',
        kind: 'number',
        caption: 'Functional requirements refined through iteration and prototype.',
        plotVariant: 'growth',
      },
      {
        label: 'TESTS',
        value: '1.803',
        kind: 'number',
        caption: 'Automated tests: 1,042 backend + 761 frontend. Stability guaranteed with every change.',
        plotVariant: 'steps',
      },
      {
        label: 'ENVIRONMENTS',
        value: '3 environments',
        kind: 'number',
        caption: 'Local, development and production, with protected pipelines.',
        plotVariant: 'bars',
      },
      {
        label: 'TIME TO PRODUCTION',
        value: '7 months',
        kind: 'number',
        caption: 'From the first requirements to production.',
        plotVariant: 'stair',
      },
      {
        label: 'IMPACT',
        value: 'Replaced the manual.',
        kind: 'phrase',
        caption: 'The system orchestrates the operation and provides data insights. In its first month, already a reality for all users.',
        plotVariant: 'impact',
      },
      {
        label: 'BESPOKE',
        value: 'Tailored to each role.',
        kind: 'phrase',
        caption: 'Admin, client, inspector and supplier: each function with what it needs, with full control and auditability.',
        plotVariant: 'roles',
      },
    ] as const,
  },

  /**
   * Alliance constellation figure (FIG.05) — SPEC-POLISH-04.
   * Seats as a data array: future active alliance = data-only change.
   * All copy from here; no hardcoded strings in the component.
   * Brand spelling: "Magupell", "BioZero".
   * Pending Carlos register review (AC-9).
   */
  allianceFigure: {
    seats: [
      { name: 'Magupell',  state: 'occupied' },
      { name: 'BioZero',   state: 'occupied' },
      { name: 'AVAILABLE', state: 'free' },
      { name: 'AVAILABLE', state: 'free' },
      { name: 'AVAILABLE', state: 'free' },
    ],
    caption: 'FIG. 05 — FIVE SEATS. TWO ACTIVE ALLIANCES. FULL DEDICATION.',
    subCaption: 'EACH ALLIANCE: TECHNICAL · STRATEGIC · VISIONARY SUPPORT',
    coreSubLabel: '2 ACTIVE ALLIANCES · 3 AVAILABLE',
    figAria: 'Alliance constellation: Escala at the centre, two active alliances (Magupell, BioZero) and three available seats',
  },

  /** HOME-V2 — visible copy of home sections 00–08 (see content/en/home-landing.ts). */
  landing: homeLandingContent,

  footer: sharedContent.footer,
} as const satisfies HomePageDictionary

export type HomeContent = typeof homeContent
