import ButtonLink from '@/components/ui/Button'
import Backdrop from '@/components/ui/Backdrop'
import type { Dictionary } from '@/app/[lang]/dictionaries'

export default function Hero({ hero }: { hero: Dictionary['hero'] }) {
  return (
    <section id="top" className="relative flex min-h-[max(calc(100vh-64px),640px)] items-center">
      <Backdrop src="/images/hero.webp" alt={hero.imageAlt} overlay={62} priority />
      <div className="relative mx-auto w-full max-w-7xl px-4 py-18 sm:px-8">
        <h1 className="max-w-250 text-[clamp(44px,6.2vw,92px)] leading-[0.98] font-bold tracking-[-0.035em] text-balance">
          {hero.title}<span className="text-sky">{hero.titleEm}</span>
        </h1>
        <p className="mt-6 max-w-140 text-[19px] text-pretty text-white/85">{hero.description}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href="#cta" size="lg">{hero.ctaPrimary}</ButtonLink>
          <ButtonLink href="#supports" variant="ghost" size="lg">{hero.ctaSecondary}</ButtonLink>
        </div>
        <dl className="mt-10 flex flex-wrap gap-x-14 gap-y-4">
          {hero.stats.map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-2.5">
              <dt className="order-2 text-sm text-white/80">{stat.label}</dt>
              <dd className="m-0 font-display text-4xl font-bold text-sky">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
