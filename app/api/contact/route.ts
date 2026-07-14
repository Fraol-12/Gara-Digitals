import { sql } from '@/lib/db'
import { sendInquiryNotification } from '@/lib/email/send-inquiry-email'
import { inquirySchema } from '@/lib/validation/inquiry-schema'

export const runtime = 'nodejs'

type InsertedInquiry = {
  id: string | number
  status: string
  created_at: Date | string
}

function getFirstFieldError(
  fieldErrors: Record<string, string[] | undefined>,
): string | undefined {
  return Object.values(fieldErrors)
    .flatMap((messages) => messages ?? [])
    .find((message) => typeof message === 'string')
}

export async function POST(request: Request) {
  try {
    let body: unknown

    try {
      body = await request.json()
    } catch {
      return Response.json(
        {
          success: false,
          error: 'The submitted form data is invalid.',
          fields: {},
        },
        { status: 400 },
      )
    }

    const parsed = inquirySchema.safeParse(body)

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors
      const firstFieldError = getFirstFieldError(fieldErrors)

      return Response.json(
        {
          success: false,
          error:
            firstFieldError ??
            'Please check the information you entered.',
          fields: fieldErrors,
        },
        { status: 400 },
      )
    }

    const inquiry = parsed.data

    const records = (await sql.query(
      `
        INSERT INTO inquiries (
          engagement,
          name,
          email,
          company,
          phone,
          service,
          budget,
          timeline,
          message
        )
        VALUES (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6::TEXT[],
          $7,
          $8,
          $9
        )
        RETURNING id, status, created_at
      `,
      [
        inquiry.engagement,
        inquiry.name,
        inquiry.email,
        inquiry.company ?? null,
        inquiry.phone ?? null,
        inquiry.service,
        inquiry.budget ?? null,
        inquiry.timeline ?? null,
        inquiry.message,
      ],
    )) as InsertedInquiry[]

    const record = records[0]

    if (!record) {
      throw new Error(
        'The inquiry was not returned after insertion.',
      )
    }

    const createdAt =
      record.created_at instanceof Date
        ? record.created_at.toISOString()
        : new Date(record.created_at).toISOString()

    try {
      await sendInquiryNotification({
        id: record.id,
        engagement: inquiry.engagement,
        name: inquiry.name,
        email: inquiry.email,
        company: inquiry.company ?? null,
        phone: inquiry.phone ?? null,
        service: inquiry.service,
        budget: inquiry.budget ?? null,
        timeline: inquiry.timeline ?? null,
        message: inquiry.message,
        createdAt,
      })

      await sql`
        UPDATE inquiries
        SET
          email_sent = TRUE,
          updated_at = NOW()
        WHERE id = ${record.id}
      `
    } catch (emailError) {
      console.error(
        'Inquiry was saved, but the email notification failed:',
        emailError,
      )
    }

    return Response.json(
      {
        success: true,
        message: 'Your inquiry was submitted successfully.',
        inquiry: {
          id: record.id,
          status: record.status,
          createdAt,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('Contact submission failed:', error)

    return Response.json(
      {
        success: false,
        error: 'Something went wrong. Please try again later.',
      },
      { status: 500 },
    )
  }
}