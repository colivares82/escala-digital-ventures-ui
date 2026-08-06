/**
 * Sobre Escala — CA locale.
 * SPEC-P5 FR-1.1 · Glossary: docs/i18n-glossary.md
 * Pending Carlos register review (AC-9).
 *
 * Anonymization rule (Ch. 19): no former-employer names.
 * Ownership rule (SPEC-FIX-01): no code-ownership wording.
 */
import type { AboutDictionary } from '@/content/types'

export const aboutContent = {
  meta: {
    title: 'Sobre Escala | Estudi de producte i tecnologia',
    description:
      'ADN, valors, els 10 principis i l\'experiència darrere d\'Escala. Mataró, Barcelona.',
  },

  ceremonial: {
    kicker: 'A · SOBRE ESCALA · ESTUDI DE PRODUCTE I TECNOLOGIA',
    h1: 'Construïm capacitats, no aplicacions.',
    sub: 'Escala Digital Ventures, S.L.U. és un estudi de producte i tecnologia amb seu a Mataró (Barcelona), constituït el 2026. Existim perquè un nombre reduït d\'empreses creixi mitjançant tecnologia entesa com a estratègia de negoci.',
  },

  dna: {
    sectionEyebrow: 'B / EL NOSTRE ADN',
    missionLabel: 'Missió.',
    mission:
      'Automatitzar sistemes i processos de negoci, fomentar l\'escalabilitat i l\'eficiència, i fer-ho a través d\'aliances de creixement en les quals acompanyem cada client de la mà — a nivell tècnic, estratègic i visionari.',
    visionLabel: 'Visió.',
    vision:
      'Ser el soci tecnològic de referència d\'un grup selecte d\'empreses, actuant com el seu departament extern de tecnologia, innovació i producte, i participant en el seu creixement com si formés part del propi negoci.',
    quote:
      '«Cada decisió ha de respondre a una pregunta: seguirà aportant valor d\'aquí a deu anys?»',
  },

  values: {
    sectionEyebrow: 'C / VALORS',
    items: [
      {
        n: '01',
        title: 'Compromís de soci',
        body: 'No lliurem un projecte i desapareixem: ens quedem, operem, millorem i evolucionem el producte juntament amb el client.',
      },
      {
        n: '02',
        title: 'Excel·lència d\'enginyeria',
        body: 'Codi provat, arquitectura sòlida, desplegaments automatitzats i estàndards propis reutilitzables. L\'estabilitat en producció és un requisit d\'entrada.',
      },
      {
        n: '03',
        title: 'Producte abans que tecnologia',
        body: 'Pensem primer en el problema, l\'usuari i el retorn, i després en l\'eina.',
      },
      {
        n: '04',
        title: 'Transparència radical',
        body: 'Especificacions abans de construir, abast clar, comunicació honesta i facturació traçable.',
      },
      {
        n: '05',
        title: 'Velocitat amb criteri',
        body: 'Metodologia dirigida per especificacions i flux assistit per IA: la velocitat d\'equips molt més grans, sense sacrificar el control.',
      },
    ],
  },

  divider: '— — —  DE LA IDENTITAT A L\'EXPERIÈNCIA  — — —',

  expertise: {
    sectionEyebrow: 'D / L\'EXPERIÈNCIA DARRERE D\'ESCALA',
    heading: 'Més de dues dècades, sis disciplines',
    lead: 'L\'experiència que sustenta Escala abasta més de vint anys construint i dirigint plataformes de programari empresarial d\'abast global — solucions utilitzades per desenes de milers d\'empreses en més de cent països. El rellevant no és la cronologia, sinó el resultat: sis disciplines operant juntes.',
    areas: [
      {
        index: '01',
        title: 'Enginyeria full-stack',
        body: 'Frontend, backend, dades, cloud, seguretat, proves i automatització de desplegaments. Dissenyar i també executar.',
        figVariant: 'fullstack',
      },
      {
        index: '02',
        title: 'Arquitectura de plataformes',
        body: 'Sistemes modulars, escalables i extensibles pensats per durar anys: APIs clares, observabilitat, evolució sense redissenys.',
        figVariant: 'hub',
      },
      {
        index: '03',
        title: 'Direcció de producte',
        body: 'Visió, estratègia, roadmap, priorització per impacte, especificació funcional i alineació negoci-enginyeria-UX.',
        figVariant: 'bars',
      },
      {
        index: '04',
        title: 'Lideratge i transformació',
        body: 'Anys dirigint equips multidisciplinaris i transformant organitzacions tècniques en organitzacions orientades a producte.',
        figVariant: 'nodes',
      },
      {
        index: '05',
        title: 'Developer experience',
        body: 'Tooling, testing i integració contínua: la disciplina de fer que construir, desplegar i mantenir sigui ràpid i fiable.',
        figVariant: 'signal',
      },
      {
        index: '06',
        title: 'IA aplicada i cloud-native',
        body: 'Plataformes modernes, cloud-native i AI-first, amb formació específica en disseny de productes de IA (certificació del MIT).',
        figVariant: 'insertion',
      },
    ],
  },

  manifesto: {
    sectionEyebrow: 'E / EL MANIFEST',
    heading: 'El Manifest d\'Escala',
    lead: 'DEU CREENCES · UNA FORMA D\'ENTENDRE LA TECNOLOGIA',
    beliefs: [
      'La tecnologia només té sentit quan millora la vida de les persones i el funcionament de les empreses.',
      'El programari és un actiu estratègic, no una despesa.',
      'La simplicitat és una de les formes més avançades d\'enginyeria.',
      'Negoci, producte i tecnologia formen una única disciplina.',
      'L\'automatització allibera el potencial humà per a tasques de major valor.',
      'La intel·ligència artificial ha d\'amplificar les capacitats de les persones, no substituir-les.',
      'La qualitat no és negociable: les decisions tècniques d\'avui determinen l\'èxit de demà.',
      'Creiem en relacions de llarg termini basades en confiança, transparència i compromís.',
      'L\'aprenentatge continu és imprescindible per mantenir un avantatge competitiu.',
      'El veritable èxit consisteix a ajudar els nostres clients a créixer de forma sostenible.',
    ],
  },

  colivaresLine:
    'DIRECCIÓ GENERAL · La trajectòria completa del nostre Director General està disponible com a referència pública a colivares.com',
} as const satisfies AboutDictionary

export type AboutContent = typeof aboutContent
