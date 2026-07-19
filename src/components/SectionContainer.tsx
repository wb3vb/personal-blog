import type {ReactNode} from 'react'

export default function SectionContainer({
  children,
  className,
  wide = false,
}: {
  children: ReactNode
  className?: string
  wide?: boolean
}) {
  const baseClass = wide
    ? 'mx-auto max-w-none w-[95vw] px-4 sm:px-6 lg:px-8'
    : 'mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8'

  return <div className={`${baseClass} ${className ?? ''}`}>{children}</div>
}
