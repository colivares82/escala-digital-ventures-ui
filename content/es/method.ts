/**
 * Cómo trabajamos — ES content dictionary (full Phase 2.1).
 * Copy authority: Libro v2.1 Ch. 7, Ch. 8, Ch. 9 · Spec v1.1 §5.3 · SPEC-P2.1.
 * Spec: SPEC-P2.1 FR-8.1
 *
 * NOTE: Phases NOT stored here — shared from homeContent.framework.phases (FR-3.2).
 */
import type { MethodDictionary } from '@/content/types'

export const methodContent = {
  // SEO-01 §3.1 — primary term: "cómo se desarrolla un software a medida".
  meta: {
    title: 'Cómo trabajamos: del proceso manual a la plataforma',
    description:
      'Método dirigido por especificaciones y asistido por IA con criterio sénior: apruebas un prototipo antes de construir y la calidad se demuestra con pruebas.',
  },

  pageHeader: {
    eyebrow: 'A / CÓMO TRABAJAMOS',
    title: 'Cómo trabajamos',
    lead: 'Un marco estratégico propio y una práctica de ejecución disciplinada. El objetivo nunca es entregar software: es aumentar la capacidad de crecimiento de tu negocio.',
  },

  // SPEC-POLISH-06 §1: Escala Growth Framework moved to last content section (E), before FinalCTA.
  phaseCycle: {
    sectionEyebrow: 'EL CICLO DE CRECIMIENTO',
    sectionIndex: 'E',
    title: 'Un método propio: el Escala Growth Framework',
    lead: 'DIEZ FASES · UN CICLO CONTINUO DE MEJORA',
    ariaLabel: 'Ciclo de crecimiento de diez fases',
    phasePrefix: 'FASE',
  },

  // SPEC-POLISH-06 addendum: swapped B/C order at Carlos's request post-implementation —
  // "El flujo de ejecución" now precedes "La ejecución, en el día a día".
  executionPractices: {
    sectionEyebrow: 'LA EJECUCIÓN, EN EL DÍA A DÍA',
    sectionIndex: 'C',
    title: 'La ejecución, en el día a día',
    lead: 'El framework estratégico se materializa en una práctica de ejecución concreta y disciplinada — la segunda ventaja competitiva de Escala.',
    practices: [
      {
        index: '01',
        title: 'Dirigido por especificaciones',
        body: 'Antes de escribir una línea de código, cada funcionalidad se documenta en una especificación formal: contexto de negocio, requisitos numerados, modelo de datos, casos límite y criterios de aceptación. Cuando hay interfaz, la especificación incluye un prototipo visual navegable que apruebas antes de construir.',
        tie: '↳ MATERIALIZA LA FASE · VALIDATE',
      },
      {
        index: '02',
        title: 'Desarrollo asistido por IA, dirigido por criterio senior',
        body: 'La biblioteca interna de estándares, reglas y habilidades de agentes de Escala —extraída y refinada de sus propios proyectos en producción— gobierna un flujo de ingeniería asistida por IA que garantiza consistencia entre proyectos y una velocidad de entrega excepcional, siempre bajo revisión y dirección experta.',
        tie: '↳ MATERIALIZA LAS FASES · DESIGN · BUILD',
      },
      {
        index: '03',
        title: 'Calidad verificable',
        body: 'Cobertura de pruebas automatizadas como norma, integración y despliegue continuos, entornos separados de desarrollo y producción, y revisiones de seguridad. La calidad se demuestra con hechos: estabilidad en producción, no promesas.',
        tie: '↳ MATERIALIZA LA FASE · BUILD',
      },
      {
        index: '04',
        title: 'Iteración basada en uso real',
        body: 'Tras el lanzamiento, el roadmap se alimenta del feedback directo de los usuarios: se recoge, se prioriza, se especifica y se entrega en ciclos cortos. El producto mejora todos los meses porque se construye sobre lo que el negocio realmente necesita, no sobre suposiciones.',
        tie: '↳ MATERIALIZA LAS FASES · MEASURE · EVOLVE',
      },
      {
        index: '05',
        title: 'Acompañamiento trazable',
        body: 'Cada alianza en producción incluye una bolsa mensual de horas de soporte y evolución, con trazabilidad completa del trabajo realizado. El producto nunca se queda quieto y el cliente nunca se queda solo.',
        tie: '↳ MATERIALIZA EL COMPROMISO · SOPORTE CONTINUO',
      },
    ],
  },

  // SPEC-POLISH-06 §2 — closed execution cycle, FIG. 06.
  pipeline: {
    sectionEyebrow: 'EL FLUJO DE EJECUCIÓN',
    sectionIndex: 'B',
    sectionTitle: 'De la especificación al feedback',
    lead: 'Cada incremento recorre el mismo camino, y el camino no termina: lo que aprenden tus usuarios entra en la siguiente especificación.',
    stations: [
      { label: 'ESPECIFICACIÓN', sub: 'REQUISITOS + PROTOTIPO', actor: 'escala' },
      { label: 'APROBACIÓN', sub: 'EL CLIENTE VALIDA ANTES', actor: 'client' },
      { label: 'CONSTRUCCIÓN', sub: 'PRUEBAS · ENTORNOS', actor: 'escala' },
      { label: 'PRODUCCIÓN', sub: 'DESPLIEGUE CONTINUO', actor: 'escala' },
      { label: 'USO REAL', sub: 'TUS USUARIOS, CADA DÍA', actor: 'client' },
    ],
    centre: ['CICLOS CORTOS', 'MEJORA CONTINUA'],
    returnLabel: 'EL FEEDBACK SE PRIORIZA Y ENTRA EN EL SIGUIENTE CICLO',
    caption: 'FIG. 06 — EL CICLO DE EJECUCIÓN: DE LA ESPECIFICACIÓN AL USO REAL, Y VUELTA A EMPEZAR',
    ariaLabel: 'Ciclo cerrado de ejecución con cinco estaciones: especificación, aprobación del cliente, construcción, producción y uso real, con retorno del feedback a la especificación.',
  },

  // SPEC-POLISH-06 §3 — "how we build" layered system, FIG. 12.
  aiBuild: {
    sectionEyebrow: 'CÓMO CONSTRUIMOS',
    sectionIndex: 'D',
    title: 'Ingeniería con criterio, acelerada por agentes',
    body: 'No construimos más rápido por usar IA: construimos más rápido porque cada decisión ocurre dentro de un sistema. Una biblioteca propia de estándares, reglas y patrones probados en producción gobierna el trabajo; los agentes ejecutan en paralelo dentro de ese marco; y nada llega a producción sin pasar por criterio senior y calidad verificable. La velocidad de un equipo completo, con la coherencia de una sola mente.',
    figure: {
      frame: 'BIBLIOTECA DE ESTÁNDARES, REGLAS Y PATRONES PROBADOS EN PRODUCCIÓN',
      entry: 'ESPECIFICACIÓN',
      entrySub: 'APROBADA',
      lanePrefix: 'AGENTE',
      lanes: ['IMPLEMENTACIÓN', 'PRUEBAS', 'DOCUMENTACIÓN'],
      gate1: 'CRITERIO SENIOR',
      gate2: 'CALIDAD VERIFICABLE',
      gate2Sub: 'PRUEBAS · CI/CD · ENTORNOS',
      exit: 'PRODUCCIÓN',
      exitSub: 'MODULAR · ESCALABLE',
      returnLabel: 'CADA PROYECTO EN PRODUCCIÓN REFINA LOS PATRONES QUE GOBIERNAN EL SIGUIENTE',
      caption: 'FIG. 12 — EL SISTEMA QUE GOBIERNA CÓMO CONSTRUIMOS',
      ariaLabel: 'La especificación aprobada entra en una biblioteca de estándares que gobierna el trabajo, se ejecuta en tres carriles paralelos de agentes, atraviesa las puertas de criterio senior y calidad verificable, sale a producción y devuelve patrones refinados a la biblioteca.',
    },
    legend: [
      { label: 'GOBIERNO', text: 'Una biblioteca propia de estándares, reglas y patrones probados en producción.' },
      { label: 'EJECUCIÓN', text: 'Agentes de IA trabajando en paralelo, siempre dentro de ese marco.' },
      { label: 'CONTROL', text: 'Criterio senior y calidad verificable antes de que nada salga a producción.' },
      { label: 'CAPITALIZACIÓN', text: 'Cada proyecto real refina el sistema que gobierna el siguiente.' },
    ],
  },

  /**
   * Q&A block — SEO-01 §5.6. Figures trace to §0.4: 1.803 automated tests
   * (ES/CA formatting) and 3 environments.
   */
  faq: {
    sectionEyebrow: 'F / PREGUNTAS FRECUENTES',
    sectionIndex: 'F',
    heading: 'Preguntas frecuentes',
    items: [
      {
        // CONTENT-11 C7 — the client approves the PROTOTYPE, not the spec.
        question:
          '¿Qué es una especificación y qué veo yo antes de construir?',
        answer:
          'Es el documento que describe qué se va a construir antes de escribir código: contexto de negocio, requisitos numerados, casos límite y criterios de aceptación. Cuando hay interfaz, incluye un prototipo visual navegable que apruebas antes de que se construya. Así los malentendidos se resuelven cuando cuestan una conversación, no cuando cuestan un desarrollo.',
      },
      {
        question: '¿Usáis IA para desarrollar? ¿Eso afecta a la calidad?',
        answer:
          'Sí la usamos, gobernada por una biblioteca interna de estándares y patrones probados en producción, y siempre bajo revisión sénior. El efecto es velocidad de un equipo completo con la coherencia de una sola mente. Lo que no cambia es el criterio: decidir qué se construye y verificar que está bien construido sigue siendo humano.',
      },
      {
        question: '¿Cómo demostráis que lo entregado funciona?',
        answer:
          'Con hechos verificables, no con promesas: cobertura de pruebas automatizadas, entornos separados y estabilidad en producción. La plataforma de Magupell se sostiene sobre 1.803 pruebas automatizadas y tres entornos con despliegue protegido.',
      },
      {
        question: '¿Qué pasa después de la puesta en producción?',
        answer:
          'Ahí empieza la parte larga de la relación. Cada alianza en producción incluye soporte y evolución continuos con trazabilidad completa del trabajo: se recoge el feedback real de los usuarios, se prioriza, se especifica y entra en producción en ciclos cortos. El producto mejora cada mes.',
      },
      {
        question: '¿Cuánto tiempo tiene que dedicar mi equipo?',
        answer:
          'Menos del que se teme, pero no cero. Necesitamos acceso a quien conoce el proceso de verdad, sobre todo en las primeras semanas y en cada revisión de especificación. A partir de ahí, la carga se concentra en decidir y validar, no en gestionar.',
      },
    ],
  },
} as const satisfies MethodDictionary

export type MethodContent = typeof methodContent
