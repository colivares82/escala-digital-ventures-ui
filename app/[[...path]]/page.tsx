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
import { MethodPage } from '@/components/pages/method'
import { ServicesPage } from '@/components/pages/services'
import { SiteFooter, SiteHeader } from '@/components/site-chrome'
import { SITE_URL } from '@/lib/config'
import { getDictionary } from '@/lib/i18n/dictionary'
import { getAlternates, getPath, resolvePath } from '@/lib/i18n/routes'

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
 * Phase 2.n: add each new page's path entries when its component is ready.
 * Spec: SPEC-P1 FR-2.2 · SPEC-P2.1 FR-1.1
 */
export async function generateStaticParams(): Promise<RouteParams[]> {
  return [
    {},                                   // ES home: /
    { path: ['en'] },                     // EN home: /en
    { path: ['ca'] },                     // CA home: /ca
    { path: ['como-trabajamos'] },        // ES method
    { path: ['en', 'how-we-work'] },      // EN method
    { path: ['ca', 'com-treballem'] },    // CA method
    { path: ['que-hacemos'] },            // ES services — SPEC-P2.2
    { path: ['en', 'what-we-do'] },       // EN services
    { path: ['ca', 'que-fem'] },          // CA services
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
      case 'cases':
      case 'caseDetail': return dict.cases.meta  // Phase 2 will add caseDetail.meta
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

  const { page, locale } = resolution
  const dict = getDictionary(locale)
  const { home, shared } = dict

  // Pages not yet built → 404 until Phase 2.n adds them.
  if (page !== 'home' && page !== 'method' && page !== 'services') notFound()

  return (
    <MotionRuntime>
      <a className="skip-link" href="#contenido">
        {shared.accessibility.skipToContent}
      </a>
      <SiteHeader
        content={home.header}
        currentPage={page}
        locale={locale}
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
        ) : (
          <>
            <Hero content={home.hero} claims={home.claims} />
            <ProblemSection content={home.problem} />
            <ServicesPreview content={home.services} />
            <FrameworkSection content={home.framework} />
            <ProofSection content={home.proof} />
            <AllianceTeaser content={home.alliance} />
            <FinalCTA content={home.finalCta} />
          </>
        )}
      </main>
      <SiteFooter content={home.footer} />
    </MotionRuntime>
  )
}
