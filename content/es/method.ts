/**
 * Cómo trabajamos — ES content dictionary (full Phase 2.1).
 * Copy authority: Libro v2.1 Ch. 7, Ch. 8, Ch. 9 · Spec v1.1 §5.3 · SPEC-P2.1.
 * Spec: SPEC-P2.1 FR-8.1
 *
 * NOTE: Phases NOT stored here — shared from homeContent.framework.phases (FR-3.2).
 */
import type { MethodDictionary } from '@/content/types'

export const methodContent = {
  meta: {
    title: 'Cómo trabajamos | Escala Digital Ventures',
    description:
      'El Escala Growth Framework: diez fases que conectan negocio, personas, procesos y tecnología.',
  },

  pageHeader: {
    eyebrow: 'A / CÓMO TRABAJAMOS',
    title: 'Cómo trabajamos',
    lead: 'Un marco estratégico propio y una práctica de ejecución disciplinada. El objetivo nunca es entregar software: es aumentar la capacidad de crecimiento de tu negocio.',
  },

  phaseCycle: {
    sectionEyebrow: 'EL CICLO DE CRECIMIENTO',
    sectionIndex: 'B',
    title: 'Un método propio: el Escala Growth Framework',
    lead: 'DIEZ FASES · UN CICLO CONTINUO DE MEJORA',
    ariaLabel: 'Ciclo de crecimiento de diez fases',
    phasePrefix: 'FASE',
  },

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

  pipeline: {
    sectionEyebrow: 'EL FLUJO DE EJECUCIÓN',
    sectionIndex: 'D',
    sectionTitle: 'De la especificación al feedback',
    nodes: [
      { label: 'ESPECIFICACIÓN' },
      { label: 'PROTOTIPO' },
      { label: 'CONSTRUCCIÓN' },
      { label: 'CALIDAD' },
      { label: 'PRODUCCIÓN' },
      { label: 'FEEDBACK' },
    ],
    caption: 'FIG. 06 — DE LA ESPECIFICACIÓN AL FEEDBACK EN CICLOS CORTOS',
    legend: 'CICLO CONTINUO · EL FEEDBACK REALIMENTA LA SIGUIENTE ESPECIFICACIÓN',
    ariaLabel: 'Diagrama del flujo de ejecución: especificación, prototipo, construcción, calidad, producción y feedback en ciclo continuo',
    returnArcLabel: 'RETORNO AL ORIGEN',
  },

  aiBuild: {
    sectionEyebrow: 'CÓMO CONSTRUIMOS',
    sectionIndex: 'E',
    title: 'La IA también en cómo construimos',
    // Verbatim from Libro v2.1 Ch. 7 "IA también en cómo se construye"
    lead: 'Escala no solo integra IA en los productos de sus clientes: la utiliza en su propio proceso de creación. Un flujo de trabajo propio de ingeniería asistida por agentes de IA, gobernado por una biblioteca interna de estándares, reglas y patrones probados en producción, multiplica la velocidad de ejecución, mientras que el criterio senior de producto e ingeniería garantiza que lo que se construye es lo correcto y que se construye bien.',
    // Only claims supported by Libro Ch. 7 / Ch. 9 (FR-6.3 guardrail — no invented metrics, no vendor names)
    points: [
      'BIBLIOTECA INTERNA DE ESTÁNDARES, REGLAS Y PATRONES PROBADOS EN PRODUCCIÓN',
      'FLUJO DE INGENIERÍA ASISTIDA POR AGENTES DE IA',
      'CRITERIO SENIOR DE PRODUCTO E INGENIERÍA EN CADA DECISIÓN',
      'CONSISTENCIA ENTRE PROYECTOS · VELOCIDAD DE UN EQUIPO COMPLETO',
    ],
    // Small inline diagram labels: left → right (FR-6.2)
    diagram: [
      'BIBLIOTECA DE REGLAS',
      'AGENTE',
      'CRITERIO SENIOR',
      'PRODUCCIÓN',
    ],
  },
} as const satisfies MethodDictionary

export type MethodContent = typeof methodContent
