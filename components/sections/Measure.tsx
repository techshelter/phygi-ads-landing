import ButtonLink from '@/components/ui/Button'
import type { Dictionary } from '@/app/[lang]/dictionaries'

const WEEKLY_SCANS = [30, 42, 38, 60, 72, 88, 100]

/** [district, x %, y %, bubble size px] */
const HOTSPOTS: [string, number, number, number][] = [
  ['Cocody', 68, 36, 78],
  ['Yopougon', 16, 48, 64],
  ['Abobo', 44, 16, 44],
  ['Plateau', 44, 50, 34],
  ['Adjamé', 44, 34, 28],
  ['Marcory', 54, 76, 40],
  ['Treichville', 40, 72, 26],
  ['Koumassi', 74, 74, 50],
  ['Port-Bouët', 84, 86, 22],
]
const MAX_HOTSPOT = 78

function HotspotMap({ label }: { label: string }) {
  return (
    <div className="relative h-57.5 overflow-hidden rounded-xl border border-white/10 bg-navy">
      <div className="absolute inset-x-0 top-1/2 -mt-1.5 h-8.5 -rotate-4 bg-brand/14" />
      <div className="absolute top-2.5 left-3 font-mono text-[11px] uppercase text-white/70">{label}</div>
      {HOTSPOTS.map(([name, x, y, size]) => (
        <div key={name} className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
          <div
            className="flex -translate-1/2 items-center justify-center rounded-full border border-sky"
            style={{ width: size, height: size, background: `rgba(37,132,254,${0.18 + (size / MAX_HOTSPOT) * 0.4})` }}
          >
            <span className="size-1.5 rounded-full bg-white" />
          </div>
          <div className="absolute left-2.5 text-[11px] whitespace-nowrap" style={{ top: size / 2 - 8 }}>
            {name}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Measure({ measure }: { measure: Dictionary['measure'] }) {
  return (
    <section
      id="mesure"
      className="mx-auto grid max-w-7xl grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-center gap-14 px-4 py-28 sm:px-8"
    >
      <div>
        <h2 className="mb-5 text-[clamp(44px,9vw,72px)] leading-none tracking-[-0.03em]">
          {measure.title}<span className="text-sky">{measure.titleEm}</span>
        </h2>
        <ButtonLink href="#cta" size="lg">{measure.cta}</ButtonLink>
      </div>
      <div className="flex flex-col gap-3.5 rounded-[20px] border border-white/14 bg-navy-deep p-6 shadow-xl">
        <div className="flex items-end justify-between">
          <div>
            <div className="font-mono text-[11px] uppercase text-white/70">{measure.scansLabel}</div>
            <div className="font-display text-[56px] leading-none font-bold">{measure.scansValue}</div>
          </div>
          <span className="text-[13px] font-semibold text-success-light">{measure.growth}</span>
        </div>
        <div className="flex h-27.5 items-end gap-2" aria-hidden="true">
          {WEEKLY_SCANS.map((pct, i) => (
            <div key={i} className="flex-1 rounded bg-brand" style={{ height: `${pct}%` }} />
          ))}
        </div>
        <HotspotMap label={measure.mapLabel} />
        <div className="grid grid-cols-2 gap-3">
          {measure.split.map((item) => (
            <div key={item.label} className="rounded-xl bg-white/7 p-3.5">
              <div className="text-xs text-white/75">{item.label}</div>
              <div className="font-display text-2xl font-bold">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
