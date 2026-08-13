/**
 * Legal notice — EN locale.
 * SPEC-P5 FR-1.1 · Glossary: docs/i18n-glossary.md
 * Pending Carlos register review (AC-9).
 *
 * LEGAL DISCLAIMER: This is a faithful translation of the ES legal notice.
 * It is NOT legal advice. A qualified advisor must review before go-live.
 *
 * Unconfirmed data uses {{PLACEHOLDER}} tokens — same as ES.
 * Do NOT publish with unresolved placeholders.
 */
import type { LegalDictionary } from '@/content/types'

export const legalContent = {
  meta: {
    title: 'Legal notice | Escala Digital Ventures',
    // SEO-01 §3.4 — factual only, no marketing copy.
    description:
      'Legal information and identification of the owner of the Escala Digital Ventures, S.L.U. website, in accordance with the LSSI-CE.',
  },
  header: {
    eyebrow: '· LEGAL NOTICE',
    h1: 'Legal notice',
    updatedLabel: 'LAST UPDATED ·',
    updatedDate: '{{FECHA_ACTUALIZACION}}',
  },
  anchorLabel: 'ON THIS PAGE',
  sections: [
    {
      id: 'titular',
      index: '01',
      name: 'OWNER',
      title: 'Website owner',
      body: 'In compliance with Law 34/2002 of 11 July on Information Society Services and Electronic Commerce (LSSI-CE), the identifying details of the owner of this website are provided below:',
      kv: [
        {
          key: 'Company name',
          value: 'Escala Digital Ventures, S.L.U.',
        },
        {
          key: 'Tax ID (NIF)',
          value: '{{NIF_B88767520}}',
        },
        {
          key: 'Commercial Registry',
          value: '{{REGISTRO_MERCANTIL}}',
        },
        {
          key: 'Email',
          value: 'hola@escaladigitalventures.com',
        },
      ],
    },
    {
      id: 'objeto',
      index: '02',
      name: 'PURPOSE',
      title: 'Purpose',
      body: 'This legal notice governs the use of the website escaladigitalventures.com, whose purpose is to provide information about the product and technology services of Escala Digital Ventures, S.L.U. and to facilitate contact with companies seeking a technology partner.',
    },
    {
      id: 'propiedad-intelectual',
      index: '03',
      name: 'INTELLECTUAL PROPERTY',
      title: 'Intellectual and industrial property',
      body: 'All content on this site — texts, brand, methodologies (including the Escala Growth Framework), design and source code — is the property of Escala Digital Ventures, S.L.U. or of third parties who have authorised its use, and is protected by Spanish and international intellectual and industrial property law. Client brands are displayed with their express authorisation. Reproduction, distribution or modification without written authorisation from the owner is prohibited.',
    },
    {
      id: 'responsabilidad',
      index: '04',
      name: 'LIABILITY',
      title: 'Limitation of liability',
      body: 'Escala Digital Ventures, S.L.U. accepts no liability for damages arising from the use of this website or from its continuous availability. Links to third-party websites — for example, websites of referenced clients — are provided for information purposes only; Escala does not control or accept responsibility for their content.',
    },
    {
      id: 'legislacion',
      index: '05',
      name: 'LEGISLATION',
      title: 'Applicable law and jurisdiction',
      body: 'This legal notice is governed by Spanish law. For any dispute arising from the use of this website, the parties submit to the competent courts in accordance with applicable legislation {{JURISDICCION}}.',
    },
  ],
} as const satisfies LegalDictionary

export type LegalContent = typeof legalContent
