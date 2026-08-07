/**
 * Aviso legal — ES content dictionary.
 * Phase 4: full LSSI-CE content per SPEC-P4 FR-2.
 *
 * LEGAL DISCLAIMER: This copy is drafted from the MAGUPELL contract (§1, §8)
 * and applicable Spanish law (LSSI-CE). It is NOT legal advice. A qualified
 * advisor must review this page before go-live.
 *
 * Unconfirmed data is marked with {{PLACEHOLDER}} tokens (FR-4.1).
 * Do NOT publish with unresolved placeholders (FR-4.2).
 *
 * IMPORTANT: No physical/street address is shown anywhere (Carlos's decision).
 * LSSI-CE identification is satisfied with company name + NIF + email contact.
 *
 * Spec: SPEC-P4 FR-2, FR-7.1
 */
import type { LegalDictionary } from '@/content/types'

export const legalContent = {
  meta: {
    title: 'Aviso legal | Escala Digital Ventures',
    description:
      'Aviso legal de Escala Digital Ventures, S.L.U. Información legal e identificación del titular conforme a la LSSI-CE.',
  },
  header: {
    eyebrow: '· AVISO LEGAL',
    h1: 'Aviso legal',
    updatedLabel: 'ÚLTIMA ACTUALIZACIÓN ·',
    // TODO(P4): Carlos to confirm and replace this placeholder before go-live.
    updatedDate: '{{FECHA_ACTUALIZACION}}',
  },
  anchorLabel: 'EN ESTA PÁGINA',
  sections: [
    {
      id: 'titular',
      index: '01',
      name: 'TITULAR',
      title: 'Titular del sitio web',
      body: 'En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los datos identificativos del titular de este sitio web:',
      kv: [
        {
          key: 'Denominación',
          value: 'Escala Digital Ventures, S.L.U.',
        },
        {
          key: 'NIF',
          // Pre-filled from MAGUPELL contract §1 — Carlos to confirm before go-live.
          value: '{{NIF_B88767520}}',
        },
        {
          key: 'Registro Mercantil',
          // Carlos to provide inscription data (tomo, folio, hoja, inscripción).
          value: '{{REGISTRO_MERCANTIL}}',
        },
        {
          key: 'Correo electrónico',
          value: 'hola@escaladigitalventures.com',
        },
      ],
    },
    {
      id: 'objeto',
      index: '02',
      name: 'OBJETO',
      title: 'Objeto',
      body: 'El presente aviso legal regula el uso del sitio web escaladigitalventures.com, cuyo objeto es informar sobre los servicios de producto y tecnología de Escala Digital Ventures, S.L.U., y facilitar el contacto con empresas que buscan un socio tecnológico.',
    },
    {
      id: 'propiedad-intelectual',
      index: '03',
      name: 'PROPIEDAD INTELECTUAL',
      title: 'Propiedad intelectual e industrial',
      // Consistent with SPEC-FIX-01 / Libro v2.2 Ch. 13: code and IP belong to Escala.
      body: 'Todos los contenidos del sitio —textos, marca, metodologías (incluido el Escala Growth Framework), diseño y código fuente— son propiedad de Escala Digital Ventures, S.L.U. o de terceros que han autorizado su uso, y están protegidos por la normativa española e internacional de propiedad intelectual e industrial. Las marcas de clientes se muestran con su autorización expresa. Queda prohibida su reproducción, distribución o modificación sin autorización escrita del titular.',
    },
    {
      id: 'responsabilidad',
      index: '04',
      name: 'RESPONSABILIDAD',
      title: 'Exclusión de responsabilidad',
      body: 'Escala Digital Ventures, S.L.U. no se responsabiliza de los daños o perjuicios derivados del uso del sitio web ni de la disponibilidad continua del mismo. Los enlaces a sitios web de terceros —por ejemplo, webs de clientes referenciados— se ofrecen a título meramente informativo; Escala no controla ni asume responsabilidad sobre sus contenidos.',
    },
    {
      id: 'legislacion',
      index: '05',
      name: 'LEGISLACIÓN',
      title: 'Legislación aplicable y jurisdicción',
      // Jurisdiction placeholder — Carlos to confirm; do NOT infer from withheld address.
      body: 'El presente aviso legal se rige por la legislación española. Para cualquier controversia derivada del uso de este sitio web, las partes se someten a los juzgados y tribunales competentes conforme a la legislación aplicable {{JURISDICCION}}.',
    },
  ],
} as const satisfies LegalDictionary

export type LegalContent = typeof legalContent
