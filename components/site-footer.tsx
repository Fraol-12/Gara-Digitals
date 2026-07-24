import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Logo } from '@/components/logo'
import {
  LinkedInIcon,
  InstagramIcon,
  FacebookIcon,
  XIcon,
} from '@/components/social-icons'

const COLUMNS = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Insights', href: '/insights' },
      { label: 'AI Assistant', href: '/ai' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Branding', href: '/services#branding' },
      { label: 'Digital Marketing', href: '/services#digital-marketing' },
      { label: 'Social Media', href: '/services#social' },
      { label: 'Software Development', href: '/services#software' },
    ],
  },
  {
    title: 'Industries',
    links: [
      { label: 'Government', href: '/industries' },
      { label: 'Finance', href: '/industries' },
      { label: 'Healthcare', href: '/industries' },
      { label: 'Tourism', href: '/industries' },
    ],
  },
  {
    title: 'Engage',
    links: [
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Contact', href: '/consultation' },
      { label: 'Consultation', href: '/consultation' },
    ],
  },
]

const SOCIALS = [
  { icon: LinkedInIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram' },
  { icon: FacebookIcon, href: 'https://facebook.com', label: 'Facebook' },
  { icon: XIcon, href: 'https://twitter.com', label: 'X / Twitter' },
]

export function SiteFooter() {
  return (
    <footer className="bg-navy-dark text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* CTA band */}
        <div className="flex flex-col gap-8 border-b border-white/10 py-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="font-heading text-3xl leading-tight text-balance md:text-4xl">
              Ready to build something enterprises trust?
            </p>
            <p className="mt-4 text-white/60 leading-relaxed">
              Partner with a team that combines strategic discipline with
              dedicated responsiveness.
            </p>
          </div>
          <Link
            href="/consultation"
            className="group inline-flex shrink-0 items-center gap-2 rounded-sm bg-gold px-7 py-4 text-sm font-semibold text-navy transition-all hover:bg-gold-soft"
          >
            Book Strategic Consultation
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Links */}
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Logo variant="light" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/55">
              Enterprise-grade branding, marketing, and software for ambitious
              organizations across Ethiopia and beyond.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-sm border border-white/10 text-white/70 transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                {col.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-8 text-sm text-white/45 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Gara Media. All rights reserved.</p>
          <p className="max-w-md text-pretty md:text-right">
            Combining the discipline of an established partner with the
            responsiveness of a dedicated team.
          </p>
        </div>
      </div>
    </footer>
  )
}
