import { z } from 'zod'

const emptyToUndefined = (value: unknown) => {
  if (typeof value !== 'string') {
    return value
  }

  const trimmed = value.trim()

  return trimmed.length > 0 ? trimmed : undefined
}

const optionalText = () =>
  z.preprocess(
    emptyToUndefined,
    z.string().trim().optional(),
  )

const engagementValues = [
  'consultation',
  'project',
  'partnership',
] as const

const serviceValues = [
  'branding',
  'digital-marketing',
  'social',
  'software',
  'automation',
  'transformation',
] as const

const budgetValues = [
  'Under $10k',
  '$10k – $50k',
  '$50k – $150k',
  '$150k+',
  'Not sure yet',
] as const

const timelineValues = [
  'Immediately',
  'Within 1 month',
  '1 – 3 months',
  'Exploring options',
] as const

export const inquirySchema = z.object({
  engagement: z.enum(engagementValues),

  name: z
    .string()
    .trim()
    .min(1, 'Please enter your name.'),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, 'Please enter your email address.')
    .email('Enter a valid email address.'),

  company: optionalText(),

  phone: optionalText(),

  service: z
    .array(z.enum(serviceValues))
    .min(1, 'Select at least one service.')
    .max(
      serviceValues.length,
      'You selected too many services.',
    ),

  budget: z.preprocess(
    emptyToUndefined,
    z.enum(budgetValues).optional(),
  ),

  timeline: z.preprocess(
    emptyToUndefined,
    z.enum(timelineValues).optional(),
  ),

  message: z
    .string()
    .trim()
    .min(
      1,
      'Please tell us about your ambitions.',
    ),
})

export type InquiryInput = z.infer<typeof inquirySchema>
