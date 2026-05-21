import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '../dictionaries'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import SectionHeader from '@/components/ui/SectionHeader'
import DashboardPhoneMock from '@/components/ui/DashboardPhoneMock'
import ScanPhoneMock from '@/components/ui/ScanPhoneMock'

export default async function PlatformPage({ params }: PageProps<'/[lang]/platform'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  const { hero, dashboard, scan, data, comparison } = dict.platform

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
        <p className="text-[17px] text-white/80 max-w-145 mx-auto">{hero.description}</p>
      </section>

      {/* ── DASHBOARD ── */}
      <section className="py-20 px-[5%]">
        <div className="max-w-300 mx-auto">
          <div className="grid md:grid-cols-2 gap-15 items-center">
            <div>
              <div className="text-[11px] font-bold tracking-[2px] text-brand uppercase mb-5">
                {dashboard.sectionLabel}
              </div>
              <h2
                className="font-extrabold tracking-[-1px] text-ink mb-5"
                style={{ fontSize: 'clamp(26px, 3.5vw, 40px)' }}
              >
                {dashboard.title}{' '}
                <em className="text-brand not-italic">{dashboard.titleEm}</em>
              </h2>
              <p className="text-muted text-[16px] leading-[1.7] mb-7">{dashboard.description}</p>
              <ul className="flex flex-col gap-3.5 mb-8">
                {dashboard.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-brand shrink-0 block" />
                    <span className="text-[15px] text-ink">{b}</span>
                  </li>
                ))}
              </ul>
              <Button>{dashboard.cta}</Button>
            </div>
            <DashboardPhoneMock />
          </div>
        </div>
      </section>

      {/* ── SCAN EXPERIENCE ── */}
      <section className="py-20 px-[5%] bg-pit">
        <div className="max-w-300 mx-auto">
          <div className="grid md:grid-cols-2 gap-15 items-center">
            <ScanPhoneMock />
            <div>
              <div className="text-[11px] font-bold tracking-[2px] text-leaf uppercase mb-5">
                {scan.sectionLabel}
              </div>
              <h2
                className="font-extrabold tracking-[-1px] text-white mb-5"
                style={{ fontSize: 'clamp(26px, 3.5vw, 40px)' }}
              >
                {scan.title}{' '}
                <em className="text-leaf not-italic">{scan.titleEm}</em>
              </h2>
              <p className="text-white/65 text-[16px] leading-[1.7] mb-9">{scan.description}</p>
              <div className="flex flex-col gap-5">
                {scan.checks.map((c) => (
                  <div key={c.title} className="flex gap-3.5 items-start">
                    <div className="w-7 h-7 rounded-full bg-brand text-white flex items-center justify-center text-[13px] shrink-0">
                      ✓
                    </div>
                    <div>
                      <strong className="text-white text-[15px]">{c.title}</strong>
                      <p className="text-white/50 text-[13px] mt-0.5">{c.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
            {data.cards.map((c) => (
              <Card key={c.title} icon={c.icon} title={c.title} description={c.description} dark />
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
