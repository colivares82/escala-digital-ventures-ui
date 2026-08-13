/**
 * Política de privacitat — CA locale.
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
    title: 'Privacitat | Escala Digital Ventures',
    // SEO-01 §3.4 — factual only, no marketing copy.
    description:
      'Política de privacitat d\'Escala Digital Ventures, S.L.U. Com es tracten les dades personals, conforme al RGPD.',
  },
  header: {
    eyebrow: '· PRIVACITAT',
    h1: 'Política de privacitat',
    updatedLabel: 'DARRERA ACTUALITZACIÓ ·',
    updatedDate: '{{FECHA_ACTUALIZACION}}',
  },
  anchorLabel: 'EN AQUESTA PÀGINA',
  sections: [
    {
      id: 'responsable',
      index: '01',
      name: 'RESPONSABLE',
      title: 'Responsable del tractament',
      body: 'El responsable del tractament de les dades personals recollides a través d\'aquest lloc web és:',
      kv: [
        {
          key: 'Responsable',
          value: 'Escala Digital Ventures, S.L.U.',
        },
        {
          key: 'NIF',
          value: '{{NIF_B88767520}}',
        },
        {
          key: 'Contacte',
          value: 'hola@escaladigitalventures.com',
        },
      ],
    },
    {
      id: 'datos-finalidad',
      index: '02',
      name: 'DADES I FINALITAT',
      title: 'Dades que tractem i per a què',
      body: 'A través del formulari de contacte recollim nom, empresa, adreça de correu electrònic i el missatge que ens envies. La finalitat exclusiva és respondre a la teva sol·licitud i valorar una possible col·laboració. No utilitzem les dades per a enviaments comercials no sol·licitats ni les cedim a tercers amb finalitats de màrqueting.',
    },
    {
      id: 'base-legal',
      index: '03',
      name: 'BASE LEGAL',
      title: 'Base jurídica del tractament',
      body: 'El tractament de les teves dades es basa en el consentiment que atorgues en marcar la casella del formulari de contacte, i en l\'interès legítim d\'Escala Digital Ventures, S.L.U. per atendre la teva consulta i gestionar la relació precontractual.',
    },
    {
      id: 'conservacion',
      index: '04',
      name: 'CONSERVACIÓ',
      title: 'Termini de conservació',
      body: 'Conservem les teves dades el temps estrictament necessari per atendre la teva sol·licitud i, si escau, mentre duri la relació comercial o precontractual; transcorregut aquest termini, se suprimeixen o bloquegen conforme a la normativa aplicable. Les dades s\'allotgen en servidors ubicats dins de la Unió Europea {{REGION_EU_GOOGLE_CLOUD}}.',
    },
    {
      id: 'destinatarios',
      index: '05',
      name: 'DESTINATARIS',
      title: 'Destinataris',
      body: 'No cedim les teves dades a tercers amb finalitats pròpies. Utilitzem proveïdors de serveis (allotjament web i enviament de correu electrònic) que actuen com a encarregats del tractament sota contracte i estan ubicats dins de la Unió Europea. Aquest lloc web no utilitza cookies de seguiment ni eines d\'analítica de tercers.',
    },
    {
      id: 'derechos',
      index: '06',
      name: 'ELS TEUS DRETS',
      title: 'Els teus drets',
      body: 'Pots exercir en qualsevol moment els drets d\'accés, rectificació, supressió, oposició, limitació del tractament i portabilitat de les teves dades escrivint a hola@escaladigitalventures.com. Si consideres que el tractament no s\'ajusta a la normativa vigent, tens dret a presentar una reclamació davant l\'Agència Espanyola de Protecció de Dades (aepd.es).',
    },
  ],
} as const satisfies PrivacyDictionary

export type PrivacyContent = typeof privacyContent
