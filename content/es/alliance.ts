/**
 * Modelo de alianza — ES content dictionary.
 * Full content for /modelo-de-alianza (Phase 2.4).
 * Spec: SPEC-P2.4 FR-8.1
 *
 * CONTENT-11: commercial terms are NEVER published on this site. They are
 * agreed privately with each client during commercial negotiation. Do not
 * reintroduce contractual wording here — the blocklist in
 * tests/content/ownership-guard.test.ts fails the build on any such term.
 */
import type { AllianceDictionary } from '@/content/types'

export const allianceContent = {
  // SEO-01 §3.1 — primary term: "socio tecnológico para pymes".
  meta: {
    title: 'Socio tecnológico para pymes: el modelo de alianza',
    description:
      'Solo cinco alianzas activas. Acompañamiento técnico, estratégico y visionario, exclusividad en tu sector y soporte continuo con trazabilidad completa.',
  },

  pageHeader: {
    eyebrow: 'A / MODELO DE ALIANZA',
    title: 'Cinco alianzas. Toda nuestra dedicación.',
    // SEO-01 §4.6 — must contain "socio tecnológico" explicitly.
    lead: 'Trabajamos como socio tecnológico de un número reducido de empresas. No buscamos proyectos; buscamos socios. Y elegimos a nuestros socios tanto como ellos nos eligen a nosotros.',
  },

  whyFive: {
    sectionEyebrow: 'B / POR QUÉ SOLO CINCO',
    heading: 'Por qué solo cinco',
    body: 'Limitamos deliberadamente el número de clientes activos —aproximadamente cinco alianzas— para garantizar dedicación, cercanía y acompañamiento continuo. No es una limitación: es el modelo de negocio. Cada cliente recibe una implicación profunda y acceso directo al conocimiento estratégico acumulado.',
    constellationAria: 'FIG. 05 — Constelación de alianzas: cinco plazas alrededor de Escala, dos ocupadas (Magupell, BioZero) y tres disponibles.',
  },

  // Exactly 5 seats. Enforced in tests. (SPEC-P2.4 FR-3.2)
  seats: [
    { name: 'Magupell', state: 'occupied' },
    { name: 'BioZero',  state: 'occupied' },
    { name: 'DISPONIBLE', state: 'free' },
    { name: 'DISPONIBLE', state: 'free' },
    { name: 'DISPONIBLE', state: 'free' },
  ],

  planes: {
    sectionEyebrow: 'C / TRES PLANOS DE ACOMPAÑAMIENTO',
    heading: 'Tres planos de acompañamiento',
    lead: 'Cada alianza recibe acompañamiento simultáneo en tres planos.',
    // Exactly 3 planes. Enforced in tests. (SPEC-P2.4 FR-4.1)
    items: [
      {
        index: '01',
        title: 'Técnico',
        body: 'Diseñamos, construimos, desplegamos y operamos tu plataforma de principio a fin: arquitectura, desarrollo full-stack, cloud, seguridad, pruebas, monitorización y soporte continuo. La capacidad de un departamento técnico completo sin tener que crearlo.',
        depth: 'ARQUITECTURA · CÓDIGO · OPERACIÓN',
      },
      {
        index: '02',
        title: 'Estratégico',
        body: 'Dirección externa de producto y tecnología: priorizamos el roadmap, traducimos necesidades de negocio en especificaciones ejecutables, decidimos qué construir, qué no y en qué orden, y medimos el impacto de cada iteración.',
        depth: 'ROADMAP · PRIORIDAD · IMPACTO',
      },
      {
        index: '03',
        title: 'Visionario',
        body: 'Aportamos perspectiva de hacia dónde van el software, la automatización y la IA, y te ayudamos a anticiparte: qué procesos automatizar después, qué datos capturar hoy para explotar mañana, qué capacidades de IA tienen sentido para tu sector y cuáles son ruido.',
        depth: 'ANTICIPACIÓN · DATOS · IA',
      },
    ],
  },

  commitments: {
    sectionEyebrow: 'D / COMPROMISOS DE CADA ALIANZA',
    heading: 'Compromisos de cada alianza',
    // Exactly 5 commitments. Enforced in tests. items[0].tag MUST be "A MEDIDA". (SPEC-P2.4 FR-5.1)
    // Commitment 01 uses corrected §0 framing — no code/IP-ownership claim.
    items: [
      {
        n: '01',
        tag: 'A MEDIDA',
        body: 'Soluciones ajustadas a las necesidades y oportunidades reales de tu negocio — no plantillas.',
      },
      {
        n: '02',
        tag: 'ESPECIFICACIÓN',
        body: 'Nada se construye sin especificación previa: requisitos, casos límite y criterios de aceptación.',
      },
      {
        n: '03',
        tag: 'CALIDAD',
        body: 'Se demuestra con pruebas automatizadas y estabilidad en producción, no con promesas.',
      },
      {
        n: '04',
        tag: 'SOPORTE',
        body: 'Continuo, trazable y transparente en su facturación.',
      },
      {
        n: '05',
        tag: 'MEDIDA',
        body: 'Un único indicador final: el crecimiento y la eficiencia de tu negocio.',
      },
    ],
  },

  /**
   * Q&A block — SEO-01 §5.7. Exactly 5 items.
   *
   * CONTENT-11: contractual ownership and licence terms are never published
   * here. Item 2 is an onboarding question ("¿Cómo empieza una alianza?");
   * item 3 answers continuity in operational terms only.
   */
  faq: {
    sectionEyebrow: 'E / PREGUNTAS FRECUENTES',
    sectionIndex: 'E',
    heading: 'Preguntas frecuentes',
    items: [
      {
        question: '¿Por qué solo cinco clientes?',
        answer:
          'Porque la dedicación no se puede repartir indefinidamente. Con cinco alianzas activas podemos conocer cada negocio a fondo, responder rápido y acompañar en el plano técnico, el estratégico y el visionario. No es una limitación de capacidad: es el modelo de negocio, y es lo que separa a un socio de un proveedor.',
      },
      {
        question: '¿Cómo empieza una alianza?',
        answer:
          'Con una conversación sobre tu negocio, no sobre tecnología. Si vemos encaje, analizamos a fondo el proceso que más te frena y definimos un primer alcance acotado, con su especificación y su prototipo, antes de comprometer nada más grande. De ahí sale una propuesta concreta: qué se construye primero, en cuánto tiempo y con qué inversión.',
      },
      {
        question: '¿Qué pasa si dejamos de trabajar juntos?',
        answer:
          'Tu plataforma sigue operativa y tus datos se te devuelven íntegros, en formatos estándar y sin retenciones. Las condiciones de continuidad se acuerdan por escrito al principio de la alianza, no cuando llega el momento.',
      },
      {
        question: '¿Podríais trabajar con mi competencia?',
        answer:
          'No con el mismo sistema. Cada alianza incluye exclusividad sectorial: no reutilizamos tu plataforma ni sus mejoras para competidores tuyos en tu sector.',
      },
      {
        question: '¿Qué incluye exactamente una alianza?',
        answer:
          'Diseño, construcción, despliegue y operación de tu plataforma; dirección externa de producto y tecnología para decidir qué construir y en qué orden; y perspectiva sobre qué automatizar después y qué datos empezar a capturar hoy. Todo con especificación previa, calidad verificable y facturación trazable del tiempo dedicado.',
      },
    ],
  },
} as const satisfies AllianceDictionary

export type AllianceContent = typeof allianceContent
