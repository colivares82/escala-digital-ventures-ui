/**
 * Home page content — CA locale.
 * SPEC-P5 FR-1.1 · Glossary: docs/i18n-glossary.md
 * Pending Carlos register review (AC-9).
 */
import { sharedContent } from '@/content/ca/shared'
import { clients } from '@/content/es/clients'
import type { HomePageDictionary } from '@/content/types'

export const homeContent = {
  meta: {
    title: 'Escala Digital Ventures | Producte i tecnologia',
    description:
      'Estudi de producte i tecnologia que automatitza operacions i construeix plataformes digitals per a empreses en creixement.',
  },

  header: sharedContent.header,

  labels: {
    hero: 'ESCALA DIGITAL VENTURES',
    problem: 'PUNT DE PARTIDA',
    symptoms: 'Símptomes operatius',
    services: 'CAPACITATS',
    framework: 'EL CICLE DE CREIXEMENT',
    frameworkLead: 'DEU FASES · UN CICLE CONTINU DE MILLORA',
    frameworkAria: 'Cicle de creixement de deu fases',
    phasePrefix: 'FASE',
    proof: 'EVIDÈNCIA',
    proofAttribution: 'EVIDÈNCIA VERIFICADA EN CLIENTS REALS',
    alliance: "MODEL D'ALIANÇA",
    allianceLegend: "CADA ALIANÇA: PLA TÈCNIC · ESTRATÈGIC · VISIONARI",
  },

  diagrams: {
    hero: 'De processos manuals a valor real i mesurable mitjançant un sistema a mida',
    problem: 'Flux operatiu fragmentat entre fulls, correus i documents',
    proof: 'Evolució verificada de la operació',
    alliance: 'Cinc aliances, dedicació completa. Dues ocupades.',
  },

  /**
   * Hero narrative diagram (FIG.01) — SPEC-POLISH-01.
   * All copy comes from here; no hardcoded strings in the component.
   * Zone numbers and FIG number are not translated (kit grammar §3.3).
   */
  heroFigure: {
    zones: ['01 · PROCESSOS MANUALS', '02 · SISTEMA A MIDA', '03 · VALOR REAL I MESURABLE'],
    inputs: ['CORREUS', 'FULLS DE CÀLCUL', 'NOTES', 'CATÀLEG', 'HISTORIALS'],
    system: { title: '02 · SISTEMA A MIDA', innerLabel: 'ORDENA · MODELA' },
    outputs: [
      { label: 'INSIGHT', sub: 'Decisions i dades' },
      { label: 'OPTIMITZACIÓ', sub: 'de processos' },
    ],
    caption: 'FIG. 01 — DE MOLTS PROCESSOS MANUALS A VALOR REAL I MESURABLE',
  },

  hero: {
    eyebrow:
      'Escala Digital Ventures · Estudi de producte i tecnologia · Mataró, Barcelona',
    title: 'Automatitzem el teu negoci. Escalem amb tu.',
    description:
      'Convertim processos manuals en plataformes pròpies que creixen amb tu, amb la disciplina del programari empresarial global.',
    primaryCta: 'Parlem del teu negoci',
    secondaryCta: 'Com treballem',
  },

  claims: sharedContent.claims,

  /**
   * Problem section (01 / PUNT DE PARTIDA) — SPEC-POLISH-02.
   * body is a two-paragraph tuple; both paragraphs rendered separately.
   * Pending Carlos register review (AC-9).
   */
  problem: {
    title: 'La teva operativa ha arribat al seu límit, no els teus objectius.',
    body: [
      "Has construït un negoci que funciona. Però arriba un punt en què l'operativa —fulls de càlcul, correus, documents solts, coneixement al cap de poques persones— deixa d'acompanyar el creixement: el volum augmenta, els errors es multipliquen i el negoci depèn que ningú falti.",
      "Escala entra aquí: converteix aquell cor operatiu en una plataforma pròpia sobre la qual continuar creixent.",
    ] as const,
    symptoms: [
      'volum que creix',
      'errors que es multipliquen',
      'facturació que es retarda',
      'dependència de persones',
    ],
  },

  /**
   * Problem flows diagram (FIG.02) — SPEC-POLISH-02.
   * All copy comes from here; no hardcoded strings in the component.
   * Piece labels and core lines are not translated (kit grammar §3.3 — mono labels).
   * Pending Carlos register review (AC-9).
   */
  problemFigure: {
    pieces: [
      'HOJAS DE CÁLCULO',
      'CORREOS',
      'NOTAS',
      'CATÁLOGO',
      'HISTORIAL',
    ] as const,
    core: ['PROCESOS', 'MANUALES'] as const,
    caption: "FIG. 02 — UNA OPERATIVA QUE DEPÈN DE PROCESSOS MANUALS: ELS FLUXOS NO ES COMPLETEN",
    note: "CADA PEÇA INTENTA CONNECTAR-SE · EL FLUX ES TALLA AL PAS MANUAL",
  },

  services: {
    title: 'Què fem',
    action: 'Veure tots els serveis',
    items: [
      {
        title: 'Transformació digital i automatització de processos',
        text: 'Processos crítics que viuen en fulls de càlcul i al cap de les persones.',
      },
      {
        title: 'Desenvolupament de plataformes',
        text: 'El programari genèric no encaixa amb la teva realitat.',
      },
      {
        title: 'Automatització i IA aplicada',
        text: 'Tothom parla de IA; pocs la apliquen amb retorn.',
      },
      {
        title: 'CTO i Product Leadership fraccional',
        text: 'Necessites criteri directiu de producte i tecnologia, sense contractar un perfil a temps complet.',
      },
      {
        title: 'Operació, suport i evolució contínua',
        text: 'El programari que no evoluciona, mor.',
      },
    ],
  },

  framework: {
    title: 'Un mètode propi: el Escala Growth Framework',
    description:
      'Deu fases que connecten negoci, persones, processos i tecnologia en un cicle continu de millora.',
    action: 'Com treballem',
    phases: [
      {
        name: 'Discover',
        description:
          "Comprendre profundament el negoci, els seus objectius, limitacions, oportunitats i processos. Escoltar abans de proposar.",
      },
      {
        name: 'Understand',
        description:
          "Modelar com funciona realment l'organització, identificar colls d'ampolla, dependències i fonts de fricció.",
      },
      {
        name: 'Simplify',
        description:
          "Eliminar complexitat innecessària abans d'introduir tecnologia. Un mal procés automatitzat continua sent un mal procés.",
      },
      {
        name: 'Design',
        description:
          "Dissenyar l'experiència, l'arquitectura i el model operatiu pensant en escalabilitat, mantenibilitat i adopció.",
      },
      {
        name: 'Validate',
        description:
          "Validar hipòtesis ràpidament mitjançant prototips navegables, proves amb usuaris i lliuraments incrementals per reduir riscos abans d'invertir en construcció.",
      },
      {
        name: 'Build',
        description:
          "Construir plataformes amb estàndards elevats d'enginyeria, automatització, seguretat i qualitat.",
      },
      {
        name: 'Automate',
        description:
          "Automatitzar processos complets per reduir errors, augmentar productivitat i alliberar temps per a activitats de major valor.",
      },
      {
        name: 'Scale',
        description:
          "Preparar la plataforma i l'organització per créixer sense necessitat de redissenys continus.",
      },
      {
        name: 'Measure',
        description:
          "Definir indicadors de negoci i mètriques tècniques que permetin mesurar l'impacte real de cada iniciativa.",
      },
      {
        name: 'Evolve',
        description:
          "Entendre que cap producte està acabat. La millora contínua forma part del model de col·laboració d'Escala.",
      },
    ],
  },

  /**
   * Proof section (04 / EVIDÈNCIA) — SPEC-POLISH-03.
   * Real Magupell data. Readouts structured as an array for future multi-case
   * generalization — adding a new case is a data change only.
   * kind: 'number' = Archivo display figure; 'phrase' = slightly smaller phrase.
   * plotVariant: decorative micro-plot identifier (aria-hidden in component).
   * Pending Carlos register review (AC-9).
   */
  proof: {
    title: 'Fets, no promeses.',
    readouts: [
      {
        label: 'REQUISITS',
        value: '167 → 216',
        kind: 'number',
        caption: 'Requisits funcionals refinats amb iteració i prototip.',
        plotVariant: 'growth',
      },
      {
        label: 'PROVES',
        value: '1.803',
        kind: 'number',
        caption: 'Proves automatitzades: 1.042 backend + 761 frontend. Estabilitat garantida en cada canvi.',
        plotVariant: 'steps',
      },
      {
        label: 'ENTORNS',
        value: '3 entorns',
        kind: 'number',
        caption: 'Local, desenvolupament i producció, amb pipelines protegides.',
        plotVariant: 'bars',
      },
      {
        label: 'TEMPS A PRODUCCIÓ',
        value: '7 mesos',
        kind: 'number',
        caption: 'Dels primers requisits a producció.',
        plotVariant: 'stair',
      },
      {
        label: 'IMPACTE',
        value: 'Va substituir el manual.',
        kind: 'phrase',
        caption: "El sistema orquestra l'operació i dona insights de dades. En el seu primer mes, ja és una realitat per a tots els usuaris.",
        plotVariant: 'impact',
      },
      {
        label: 'A MIDA',
        value: 'A mida de cada rol.',
        kind: 'phrase',
        caption: "Admin, client, inspector i proveïdor: cada funció amb el que necessita, amb control i auditoria completa.",
        plotVariant: 'roles',
      },
    ] as const,
    cases: clients,
  },

  /**
   * Proof timeline diagram (FIG.04) — SPEC-POLISH-03.
   * Real Magupell dates. All copy from here; no hardcoded strings in the component.
   * timeline is a 5-tuple (chronological order).
   * Pending Carlos register review (AC-9).
   */
  proofFigure: {
    timeline: [
      { date: 'DES 2025', deliverable: 'Requisits' },
      { date: 'GEN 2026', deliverable: 'Prototip' },
      { date: 'ABR 2026', deliverable: 'Desenvolupament' },
      { date: 'MAI–JUN 2026', deliverable: 'Preproducció' },
      { date: 'JUL 2026', deliverable: 'Producció' },
    ] as const,
    timelineCaption: 'FIG. 04 — DELS REQUISITS A PRODUCCIÓ EN 7 MESOS, AMB DATES VERIFICADES',
    timelineAria: 'Cronologia verificada de Magupell: dels requisits al desembre de 2025 a producció al juliol de 2026',
  },

  alliance: {
    title: 'Cinc aliances. Tota la nostra dedicació.',
    body: "Limitem deliberadament el nombre de clients actius per garantir dedicació, proximitat i acompanyament continu. No és una limitació: és el model.",
    action: "Coneix el model d'aliança",
  },

  /**
   * Alliance constellation figure (FIG.05) — SPEC-POLISH-04.
   * Seats as a data array: future active alliance = data-only change.
   * All copy from here; no hardcoded strings in the component.
   * Brand spelling: "Magupell", "BioZero".
   * Pending Carlos register review (AC-9).
   */
  allianceFigure: {
    seats: [
      { name: 'Magupell',   state: 'occupied' },
      { name: 'BioZero',    state: 'occupied' },
      { name: 'DISPONIBLE', state: 'free' },
      { name: 'DISPONIBLE', state: 'free' },
      { name: 'DISPONIBLE', state: 'free' },
    ],
    caption: 'FIG. 05 — CINC PLACES. DUES ALIANCES ACTIVES. DEDICACIÓ COMPLETA.',
    subCaption: "CADA ALIANÇA: ACOMPANYAMENT TÈCNIC · ESTRATÈGIC · VISIONARI",
    coreSubLabel: '2 ALIANCES ACTIVES · 3 DISPONIBLES',
    figAria: "Constel·lació d'aliances: Escala al centre, dues aliances actives (Magupell, BioZero) i tres places disponibles",
  },

  footer: sharedContent.footer,
} as const satisfies HomePageDictionary

export type HomeContent = typeof homeContent
