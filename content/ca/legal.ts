/**
 * Avís legal — CA locale.
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
    title: 'Avís legal | Escala Digital Ventures',
    description:
      'Avís legal d\'Escala Digital Ventures, S.L.U. Informació legal i identificació del titular conforme a la LSSI-CE.',
  },
  header: {
    eyebrow: '· AVÍS LEGAL',
    h1: 'Avís legal',
    updatedLabel: 'DARRERA ACTUALITZACIÓ ·',
    updatedDate: '{{FECHA_ACTUALIZACION}}',
  },
  anchorLabel: 'EN AQUESTA PÀGINA',
  sections: [
    {
      id: 'titular',
      index: '01',
      name: 'TITULAR',
      title: 'Titular del lloc web',
      body: 'En compliment de la Llei 34/2002, d\'11 de juliol, de Serveis de la Societat de la Informació i de Comerç Electrònic (LSSI-CE), s\'informa de les dades identificatives del titular d\'aquest lloc web:',
      kv: [
        {
          key: 'Denominació',
          value: 'Escala Digital Ventures, S.L.U.',
        },
        {
          key: 'NIF',
          value: '{{NIF_B88767520}}',
        },
        {
          key: 'Registre Mercantil',
          value: '{{REGISTRO_MERCANTIL}}',
        },
        {
          key: 'Correu electrònic',
          value: 'hola@escaladigitalventures.com',
        },
      ],
    },
    {
      id: 'objeto',
      index: '02',
      name: 'OBJECTE',
      title: 'Objecte',
      body: 'El present avís legal regula l\'ús del lloc web escaladigitalventures.com, l\'objecte del qual és informar sobre els serveis de producte i tecnologia d\'Escala Digital Ventures, S.L.U., i facilitar el contacte amb empreses que busquen un soci tecnològic.',
    },
    {
      id: 'propiedad-intelectual',
      index: '03',
      name: 'PROPIETAT INTEL·LECTUAL',
      title: 'Propietat intel·lectual i industrial',
      body: 'Tots els continguts del lloc —textos, marca, metodologies (inclòs l\'Escala Growth Framework), disseny i codi font— són propietat d\'Escala Digital Ventures, S.L.U. o de tercers que n\'han autoritzat l\'ús, i estan protegits per la normativa espanyola i internacional de propietat intel·lectual i industrial. Les marques de clients es mostren amb la seva autorització expressa. Queda prohibida la seva reproducció, distribució o modificació sense autorització escrita del titular.',
    },
    {
      id: 'responsabilidad',
      index: '04',
      name: 'RESPONSABILITAT',
      title: 'Exclusió de responsabilitat',
      body: 'Escala Digital Ventures, S.L.U. no es responsabilitza dels danys o perjudicis derivats de l\'ús del lloc web ni de la seva disponibilitat contínua. Els enllaços a llocs web de tercers —per exemple, webs de clients referenciats— s\'ofereixen a títol merament informatiu; Escala no controla ni assumeix responsabilitat sobre els seus continguts.',
    },
    {
      id: 'legislacion',
      index: '05',
      name: 'LEGISLACIÓ',
      title: 'Legislació aplicable i jurisdicció',
      body: 'El present avís legal es regeix per la legislació espanyola. Per a qualsevol controvèrsia derivada de l\'ús d\'aquest lloc web, les parts se sotmeten als jutjats i tribunals competents conforme a la legislació aplicable {{JURISDICCION}}.',
    },
  ],
} as const satisfies LegalDictionary

export type LegalContent = typeof legalContent
