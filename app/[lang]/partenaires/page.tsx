import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '../dictionaries'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import SectionHeader from '@/components/ui/SectionHeader'
import NumberedStep from '@/components/ui/NumberedStep'

export default async function PartenairesPage({ params }: PageProps<'/[lang]/partenaires'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  const { hero, benefits, how, cta } = dict.partenaires

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="text-white text-center py-25 px-[5%]"
        style={{ background: 'linear-gradient(135deg, #08091f 0%, #0D0E47 50%, #162060 100%)' }}
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
        <Button>{hero.cta}</Button>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-20 px-[5%]">
        <div className="max-w-300 mx-auto">
          <div className="text-center">
            <SectionHeader badge={benefits.badge} title={benefits.title} center />
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6 mt-10">
            {benefits.cards.map((c) => (
              <Card
                key={c.title}
                icon={c.icon}
                title={c.title}
                description={c.description}
                topColor={c.accent ? 'accent' : 'brand'}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-[5%] bg-surface">
        <div className="max-w-300 mx-auto">
          <div className="grid md:grid-cols-2 gap-15 items-center">
            <div>
              <SectionHeader badge={how.badge} title={how.title} />
              <div className="flex flex-col gap-5 mt-7">
                {how.steps.map((step, i) => (
                  <NumberedStep
                    key={step.title}
                    num={i + 1}
                    title={step.title}
                    description={step.description}
                    accent={step.accent}
                    size="md"
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {/* Guarantee card */}
              <div className="bg-white rounded-2xl p-8 border border-wire">
                <h3 className="text-[18px] font-bold text-ink mb-2">{how.guaranteeTitle}</h3>
                <p className="text-muted text-[14px] mb-6">{how.guaranteeSubtitle}</p>
                <div className="flex flex-col gap-3.5">
                  {how.guarantees.map((g) => (
                    <div key={g} className="flex gap-3 items-start">
                      <span className="text-brand font-bold text-[16px]">✓</span>
                      <p className="text-[14px] text-ink">{g}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Note */}
              <div className="bg-brand-light rounded-xl p-5 text-center">
                <p className="text-[14px] text-brand-dark font-medium">{how.note}</p>
              </div>
            </div>
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
          <Button className="text-[16px] px-9 py-4">{cta.button}</Button>
        </div>
      </section>
    </>
  )
}
