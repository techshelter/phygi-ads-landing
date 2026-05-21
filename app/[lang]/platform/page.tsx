import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '../dictionaries'
import Card from '@/components/ui/Card'
import SectionHeader from '@/components/ui/SectionHeader'
import NumberedStep from '@/components/ui/NumberedStep'
import DashboardMock from '@/components/ui/DashboardMock'

export default async function PlatformPage({ params }: PageProps<'/[lang]/platform'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  const { hero, how, data, comparison } = dict.platform

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="text-white text-center py-20 px-[5%]"
        style={{ background: 'linear-gradient(135deg, #0F2027 0%, #2C1654 100%)' }}
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
        <p className="text-[17px] text-white/80 max-w-145 mx-auto">{hero.description}</p>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-[5%]">
        <div className="max-w-300 mx-auto">
          <div className="grid md:grid-cols-2 gap-15 items-start">
            <div>
              <SectionHeader badge={how.badge} title={how.title} />
              <p className="text-muted text-[16px] leading-[1.7] mb-8">{how.description}</p>
              <div className="flex flex-col gap-5">
                {how.steps.map((step, i) => (
                  <NumberedStep
                    key={step.title}
                    num={i + 1}
                    title={step.title}
                    description={step.description}
                    accent={step.accent}
                  />
                ))}
              </div>
            </div>
            <DashboardMock
              title={how.dashboard.title}
              chartTitle={how.dashboard.chartTitle}
              days={how.dashboard.days}
              stats={how.dashboard.stats}
            />
          </div>
        </div>
      </section>

      {/* ── DATA ── */}
      <section className="py-20 px-[5%] bg-pit">
        <div className="max-w-300 mx-auto">
          <div className="text-center">
            <SectionHeader
              badge={data.badge}
              badgeVariant="dark"
              title={data.title}
              subtitle={data.description}
              center
              dark
            />
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6 mt-12">
            {data.cards.map((c, i) => (
              <Card
                key={c.title}
                icon={c.icon}
                title={c.title}
                description={c.description}
                dark
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON ── */}
      <section className="py-20 px-[5%] bg-surface">
        <div className="max-w-300 mx-auto">
          <div className="text-center mb-10">
            <SectionHeader badge={comparison.badge} title={comparison.title} center />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[14px]">
              <thead>
                <tr>
                  {comparison.headers.map((h, i) => (
                    <th
                      key={i}
                      className={`px-5 py-3.5 text-left font-semibold text-white ${i === 0 ? 'bg-pit' : 'bg-brand'}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row, ri) => (
                  <tr key={ri} className={ri % 2 === 1 ? 'bg-surface' : ''}>
                    <td className="px-5 py-3.5 border-b border-wire font-semibold text-ink">{row[0]}</td>
                    {row.slice(1).map((cell, ci) => {
                      const isCheck = cell.startsWith('✓')
                      const isCross = cell.startsWith('✗')
                      return (
                        <td
                          key={ci}
                          className={`px-5 py-3.5 border-b border-wire ${isCheck || isCross ? 'font-bold' : 'font-normal'} ${isCheck ? 'text-brand' : isCross ? 'text-[#E24B4A]' : 'text-muted'}`}
                        >
                          {cell}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}
