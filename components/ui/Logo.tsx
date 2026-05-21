import Image from 'next/image'
import logoSrc from '@/app/assets/icon/nozaya-logo-blue-dbb.png'

interface LogoProps {
  size?: number
  wordmark?: boolean
  darkText?: boolean
}

export default function Logo({ size = 32, wordmark = true, darkText = true }: LogoProps) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image
        src={logoSrc}
        alt="Nozaya"
        width={size}
        height={size}
        priority
      />
      {wordmark && (
        <span
          className={`font-bold tracking-[-0.5px] leading-none ${darkText ? 'text-ink' : 'text-white'}`}
          style={{ fontSize: size * 0.65 }}
        >
          nozaya
        </span>
      )}
    </span>
  )
}
