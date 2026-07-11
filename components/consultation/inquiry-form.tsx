'use client'

import { useState } from 'react'
import { ArrowUpRight, Check, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { services } from '@/lib/content'

const engagements = [
  {
    id: 'consultation',
    title: 'Strategic Consultation',
    desc: 'A focused executive session to assess brand, market, and opportunities.',
  },
  {
    id: 'project',
    title: 'Project Discovery',
    desc: 'Scope a defined engagement with clear deliverables and metrics.',
  },
  {
    id: 'partnership',
    title: 'Long-term Partnership',
    desc: 'Establish a sustained relationship for transformation and growth.',
  },
]

const budgets = [
  'Under $10k',
  '$10k – $50k',
  '$50k – $150k',
  '$150k+',
  'Not sure yet',
]

const timelines = ['Immediately', 'Within 1 month', '1 – 3 months', 'Exploring options']

const fieldClass =
  'w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-navy outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-gold focus:ring-2 focus:ring-gold/20'

const labelClass =
  'block text-xs font-semibold uppercase tracking-[0.16em] text-navy'

export function InquiryForm() {
  const [engagement, setEngagement] = useState('consultation')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    // Simulate request submission
    await new Promise((resolve) => setTimeout(resolve, 1100))
    setSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-lg border border-border bg-card p-10 text-center lg:p-14">
        <span className="grid size-16 place-items-center rounded-full bg-gold/15 text-gold">
          <Check className="size-8" />
        </span>
        <h3 className="mt-6 font-heading text-2xl text-navy">
          Your inquiry has been received.
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          Thank you. A member of our executive team will review your request and
          respond within one business day to arrange your consultation.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-navy underline-offset-4 transition-colors hover:text-gold"
        >
          Submit another inquiry
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-border bg-card p-7 lg:p-10"
    >
      {/* Engagement type */}
      <fieldset>
        <legend className={labelClass}>Type of engagement</legend>
        <div className="mt-4 grid gap-3">
          {engagements.map((option) => {
            const active = engagement === option.id
            return (
              <label
                key={option.id}
                className={cn(
                  'flex cursor-pointer items-start gap-4 rounded-sm border p-4 transition-colors',
                  active
                    ? 'border-gold bg-gold/5'
                    : 'border-border hover:border-gold/40',
                )}
              >
                <input
                  type="radio"
                  name="engagement"
                  value={option.id}
                  checked={active}
                  onChange={() => setEngagement(option.id)}
                  className="sr-only"
                />
                <span
                  className={cn(
                    'mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border transition-colors',
                    active ? 'border-gold bg-gold' : 'border-muted-foreground/40',
                  )}
                >
                  {active && <Check className="size-3 text-navy" />}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-navy">
                    {option.title}
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                    {option.desc}
                  </span>
                </span>
              </label>
            )
          })}
        </div>
      </fieldset>

      {/* Personal details */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Jane Doe"
            className={cn('mt-2', fieldClass)}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@company.com"
            className={cn('mt-2', fieldClass)}
          />
        </div>
        <div>
          <label htmlFor="company" className={labelClass}>
            Organization
          </label>
          <input
            id="company"
            name="company"
            type="text"
            placeholder="Company name"
            className={cn('mt-2', fieldClass)}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone <span className="font-normal normal-case text-muted-foreground">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+251 91 000 0000"
            className={cn('mt-2', fieldClass)}
          />
        </div>
      </div>

      {/* Engagement detail */}
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="service" className={labelClass}>
            Primary interest
          </label>
          <select id="service" name="service" className={cn('mt-2', fieldClass)} defaultValue="">
            <option value="" disabled>
              Select a service
            </option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="budget" className={labelClass}>
            Estimated budget
          </label>
          <select id="budget" name="budget" className={cn('mt-2', fieldClass)} defaultValue="">
            <option value="" disabled>
              Select a range
            </option>
            {budgets.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="timeline" className={labelClass}>
            Desired timeline
          </label>
          <select id="timeline" name="timeline" className={cn('mt-2', fieldClass)} defaultValue="">
            <option value="" disabled>
              Select a timeline
            </option>
            {timelines.map((timeline) => (
              <option key={timeline} value={timeline}>
                {timeline}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div className="mt-5">
        <label htmlFor="message" className={labelClass}>
          Tell us about your ambitions
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Share the challenge, opportunity, or goal you would like to discuss."
          className={cn('mt-2 resize-none', fieldClass)}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-navy px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-slate-navy disabled:opacity-70 sm:w-auto"
      >
        {submitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Submitting
          </>
        ) : (
          <>
            Request Consultation
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </>
        )}
      </button>
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        We respond to qualified inquiries within one business day. Your details
        are kept strictly confidential.
      </p>
    </form>
  )
}
