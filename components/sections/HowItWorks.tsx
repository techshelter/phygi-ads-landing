import Eyebrow from '@/components/ui/Eyebrow'
import type { Dictionary } from '@/app/[lang]/dictionaries'

export default function HowItWorks({ how }: { how: Dictionary['how'] }) {
  return (
    <section
      id="comment"
      className="mx-auto grid max-w-7xl grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-x-18 gap-y-14 px-4 py-28 sm:px-8"
    >
      <div>
        <Eyebrow>{how.eyebrow}</Eyebrow>
        <h2 className="mb-6 text-[clamp(40px,5vw,64px)] leading-none tracking-[-0.03em] text-balance">
          {how.title}<span className="text-sky">{how.titleEm}</span>
        </h2>
        <p className="max-w-120 text-lg leading-[1.55] text-pretty text-white/85">{how.description}</p>
      </div>
      <ol className="m-0 list-none p-0">
        {how.steps.map((step, i) => (
          <li key={step.title} className="grid grid-cols-[56px_1fr] gap-5 border-t border-white/18 py-7">
            <span className="pt-1.5 font-mono text-sm text-sky">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3 className="mb-2 text-[26px] leading-[1.15] font-bold">{step.title}</h3>
              <p className="m-0 text-white/80">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
