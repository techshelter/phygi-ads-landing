import Backdrop from '@/components/ui/Backdrop'
import type { Dictionary } from '@/app/[lang]/dictionaries'

function Wave() {
  return (
    <svg
      viewBox="0 0 1440 180"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="pointer-events-none absolute -top-px left-0 block h-[clamp(110px,12vw,180px)] w-full"
    >
      <path d="M0,0 H1440 V120 C1180,170 960,70 700,110 C440,150 220,90 0,140 Z" fill="#2584FE" fillOpacity="0.35" />
      <path d="M0,0 H1440 V84 C1200,140 980,40 720,80 C460,120 240,60 0,108 Z" fill="#0D0E47" fillOpacity="0.8" />
      <path d="M0,0 H1440 V48 C1220,104 1000,12 740,48 C480,84 250,30 0,70 Z" fill="#0D0E47" />
      <path d="M0,70 C250,30 480,84 740,48 C1000,12 1220,104 1440,48" fill="none" stroke="#7DB4FF" strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

function CouponPhone({ phone }: { phone: Dictionary['scan']['phone'] }) {
  return (
    <div className="w-72.5 max-w-full rounded-[40px] border-9 border-navy-edge bg-navy-deep p-3.5 shadow-xl">
      <div className="overflow-hidden rounded-[22px] bg-white text-ink">
        <div className="bg-navy px-3.5 py-3 text-xs font-semibold text-white">{phone.shop}</div>
        <div className="flex flex-col gap-2.5 px-4 pt-4.5 pb-5">
          <div className="font-display text-[19px] leading-[1.1] font-bold text-navy">{phone.headline}</div>
          <div className="rounded-xl border-[1.5px] border-dashed border-brand-300 p-3.5 text-center">
            <div className="font-display text-[42px] font-bold text-navy">{phone.discount}</div>
            <div className="inline-block rounded bg-surface px-2 py-0.5 font-mono text-[11px]">{phone.code}</div>
          </div>
          <div className="rounded-[10px] bg-success p-3 text-center text-xs font-bold text-success-ink">{phone.cta}</div>
        </div>
      </div>
    </div>
  )
}

export default function Scan({ scan }: { scan: Dictionary['scan'] }) {
  return (
    <section id="scan" className="relative min-h-180 overflow-hidden">
      <Backdrop src="/images/scan.webp" alt={scan.imageAlt} overlay={50} contain />
      <Wave />
      <div className="relative mx-auto grid max-w-7xl grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-center gap-12 px-4 pt-32 pb-24 sm:px-8">
        <div>
          <h2 className="mb-6 text-[clamp(44px,9vw,72px)] leading-none tracking-[-0.03em]">
            {scan.title}<br /><span className="text-sky">{scan.titleEm}</span>
          </h2>
          <ul className="m-0 flex list-none flex-wrap gap-2.5 p-0">
            {scan.chips.map((chip) => (
              <li key={chip} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy">{chip}</li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center">
          <CouponPhone phone={scan.phone} />
        </div>
      </div>
    </section>
  )
}
