import type { Dictionary } from '@/app/[lang]/dictionaries'

export default function NetworkStats({ network }: { network: Dictionary['network'] }) {
  return (
    <section id="reseau-chiffres" className="mx-auto max-w-7xl px-4 py-26 sm:px-8">
      <div className="mb-14 flex flex-wrap items-end justify-between gap-x-14 gap-y-6">
        <h2 className="max-w-160 text-[clamp(40px,5vw,64px)] leading-none tracking-[-0.03em] text-balance">
          {network.title}<span className="text-sky">{network.titleEm}</span>{network.titleEnd}
        </h2>
        <p className="m-0 max-w-95 text-[17px] text-pretty text-white/85">{network.description}</p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-4">
        {network.items.map((item) => (
          <div key={item.title} className="flex flex-col gap-2.5 rounded-2xl border border-white/14 bg-white/6 px-7 py-8">
            <div className="font-display text-[clamp(52px,5vw,76px)] leading-none font-bold tracking-[-0.03em] text-sky">{item.value}</div>
            <div className="font-display text-xl leading-[1.2] font-semibold">{item.title}</div>
            <div className="text-sm text-white/80">{item.description}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
