import Image from 'next/image'
import logoSrc from '@/app/assets/icon/nozaya-logo-blue-dbb.png'

export default function Logo() {
  return (
    <span className="flex items-center gap-2.5 font-display text-xl font-bold tracking-[-0.02em] text-white">
      <Image src={logoSrc} alt="" width={32} height={32} className="rounded-lg" priority />
      nozaya
    </span>
  )
}
