import Image from 'next/image'

interface BackdropProps {
  src: string
  alt: string
  /** Navy overlay strength, 0–100. */
  overlay: number
  contain?: boolean
  priority?: boolean
}

/** Full-bleed photo with a navy veil, filling its positioned parent. */
export default function Backdrop({ src, alt, overlay, contain = false, priority = false }: BackdropProps) {
  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        priority={priority}
        className={contain ? 'object-contain' : 'object-cover'}
      />
      <div className="pointer-events-none absolute inset-0 bg-navy" style={{ opacity: overlay / 100 }} />
    </>
  )
}
