import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '../dictionaries'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import SectionHeader from '@/components/ui/SectionHeader'
import CheckItem from '@/components/ui/CheckItem'
import CampaignReportMock from '@/components/ui/CampaignReportMock'

export default async function AnnonceursPage({ params }: PageProps<'/[lang]/annonceurs'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  const { hero, who, benefits, cta } = dict.annonceurs

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="text-white text-center py-20 px-[5%]"
        style={{ background: 'linear-gradient(135deg, #0D0E47 0%, #141840 100%)' }}
      >
        <span className="inline-flex items-center gap-2 bg-leaf/15 border border-leaf/30 rounded-full px-4 py-1.5 text-[13px] mb-6">
          {hero.badge}
        </span>
        <h1
          className="font-extrabold tracking-[-1.5px] mb-5 text-white"
          style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
        >
          {hero.title}<br />
          <span className="text-leaf">{hero.titleEm}</span>
        </h1>
        <p className="text-[17px] text-white/80 max-w-140 mx-auto mb-9">{hero.description}</p>
        <div className="flex gap-3.5 justify-center flex-wrap">
          <Button variant="accent">{hero.ctaDemo}</Button>
          <Button variant="secondary">{hero.ctaKit}</Button>
        </div>
      </section>

      {/* ── WHO ── */}
      <section className="py-20 px-[5%]">
        <div className="max-w-300 mx-auto">
          <div className="text-center">
            <SectionHeader badge={who.badge} title={who.title} center />
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6 mt-12">
            {who.cards.map((c) => (
              <Card key={c.title} icon={c.icon} title={c.title} description={c.description} />
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-20 px-[5%] bg-surface">
        <div className="max-w-300 mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <SectionHeader badge={benefits.badge} title={benefits.title} subtitle={benefits.description} />
              <div className="flex flex-col gap-4 mt-8">
                {benefits.checks.map((c) => (
                  <CheckItem key={c.title} title={c.title} description={c.description} />
                ))}
              </div>
            </div>
            <CampaignReportMock title={benefits.report.title} rows={benefits.report.rows} />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-[5%] bg-pit">
        <div className="max-w-300 mx-auto text-center">
          <h2
            className="font-extrabold tracking-[-1px] text-white mb-4"
            style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
          >
            {cta.title}
          </h2>
          <p className="text-white/65 text-[17px] max-w-140 mx-auto mb-8 leading-[1.7]">{cta.description}</p>
          <Button variant="accent" className="text-[16px] px-9 py-4">{cta.button}</Button>
        </div>
      </section>
    </>
  )
}
