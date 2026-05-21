import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '../dictionaries'
import Button from '@/components/ui/Button'
import SectionHeader from '@/components/ui/SectionHeader'
import QuoteBlock from '@/components/ui/QuoteBlock'
import Step from '@/components/ui/Step'
import FeatureItem from '@/components/ui/FeatureItem'

export default async function PainPage({ params }: PageProps<'/[lang]/pain'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  const { hero, insight, journey, cta } = dict.pain

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="text-white text-center py-20 px-[5%]"
        style={{ background: 'linear-gradient(135deg, #08091f 0%, #0D0E47 100%)' }}
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
        <p className="text-[17px] text-white/80 max-w-140 mx-auto">{hero.description}</p>
      </section>

      {/* ── INSIGHT ── */}
      <section className="py-20 px-[5%]">
        <div className="max-w-300 mx-auto">
          <div className="grid md:grid-cols-2 gap-15 items-center">
            <div>
              <SectionHeader badge={insight.badge} title={insight.title} />
              <p className="text-muted text-[16px] leading-[1.7] mb-5">{insight.description}</p>
              <div className="flex flex-col gap-3">
                {insight.features.map((f) => (
                  <FeatureItem key={f.title} icon={f.icon} title={f.title} description={f.description} />
                ))}
              </div>
            </div>

            <div>
              {/* Network stats */}
              <div className="bg-surface rounded-2xl p-7 mb-6">
                <div className="text-[13px] font-semibold text-muted mb-5">{insight.networkTitle}</div>
                <div className="grid grid-cols-2 gap-3">
                  {insight.networkStats.map((s, i) => (
                    <div key={s.label} className="bg-white rounded-[10px] p-5 text-center border border-wire">
                      <div className={`text-[28px] font-extrabold ${i % 2 === 1 ? 'text-accent' : 'text-brand-dark'}`}>
                        {s.value}
                      </div>
                      <div className="text-[12px] text-muted mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <QuoteBlock text={insight.quote.text} author={insight.quote.author} />
            </div>
          </div>
        </div>
      </section>

      {/* ── JOURNEY ── */}
      <section className="py-20 px-[5%] bg-pit">
        <div className="max-w-300 mx-auto text-center">
          <h2
            className="font-extrabold tracking-[-1px] text-white mb-12"
            style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
          >
            {journey.title}
          </h2>
          <div className="flex flex-wrap gap-0 relative">
            {journey.steps.map((step, i) => (
              <Step
                key={step.title}
                num={i + 1}
                title={step.title}
                description={step.description}
                isLast={i === journey.steps.length - 1}
              />
            ))}
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
          <p className="text-muted text-[17px] max-w-140 mx-auto mb-7 leading-[1.7]">{cta.description}</p>
          <Button href={`/${lang}/partenaires`}>{cta.button}</Button>
        </div>
      </section>
    </>
  )
}
