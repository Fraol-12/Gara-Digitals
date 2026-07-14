import { z } from 'zod'

const emptyToUndefined = (value: unknown) => {
  if (typeof value !== 'string') {
    return value
  }

  const trimmed = value.trim()

  return trimmed.length > 0 ? trimmed : undefined
}

const optionalText = (maxLength: number, message: string) =>
  z.preprocess(
    emptyToUndefined,
    z.string().trim().max(maxLength, message).optional(),
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
    .min(2, 'Name must be at least 2 characters long.')
    .max(150, 'Name must be 150 characters or fewer.'),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Enter a valid email address.')
    .max(254, 'Email must be 254 characters or fewer.'),

  company: optionalText(
    150,
    'Company must be 150 characters or fewer.',
  ),

  phone: optionalText(
    32,
    'Phone must be 32 characters or fewer.',
  ),

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
      10,
      'Please write at least 10 characters in your message.',
    )
    .max(
      5000,
      'Your message cannot exceed 5,000 characters.',
    ),
})

export type InquiryInput = z.infer<typeof inquirySchema>