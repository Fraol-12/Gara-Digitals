import { sql } from '@/lib/db'
import { inquirySchema } from '@/lib/validation/inquiry-schema'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    let body: unknown

    try {
      body = await request.json()
    } catch {
      return Response.json(
        {
          success: false,
          error: 'Please check the information you entered.',
          fields: {},
        },
        { status: 400 },
      )
    }

    const parsed = inquirySchema.safeParse(body)

    if (!parsed.success) {
      return Response.json(
        {
          success: false,
          error: 'Please check the information you entered.',
          fields: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      )
    }

    const inquiry = parsed.data

    const [record] = (await sql`
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
        ${inquiry.engagement},
        ${inquiry.name},
        ${inquiry.email},
        ${inquiry.company ?? null},
        ${inquiry.phone ?? null},
        ${inquiry.service ?? null},
        ${inquiry.budget ?? null},
        ${inquiry.timeline ?? null},
        ${inquiry.message}
      )
      RETURNING id, status, created_at
    `) as Array<{
      id: number
      status: string
      created_at: Date | string
    }>

    return Response.json(
      {
        success: true,
        message: 'Your inquiry was submitted successfully.',
        inquiry: {
          id: record.id,
          status: record.status,
          createdAt:
            record.created_at instanceof Date
              ? record.created_at.toISOString()
              : new Date(record.created_at).toISOString(),
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