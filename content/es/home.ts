import { sharedContent } from '@/content/es/shared'
import { homeLandingContent } from '@/content/es/home-landing'
import type { HomePageDictionary } from '@/content/types'

export const homeContent = {
  // SEO-01 §3.1 — primary term: "automatización de procesos para empresas".
  meta: {
    title: 'Automatización de procesos y software a medida | Escala',
    description:
      'Convertimos los procesos manuales de tu empresa en una plataforma propia a medida. Socio tecnológico para pymes en España. Solo cinco alianzas activas.',
  },

  header: sharedContent.header,

  claims: sharedContent.claims,

  framework: {
    // Consumed by /como-trabajamos (components/pages/method.tsx).
    phases: [
      {
        name: 'Discover',
        description:
          'Comprender profundamente el negocio, sus objetivos, limitaciones, oportunidades y procesos. Escuchar antes de proponer.',
      },
      {
        name: 'Understand',
        description:
          'Modelar cómo funciona realmente la organización, identificar cuellos de botella, dependencias y fuentes de fricción.',
      },
      {
        name: 'Simplify',
        description:
          'Eliminar complejidad innecesaria antes de introducir tecnología. Un mal proceso automatizado sigue siendo un mal proceso.',
      },
      {
        name: 'Design',
        description:
          'Diseñar la experiencia, la arquitectura y el modelo operativo pensando en escalabilidad, mantenibilidad y adopción.',
      },
      {
        name: 'Validate',
        description:
          'Validar hipótesis rápidamente mediante prototipos navegables, pruebas con usuarios y entregas incrementales para reducir riesgos antes de invertir en construcción.',
      },
      {
        name: 'Build',
        description:
          'Construir plataformas con estándares elevados de ingeniería, automatización, seguridad y calidad.',
      },
      {
        name: 'Automate',
        description:
          'Automatizar procesos completos para reducir errores, aumentar productividad y liberar tiempo para actividades de mayor valor.',
      },
      {
        name: 'Scale',
        description:
          'Preparar la plataforma y la organización para crecer sin necesidad de rediseños continuos.',
      },
      {
        name: 'Measure',
        description:
          'Definir indicadores de negocio y métricas técnicas que permitan medir el impacto real de cada iniciativa.',
      },
      {
        name: 'Evolve',
        description:
          'Entender que ningún producto está terminado. La mejora continua forma parte del modelo de colaboración de Escala.',
      },
    ],
  },

  /**
   * Magupell readouts (SPEC-POLISH-03). Consumed by home 04 Evidencia
   * (HOME-V2: title = H2; DAT.01/02/04/05 rendered) and /styleguide.
   */
  proof: {
    title: 'Hechos, no promesas.',
    readouts: [
      {
        label: 'REQUISITOS',
        value: '167 → 216',
        kind: 'number',
        caption: 'Requisitos funcionales refinados con iteración y prototipo.',
        plotVariant: 'growth',
      },
      {
        label: 'PRUEBAS',
        value: '1.803',
        kind: 'number',
        caption: 'Pruebas automatizadas: 1.042 backend + 761 frontend. Estabilidad garantizada en cada cambio.',
        plotVariant: 'steps',
      },
      {
        label: 'ENTORNOS',
        value: '3 entornos',
        kind: 'number',
        caption: 'Local, desarrollo y producción, con pipelines protegidas.',
        plotVariant: 'bars',
      },
      {
        label: 'TIEMPO A PRODUCCIÓN',
        value: '7 meses',
        kind: 'number',
        caption: 'De los primeros requerimientos a producción.',
        plotVariant: 'stair',
      },
      {
        label: 'IMPACTO',
        value: 'Sustituyó lo manual.',
        kind: 'phrase',
        caption: 'El sistema orquesta la operación y da insights de datos. En su primer mes, ya es una realidad para todos los usuarios.',
        plotVariant: 'impact',
      },
      {
        label: 'A MEDIDA',
        value: 'A medida de cada rol.',
        kind: 'phrase',
        caption: 'Admin, cliente, inspector y proveedor: cada función con lo que necesita, con control y auditoría completa.',
        plotVariant: 'roles',
      },
    ] as const,
  },

  /**
   * Alliance constellation figure (FIG.05) — SPEC-POLISH-04.
   * Seats as a data array: future active alliance = data-only change.
   * All copy from here; no hardcoded strings in the component.
   * Brand spelling: "Magupell", "BioZero".
   */
  allianceFigure: {
    seats: [
      { name: 'Magupell',   state: 'occupied' },
      { name: 'BioZero',    state: 'occupied' },
      { name: 'DISPONIBLE', state: 'free' },
      { name: 'DISPONIBLE', state: 'free' },
      { name: 'DISPONIBLE', state: 'free' },
    ],
    caption: 'FIG. 05 — CINCO PLAZAS. DOS ALIANZAS ACTIVAS. DEDICACIÓN COMPLETA.',
    subCaption: 'CADA ALIANZA: ACOMPAÑAMIENTO TÉCNICO · ESTRATÉGICO · VISIONARIO',
    coreSubLabel: '2 ALIANZAS ACTIVAS · 3 DISPONIBLES',
    figAria: 'Constelación de alianzas: Escala en el centro, dos alianzas activas (Magupell, BioZero) y tres plazas disponibles',
  },

  /** HOME-V2 — visible copy of home sections 00–08 (see content/es/home-landing.ts). */
  landing: homeLandingContent,

  footer: sharedContent.footer,
} as const satisfies HomePageDictionary

export type HomeContent = typeof homeContent
