/**
 * Privacy policy — EN locale.
 * SPEC-P5 FR-1.1 · Glossary: docs/i18n-glossary.md
 * Pending Carlos register review (AC-9).
 *
 * LEGAL DISCLAIMER: This is a faithful translation of the ES privacy policy.
 * It is NOT legal advice. A qualified advisor must review before go-live.
 *
 * Unconfirmed data uses {{PLACEHOLDER}} tokens — same as ES.
 * Do NOT publish with unresolved placeholders.
 */
import type { PrivacyDictionary } from '@/content/types'

export const privacyContent = {
  meta: {
    title: 'Privacy | Escala Digital Ventures',
    // SEO-01 §3.4 — factual only, no marketing copy.
    description:
      'Privacy policy of Escala Digital Ventures, S.L.U. How personal data is processed, in accordance with the GDPR.',
  },
  header: {
    eyebrow: '· PRIVACY',
    h1: 'Privacy policy',
    updatedLabel: 'LAST UPDATED ·',
    updatedDate: '{{FECHA_ACTUALIZACION}}',
  },
  anchorLabel: 'ON THIS PAGE',
  sections: [
    {
      id: 'responsable',
      index: '01',
      name: 'CONTROLLER',
      title: 'Data controller',
      body: 'The controller of the personal data collected through this website is:',
      kv: [
        {
          key: 'Controller',
          value: 'Escala Digital Ventures, S.L.U.',
        },
        {
          key: 'Tax ID (NIF)',
          value: '{{NIF_B88767520}}',
        },
        {
          key: 'Contact',
          value: 'hola@escaladigitalventures.com',
        },
      ],
    },
    {
      id: 'datos-finalidad',
      index: '02',
      name: 'DATA & PURPOSE',
      title: 'Data we process and why',
      body: 'Through the contact form we collect your name, company, email address and the message you send us. The sole purpose is to respond to your enquiry and assess a possible collaboration. We do not use the data for unsolicited commercial communications and we do not share it with third parties for marketing purposes.',
    },
    {
      id: 'base-legal',
      index: '03',
      name: 'LEGAL BASIS',
      title: 'Legal basis for processing',
      body: 'The processing of your data is based on the consent you give by ticking the checkbox on the contact form, and on the legitimate interest of Escala Digital Ventures, S.L.U. in responding to your enquiry and managing the pre-contractual relationship.',
    },
    {
      id: 'conservacion',
      index: '04',
      name: 'RETENTION',
      title: 'Retention period',
      body: 'We retain your data for the time strictly necessary to respond to your enquiry and, where applicable, for the duration of the commercial or pre-contractual relationship; once that period has elapsed, the data is deleted or blocked in accordance with applicable regulations. Data is hosted on servers located within the European Union {{REGION_EU_GOOGLE_CLOUD}}.',
    },
    {
      id: 'destinatarios',
      index: '05',
      name: 'RECIPIENTS',
      title: 'Recipients',
      body: 'We do not share your data with third parties for their own purposes. We use service providers (web hosting and email delivery) who act as data processors under contract and are located within the European Union. This website does not use tracking cookies or third-party analytics tools.',
    },
    {
      id: 'derechos',
      index: '06',
      name: 'YOUR RIGHTS',
      title: 'Your rights',
      body: 'You may exercise your rights of access, rectification, erasure, objection, restriction of processing and data portability at any time by writing to hola@escaladigitalventures.com. If you consider that the processing does not comply with current regulations, you have the right to lodge a complaint with the Spanish Data Protection Agency (aepd.es).',
    },
  ],
} as const satisfies PrivacyDictionary

export type PrivacyContent = typeof privacyContent
