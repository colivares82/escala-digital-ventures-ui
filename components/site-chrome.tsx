import type { homeContent } from '@/content/es/home'

type HeaderContent = typeof homeContent.header
type FooterContent = typeof homeContent.footer
const links = ['#que-hacemos', '#metodo', '#casos', '#metodo', '#inicio']

export function SiteHeader({ content }: { content: HeaderContent }) {
  return <header className='craft-header'><div className='craft-header__inner'><a className='craft-brand' href='#inicio' aria-label='Escala, inicio'><span className='brand-mark' aria-hidden='true'><i/><i/><i/></span><span>{content.brand}</span></a><nav className='craft-nav' aria-label='Navegación principal'>{content.nav.slice(0,3).map((label,index)=><a href={links[index]} key={label}><span>{label}</span></a>)}</nav><div className='craft-header__actions'><div className='craft-locales' aria-label='Idiomas'>{content.locales.map((locale,index)=><span aria-current={index===0?'page':undefined} key={locale}>{locale}</span>)}</div><a className='tick-button' href='#contacto'><span>{content.contact}</span><i aria-hidden='true'/></a></div></div></header>
}

export function SiteFooter({ content }: { content: FooterContent }) {
  return <footer className='craft-footer'><div className='craft-shell craft-footer__meta'><p>{content.claim}</p><a href='mailto:hola@escaladigitalventures.com'>hola@escaladigitalventures.com <span aria-hidden='true'>↗</span></a><p>{content.company}</p></div><p className='craft-footer__wordmark' aria-hidden='true'>ESCALA</p></footer>
}
