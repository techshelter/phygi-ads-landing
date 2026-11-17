import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getDictionary, hasLocale } from './dictionaries'

export async function generateStaticParams() {
  return [{ lang: 'fr' }, { lang: 'en' }]
}

export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const { meta } = await getDictionary(lang)
  return { title: meta.title, description: meta.description }
}

export default async function LocaleLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)

  return (
    <>
      <Navbar lang={lang} nav={dict.nav} />
      <main>{children}</main>
      <Footer tagline={dict.footer.tagline} />
    </>
  )
}
