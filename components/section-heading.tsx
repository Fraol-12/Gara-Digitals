import { cn } from '@/lib/utils'
import { Reveal } from '@/components/reveal'

export function Eyebrow({
  children,
  className,
  variant = 'dark',
}: {
  children: React.ReactNode
  className?: string
  variant?: 'dark' | 'light'
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.32em]',
        variant === 'dark' ? 'text-gold' : 'text-gold-soft',
        className,
      )}
    >
      <span className="h-px w-8 bg-gold" />
      {children}
    </span>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  variant = 'dark',
  className,
}: {
  eyebrow?: string
  title: string
  intro?: string
  align?: 'left' | 'center'
  variant?: 'dark' | 'light'
  className?: string
}) {
  return (
    <Reveal
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <Eyebrow
          variant={variant}
          className={align === 'center' ? 'justify-center' : ''}
        >
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        className={cn(
          'mt-5 font-heading text-3xl leading-[1.12] text-balance md:text-4xl lg:text-5xl',
          variant === 'dark' ? 'text-navy' : 'text-white',
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            'mt-5 text-lg leading-relaxed text-pretty',
            variant === 'dark' ? 'text-muted-foreground' : 'text-white/65',
          )}
        >
          {intro}
        </p>
      )}
    </Reveal>
  )
}
