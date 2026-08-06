/**
 * How we work — EN locale.
 * SPEC-P5 FR-1.1 · Glossary: docs/i18n-glossary.md
 * Pending Carlos register review (AC-9).
 *
 * NOTE: Phases NOT stored here — shared from homeContent.framework.phases (FR-3.2).
 */
import type { MethodDictionary } from '@/content/types'

export const methodContent = {
  meta: {
    title: 'How we work | Escala Digital Ventures',
    description:
      'The Escala Growth Framework: ten phases that connect business, people, processes and technology.',
  },

  pageHeader: {
    eyebrow: 'A / HOW WE WORK',
    title: 'How we work',
    lead: 'Our own strategic framework and a disciplined execution practice. The goal is never to deliver software: it is to increase the growth capacity of your business.',
  },

  phaseCycle: {
    sectionEyebrow: 'THE GROWTH CYCLE',
    sectionIndex: 'B',
    title: 'Our own method: the Escala Growth Framework',
    lead: 'TEN PHASES · ONE CONTINUOUS IMPROVEMENT CYCLE',
    ariaLabel: 'Ten-phase growth cycle',
    phasePrefix: 'PHASE',
  },

  executionPractices: {
    sectionEyebrow: 'EXECUTION, DAY TO DAY',
    sectionIndex: 'C',
    title: 'Execution, day to day',
    lead: 'The strategic framework materialises in a concrete and disciplined execution practice — the second competitive advantage of Escala.',
    practices: [
      {
        index: '01',
        title: 'Specification-driven',
        body: 'Before writing a single line of code, every feature is documented in a formal specification: business context, numbered requirements, data model, edge cases and acceptance criteria. When there is an interface, the specification includes a navigable visual prototype that you approve before we build.',
        tie: '↳ MATERIALISES PHASE · VALIDATE',
      },
      {
        index: '02',
        title: 'AI-assisted development, driven by senior judgement',
        body: 'Escala\'s internal library of standards, rules and agent skills — extracted and refined from its own production projects — governs an AI-assisted engineering workflow that guarantees consistency across projects and exceptional delivery speed, always under expert review and direction.',
        tie: '↳ MATERIALISES PHASES · DESIGN · BUILD',
      },
      {
        index: '03',
        title: 'Verifiable quality',
        body: 'Automated test coverage as standard, continuous integration and deployment, separate development and production environments, and security reviews. Quality is demonstrated with facts: production stability, not promises.',
        tie: '↳ MATERIALISES PHASE · BUILD',
      },
      {
        index: '04',
        title: 'Iteration based on real usage',
        body: 'After launch, the roadmap is fed by direct user feedback: collected, prioritised, specified and delivered in short cycles. The product improves every month because it is built on what the business actually needs, not on assumptions.',
        tie: '↳ MATERIALISES PHASES · MEASURE · EVOLVE',
      },
      {
        index: '05',
        title: 'Traceable partnership',
        body: 'Every alliance in production includes a monthly allocation of support and evolution hours, with full traceability of the work done. The product never stands still and the client is never left alone.',
        tie: '↳ MATERIALISES COMMITMENT · CONTINUOUS SUPPORT',
      },
    ],
  },

  pipeline: {
    sectionEyebrow: 'THE EXECUTION FLOW',
    sectionIndex: 'D',
    sectionTitle: 'From specification to feedback',
    nodes: [
      { label: 'SPECIFICATION' },
      { label: 'PROTOTYPE' },
      { label: 'BUILD' },
      { label: 'QUALITY' },
      { label: 'PRODUCTION' },
      { label: 'FEEDBACK' },
    ],
    caption: 'FIG. 06 — FROM SPECIFICATION TO FEEDBACK IN SHORT CYCLES',
    legend: 'CONTINUOUS CYCLE · FEEDBACK FEEDS THE NEXT SPECIFICATION',
    ariaLabel: 'Execution flow diagram: specification, prototype, build, quality, production and feedback in a continuous cycle',
    returnArcLabel: 'RETURN TO ORIGIN',
  },

  aiBuild: {
    sectionEyebrow: 'HOW WE BUILD',
    sectionIndex: 'E',
    title: 'AI also in how we build',
    lead: 'Escala not only integrates AI into its clients\' products: it uses it in its own creation process. A proprietary AI-agent-assisted engineering workflow, governed by an internal library of standards, rules and patterns proven in production, multiplies execution speed, while senior product and engineering judgement ensures that what is built is the right thing and that it is built well.',
    points: [
      'INTERNAL LIBRARY OF STANDARDS, RULES AND PATTERNS PROVEN IN PRODUCTION',
      'AI-AGENT-ASSISTED ENGINEERING WORKFLOW',
      'SENIOR PRODUCT AND ENGINEERING JUDGEMENT IN EVERY DECISION',
      'CONSISTENCY ACROSS PROJECTS · SPEED OF A FULL TEAM',
    ],
    diagram: [
      'RULES LIBRARY',
      'AGENT',
      'SENIOR JUDGEMENT',
      'PRODUCTION',
    ],
  },
} as const satisfies MethodDictionary

export type MethodContent = typeof methodContent
