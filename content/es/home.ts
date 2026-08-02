export const homeContent = {
  header: { brand: "ESCALA", nav: ["Qué hacemos", "Cómo trabajamos", "Casos de éxito", "Modelo de alianza", "Sobre Escala"], contact: "Hablemos", locales: ["ES", "EN", "CA"] },
  hero: { eyebrow: "Escala Digital Ventures · Estudio de producto y tecnología · Mataró, Barcelona", title: "Automatizamos tu negocio. Escalamos contigo.", description: "Convertimos procesos manuales en plataformas propias que crecen contigo, con la disciplina del software empresarial global.", primaryCta: "Hablemos de tu negocio", secondaryCta: "Cómo trabajamos" },
  claims: ["Software a medida, criterio de producto y compromiso de socio.", "Convertimos procesos manuales en plataformas que crecen contigo.", "Cinco alianzas. Toda nuestra dedicación.", "IA aplicada con criterio: donde aporta, no donde adorna."],
  problem: { title: "Tu negocio funciona. Tus sistemas, no.", body: "Hojas de cálculo, correos, documentos sueltos y el conocimiento en la cabeza de dos o tres personas. Funciona… hasta que deja de funcionar: el volumen crece, los errores se multiplican, la facturación se retrasa y el negocio depende de que nadie se ponga enfermo. Escala entra exactamente ahí: digitaliza y automatiza el corazón operativo de tu empresa y lo convierte en una plataforma propia sobre la que puedes crecer." },
  services: { title: "Qué hacemos", action: "Ver todos los servicios", items: [
    { title: "Transformación digital y automatización de procesos", text: "Procesos críticos que viven en hojas de cálculo y en la cabeza de las personas." },
    { title: "Desarrollo de plataformas", text: "El software genérico no encaja con tu realidad." },
    { title: "Automatización e IA aplicada", text: "Todo el mundo habla de IA; pocos la aplican con retorno." },
    { title: "CTO y Product Leadership fraccional", text: "Necesitas criterio directivo de producto y tecnología, sin contratar un perfil a tiempo completo." },
    { title: "Operación, soporte y evolución continua", text: "El software que no evoluciona, muere." }
  ]},
  framework: { title: "Un método propio: el Escala Growth Framework", description: "Diez fases que conectan negocio, personas, procesos y tecnología en un ciclo continuo de mejora.", action: "Cómo trabajamos", phases: ["Discover", "Understand", "Simplify", "Design", "Validate", "Build", "Automate", "Scale", "Measure", "Evolve"] },
  proof: { title: "Hechos, no promesas.", figures: [{ value: "100+", label: "requisitos en producción" }, { value: "200+", label: "pruebas automatizadas" }, { value: "JUL 2026", label: "en producción desde" }, { value: "REAL", label: "el cliente factura a través de su plataforma" }], cases: [
    { name: "MAGUPELL", title: "Digitalización integral de la inspección de calidad en el sector de la piel", text: "100+ requisitos funcionales · 200+ pruebas automatizadas · Producción: 1 julio 2026 · Facturación real a través de la plataforma", href: "/casos-de-exito/magupell" },
    { name: "BioZero", title: "Plataforma de gestión clínica dental con IA", text: "Registros clínicos colaborativos, gamificación del paciente y análisis de imágenes con modelos de visión de última generación.", href: "/casos-de-exito/biozero" }
  ]},
  alliance: { title: "Cinco alianzas. Toda nuestra dedicación.", body: "Limitamos deliberadamente el número de clientes activos para garantizar dedicación, cercanía y acompañamiento continuo. No es una limitación: es el modelo.", action: "Conoce el modelo de alianza" },
  finalCta: { title: "Hablemos de tu negocio.", body: "Cuéntanos qué frena tu crecimiento. Escuchamos antes de proponer.", action: "Hablemos" },
  footer: { claim: "Automatizamos tu negocio. Escalamos contigo.", company: "Escala Digital Ventures, S.L.U. · Mataró, Barcelona", direction: "Dirección general: referencia en colivares.com" }
} as const
export type HomeContent = typeof homeContent
