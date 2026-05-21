import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from './dictionaries'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import StatItem from '@/components/ui/StatItem'
import Metric from '@/components/ui/Metric'
import SectionHeader from '@/components/ui/SectionHeader'

export default async function HomePage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  const { hero, problem, solution, network, cta } = dict.home

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="text-white text-center py-25 px-[5%]"
        style={{ background: 'linear-gradient(135deg, #0D0E47 0%, #162060 50%, #2584FE 100%)' }}
      >
        <span className="inline-block bg-white/12 border border-white/20 rounded-full px-4 py-1.5 text-[13px] mb-7 tracking-[0.5px]">
          {hero.badge}
        </span>
        <h1
          className="font-extrabold leading-[1.1] tracking-[-1.5px] mb-6 text-white"
          style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
        >
          {hero.title}<br />
          <em className="text-leaf not-italic">{hero.titleEm}</em>
        </h1>
        <p className="text-[18px] text-white/85 max-w-150 mx-auto mb-10 leading-[1.7]">
          {hero.description}
        </p>
        <div className="flex gap-3.5 justify-center flex-wrap">
          <Button href={`/${lang}/annonceurs`}>{hero.ctaPrimary}</Button>
          <Button href={`/${lang}/platform`} variant="secondary">{hero.ctaSecondary}</Button>
        </div>
        <div className="flex justify-center gap-12 mt-18 pt-12 border-t border-white/15 flex-wrap">
          {hero.stats.map((s) => <StatItem key={s.label} num={s.num} label={s.label} />)}
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="py-20 px-[5%] bg-surface">
        <div className="max-w-300 mx-auto">
          <div className="text-center">
            <SectionHeader
              badge={problem.badge}
              title={problem.title}
              subtitle={problem.description}
              center
            />
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6 mt-12">
            {problem.cards.map((c) => (
              <Card key={c.title} icon={c.icon} title={c.title} description={c.description} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTION ── */}
      <section className="py-20 px-[5%]">
        <div className="max-w-300 mx-auto">
          <div className="grid md:grid-cols-2 gap-15 items-center">
            <div>
              <SectionHeader badge={solution.badge} title={solution.title} />
              <p className="text-muted text-[16px] leading-[1.7] mb-6">{solution.description}</p>
              <Button href={`/${lang}/platform`}>{solution.cta}</Button>
            </div>

            {/* Dashboard preview */}
            <div className="bg-brand-light rounded-2xl p-8">
              <div className="bg-white rounded-xl p-5 mb-4 border border-wire">
                <div className="text-[12px] text-muted mb-1.5 uppercase tracking-[0.5px]">
                  {solution.dashboard.campaignLabel}
                </div>
                <div className="text-[28px] font-extrabold text-brand-dark">{solution.dashboard.scans}</div>
                <div className="text-[13px] text-muted">{solution.dashboard.growth}</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {solution.dashboard.stats.map((s) => (
                  <div key={s.label} className="bg-white rounded-[10px] p-4 border border-wire">
                    <div className={`text-[20px] font-extrabold ${s.accent ? 'text-accent' : 'text-brand-dark'}`}>
                      {s.value}
                    </div>
                    <div className="text-[12px] text-muted">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NETWORK ── */}
      <section className="py-20 px-[5%] bg-pit">
        <div className="max-w-300 mx-auto text-center">
          <SectionHeader
            badge={network.badge}
            badgeVariant="dark"
            title={network.title}
            subtitle={network.description}
            center
            dark
          />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-5 mt-12">
            {network.metrics.map((m) => <Metric key={m.label} num={m.num} label={m.label} />)}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-[5%] bg-surface">
        <div className="max-w-300 mx-auto text-center">
          <h2
            className="font-extrabold tracking-[-1px] text-ink mb-4"
            style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
          >
            {cta.title}
          </h2>
          <p className="text-muted text-[17px] max-w-140 mx-auto mb-8 leading-[1.7]">{cta.description}</p>
          <div className="flex gap-3.5 justify-center flex-wrap">
            <Button href={`/${lang}/annonceurs`}>{cta.ctaBrand}</Button>
            <Button href={`/${lang}/partenaires`} variant="outline">{cta.ctaBoulangerie}</Button>
          </div>
        </div>
      </section>
    </>
  )
}
