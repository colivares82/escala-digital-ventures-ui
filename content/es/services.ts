/**
 * Qué hacemos — ES content dictionary (full Phase 2.2).
 * Copy authority: Libro v2.2 Ch. 11 (services) · Ch. 12 (ideal client) · Ch. 13 (IP/ownership) · Spec v1.1.1 §5.2 · SPEC-P2.2 · SPEC-FIX-01.
 * Spec: SPEC-P2.2 FR-7.1
 */
import type { ServicesDictionary } from '@/content/types'

export const servicesContent = {
  // SEO-01 §3.1 — primary term: "desarrollo de plataformas a medida".
  meta: {
    title: 'Automatización, plataformas a medida e IA para empresas',
    description:
      'Automatizamos procesos, desarrollamos plataformas a medida y aplicamos IA donde aporta retorno. También dirección de producto y tecnología fraccional.',
  },

  pageHeader: {
    eyebrow: 'A / QUÉ HACEMOS',
    title: 'Qué hacemos',
    // Verbatim from spec §5.2
    // SEO-01 §4.3 — first sentence states the category plainly before the
    // brand framing; the existing second sentence about the five lines is kept.
    lead: 'Automatización de procesos, desarrollo de plataformas a medida e IA aplicada para empresas que han crecido más rápido que sus sistemas. No ofrecemos un catálogo de servicios: diseñamos cada colaboración alrededor de los objetivos de tu negocio. Estas son las cinco líneas que casi siempre se combinan dentro de una misma alianza.',
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
        // SEO-01 §4.4 — must contain "automatización de procesos" verbatim.
        'Automatización de procesos de principio a fin: analizamos procesos, herramientas y flujos para simplificar, automatizar y modernizar, desde la captura del dato en origen hasta la facturación y el informe final.',
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
        // SEO-01 §4.5 — "inteligencia artificial aplicada" spelled out at least
        // once, not only the "IA" abbreviation.
        'Inteligencia artificial aplicada a tu operativa: integramos modelos de lenguaje y de visión donde generan valor real y medible: menos tareas repetitivas, análisis de imágenes, mejores decisiones. IA aplicada con criterio: donde aporta, no donde adorna.',
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

  /**
   * Q&A block — SEO-01 §5.5. Rendered by FaqBlock after the last content
   * section and before FinalCTA (§5.2), and mirrored verbatim into FAQPage
   * JSON-LD (§6.8 / AC-11).
   *
   * Every figure traces to §0.4: seven months Dec 2025 → Jul 2026.
   */
  faq: {
    sectionEyebrow: 'C / PREGUNTAS FRECUENTES',
    sectionIndex: 'C',
    heading: 'Preguntas frecuentes',
    items: [
      {
        question:
          '¿En qué se diferencia una plataforma a medida de un software genérico?',
        answer:
          'Un software genérico obliga a tu empresa a adaptarse a cómo lo pensó otro. Una plataforma a medida se construye sobre tu proceso real, con tus roles y tu vocabulario, y crece cuando tu negocio cambia. La diferencia se nota sobre todo en los procesos que ningún producto de catálogo cubre bien: los que hoy viven en hojas de cálculo y en la cabeza de dos personas.',
      },
      {
        question:
          '¿Cómo sé si mi empresa está lista para automatizar sus procesos?',
        answer:
          'Suele estarlo cuando el volumen ha crecido más rápido que los sistemas: los errores se repiten, la información se busca en varios sitios y la operativa depende de que nadie falte. No hace falta tener nada digitalizado previamente. Lo que sí hace falta es que el proceso exista y que alguien dentro lo conozca a fondo.',
      },
      {
        question: '¿Cuánto tarda una plataforma a medida en estar en producción?',
        answer:
          'Depende del alcance, pero un ciclo completo es medible en meses, no en años. La plataforma de Magupell pasó de la primera conversación a producción en unos siete meses, entre diciembre de 2025 y julio de 2026, incluyendo prototipo aprobado, desarrollo y preproducción.',
      },
      {
        question:
          '¿Dónde tiene sentido aplicar inteligencia artificial en mi negocio?',
        answer:
          'Donde hay volumen repetitivo o decisiones que hoy dependen de criterio experto disperso: análisis de imágenes, clasificación y extracción de información, generación de documentos, búsqueda interna. Integramos modelos de lenguaje y de visión solo cuando el retorno es medible. IA aplicada con criterio: donde aporta, no donde adorna.',
      },
      {
        question: '¿Necesito contratar un CTO a tiempo completo?',
        answer:
          'No siempre. Muchas empresas necesitan criterio directivo de producto y tecnología unas horas al mes, no un salario a jornada completa: decidir qué construir, en qué orden, con qué proveedores y con qué arquitectura. Eso es lo que cubre la dirección de producto y tecnología fraccional.',
      },
      {
        question: '¿Trabajáis con empresas fuera de Barcelona?',
        answer:
          'Sí. Estamos en Mataró (Barcelona) y trabajamos con empresas de toda España y de Europa. El modelo de trabajo es remoto con presencia cuando el proyecto lo pide, y no ha sido nunca una limitación.',
      },
    ],
  },
} as const satisfies ServicesDictionary

export type ServicesContent = typeof servicesContent
