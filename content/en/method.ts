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

  // SPEC-POLISH-06 §1: Escala Growth Framework moved to last content section (E), before FinalCTA.
  phaseCycle: {
    sectionEyebrow: 'THE GROWTH CYCLE',
    sectionIndex: 'E',
    title: 'Our own method: the Escala Growth Framework',
    lead: 'TEN PHASES · ONE CONTINUOUS IMPROVEMENT CYCLE',
    ariaLabel: 'Ten-phase growth cycle',
    phasePrefix: 'PHASE',
  },

  // SPEC-POLISH-06 addendum: swapped B/C order at Carlos's request post-implementation —
  // "The execution flow" now precedes "Execution, day to day".
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

  // SPEC-POLISH-06 §2 — closed execution cycle, FIG. 06.
  pipeline: {
    sectionEyebrow: 'THE EXECUTION FLOW',
    sectionIndex: 'B',
    sectionTitle: 'From specification to feedback',
    lead: 'Every increment travels the same path, and the path never ends: what your users learn feeds the next specification.',
    stations: [
      { label: 'SPECIFICATION', sub: 'REQUIREMENTS + PROTOTYPE', actor: 'escala' },
      { label: 'APPROVAL', sub: 'THE CLIENT SIGNS OFF FIRST', actor: 'client' },
      { label: 'BUILD', sub: 'TESTS · ENVIRONMENTS', actor: 'escala' },
      { label: 'PRODUCTION', sub: 'CONTINUOUS DEPLOYMENT', actor: 'escala' },
      { label: 'REAL USE', sub: 'YOUR USERS, EVERY DAY', actor: 'client' },
    ],
    centre: ['SHORT CYCLES', 'CONTINUOUS IMPROVEMENT'],
    returnLabel: 'FEEDBACK IS PRIORITISED AND ENTERS THE NEXT CYCLE',
    caption: 'FIG. 06 — THE EXECUTION CYCLE: FROM SPECIFICATION TO REAL USE, AND BACK AGAIN',
    ariaLabel: 'A closed execution cycle with five stations: specification, client approval, build, production and real use, with feedback returning to the specification.',
  },

  // SPEC-POLISH-06 §3 — "how we build" layered system, FIG. 12.
  aiBuild: {
    sectionEyebrow: 'HOW WE BUILD',
    sectionIndex: 'D',
    title: 'Engineering judgement, accelerated by agents',
    body: 'We don\'t build faster because we use AI: we build faster because every decision happens inside a system. Our own library of standards, rules and production-proven patterns governs the work; agents execute in parallel within that frame; and nothing reaches production without passing senior judgement and verifiable quality. The speed of a full team, with the coherence of a single mind.',
    figure: {
      frame: 'LIBRARY OF STANDARDS, RULES AND PRODUCTION-PROVEN PATTERNS',
      entry: 'SPECIFICATION',
      entrySub: 'APPROVED',
      lanePrefix: 'AGENT',
      lanes: ['IMPLEMENTATION', 'TESTS', 'DOCUMENTATION'],
      gate1: 'SENIOR JUDGEMENT',
      gate2: 'VERIFIABLE QUALITY',
      gate2Sub: 'TESTS · CI/CD · ENVIRONMENTS',
      exit: 'PRODUCTION',
      exitSub: 'MODULAR · SCALABLE',
      returnLabel: 'EVERY PROJECT IN PRODUCTION REFINES THE PATTERNS THAT GOVERN THE NEXT ONE',
      caption: 'FIG. 12 — THE SYSTEM THAT GOVERNS HOW WE BUILD',
      ariaLabel: 'The approved specification enters a library of standards that governs the work, runs through three parallel agent lanes, crosses the senior judgement and verifiable quality gates, exits to production, and returns refined patterns to the library.',
    },
    legend: [
      { label: 'GOVERNANCE', text: 'Our own library of standards, rules and production-proven patterns.' },
      { label: 'EXECUTION', text: 'AI agents working in parallel, always within that frame.' },
      { label: 'CONTROL', text: 'Senior judgement and verifiable quality before anything reaches production.' },
      { label: 'COMPOUNDING', text: 'Every real project refines the system that governs the next one.' },
    ],
  },
} as const satisfies MethodDictionary

export type MethodContent = typeof methodContent
