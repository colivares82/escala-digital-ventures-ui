/**
 * Home page content — CA locale.
 * SPEC-P5 FR-1.1 · Glossary: docs/i18n-glossary.md
 * Pending Carlos register review (AC-9).
 */
import { sharedContent } from '@/content/ca/shared'
import { homeLandingContent } from '@/content/ca/home-landing'
import type { HomePageDictionary } from '@/content/types'

export const homeContent = {
  // SEO-01 §3.3 — primary term: "automatització de processos".
  meta: {
    title: 'Automatització de processos i programari a mida | Escala',
    description:
      'Convertim els processos manuals de la teva empresa en una plataforma pròpia a mida. Soci tecnològic per a pimes. Cinc aliances, tota la dedicació.',
  },

  header: sharedContent.header,

  claims: sharedContent.claims,

  framework: {
    // Consumed by /como-trabajamos (components/pages/method.tsx).
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
   * Magupell readouts (SPEC-POLISH-03). Consumed by home 04 Evidencia
   * (HOME-V2: title = H2; DAT.01/02/04/05 rendered) and /styleguide.
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

  /** HOME-V2 — visible copy of home sections 00–08 (see content/ca/home-landing.ts). */
  landing: homeLandingContent,

  footer: sharedContent.footer,
} as const satisfies HomePageDictionary

export type HomeContent = typeof homeContent
