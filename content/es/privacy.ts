/**
 * Política de privacidad — ES content dictionary.
 * Phase 4: full RGPD content per SPEC-P4 FR-3.
 *
 * LEGAL DISCLAIMER: This copy is drafted from the MAGUPELL contract (§8)
 * and applicable EU/Spanish law (RGPD). It is NOT legal advice. A qualified
 * advisor must review this page before go-live.
 *
 * Unconfirmed data is marked with {{PLACEHOLDER}} tokens (FR-4.1).
 * Do NOT publish with unresolved placeholders (FR-4.2).
 *
 * Key decisions (SPEC-P4 §0):
 * - No analytics → no third-party cookies → no cookie banner needed.
 * - No physical address shown (Carlos's decision).
 * - Public contact: hola@escaladigitalventures.com only.
 *
 * Spec: SPEC-P4 FR-3, FR-7.1
 */
import type { PrivacyDictionary } from '@/content/types'

export const privacyContent = {
  meta: {
    title: 'Privacidad | Escala Digital Ventures',
    description:
      'Política de privacidad de Escala Digital Ventures, S.L.U. Tratamiento de datos conforme al RGPD.',
  },
  header: {
    eyebrow: '· PRIVACIDAD',
    h1: 'Política de privacidad',
    updatedLabel: 'ÚLTIMA ACTUALIZACIÓN ·',
    // TODO(P4): Carlos to confirm and replace this placeholder before go-live.
    updatedDate: '{{FECHA_ACTUALIZACION}}',
  },
  anchorLabel: 'EN ESTA PÁGINA',
  sections: [
    {
      id: 'responsable',
      index: '01',
      name: 'RESPONSABLE',
      title: 'Responsable del tratamiento',
      body: 'El responsable del tratamiento de los datos personales recogidos a través de este sitio web es:',
      kv: [
        {
          key: 'Responsable',
          value: 'Escala Digital Ventures, S.L.U.',
        },
        {
          key: 'NIF',
          // Pre-filled from MAGUPELL contract §1 — Carlos to confirm before go-live.
          value: '{{NIF_B88767520}}',
        },
        {
          key: 'Contacto',
          value: 'hola@escaladigitalventures.com',
        },
      ],
    },
    {
      id: 'datos-finalidad',
      index: '02',
      name: 'DATOS Y FINALIDAD',
      title: 'Datos que tratamos y para qué',
      body: 'A través del formulario de contacto recogemos nombre, empresa, correo electrónico y el mensaje que nos envías. La finalidad exclusiva es responder a tu solicitud y valorar una posible colaboración. No utilizamos los datos para envíos comerciales no solicitados ni los cedemos a terceros con fines de marketing.',
    },
    {
      id: 'base-legal',
      index: '03',
      name: 'BASE LEGAL',
      title: 'Base jurídica del tratamiento',
      body: 'El tratamiento de tus datos se basa en el consentimiento que otorgas al marcar la casilla del formulario de contacto, y en el interés legítimo de Escala Digital Ventures, S.L.U. para atender tu consulta y gestionar la relación precontractual.',
    },
    {
      id: 'conservacion',
      index: '04',
      name: 'CONSERVACIÓN',
      title: 'Plazo de conservación',
      // EU-region placeholder — to be confirmed at Phase 6 when GCP is configured.
      body: 'Conservamos tus datos el tiempo estrictamente necesario para atender tu solicitud y, en su caso, mientras dure la relación comercial o precontractual; transcurrido ese plazo, se suprimen o bloquean conforme a la normativa aplicable. Los datos se alojan en servidores ubicados dentro de la Unión Europea {{REGION_EU_GOOGLE_CLOUD}}.',
    },
    {
      id: 'destinatarios',
      index: '05',
      name: 'DESTINATARIOS',
      title: 'Destinatarios',
      // Explicit statement: no tracking cookies used → no cookie banner required (SPEC-P4 §0).
      body: 'No cedemos tus datos a terceros con fines propios. Utilizamos proveedores de servicios (alojamiento web y envío de correo electrónico) que actúan como encargados del tratamiento bajo contrato y están ubicados en la Unión Europea. Este sitio web no utiliza cookies de seguimiento ni herramientas de analítica de terceros.',
    },
    {
      id: 'derechos',
      index: '06',
      name: 'TUS DERECHOS',
      title: 'Tus derechos',
      body: 'Puedes ejercer en cualquier momento los derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad de tus datos escribiendo a hola@escaladigitalventures.com. Si consideras que el tratamiento no se ajusta a la normativa vigente, tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (aepd.es).',
    },
  ],
} as const satisfies PrivacyDictionary

export type PrivacyContent = typeof privacyContent
