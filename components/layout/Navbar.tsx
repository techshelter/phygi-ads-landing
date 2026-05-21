'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface NavDict {
  home: string
  platform: string
  pain: string
  annonceurs: string
  partenaires: string
  cta: string
}

interface NavbarProps {
  lang: string
  nav: NavDict
}

export default function Navbar({ lang, nav }: NavbarProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const links = [
    { href: `/${lang}`,             label: nav.home        },
    { href: `/${lang}/platform`,    label: nav.platform    },
    { href: `/${lang}/pain`,        label: nav.pain        },
    { href: `/${lang}/annonceurs`,  label: nav.annonceurs  },
    { href: `/${lang}/partenaires`, label: nav.partenaires },
  ]

  const otherLang = lang === 'fr' ? 'en' : 'fr'
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(\/|$)/, '/') || '/'
  const otherLangHref = `/${otherLang}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`

  const isActive = (href: string) =>
    href === `/${lang}` ? pathname === href || pathname === `/${lang}/` : pathname.startsWith(href)

  return (
    <nav className="sticky top-0 z-50 bg-white/96 backdrop-blur-sm border-b border-wire px-[5%]">
      <div className="max-w-300 mx-auto flex items-center justify-between h-16">
        {/* Logo */}
        <Link href={`/${lang}`} className="text-[20px] font-bold text-brand-dark! tracking-[-0.5px]">
          Phygi<span className="text-accent">Ads</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-8 text-[14px] text-muted">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors duration-150 hover:text-brand-dark ${isActive(link.href) ? 'text-brand-dark font-semibold' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <Link
            href={otherLangHref}
            className="text-[13px] font-semibold text-muted hover:text-brand-dark transition-colors uppercase"
          >
            {otherLang}
          </Link>
          <Link
            href={`/${lang}/annonceurs`}
            className="hidden sm:inline-flex bg-brand text-white px-5 py-2 rounded-lg text-[14px] font-medium hover:bg-brand-dark transition-colors"
          >
            {nav.cta}
          </Link>
          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden p-2 text-muted hover:text-ink"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-wire py-4 flex flex-col gap-4 text-[15px]">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-2 py-1 ${isActive(link.href) ? 'text-brand-dark font-semibold' : 'text-muted'}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={`/${lang}/annonceurs`}
            className="mt-2 bg-brand text-white px-5 py-2.5 rounded-lg text-[14px] font-medium text-center"
            onClick={() => setOpen(false)}
          >
            {nav.cta}
          </Link>
        </div>
      )}
    </nav>
  )
}
