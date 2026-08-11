import { clients } from '@/content/es/clients'
import { sharedContent } from '@/content/es/shared'
import type { HomePageDictionary } from '@/content/types'

export const homeContent = {
  meta: {
    title: 'Escala Digital Ventures | Producto y tecnología',
    description:
      'Estudio de producto y tecnología que automatiza operaciones y construye plataformas digitales para empresas en crecimiento.',
  },

  header: sharedContent.header,

  /**
   * Section eyebrows, aria labels, and repeated UI strings.
   * All hardcoded copy in components must reference these keys.
   */
  labels: {
    hero: 'ESCALA DIGITAL VENTURES',
    problem: 'PUNTO DE PARTIDA',
    symptoms: 'Síntomas operativos',
    services: 'CAPACIDADES',
    framework: 'EL CICLO DE CRECIMIENTO',
    frameworkLead: 'DIEZ FASES · UN CICLO CONTINUO DE MEJORA',
    frameworkAria: 'Ciclo de crecimiento de diez fases',
    /** Prefix used in the phase eyebrow: "FASE 01 / 10" */
    phasePrefix: 'FASE',
    proof: 'EVIDENCIA',
    proofAttribution: 'EVIDENCIA VERIFICADA EN CLIENTES REALES',
    alliance: 'MODELO DE ALIANZA',
    allianceLegend: 'CADA ALIANZA: PLANO TÉCNICO · ESTRATÉGICO · VISIONARIO',
  },

  /** Accessible labels for SVG diagrams (FIG captions). */
  diagrams: {
    hero: 'De procesos manuales a valor real y medible mediante un sistema a medida',
    problem: 'Flujo operativo fragmentado entre hojas, correos y documentos',
    proof: 'Evolución verificada de la operación',
    alliance: 'Cinco alianzas, dedicación completa. Dos ocupadas.',
  },

  /**
   * Hero narrative diagram (FIG.01) — SPEC-POLISH-01.
   * All copy comes from here; no hardcoded strings in the component.
   * Zone numbers and FIG number are not translated (kit grammar §3.3).
   */
  heroFigure: {
    /** Zone labels (left → right) */
    zones: ['01 · PROCESOS MANUALES', '02 · SISTEMA A MEDIDA', '03 · VALOR REAL Y MEDIBLE'],
    /** Five named input process boxes */
    inputs: ['CORREOS', 'HOJAS DE CÁLCULO', 'NOTAS', 'CATÁLOGO', 'HISTORIALES'],
    /** System zone title and inner reordering label */
    system: { title: '02 · SISTEMA A MEDIDA', innerLabel: 'ORDENA · MODELA' },
    /** Two output value boxes: label (ambre) + sub (body) */
    outputs: [
      { label: 'INSIGHT', sub: 'Decisiones y datos' },
      { label: 'OPTIMIZACIÓN', sub: 'de procesos' },
    ],
    /** Figcaption */
    caption: 'FIG. 01 — DE MUCHOS PROCESOS MANUALES A VALOR REAL Y MEDIBLE',
  },

  hero: {
    eyebrow:
      'Escala Digital Ventures · Estudio de producto y tecnología · Mataró, Barcelona',
    title: 'Automatizamos tu negocio. Escalamos contigo.',
    description:
      'Convertimos procesos manuales en plataformas propias que crecen contigo, con la disciplina del software empresarial global.',
    primaryCta: 'Hablemos de tu negocio',
    secondaryCta: 'Cómo trabajamos',
  },

  claims: sharedContent.claims,

  /**
   * Problem section (01 / PUNTO DE PARTIDA) — SPEC-POLISH-02.
   * body is a two-paragraph tuple; both paragraphs rendered separately.
   */
  problem: {
    title: 'Tu operativa llegó a su límite, no tus objetivos.',
    body: [
      'Has construido un negocio que funciona. Pero llega un punto en que la operativa —hojas de cálculo, correos, documentos sueltos, conocimiento en la cabeza de pocas personas— deja de acompañar el crecimiento: el volumen aumenta, los errores se multiplican y el negocio depende de que nadie falte.',
      'Escala entra ahí: convierte ese corazón operativo en una plataforma propia sobre la que seguir creciendo.',
    ] as const,
    symptoms: [
      'volumen que crece',
      'errores que se multiplican',
      'facturación que se retrasa',
      'dependencia de personas',
    ],
  },

  /**
   * Problem flows diagram (FIG.02) — SPEC-POLISH-02.
   * All copy comes from here; no hardcoded strings in the component.
   * Piece labels and core lines are not translated (kit grammar §3.3 — mono labels).
   */
  problemFigure: {
    /** Five named piece boxes arranged around the core */
    pieces: [
      'HOJAS DE CÁLCULO',
      'CORREOS',
      'NOTAS',
      'CATÁLOGO',
      'HISTORIAL',
    ] as const,
    /** Two-line core label (PROCESOS / MANUALES) */
    core: ['PROCESOS', 'MANUALES'] as const,
    /** Figcaption */
    caption: 'FIG. 02 — UNA OPERATIVA QUE DEPENDE DE PROCESOS MANUALES: LOS FLUJOS NO SE COMPLETAN',
    /** Small note line below the caption */
    note: 'CADA PIEZA INTENTA CONECTARSE · EL FLUJO SE CORTA EN EL PASO MANUAL',
  },

  services: {
    title: 'Qué hacemos',
    action: 'Ver todos los servicios',
    items: [
      {
        title: 'Transformación digital y automatización de procesos',
        text: 'Procesos críticos que viven en hojas de cálculo y en la cabeza de las personas.',
      },
      {
        title: 'Desarrollo de plataformas',
        text: 'El software genérico no encaja con tu realidad.',
      },
      {
        title: 'Automatización e IA aplicada',
        text: 'Todo el mundo habla de IA; pocos la aplican con retorno.',
      },
      {
        title: 'CTO y Product Leadership fraccional',
        text: 'Necesitas criterio directivo de producto y tecnología, sin contratar un perfil a tiempo completo.',
      },
      {
        title: 'Operación, soporte y evolución continua',
        text: 'El software que no evoluciona, muere.',
      },
    ],
  },

  framework: {
    title: 'Un método propio: el Escala Growth Framework',
    description:
      'Diez fases que conectan negocio, personas, procesos y tecnología en un ciclo continuo de mejora.',
    action: 'Cómo trabajamos',
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
   * Proof section (04 / EVIDENCIA) — SPEC-POLISH-03.
   * Real Magupell data. Readouts structured as an array for future multi-case
   * generalization (BioZero etc.) — adding a new case is a data change only.
   * kind: 'number' = Archivo display figure; 'phrase' = slightly smaller phrase.
   * plotVariant: decorative micro-plot identifier (aria-hidden in component).
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
    cases: clients,
  },

  /**
   * Proof timeline diagram (FIG.04) — SPEC-POLISH-03.
   * Real Magupell dates. All copy from here; no hardcoded strings in the component.
   * timeline is a 5-tuple (chronological order).
   */
  proofFigure: {
    timeline: [
      { date: 'DIC 2025', deliverable: 'Requerimientos' },
      { date: 'ENE 2026', deliverable: 'Prototipo' },
      { date: 'ABR 2026', deliverable: 'Desarrollo' },
      { date: 'MAY–JUN 2026', deliverable: 'Preproducción' },
      { date: 'JUL 2026', deliverable: 'Producción' },
    ] as const,
    timelineCaption: 'FIG. 04 — DE LOS REQUERIMIENTOS A PRODUCCIÓN EN 7 MESES, CON FECHAS VERIFICADAS',
    timelineAria: 'Cronología verificada de Magupell: de requerimientos en diciembre de 2025 a producción en julio de 2026',
  },

  alliance: {
    title: 'Cinco alianzas. Toda nuestra dedicación.',
    body: 'Limitamos deliberadamente el número de clientes activos para garantizar dedicación, cercanía y acompañamiento continuo. No es una limitación: es el modelo.',
    action: 'Conoce el modelo de alianza',
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

  footer: sharedContent.footer,
} as const satisfies HomePageDictionary

export type HomeContent = typeof homeContent
