/**
 * Qué hacemos — ES content dictionary (full Phase 2.2).
 * Copy authority: Libro v2.2 Ch. 11 (services) · Ch. 12 (ideal client) · Ch. 13 (IP/ownership) · Spec v1.1.1 §5.2 · SPEC-P2.2 · SPEC-FIX-01.
 * Spec: SPEC-P2.2 FR-7.1
 */
import type { ServicesDictionary } from '@/content/types'

export const servicesContent = {
  meta: {
    title: 'Qué hacemos | Escala Digital Ventures',
    description:
      'Automatización, plataformas a medida, IA aplicada y CTO fraccional para empresas en crecimiento.',
  },

  pageHeader: {
    eyebrow: 'A / QUÉ HACEMOS',
    title: 'Qué hacemos',
    // Verbatim from spec §5.2
    lead: 'No ofrecemos un catálogo de servicios: diseñamos cada colaboración alrededor de los objetivos de tu negocio. Estas son las cinco líneas que casi siempre se combinan dentro de una misma alianza.',
    // Separated from problem text so Phase 5 can translate ("THE PROBLEM" for EN, "EL PROBLEMA" for CA)
    problemPrefix: 'EL PROBLEMA',
  },

  // Verbatim from Libro Ch. 11 / spec §5.2 (FR-3.5). figLabels from wireframe FIG geometry.
  services: [
    {
      index: '01',
      title: 'Transformación digital y automatización de procesos',
      problem: 'Procesos críticos que viven en hojas de cálculo y en la cabeza de las personas.',
      deliverable:
        'Analizamos procesos, herramientas y flujos para simplificar, automatizar y modernizar: desde la captura del dato en origen hasta la facturación y el informe final.',
      figVariant: 'capture',
      // Labels for FIG. 07 — CAPTURA A INFORME (left inputs, process node, right outputs)
      figLabels: ['HOJA', 'CORREO', 'DATO', 'PROCESO', 'INFORME', 'FACTURA'],
      figCaption: 'FIG. 07 — CAPTURA A INFORME',
    },
    {
      index: '02',
      title: 'Desarrollo de plataformas',
      problem: 'El software genérico no encaja con tu realidad.',
      deliverable:
        // §3.1 canonical wording — SPEC-FIX-01 / Libro v2.2 Ch. 13.
        // Client gets: indefinite use licence + data ownership.
        // Code and IP: belong to Escala.
        'Diseñamos y construimos aplicaciones web y plataformas a medida —no plantillas—, con usuarios y roles, dominio propio, correo transaccional, generación de documentos y facturación integrada. Una solución construida a medida de tu negocio: obtienes una licencia de uso indefinida sobre tu plataforma y la propiedad de tus datos. La propiedad intelectual y el código son de Escala.',
      figVariant: 'platform',
      // Labels for FIG. 08 — ARQUITECTURA MODULAR (core + 5 modules)
      figLabels: ['PLATAFORMA', 'USUARIOS · ROLES', 'DOMINIO', 'CORREO', 'DOCUMENTOS', 'FACTURACIÓN'],
      figCaption: 'FIG. 08 — ARQUITECTURA MODULAR',
    },
    {
      index: '03',
      title: 'Automatización e IA aplicada',
      problem: 'Todo el mundo habla de IA; pocos la aplican con retorno.',
      deliverable:
        'Integramos modelos de lenguaje y de visión donde generan valor real y medible: menos tareas repetitivas, análisis de imágenes, mejores decisiones. IA aplicada con criterio: donde aporta, no donde adorna.',
      figVariant: 'ai',
      // Labels for FIG. 09 — IA EN EL PROCESO (horizontal line + IA insertion node)
      figLabels: ['ENTRADA', 'PROCESO', 'DECISIÓN', 'IA', 'DONDE APORTA'],
      figCaption: 'FIG. 09 — IA EN EL PROCESO',
    },
    {
      index: '04',
      title: 'CTO y Product Leadership fraccional',
      problem: 'Necesitas criterio directivo de producto y tecnología, sin contratar un perfil a tiempo completo.',
      deliverable:
        'Visión tecnológica, roadmap, especificación funcional, priorización, gestión de proveedores e iniciativas de innovación, con experiencia ejecutiva real.',
      figVariant: 'product',
      // Labels for FIG. 10 — DIRECCIÓN DE PRODUCTO (ascending bars + priority marker)
      figLabels: ['AHORA', 'SIGUIENTE', 'DESPUÉS', 'PRIORIDAD'],
      figCaption: 'FIG. 10 — DIRECCIÓN DE PRODUCTO',
    },
    {
      index: '05',
      title: 'Operación, soporte y evolución continua',
      problem: 'El software que no evoluciona, muere.',
      deliverable:
        'Mantenemos tu plataforma en producción, resolvemos incidencias y la mejoramos cada mes a partir del feedback real de tus usuarios. Con trazabilidad completa del trabajo realizado.',
      figVariant: 'evolve',
      // Labels for FIG. 11 — EVOLUCIÓN CONTINUA (closed loop: USO → FEEDBACK → MEJORA)
      figLabels: ['USO', 'FEEDBACK', 'MEJORA'],
      figCaption: 'FIG. 11 — EVOLUCIÓN CONTINUA',
    },
  ],

  idealClient: {
    eyebrow: 'B / ¿ENCAJAMOS?',
    title: '¿Encajamos?',
    // Verbatim from Libro Ch. 12 (FR-5.1)
    body: 'Trabajamos con negocios sólidos cuya operativa ha crecido más rápido que sus sistemas: empresas familiares y pymes consolidadas, negocios de nicho B2B y compañías que quieren incorporar IA con retorno real. El requisito más importante no es el sector ni el tamaño: es la voluntad de construir una relación de largo plazo.',
    // Interim: links to #contacto anchor on same page (FinalCTA below).
    // BACKLOG follow-up: switch to /contacto when Phase 3 ships (PAGE-06).
    cta: 'Hablemos de tu negocio',
  },

  // Same shape as home finalCta — reused FinalCTA component
  finalCta: {
    title: 'Hablemos de tu negocio.',
    body: 'Cuéntanos qué frena tu crecimiento. Escuchamos antes de proponer.',
    success:
      'Recibido. Te responderemos personalmente en un plazo de dos días laborables.',
    // Assumption: placeholder address per spec §5.7 — confirm final value before go-live.
    email: 'hola@escaladigitalventures.com',
    location: 'Mataró · Barcelona',
    languages: 'Trabajamos en español, inglés y catalán.',
  },
} as const satisfies ServicesDictionary

export type ServicesContent = typeof servicesContent
