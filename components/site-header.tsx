'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { Logo } from '@/components/logo'
import { cn } from '@/lib/utils'

const NAV = [
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'Work', href: '/case-studies' },
  { label: 'About', href: '/about' },
  { label: 'Insights', href: '/insights' },
  { label: 'Careers', href: '/careers' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-navy/90 py-3 shadow-lg shadow-navy/20 backdrop-blur-md'
          : 'bg-transparent py-5',
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
        <Logo variant="light" />

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative text-sm font-medium tracking-wide text-white/75 transition-colors hover:text-white',
                pathname.startsWith(item.href) && 'text-white',
              )}
            >
              {item.label}
              {pathname.startsWith(item.href) && (
                <span className="absolute -bottom-1.5 left-0 h-px w-full bg-gold" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/consultation"
            className="group inline-flex items-center gap-2 rounded-sm bg-gold px-5 py-2.5 text-sm font-semibold text-navy transition-all hover:bg-gold-soft"
          >
            Book Consultation
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid size-10 place-items-center rounded-sm text-white lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'overflow-hidden bg-navy/98 backdrop-blur-md transition-all duration-400 lg:hidden',
          open ? 'max-h-[28rem] border-t border-white/10' : 'max-h-0',
        )}
      >
        <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-6">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-b border-white/5 py-3 text-base font-medium text-white/80 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/consultation"
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-sm bg-gold px-5 py-3 text-sm font-semibold text-navy"
          >
            Book Strategic Consultation
            <ArrowUpRight className="size-4" />
          </Link>
        </nav>
      </div>
    </header>
  )
}
