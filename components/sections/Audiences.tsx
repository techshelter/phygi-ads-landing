import Image from 'next/image'
import ButtonLink from '@/components/ui/Button'
import type { Dictionary } from '@/app/[lang]/dictionaries'

type Audience = Dictionary['audiences']['brands']

function AudiencePanel({ audience, image, variant }: { audience: Audience; image: string; variant: 'primary' | 'outline' }) {
  return (
    <div className="relative min-h-155 overflow-hidden">
      <Image src={image} alt={audience.imageAlt} fill sizes="(max-width: 760px) 100vw, 50vw" className="object-cover" />
      <div className="absolute inset-x-0 bottom-0 bg-navy/60 px-10 pt-24 pb-10 max-sm:px-6">
        <div className="mb-2 font-mono text-xs uppercase text-sky">{audience.eyebrow}</div>
        <h3 className="mb-5 text-[clamp(34px,8vw,48px)] leading-[1.02] tracking-[-0.02em]">{audience.title}</h3>
        <ButtonLink href="#cta" variant={variant}>{audience.cta}</ButtonLink>
      </div>
    </div>
  )
}

export default function Audiences({ audiences }: { audiences: Dictionary['audiences'] }) {
  return (
    <section id="reseau" className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))]">
      <AudiencePanel audience={audiences.brands} image="/images/brands.webp" variant="primary" />
      <AudiencePanel audience={audiences.shops} image="/images/shops.webp" variant="outline" />
    </section>
  )
}
