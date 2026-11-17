import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from './dictionaries'
import Hero from '@/components/sections/Hero'
import HowItWorks from '@/components/sections/HowItWorks'
import Supports from '@/components/sections/Supports'
import Scan from '@/components/sections/Scan'
import Measure from '@/components/sections/Measure'
import Audiences from '@/components/sections/Audiences'
import NetworkStats from '@/components/sections/NetworkStats'
import Contact from '@/components/sections/Contact'

export default async function HomePage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)

  return (
    <>
      <Hero hero={dict.hero} />
      <HowItWorks how={dict.how} />
      <Supports supports={dict.supports} />
      <Scan scan={dict.scan} />
      <Measure measure={dict.measure} />
      <Audiences audiences={dict.audiences} />
      <NetworkStats network={dict.network} />
      <Contact contact={dict.contact} />
    </>
  )
}
