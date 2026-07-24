import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowUpRight,
  Sparkles,
  TrendingUp,
  Users,
  Scale,
  MapPin,
  Clock,
} from 'lucide-react'
import { departments } from '@/lib/content'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'

export const metadata: Metadata = {
  title: 'Careers | Gara Media',
  description:
    'Join Gara Media — a premium brand, marketing, and technology partner. Explore open roles across our six specialized departments.',
}

const benefits = [
  {
    icon: Sparkles,
    title: 'Work that matters',
    desc: 'Contribute to engagements with national institutions and ambitious enterprises.',
  },
  {
    icon: TrendingUp,
    title: 'Real growth',
    desc: 'Structured progression, mentorship, and the room to master your craft.',
  },
  {
    icon: Users,
    title: 'A team of specialists',
    desc: 'Collaborate with experts across brand, marketing, and engineering.',
  },
  {
    icon: Scale,
    title: 'Balance & respect',
    desc: 'A culture that values your time, ideas, and long-term wellbeing.',
  },
]

const openRoles = [
  {
    title: 'Senior Brand Strategist',
    department: 'Marketing',
    location: 'Addis Ababa',
    type: 'Full-time',
  },
  {
    title: 'Full-Stack Software Engineer',
    department: 'Technical',
    location: 'Hybrid',
    type: 'Full-time',
  },
  {
    title: 'Performance Marketing Lead',
    department: 'Marketing',
    location: 'Addis Ababa',
    type: 'Full-time',
  },
  {
    title: 'Product Designer',
    department: 'Technical',
    location: 'Hybrid',
    type: 'Full-time',
  },
  {
    title: 'People & Talent Coordinator',
    department: 'Human Resources',
    location: 'Addis Ababa',
    type: 'Full-time',
  },
]

const hiringSteps = [
  { number: '01', title: 'Application', desc: 'Share your work and what drives you.' },
  { number: '02', title: 'Conversation', desc: 'A genuine discussion about fit and ambition.' },
  { number: '03', title: 'Craft review', desc: 'A practical look at how you think and deliver.' },
  { number: '04', title: 'Offer', desc: 'Welcome to the team — let us build.' },
]

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Join Us"
        title="Build a career as exceptional as the work."
        intro="We are a team of specialists who hold themselves to a premium standard. If you care deeply about craft, accountability, and impact, you will feel at home here."
      />

      {/* Benefits */}
      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why Gara Media"
            title="A place where ambition is supported, not just expected."
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, i) => (
              <Reveal
                key={benefit.title}
                delay={(i % 4) * 80}
                className="rounded-lg border border-border bg-card p-8"
              >
                <span className="grid size-12 place-items-center rounded-sm bg-gold/12 text-gold">
                  <benefit.icon className="size-6" />
                </span>
                <h3 className="mt-6 font-heading text-xl text-navy">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {benefit.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="bg-secondary py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Open Roles"
            title="Find where you belong."
            intro="We hire across all six departments. If you don&apos;t see your role, we still want to hear from exceptional people."
          />
          <div className="mt-16 space-y-px overflow-hidden rounded-lg border border-border">
            {openRoles.map((role, i) => (
              <Reveal
                key={role.title}
                delay={(i % 2) * 70}
                className="group flex flex-col gap-5 bg-card p-7 transition-colors hover:bg-card sm:flex-row sm:items-center sm:justify-between lg:p-8"
              >
                <div>
                  <h3 className="font-heading text-xl text-navy transition-colors group-hover:text-gold">
                    {role.title}
                  </h3>
                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                    <span className="font-semibold text-gold">
                      {role.department}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="size-4" />
                      {role.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="size-4" />
                      {role.type}
                    </span>
                  </div>
                </div>
                <Link
                  href="/consultation"
                  className="inline-flex shrink-0 items-center gap-2 rounded-sm border border-border px-5 py-3 text-sm font-semibold text-navy transition-colors group-hover:border-gold group-hover:bg-gold"
                >
                  Apply
                  <ArrowUpRight className="size-4" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Departments"
            title="Six teams, one shared standard."
          />
          <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((dept, i) => (
              <Reveal
                key={dept.name}
                delay={(i % 3) * 70}
                className="bg-card p-8 lg:p-10"
              >
                <h3 className="font-heading text-xl text-navy">{dept.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {dept.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring process */}
      <section className="bg-navy py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            variant="light"
            eyebrow="Our Process"
            title="A hiring journey that respects your time."
          />
          <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {hiringSteps.map((step, i) => (
              <Reveal
                key={step.number}
                delay={(i % 4) * 70}
                className="bg-navy p-8 transition-colors hover:bg-slate-navy"
              >
                <span className="font-mono text-sm tracking-widest text-gold/70">
                  {step.number}
                </span>
                <h3 className="mt-5 font-heading text-xl text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  {step.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-dark py-24 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <Reveal>
            <h2 className="font-heading text-3xl leading-tight text-balance text-white lg:text-4xl">
              Don&apos;t see the right role?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/65">
              We&apos;re always interested in exceptional people. Introduce
              yourself and tell us how you&apos;d make us better.
            </p>
            <Link
              href="/consultation"
              className="group mt-10 inline-flex items-center gap-2 rounded-sm bg-gold px-7 py-4 text-sm font-semibold text-navy transition-all hover:bg-gold-soft"
            >
              Introduce Yourself
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
