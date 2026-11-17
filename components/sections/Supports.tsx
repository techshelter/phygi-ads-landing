import Image from 'next/image'
import type { Dictionary } from '@/app/[lang]/dictionaries'

const SUPPORTS = ['bread', 'pharmacy', 'flyer', 'pizza', 'grocery'] as const

export default function Supports({ supports }: { supports: Dictionary['supports'] }) {
  return (
    <section id="supports" className="flex h-160 max-[820px]:h-auto max-[820px]:flex-col">
      {SUPPORTS.map((key, i) => (
        <div
          key={key}
          className="relative min-w-0 flex-1 overflow-hidden border-l-2 border-navy transition-[flex] duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:flex-[2.6] max-[820px]:h-75 max-[820px]:flex-none max-[820px]:border-t-2 max-[820px]:border-l-0 max-[820px]:hover:flex-none"
        >
          <Image src={`/images/support-${key}.webp`} alt={supports[key]} fill sizes="(max-width: 820px) 100vw, 50vw" className="object-cover" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-navy/55 px-6 pt-18 pb-7">
            <div className="mb-1.5 font-mono text-xs text-sky">{String(i + 1).padStart(2, '0')}</div>
            <div className="font-display text-[30px] leading-[1.05] font-bold">{supports[key]}</div>
          </div>
        </div>
      ))}
    </section>
  )
}
