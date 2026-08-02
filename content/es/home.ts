export const homeContent = {
  header: { brand: "ESCALA", nav: ["Qué hacemos", "Cómo trabajamos", "Casos de éxito", "Modelo de alianza", "Sobre Escala"], contact: "Hablemos", locales: ["ES", "EN", "CA"] },
  hero: { eyebrow: "Escala Digital Ventures · Estudio de producto y tecnología · Mataró, Barcelona", title: "Automatizamos tu negocio. Escalamos contigo.", description: "Convertimos procesos manuales en plataformas propias que crecen contigo, con la disciplina del software empresarial global.", primaryCta: "Hablemos de tu negocio", secondaryCta: "Cómo trabajamos" },
  claims: ["Software a medida, criterio de producto y compromiso de socio.", "Convertimos procesos manuales en plataformas que crecen contigo.", "Cinco alianzas. Toda nuestra dedicación.", "IA aplicada con criterio: donde aporta, no donde adorna."],
  problem: { title: "Tu negocio funciona. Tus sistemas, no.", body: "Hojas de cálculo, correos, documentos sueltos y el conocimiento en la cabeza de dos o tres personas. Funciona… hasta que deja de funcionar: el volumen crece, los errores se multiplican, la facturación se retrasa y el negocio depende de que nadie se ponga enfermo. Escala entra exactamente ahí: digitaliza y automatiza el corazón operativo de tu empresa y lo convierte en una plataforma propia sobre la que puedes crecer.", symptoms: ["volumen que crece", "errores que se multiplican", "facturación que se retrasa", "dependencia de personas"] },
  services: { title: "Qué hacemos", action: "Ver todos los servicios", items: [
    { title: "Transformación digital y automatización de procesos", text: "Procesos críticos que viven en hojas de cálculo y en la cabeza de las personas." },
    { title: "Desarrollo de plataformas", text: "El software genérico no encaja con tu realidad." },
    { title: "Automatización e IA aplicada", text: "Todo el mundo habla de IA; pocos la aplican con retorno." },
    { title: "CTO y Product Leadership fraccional", text: "Necesitas criterio directivo de producto y tecnología, sin contratar un perfil a tiempo completo." },
    { title: "Operación, soporte y evolución continua", text: "El software que no evoluciona, muere." }
  ]},
  framework: { title: "Un método propio: el Escala Growth Framework", description: "Diez fases que conectan negocio, personas, procesos y tecnología en un ciclo continuo de mejora.", action: "Cómo trabajamos", phases: [
    { name: "Discover", description: "Comprender profundamente el negocio, sus objetivos, limitaciones, oportunidades y procesos. Escuchar antes de proponer." },
    { name: "Understand", description: "Modelar cómo funciona realmente la organización, identificar cuellos de botella, dependencias y fuentes de fricción." },
    { name: "Simplify", description: "Eliminar complejidad innecesaria antes de introducir tecnología. Un mal proceso automatizado sigue siendo un mal proceso." },
    { name: "Design", description: "Diseñar la experiencia, la arquitectura y el modelo operativo pensando en escalabilidad, mantenibilidad y adopción." },
    { name: "Validate", description: "Validar hipótesis rápidamente mediante prototipos navegables, pruebas con usuarios y entregas incrementales para reducir riesgos antes de invertir en construcción." },
    { name: "Build", description: "Construir plataformas con estándares elevados de ingeniería, automatización, seguridad y calidad." },
    { name: "Automate", description: "Automatizar procesos completos para reducir errores, aumentar productividad y liberar tiempo para actividades de mayor valor." },
    { name: "Scale", description: "Preparar la plataforma y la organización para crecer sin necesidad de rediseños continuos." },
    { name: "Measure", description: "Definir indicadores de negocio y métricas técnicas que permitan medir el impacto real de cada iniciativa." },
    { name: "Evolve", description: "Entender que ningún producto está terminado. La mejora continua forma parte del modelo de colaboración de Escala." }
  ] },
  proof: { title: "Hechos, no promesas.", figures: [{ value: "100+", label: "REQUISITOS", caption: "implementados y verificados en producción" }, { value: "200+", label: "PRUEBAS", caption: "automatizadas sobre flujos reales" }, { value: "JUL 2026", label: "PRODUCCIÓN", caption: "fecha verificada de puesta en marcha" }, { value: "REAL", label: "FACTURACIÓN", caption: "operada por el cliente en su plataforma" }], cases: [
    { name: "MAGUPELL", title: "Digitalización integral de la inspección de calidad en el sector de la piel", text: "100+ requisitos funcionales · 200+ pruebas automatizadas · Producción: 1 julio 2026 · Facturación real a través de la plataforma", href: "/casos-de-exito/magupell" },
    { name: "BioZero", title: "Plataforma de gestión clínica dental con IA", text: "Registros clínicos colaborativos, gamificación del paciente y análisis de imágenes con modelos de visión de última generación.", href: "/casos-de-exito/biozero" }
  ]},
  alliance: { title: "Cinco alianzas. Toda nuestra dedicación.", body: "Limitamos deliberadamente el número de clientes activos para garantizar dedicación, cercanía y acompañamiento continuo. No es una limitación: es el modelo.", action: "Conoce el modelo de alianza" },
  finalCta: { title: "Hablemos de tu negocio.", body: "Cuéntanos qué frena tu crecimiento. Escuchamos antes de proponer.", success: "Recibido. Te responderemos personalmente en un plazo de dos días laborables.", email: "hola@escaladigitalventures.com", location: "Mataró · Barcelona", languages: "Trabajamos en español, inglés, catalán y ruso." },
  footer: { claim: "Automatizamos tu negocio. Escalamos contigo.", company: "Escala Digital Ventures, S.L.U. · Mataró, Barcelona", direction: "Dirección general: referencia en colivares.com" }
} as const
export type HomeContent = typeof homeContent
