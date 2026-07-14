'use client'

import { useRef, useState } from 'react'
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

const timelines = [
  'Immediately',
  'Within 1 month',
  '1 – 3 months',
  'Exploring options',
]

const fieldClass =
  'w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-navy outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-gold focus:ring-2 focus:ring-gold/20'

const labelClass =
  'block text-xs font-semibold uppercase tracking-[0.16em] text-navy'

const errorFieldClass =
  'border-red-500 focus:border-red-500 focus:ring-red-500/20'

const errorTextClass = 'mt-2 text-xs leading-relaxed text-red-600'

type FormField = 'name' | 'email' | 'service' | 'message'

type FieldErrors = Partial<Record<FormField, string>>

const fieldOrder: FormField[] = [
  'name',
  'email',
  'service',
  'message',
]

function getFirstField(errors: FieldErrors) {
  return fieldOrder.find((field) => Boolean(errors[field]))
}

function normalizeApiFieldErrors(
  fields?: Record<string, string[] | undefined>,
) {
  if (!fields) {
    return {}
  }

  return fieldOrder.reduce<FieldErrors>((errors, field) => {
    const message = fields[field]?.find(Boolean)

    if (message) {
      errors[field] = message
    }

    return errors
  }, {})
}

export function InquiryForm() {
  const [engagement, setEngagement] = useState('consultation')
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const fieldRefs = useRef<
    Partial<Record<FormField, HTMLElement | null>>
  >({})

  function clearFieldError(field: FormField) {
    setSubmitError('')

    setFieldErrors((current) => {
      if (!current[field]) {
        return current
      }

      const next = { ...current }
      delete next[field]

      return next
    })
  }

  function focusField(field: FormField) {
    const element = fieldRefs.current[field]

    if (!element) {
      return
    }

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })

    window.setTimeout(() => {
      element.focus({ preventScroll: true })
    }, 250)
  }

  function focusFirstField(errors: FieldErrors) {
    const firstField = getFirstField(errors)

    if (firstField) {
      focusField(firstField)
    }
  }

  function toggleService(serviceId: string) {
    clearFieldError('service')

    setSelectedServices((current) =>
      current.includes(serviceId)
        ? current.filter((id) => id !== serviceId)
        : [...current, serviceId],
    )
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    if (submitting) {
      return
    }

    setSubmitError('')

    const form = event.currentTarget
    const formData = new FormData(form)
    const emailElement = form.elements.namedItem('email')
    const emailInput =
      emailElement instanceof HTMLInputElement
        ? emailElement
        : null

    const payload = {
      engagement,
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      company: String(formData.get('company') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      service: selectedServices,
      budget: String(formData.get('budget') ?? ''),
      timeline: String(formData.get('timeline') ?? ''),
      message: String(formData.get('message') ?? ''),
    }

    const email = payload.email.trim()

    payload.email = email

    if (emailInput) {
      emailInput.value = email
    }

    const localErrors: FieldErrors = {}

    if (!payload.name.trim()) {
      localErrors.name = 'Please enter your name.'
    }

    if (!email) {
      localErrors.email = 'Please enter your email address.'
    } else if (emailInput && !emailInput.validity.valid) {
      localErrors.email = 'Enter a valid email address.'
    }

    if (selectedServices.length === 0) {
      localErrors.service = 'Select at least one service.'
    }

    if (!payload.message.trim()) {
      localErrors.message = 'Please tell us about your ambitions.'
    }

    if (getFirstField(localErrors)) {
      setFieldErrors(localErrors)
      focusFirstField(localErrors)
      return
    }

    setSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = (await response.json()) as {
        error?: string
        fields?: Record<string, string[] | undefined>
      }

      if (!response.ok) {
        const apiFieldErrors = normalizeApiFieldErrors(
          result.fields,
        )

        if (getFirstField(apiFieldErrors)) {
          setFieldErrors(apiFieldErrors)
          focusFirstField(apiFieldErrors)
        }

        throw new Error(
          result.error || 'Unable to submit your inquiry.',
        )
      }

      form.reset()
      setEngagement('consultation')
      setSelectedServices([])
      setFieldErrors({})
      setSubmitted(true)
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Unable to submit your inquiry.',
      )
    } finally {
      setSubmitting(false)
    }
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
          Thank you. A member of our executive team will review your
          request and respond within one business day to arrange your
          consultation.
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
      noValidate
      className="rounded-lg border border-border bg-card p-7 lg:p-10"
    >
      {/* Engagement type */}
      <fieldset>
        <legend className={labelClass}>
          Type of engagement
        </legend>

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
                    active
                      ? 'border-gold bg-gold'
                      : 'border-muted-foreground/40',
                  )}
                >
                  {active && (
                    <Check className="size-3 text-navy" />
                  )}
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
            ref={(element) => {
              fieldRefs.current.name = element
            }}
            required
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={
              fieldErrors.name ? 'name-error' : undefined
            }
            onChange={() => clearFieldError('name')}
            placeholder="Jane Doe"
            className={cn(
              'mt-2',
              fieldClass,
              fieldErrors.name && errorFieldClass,
            )}
          />

          {fieldErrors.name ? (
            <p id="name-error" className={errorTextClass}>
              {fieldErrors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Work email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            ref={(element) => {
              fieldRefs.current.email = element
            }}
            required
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={
              fieldErrors.email ? 'email-error' : undefined
            }
            onChange={() => clearFieldError('email')}
            placeholder="jane@company.com"
            className={cn(
              'mt-2',
              fieldClass,
              fieldErrors.email && errorFieldClass,
            )}
          />

          {fieldErrors.email ? (
            <p id="email-error" className={errorTextClass}>
              {fieldErrors.email}
            </p>
          ) : null}
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
            Phone{' '}
            <span className="font-normal normal-case text-muted-foreground">
              (optional)
            </span>
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

      {/* Multiple service selection */}
      <fieldset
        ref={(element) => {
          fieldRefs.current.service = element
        }}
        tabIndex={-1}
        aria-invalid={Boolean(fieldErrors.service)}
        aria-describedby={
          fieldErrors.service ? 'service-error' : undefined
        }
        className="mt-5 outline-none"
      >
        <legend className={labelClass}>
          Primary interests
        </legend>

        <p className="mt-2 text-xs text-muted-foreground">
          Select one or more services.
        </p>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {services.map((service) => {
            const active = selectedServices.includes(service.id)

            return (
              <label
                key={service.id}
                className={cn(
                  'flex cursor-pointer items-center gap-3 rounded-sm border px-4 py-3 transition-colors',
                  active
                    ? 'border-gold bg-gold/5'
                    : 'border-border hover:border-gold/40',
                  fieldErrors.service &&
                    !active &&
                    'border-red-500',
                )}
              >
                <input
                  type="checkbox"
                  name="service"
                  value={service.id}
                  checked={active}
                  onChange={() => toggleService(service.id)}
                  className="sr-only"
                />

                <span
                  className={cn(
                    'grid size-5 shrink-0 place-items-center rounded-sm border transition-colors',
                    active
                      ? 'border-gold bg-gold'
                      : 'border-muted-foreground/40',
                  )}
                >
                  {active && (
                    <Check className="size-3 text-navy" />
                  )}
                </span>

                <span className="text-sm font-medium text-navy">
                  {service.title}
                </span>
              </label>
            )
          })}
        </div>

        {fieldErrors.service ? (
          <p id="service-error" className={errorTextClass}>
            {fieldErrors.service}
          </p>
        ) : null}
      </fieldset>

      {/* Budget and timeline */}
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="budget" className={labelClass}>
            Estimated budget
          </label>

          <select
            id="budget"
            name="budget"
            className={cn('mt-2', fieldClass)}
            defaultValue=""
          >
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

        <div>
          <label htmlFor="timeline" className={labelClass}>
            Desired timeline
          </label>

          <select
            id="timeline"
            name="timeline"
            className={cn('mt-2', fieldClass)}
            defaultValue=""
          >
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
          ref={(element) => {
            fieldRefs.current.message = element
          }}
          rows={5}
          required
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={
            fieldErrors.message ? 'message-error' : undefined
          }
          onChange={() => clearFieldError('message')}
          placeholder="Share the challenge, opportunity, or goal you would like to discuss."
          className={cn(
            'mt-2 resize-none',
            fieldClass,
            fieldErrors.message && errorFieldClass,
          )}
        />

        {fieldErrors.message ? (
          <p id="message-error" className={errorTextClass}>
            {fieldErrors.message}
          </p>
        ) : null}
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

      {submitError ? (
        <p
          className="mt-4 text-sm leading-relaxed text-red-600"
          aria-live="polite"
        >
          {submitError}
        </p>
      ) : null}

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        We respond to qualified inquiries within one business day.
        Your details are kept strictly confidential.
      </p>
    </form>
  )
}
