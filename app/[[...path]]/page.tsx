import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  AllianceTeaser,
  FinalCTA,
  FrameworkSection,
  Hero,
  ProblemSection,
  ProofSection,
  ServicesPreview,
} from '@/components/home-sections'
import { MotionRuntime } from '@/components/motion-runtime'
import { AboutPage } from '@/components/pages/about'
import { AlliancePage } from '@/components/pages/alliance'
import { ContactPage } from '@/components/pages/contact'
import { LegalPage } from '@/components/pages/legal'
import { MethodPage } from '@/components/pages/method'
import { PrivacyPage } from '@/components/pages/privacy'
import { ServicesPage } from '@/components/pages/services'
import { CasesPage } from '@/components/pages/cases'
import { CaseDossier } from '@/components/case-dossier'
import { SiteFooter, SiteHeader } from '@/components/site-chrome'
import { SITE_URL } from '@/lib/config'
import { getDictionary } from '@/lib/i18n/dictionary'
import { getAlternates, getPath, resolvePath } from '@/lib/i18n/routes'
import { getCase } from '@/content/data/cases'

type RouteParams = { path?: string[] }

/**
 * Disable runtime fallback for paths not in generateStaticParams.
 * Any unknown path becomes a 404 at request time.
 * Spec: SPEC-P1 FR-2.2 (Option A: only built pages emitted)
 */
export const dynamicParams = false

/**
 * Phase 1: home × 3 locales.
 * Phase 2.1: method × 3 locales added.
 * Phase 2.2: services × 3 locales added.
 * Phase 2.3: cases index + 2 case details × 3 locales added.
 * Phase 2.4: alliance × 3 locales added. Spec: SPEC-P2.4 FR-1.1
 * Phase 2.5: about × 3 locales added. Spec: SPEC-P2.5 FR-1.1
 * Spec: SPEC-P1 FR-2.2 · SPEC-P2.1 FR-1.1 · SPEC-P2.3 FR-1.1
 */
