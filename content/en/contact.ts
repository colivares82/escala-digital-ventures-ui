/**
 * Contact — EN locale.
 * SPEC-P5 FR-1.1 · Glossary: docs/i18n-glossary.md
 * Pending Carlos register review (AC-9).
 */
import type { ContactDictionary } from '@/content/types'

export const contactContent = {
  // SEO-01 §3.2 — primary term: "contact a technology partner".
  meta: {
    title: "Contact — Let's Talk About Your Business | Escala",
    description:
      'Tell us what is holding your company’s growth back. We listen before proposing and say honestly whether we can help and whether we fit as partners.',
  },
  pageHeader: {
    eyebrow: 'A / CONVERSATION',
    h1: "Let's talk about your business.",
    lead: 'We listen before we propose. Tell us what is holding back your growth and we will tell you, honestly, whether we can help — and whether we fit as partners.',
  },
  affinityFilter: {
    heading: 'WE WORK BEST WITH',
    items: [
      'Solid businesses whose operations have grown faster than their systems.',
      'Niche B2B companies with workflows that no generic software covers.',
      'Those looking for a long-term partner, not a one-off supplier.',
    ],
  },
  directMeta: {
    emailLabel: 'EMAIL ·',
    email: 'hola@escaladigitalventures.com',
    locationLabel: 'LOCATION ·',
    location: 'Mataró · Barcelona',
    languagesLabel: 'LANGUAGES ·',
    languages: 'Spanish · English · Catalan',
    responseLabel: 'RESPONSE ·',
    response: 'Within 2 business days, personally',
  },
  dossierHeader: {
    title: 'CONTACT DOSSIER',
    ref: 'ESCALA · CONTACT REF.',
  },
  trustLine:
    'SECURE CONNECTION · YOUR DATA IS STORED IN THE EU · NO THIRD-PARTY SHARING',
} as const satisfies ContactDictionary

export type ContactContent = typeof contactContent
