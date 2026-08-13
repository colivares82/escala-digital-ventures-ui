/**
 * Contacte — CA locale.
 * SPEC-P5 FR-1.1 · Glossary: docs/i18n-glossary.md
 * Pending Carlos register review (AC-9).
 */
import type { ContactDictionary } from '@/content/types'

export const contactContent = {
  // SEO-01 §3.3 — primary term: "contactar soci tecnològic".
  meta: {
    title: 'Contacte — Parlem del teu negoci | Escala',
    description:
      'Explica\'ns què frena el creixement de la teva empresa. Escoltem abans de proposar i et diem amb honestedat si podem ajudar-te i si encaixem com a socis.',
  },
  pageHeader: {
    eyebrow: 'A / CONVERSA',
    h1: 'Parlem del teu negoci.',
    lead: 'Escoltem abans de proposar. Explica\'ns què frena el teu creixement i et direm, amb honestedat, si podem ajudar-te — i si encaixem com a socis.',
  },
  affinityFilter: {
    heading: 'TREBALLEM MILLOR AMB',
    items: [
      'Negocis sòlids la operativa dels quals ha crescut més ràpid que els seus sistemes.',
      'Empreses de nínxol B2B amb fluxos que cap programari genèric cobreix.',
      'Qui busca un soci de llarg termini, no un proveïdor puntual.',
    ],
  },
  directMeta: {
    emailLabel: 'CORREU ·',
    email: 'hola@escaladigitalventures.com',
    locationLabel: 'SEU ·',
    location: 'Mataró · Barcelona',
    languagesLabel: 'IDIOMES ·',
    languages: 'Espanyol · Anglès · Català',
    responseLabel: 'RESPOSTA ·',
    response: 'En 2 dies laborables, personalment',
  },
  dossierHeader: {
    title: 'FITXA DE CONTACTE',
    ref: 'ESCALA · REF. CONTACTE',
  },
  trustLine:
    'CONNEXIÓ SEGURA · LES TEVES DADES S\'EMMAGATZEMEN A LA UE · SENSE CESSIÓ A TERCERS',
} as const satisfies ContactDictionary

export type ContactContent = typeof contactContent
