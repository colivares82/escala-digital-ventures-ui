/**
 * Contacto — ES content dictionary.
 * Phase 2.6 — full page content + contact form wiring.
 * Spec: SPEC-P2.6 FR-7.1
 *
 * SECURITY: The Gmail recipient address lives ONLY in server/.env (CONTACT_TO).
 * This file must never reference it — only the public hola@ address appears here.
 */
import type { ContactDictionary } from '@/content/types'

export const contactContent = {
  // SEO-01 §3.1 — primary term: "contactar socio tecnológico".
  meta: {
    title: 'Contacto — Hablemos de tu negocio | Escala',
    description:
      'Cuéntanos qué frena el crecimiento de tu empresa. Escuchamos antes de proponer y te decimos con honestidad si podemos ayudarte y si encajamos como socios.',
  },
  pageHeader: {
    eyebrow: 'A / CONVERSACIÓN',
    h1: 'Hablemos de tu negocio.',
    lead: 'Escuchamos antes de proponer. Cuéntanos qué frena tu crecimiento y te diremos, con honestidad, si podemos ayudarte — y si encajamos como socios.',
  },
  affinityFilter: {
    heading: 'TRABAJAMOS MEJOR CON',
    items: [
      'Negocios sólidos cuya operativa creció más rápido que sus sistemas.',
      'Empresas de nicho B2B con flujos que ningún software genérico cubre.',
      'Quien busca un socio de largo plazo, no un proveedor puntual.',
    ],
  },
  directMeta: {
    emailLabel: 'CORREO ·',
    email: 'hola@escaladigitalventures.com',
    locationLabel: 'SEDE ·',
    location: 'Mataró · Barcelona',
    languagesLabel: 'IDIOMAS ·',
    languages: 'Español · Inglés · Catalán',
    responseLabel: 'RESPUESTA ·',
    response: 'En 2 días laborables, personalmente',
  },
  dossierHeader: {
    title: 'FICHA DE CONTACTO',
    ref: 'ESCALA · REF. CONTACTO',
  },
  trustLine:
    'CONEXIÓN SEGURA · SIN CESIÓN A TERCEROS · SIN COOKIES DE SEGUIMIENTO',
} as const satisfies ContactDictionary

export type ContactContent = typeof contactContent
