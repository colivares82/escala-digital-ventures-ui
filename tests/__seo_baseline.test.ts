import { writeFileSync } from 'node:fs'
import { buildPageGraph } from '@/lib/seo/page-graph'
import { buildPageMetadata } from '@/lib/seo/page-meta'
import { buildLlmsTxt } from '@/lib/seo/llms-txt'
import sitemap from '@/app/sitemap'
import robots from '@/app/robots'
import { getDictionary } from '@/lib/i18n/dictionary'
import { LOCALES } from '@/lib/i18n/types'
it('seo baseline', () => {
  const out = LOCALES.map((locale) => {
    const dict = getDictionary(locale)
    return { locale,
      meta: buildPageMetadata({ page: 'home', locale, title: dict.home.meta.title, description: dict.home.meta.description }),
      graph: buildPageGraph({ dict, page: 'home', locale }) }
  })
  writeFileSync(process.env.OUT!, JSON.stringify({ out, llms: buildLlmsTxt(), sitemap: sitemap(), robots: robots() }, null, 1))
})