export async function generateStaticParams(): Promise<RouteParams[]> {
  return [
    {},                                              // ES home: /
    { path: ['en'] },                               // EN home: /en
    { path: ['ca'] },                               // CA home: /ca
    { path: ['como-trabajamos'] },                  // ES method
    { path: ['en', 'how-we-work'] },                // EN method
    { path: ['ca', 'com-treballem'] },              // CA method
    { path: ['que-hacemos'] },                      // ES services — SPEC-P2.2
    { path: ['en', 'what-we-do'] },                 // EN services
    { path: ['ca', 'que-fem'] },                    // CA services
    { path: ['casos-de-exito'] },                   // ES cases index — SPEC-P2.3
    { path: ['en', 'case-studies'] },               // EN cases index
    { path: ['ca', 'casos-dexit'] },                // CA cases index
    { path: ['casos-de-exito', 'magupell'] },       // ES MAGUPELL
    { path: ['en', 'case-studies', 'magupell'] },   // EN MAGUPELL
    { path: ['ca', 'casos-dexit', 'magupell'] },    // CA MAGUPELL
    { path: ['casos-de-exito', 'biozero'] },        // ES BioZero
    { path: ['en', 'case-studies', 'biozero'] },    // EN BioZero
    { path: ['ca', 'casos-dexit', 'biozero'] },     // CA BioZero
    { path: ['modelo-de-alianza'] },                // ES alliance — SPEC-P2.4
    { path: ['en', 'alliance-model'] },             // EN alliance
    { path: ['ca', 'model-dalianca'] },             // CA alliance
    { path: ['sobre-escala'] },                     // ES about — SPEC-P2.5
    { path: ['en', 'about-escala'] },               // EN about
    { path: ['ca', 'sobre-escala'] },               // CA about
    { path: ['contacto'] },                         // ES contact — SPEC-P2.6
    { path: ['en', 'contact'] },                    // EN contact
    { path: ['ca', 'contacte'] },                   // CA contact
    { path: ['aviso-legal'] },                      // ES legal — SPEC-P4
    { path: ['en', 'legal-notice'] },               // EN legal
    { path: ['ca', 'avis-legal'] },                 // CA legal
    { path: ['privacidad'] },                       // ES privacy — SPEC-P4
    { path: ['en', 'privacy'] },                    // EN privacy
    { path: ['ca', 'privacitat'] },                 // CA privacy
  ]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>
}): Promise<Metadata> {
  const { path = [] } = await params
  const resolution = resolvePath(path)
  if (!resolution) return {}

  const { page, locale, params: pageParams } = resolution
  const dict = getDictionary(locale)
  const canonicalPath = getPath(page, locale, pageParams)
  const alternates = getAlternates(page, pageParams)

  // Select the page-specific meta object
  const pageMeta = (() => {
    switch (page) {
      case 'home':       return dict.home.meta
      case 'services':   return dict.services.meta
      case 'method':     return dict.method.meta
      case 'cases':      return dict.cases.meta
      case 'caseDetail': {
        // Per-case meta from CaseStudy.meta (SPEC-P2.3 FR-6.2)
        const slug = pageParams?.slug
        const caseData = slug ? getCase(slug) : null
        return caseData?.meta ?? dict.cases.meta
      }
      case 'alliance':   return dict.alliance.meta
      case 'about':      return dict.about.meta
      case 'contact':    return dict.contact.meta
      case 'legal':      return dict.legal.meta
      case 'privacy':    return dict.privacy.meta
    }
  })()

  const ogLocale =
    locale === 'ca' ? 'ca_ES' : locale === 'en' ? 'en_US' : 'es_ES'

  return {
    title: pageMeta.title,
    description: pageMeta.description,
    alternates: {
      canonical: `${SITE_URL}${canonicalPath}`,
      languages: {
        es: `${SITE_URL}${alternates.es}`,
        en: `${SITE_URL}${alternates.en}`,
        ca: `${SITE_URL}${alternates.ca}`,
        'x-default': `${SITE_URL}${alternates.es}`,
      },
    },
    openGraph: {
      title: pageMeta.title,
      description: pageMeta.description,
      locale: ogLocale,
      url: `${SITE_URL}${canonicalPath}`,
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<RouteParams>
}) {
  const { path = [] } = await params
  const resolution = resolvePath(path)

  // Unknown path → 404. Also covers /es/... which is not a valid prefix (spec §5).
  if (!resolution) notFound()

  const { page, locale, params: pageParams } = resolution
  const dict = getDictionary(locale)
  const { home, shared } = dict

  // Pages not yet built → 404 until Phase 2.n adds them.
  // Phase 2.5: 'about' added — SPEC-P2.5 FR-1.1
  // Phase 2.6: 'contact' added — SPEC-P2.6 FR-1.1
  // Phase 4: 'legal' + 'privacy' added — SPEC-P4 FR-1.1
  const BUILT_PAGES = ['home', 'method', 'services', 'cases', 'caseDetail', 'alliance', 'about', 'contact', 'legal', 'privacy'] as const
  if (!BUILT_PAGES.includes(page as (typeof BUILT_PAGES)[number])) notFound()

  // For caseDetail, resolve the case and 404 on unknown slug.
  const caseData =
    page === 'caseDetail' && pageParams?.slug ? getCase(pageParams.slug) : null
  if (page === 'caseDetail' && !caseData) notFound()

  return (
    <MotionRuntime>
      <a className="skip-link" href="#contenido">
        {shared.accessibility.skipToContent}
      </a>
      <SiteHeader
        content={home.header}
        currentPage={page}
        locale={locale}
        pageParams={pageParams}
      />
      {/* lang on main provides locale signal for EN/CA; html lang stays "es" until
          Phase 6 middleware sets it correctly per-request. */}
      <main
        id="contenido"
        lang={locale !== 'es' ? locale : undefined}
      >
        {page === 'method' ? (
          <MethodPage dict={dict} />
        ) : page === 'services' ? (
          <ServicesPage dict={dict} locale={locale} />
        ) : page === 'cases' ? (
          <CasesPage dict={dict} locale={locale} />
        ) : page === 'caseDetail' && caseData ? (
          <CaseDossier caseStudy={caseData} dict={dict.cases} locale={locale} />
        ) : page === 'alliance' ? (
          <AlliancePage dict={dict} />
        ) : page === 'about' ? (
          <AboutPage dict={dict} />
        ) : page === 'contact' ? (
          <ContactPage dict={dict} />
        ) : page === 'legal' ? (
          <LegalPage dict={dict} />
        ) : page === 'privacy' ? (
          <PrivacyPage dict={dict} />
        ) : (
          <>
            <Hero content={home.hero} claims={home.claims} />
            <ProblemSection content={home.problem} />
            <ServicesPreview content={home.services} />
            <FrameworkSection content={home.framework} />
            <ProofSection content={home.proof} />
            <AllianceTeaser content={home.alliance} />
            <FinalCTA />
          </>
        )}
      </main>
      <SiteFooter content={home.footer} />
    </MotionRuntime>
  )
}
