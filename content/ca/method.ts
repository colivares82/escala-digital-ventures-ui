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

  phaseCycle: {
    sectionEyebrow: 'EL CICLE DE CREIXEMENT',
    sectionIndex: 'B',
    title: "Un mètode propi: l'Escala Growth Framework",
    lead: 'DEU FASES · UN CICLE CONTINU DE MILLORA',
    ariaLabel: 'Cicle de creixement de deu fases',
    phasePrefix: 'FASE',
  },

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

  pipeline: {
    sectionEyebrow: 'EL FLUX D\'EXECUCIÓ',
    sectionIndex: 'D',
    sectionTitle: 'De l\'especificació al feedback',
    nodes: [
      { label: 'ESPECIFICACIÓ' },
      { label: 'PROTOTIP' },
      { label: 'CONSTRUCCIÓ' },
      { label: 'QUALITAT' },
      { label: 'PRODUCCIÓ' },
      { label: 'FEEDBACK' },
    ],
    caption: 'FIG. 06 — DE L\'ESPECIFICACIÓ AL FEEDBACK EN CICLES CURTS',
    legend: 'CICLE CONTINU · EL FEEDBACK REALIMENTA LA SEGÜENT ESPECIFICACIÓ',
    ariaLabel: 'Diagrama del flux d\'execució: especificació, prototip, construcció, qualitat, producció i feedback en cicle continu',
    returnArcLabel: 'RETORN A L\'ORIGEN',
  },

  aiBuild: {
    sectionEyebrow: 'COM CONSTRUÏM',
    sectionIndex: 'E',
    title: 'La IA també en com construïm',
    lead: 'Escala no només integra IA en els productes dels seus clients: la utilitza en el seu propi procés de creació. Un flux de treball propi d\'enginyeria assistida per agents de IA, governat per una biblioteca interna d\'estàndards, regles i patrons provats en producció, multiplica la velocitat d\'execució, mentre que el criteri sènior de producte i enginyeria garanteix que el que es construeix és el correcte i que es construeix bé.',
    points: [
      'BIBLIOTECA INTERNA D\'ESTÀNDARDS, REGLES I PATRONS PROVATS EN PRODUCCIÓ',
      'FLUX D\'ENGINYERIA ASSISTIDA PER AGENTS DE IA',
      'CRITERI SÈNIOR DE PRODUCTE I ENGINYERIA EN CADA DECISIÓ',
      'CONSISTÈNCIA ENTRE PROJECTES · VELOCITAT D\'UN EQUIP COMPLET',
    ],
    diagram: [
      'BIBLIOTECA DE REGLES',
      'AGENT',
      'CRITERI SÈNIOR',
      'PRODUCCIÓ',
    ],
  },
} as const satisfies MethodDictionary

export type MethodContent = typeof methodContent
