/**
 * Model d'aliança — CA locale.
 * SPEC-P5 FR-1.1 · Glossary: docs/i18n-glossary.md
 * Pending Carlos register review (AC-9).
 *
 * Ownership note: commitment 01 uses the corrected "A MIDA" framing.
 * DO NOT add any "client owns the code" wording here.
 */
import type { AllianceDictionary } from '@/content/types'

export const allianceContent = {
  meta: {
    title: "Model d'aliança | Escala Digital Ventures",
    description:
      "Cinc aliances actives. Dedicació completa. Tres plans: tècnic, estratègic i visionari. Els compromisos de cada aliança.",
  },

  pageHeader: {
    eyebrow: "A / MODEL D'ALIANÇA",
    title: 'Cinc aliances. Tota la nostra dedicació.',
    lead: 'No busquem projectes; busquem socis. I triem els nostres socis tant com ells ens trien a nosaltres.',
  },

  whyFive: {
    sectionEyebrow: 'B / PER QUÈ NOMÉS CINC',
    heading: 'Per què només cinc',
    body: 'Limitem deliberadament el nombre de clients actius —aproximadament cinc aliances— per garantir dedicació, proximitat i acompanyament continu. No és una limitació: és el model de negoci. Cada client rep una implicació profunda i accés directe al coneixement estratègic acumulat.',
    constellationAria: "FIG. 05 — Constel·lació d'aliances: cinc places al voltant d'Escala, dues ocupades (Magupell, BioZero) i tres disponibles.",
  },

  seats: [
    { name: 'Magupell', state: 'occupied' },
    { name: 'BIOZERO',  state: 'occupied' },
    { name: 'DISPONIBLE', state: 'free' },
    { name: 'DISPONIBLE', state: 'free' },
    { name: 'DISPONIBLE', state: 'free' },
  ],

  planes: {
    sectionEyebrow: "C / TRES PLANS D'ACOMPANYAMENT",
    heading: "Tres plans d'acompanyament",
    lead: 'Cada aliança rep acompanyament simultani en tres plans.',
    items: [
      {
        index: '01',
        title: 'Tècnic',
        body: 'Dissenyem, construïm, despleguem i operem la teva plataforma de principi a fi: arquitectura, desenvolupament full-stack, cloud, seguretat, proves, monitorització i suport continu. La capacitat d\'un departament tècnic complet sense haver de crear-lo.',
        depth: 'ARQUITECTURA · CODI · OPERACIÓ',
      },
      {
        index: '02',
        title: 'Estratègic',
        body: 'Direcció externa de producte i tecnologia: prioritzem el roadmap, traduïm necessitats de negoci en especificacions executables, decidim què construir, què no i en quin ordre, i mesurem l\'impacte de cada iteració.',
        depth: 'ROADMAP · PRIORITAT · IMPACTE',
      },
      {
        index: '03',
        title: 'Visionari',
        body: 'Aportem perspectiva sobre cap on van el programari, l\'automatització i la IA, i t\'ajudem a anticipar-te: quins processos automatitzar després, quines dades capturar avui per explotar demà, quines capacitats de IA tenen sentit per al teu sector i quines són soroll.',
        depth: 'ANTICIPACIÓ · DADES · IA',
      },
    ],
  },

  commitments: {
    sectionEyebrow: "D / COMPROMISOS DE CADA ALIANÇA",
    heading: 'Compromisos de cada aliança',
    items: [
      {
        n: '01',
        tag: 'A MIDA',
        body: 'Solucions ajustades a les necessitats i oportunitats reals del teu negoci — no plantilles.',
      },
      {
        n: '02',
        tag: 'ESPECIFICACIÓ',
        body: 'Cada funcionalitat s\'especifica i s\'aprova abans de construir-se.',
      },
      {
        n: '03',
        tag: 'QUALITAT',
        body: 'Es demostra amb proves automatitzades i estabilitat en producció, no amb promeses.',
      },
      {
        n: '04',
        tag: 'SUPORT',
        body: 'Continu, traçable i transparent en la seva facturació.',
      },
      {
        n: '05',
        tag: 'MESURA',
        body: 'Un únic indicador final: el creixement i l\'eficiència del teu negoci.',
      },
    ],
  },
} as const satisfies AllianceDictionary

export type AllianceContent = typeof allianceContent
