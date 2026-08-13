/**
 * Com treballem — CA locale.
 * SPEC-P5 FR-1.1 · Glossary: docs/i18n-glossary.md
 * Pending Carlos register review (AC-9).
 *
 * NOTE: Phases NOT stored here — shared from homeContent.framework.phases (FR-3.2).
 */
import type { MethodDictionary } from '@/content/types'

export const methodContent = {
  meta: {
    title: 'Com treballem | Escala Digital Ventures',
    description:
      "L'Escala Growth Framework: deu fases que connecten negoci, persones, processos i tecnologia.",
  },

  pageHeader: {
    eyebrow: 'A / COM TREBALLEM',
    title: 'Com treballem',
    lead: 'Un marc estratègic propi i una pràctica d\'execució disciplinada. L\'objectiu mai no és lliurar programari: és augmentar la capacitat de creixement del teu negoci.',
  },

  // SPEC-POLISH-06 §1: Escala Growth Framework moved to last content section (E), before FinalCTA.
  phaseCycle: {
    sectionEyebrow: 'EL CICLE DE CREIXEMENT',
    sectionIndex: 'E',
    title: "Un mètode propi: l'Escala Growth Framework",
    lead: 'DEU FASES · UN CICLE CONTINU DE MILLORA',
    ariaLabel: 'Cicle de creixement de deu fases',
    phasePrefix: 'FASE',
  },

  // SPEC-POLISH-06 addendum: swapped B/C order at Carlos's request post-implementation —
  // "El flux d'execució" now precedes "L'execució, dia a dia".
  executionPractices: {
    sectionEyebrow: "L'EXECUCIÓ, DIA A DIA",
    sectionIndex: 'C',
    title: "L'execució, dia a dia",
    lead: 'El marc estratègic es materialitza en una pràctica d\'execució concreta i disciplinada — el segon avantatge competitiu d\'Escala.',
    practices: [
      {
        index: '01',
        title: 'Dirigit per especificacions',
        body: 'Abans d\'escriure una línia de codi, cada funcionalitat es documenta en una especificació formal: context de negoci, requisits numerats, model de dades, casos límit i criteris d\'acceptació. Quan hi ha interfície, l\'especificació inclou un prototip visual navegable que aproves abans de construir.',
        tie: '↳ MATERIALITZA LA FASE · VALIDATE',
      },
      {
        index: '02',
        title: 'Desenvolupament assistit per IA, dirigit per criteri sènior',
        body: 'La biblioteca interna d\'estàndards, regles i habilitats d\'agents d\'Escala —extreta i refinada dels seus propis projectes en producció— governa un flux d\'enginyeria assistida per IA que garanteix consistència entre projectes i una velocitat de lliurament excepcional, sempre sota revisió i direcció experta.',
        tie: '↳ MATERIALITZA LES FASES · DESIGN · BUILD',
      },
      {
        index: '03',
        title: 'Qualitat verificable',
        body: 'Cobertura de proves automatitzades com a norma, integració i desplegament continus, entorns separats de desenvolupament i producció, i revisions de seguretat. La qualitat es demostra amb fets: estabilitat en producció, no promeses.',
        tie: '↳ MATERIALITZA LA FASE · BUILD',
      },
      {
        index: '04',
        title: 'Iteració basada en ús real',
        body: 'Després del llançament, el roadmap s\'alimenta del feedback directe dels usuaris: es recull, es prioritza, s\'especifica i es lliura en cicles curts. El producte millora cada mes perquè es construeix sobre el que el negoci realment necessita, no sobre suposicions.',
        tie: '↳ MATERIALITZA LES FASES · MEASURE · EVOLVE',
      },
      {
        index: '05',
        title: 'Acompanyament traçable',
        body: 'Cada aliança en producció inclou una bossa mensual d\'hores de suport i evolució, amb traçabilitat completa del treball realitzat. El producte mai no s\'atura i el client mai no es queda sol.',
        tie: '↳ MATERIALITZA EL COMPROMÍS · SUPORT CONTINU',
      },
    ],
  },

  // SPEC-POLISH-06 §2 — closed execution cycle, FIG. 06.
  pipeline: {
    sectionEyebrow: 'EL FLUX D\'EXECUCIÓ',
    sectionIndex: 'B',
    sectionTitle: 'De l\'especificació al feedback',
    lead: 'Cada increment recorre el mateix camí, i el camí no s\'acaba: el que aprenen els teus usuaris entra a la següent especificació.',
    stations: [
      { label: 'ESPECIFICACIÓ', sub: 'REQUISITS + PROTOTIP', actor: 'escala' },
      { label: 'APROVACIÓ', sub: 'EL CLIENT VALIDA ABANS', actor: 'client' },
      { label: 'CONSTRUCCIÓ', sub: 'PROVES · ENTORNS', actor: 'escala' },
      { label: 'PRODUCCIÓ', sub: 'DESPLEGAMENT CONTINU', actor: 'escala' },
      { label: 'ÚS REAL', sub: 'ELS TEUS USUARIS, CADA DIA', actor: 'client' },
    ],
    centre: ['CICLES CURTS', 'MILLORA CONTÍNUA'],
    returnLabel: 'EL FEEDBACK ES PRIORITZA I ENTRA AL SEGÜENT CICLE',
    caption: 'FIG. 06 — EL CICLE D\'EXECUCIÓ: DE L\'ESPECIFICACIÓ A L\'ÚS REAL, I TORNEM A COMENÇAR',
    ariaLabel: 'Cicle tancat d\'execució amb cinc estacions: especificació, aprovació del client, construcció, producció i ús real, amb retorn del feedback a l\'especificació.',
  },

  // SPEC-POLISH-06 §3 — "how we build" layered system, FIG. 12.
  aiBuild: {
    sectionEyebrow: 'COM CONSTRUÏM',
    sectionIndex: 'D',
    title: 'Enginyeria amb criteri, accelerada per agents',
    body: 'No construïm més ràpid per fer servir IA: construïm més ràpid perquè cada decisió passa dins d\'un sistema. Una biblioteca pròpia d\'estàndards, regles i patrons provats en producció governa la feina; els agents executen en paral·lel dins d\'aquest marc; i res no arriba a producció sense passar pel criteri sènior i la qualitat verificable. La velocitat d\'un equip complet, amb la coherència d\'una sola ment.',
    figure: {
      frame: 'BIBLIOTECA D\'ESTÀNDARDS, REGLES I PATRONS PROVATS EN PRODUCCIÓ',
      entry: 'ESPECIFICACIÓ',
      entrySub: 'APROVADA',
      lanePrefix: 'AGENT',
      lanes: ['IMPLEMENTACIÓ', 'PROVES', 'DOCUMENTACIÓ'],
      gate1: 'CRITERI SÈNIOR',
      gate2: 'QUALITAT VERIFICABLE',
      gate2Sub: 'PROVES · CI/CD · ENTORNS',
      exit: 'PRODUCCIÓ',
      exitSub: 'MODULAR · ESCALABLE',
      returnLabel: 'CADA PROJECTE EN PRODUCCIÓ REFINA ELS PATRONS QUE GOVERNEN EL SEGÜENT',
      caption: 'FIG. 12 — EL SISTEMA QUE GOVERNA COM CONSTRUÏM',
      ariaLabel: 'L\'especificació aprovada entra en una biblioteca d\'estàndards que governa la feina, s\'executa en tres carrils paral·lels d\'agents, travessa les portes de criteri sènior i qualitat verificable, surt a producció i retorna patrons refinats a la biblioteca.',
    },
    legend: [
      { label: 'GOVERN', text: 'Una biblioteca pròpia d\'estàndards, regles i patrons provats en producció.' },
      { label: 'EXECUCIÓ', text: 'Agents de IA treballant en paral·lel, sempre dins d\'aquest marc.' },
      { label: 'CONTROL', text: 'Criteri sènior i qualitat verificable abans que res no surti a producció.' },
      { label: 'CAPITALITZACIÓ', text: 'Cada projecte real refina el sistema que governa el següent.' },
    ],
  },
} as const satisfies MethodDictionary

export type MethodContent = typeof methodContent
