import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Logo({
  className,
  variant = 'light',
  href = '/',
}: {
  className?: string
  variant?: 'light' | 'dark'
  href?: string
}) {
  const wordmark = variant === 'light' ? 'text-white' : 'text-navy'
  const sub = variant === 'light' ? 'text-gold-soft/70' : 'text-muted-foreground'

  return (
    <Link
      href={href}
      className={cn('group inline-flex items-center gap-3', className)}
      aria-label="Gara Media home"
    >
      <span className="grid size-9 place-items-center rounded-sm bg-gold text-navy shadow-sm transition-transform duration-300 group-hover:scale-105">
        <svg
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M19 7.5C17.5 5.4 15 4 12 4a8 8 0 1 0 0 16c3 0 5.5-1.4 7-3.5V12h-7"
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="square"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-heading text-lg font-semibold tracking-[0.22em]',
            wordmark,
          )}
        >
          GARA
        </span>
        <span
          className={cn(
            'text-[0.62rem] font-medium uppercase tracking-[0.42em]',
            sub,
          )}
        >
          Media
        </span>
      </span>
    </Link>
  )
}
