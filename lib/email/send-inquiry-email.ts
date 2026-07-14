import 'server-only'
import { Resend } from 'resend'

type InquiryEmailData = {
  id: number | string
  engagement: string
  name: string
  email: string
  company?: string | null
  phone?: string | null
  service: string[]
  budget?: string | null
  timeline?: string | null
  message: string
  createdAt: string | Date
}

const serviceNames: Record<string, string> = {
  branding: 'Branding',
  'digital-marketing': 'Digital Marketing',
  social: 'Social Media Marketing',
  software: 'Custom Software Development',
  automation: 'Business Automation',
  transformation: 'Digital Transformation',
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function displayValue(value?: string | null): string {
  return value?.trim() || 'Not provided'
}

function displayServices(services: string[]): string {
  if (!services || services.length === 0) {
    return 'Not provided'
  }

  return services
    .map((service) => serviceNames[service] ?? service)
    .join(', ')
}

function createDetailRow(label: string, value: string): string {
  return `
    <tr>
      <td
        style="
          padding: 10px 14px;
          border-bottom: 1px solid #e5e7eb;
          width: 35%;
          color: #6b7280;
          font-size: 14px;
          font-weight: 600;
          vertical-align: top;
        "
      >
        ${escapeHtml(label)}
      </td>

      <td
        style="
          padding: 10px 14px;
          border-bottom: 1px solid #e5e7eb;
          color: #111827;
          font-size: 14px;
          vertical-align: top;
          word-break: break-word;
        "
      >
        ${escapeHtml(value)}
      </td>
    </tr>
  `
}

export async function sendInquiryNotification(
  inquiry: InquiryEmailData,
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const contactEmail = process.env.CONTACT_EMAIL
  const fromEmail = process.env.RESEND_FROM_EMAIL

  if (!apiKey || !contactEmail || !fromEmail) {
    throw new Error(
      'Required Resend environment variables are missing.',
    )
  }

  const resend = new Resend(apiKey)

  const submittedAt = new Date(
    inquiry.createdAt,
  ).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Africa/Addis_Ababa',
  })

  const selectedServices = displayServices(inquiry.service)

  const text = `
NEW GARA MEDIA INQUIRY

Inquiry ID: ${inquiry.id}
Engagement: ${inquiry.engagement}
Name: ${inquiry.name}
Email: ${inquiry.email}
Company: ${displayValue(inquiry.company)}
Phone: ${displayValue(inquiry.phone)}
Services: ${selectedServices}
Budget: ${displayValue(inquiry.budget)}
Timeline: ${displayValue(inquiry.timeline)}
Submitted: ${submittedAt}

MESSAGE
${inquiry.message}

Reply directly to this email to contact ${inquiry.name}.
  `.trim()

  const messageHtml = escapeHtml(inquiry.message).replaceAll(
    '\n',
    '<br />',
  )

  const html = `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>New Gara Media Inquiry</title>
      </head>

      <body
        style="
          margin: 0;
          padding: 0;
          background-color: #f3f4f6;
          font-family: Arial, Helvetica, sans-serif;
          color: #111827;
        "
      >
        <div
          style="
            display: none;
            max-height: 0;
            overflow: hidden;
            opacity: 0;
          "
        >
          New inquiry from ${escapeHtml(inquiry.name)}
        </div>

        <table
          role="presentation"
          width="100%"
          cellspacing="0"
          cellpadding="0"
          style="background-color: #f3f4f6; padding: 32px 12px;"
        >
          <tr>
            <td align="center">
              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                style="
                  max-width: 640px;
                  background-color: #ffffff;
                  border-radius: 12px;
                  overflow: hidden;
                  border: 1px solid #e5e7eb;
                "
              >
                <tr>
                  <td
                    style="
                      padding: 26px 30px;
                      background-color: #111827;
                      color: #ffffff;
                    "
                  >
                    <div
                      style="
                        font-size: 12px;
                        font-weight: 700;
                        letter-spacing: 1.5px;
                        text-transform: uppercase;
                        opacity: 0.75;
                      "
                    >
                      Gara Media
                    </div>

                    <h1
                      style="
                        margin: 8px 0 0;
                        font-size: 24px;
                        line-height: 1.3;
                      "
                    >
                      New client inquiry
                    </h1>

                    <p
                      style="
                        margin: 8px 0 0;
                        font-size: 14px;
                        line-height: 1.5;
                        opacity: 0.8;
                      "
                    >
                      ${escapeHtml(
                        inquiry.name,
                      )} submitted a new request.
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 28px 30px 12px;">
                    <h2
                      style="
                        margin: 0 0 14px;
                        font-size: 17px;
                        color: #111827;
                      "
                    >
                      Client information
                    </h2>

                    <table
                      role="presentation"
                      width="100%"
                      cellspacing="0"
                      cellpadding="0"
                      style="
                        border: 1px solid #e5e7eb;
                        border-radius: 8px;
                        overflow: hidden;
                        border-collapse: separate;
                        border-spacing: 0;
                      "
                    >
                      ${createDetailRow(
                        'Inquiry ID',
                        String(inquiry.id),
                      )}

                      ${createDetailRow(
                        'Engagement',
                        inquiry.engagement,
                      )}

                      ${createDetailRow(
                        'Name',
                        inquiry.name,
                      )}

                      ${createDetailRow(
                        'Email',
                        inquiry.email,
                      )}

                      ${createDetailRow(
                        'Company',
                        displayValue(inquiry.company),
                      )}

                      ${createDetailRow(
                        'Phone',
                        displayValue(inquiry.phone),
                      )}

                      ${createDetailRow(
                        'Services',
                        selectedServices,
                      )}

                      ${createDetailRow(
                        'Budget',
                        displayValue(inquiry.budget),
                      )}

                      ${createDetailRow(
                        'Timeline',
                        displayValue(inquiry.timeline),
                      )}

                      ${createDetailRow(
                        'Submitted',
                        submittedAt,
                      )}
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 18px 30px 30px;">
                    <h2
                      style="
                        margin: 0 0 12px;
                        font-size: 17px;
                        color: #111827;
                      "
                    >
                      Client message
                    </h2>

                    <div
                      style="
                        padding: 18px;
                        background-color: #f9fafb;
                        border-left: 4px solid #111827;
                        border-radius: 6px;
                        color: #374151;
                        font-size: 15px;
                        line-height: 1.7;
                        word-break: break-word;
                      "
                    >
                      ${messageHtml}
                    </div>

                    <p
                      style="
                        margin: 22px 0 0;
                        color: #6b7280;
                        font-size: 13px;
                        line-height: 1.5;
                      "
                    >
                      Reply directly to this email to contact
                      ${escapeHtml(inquiry.name)} at
                      ${escapeHtml(inquiry.email)}.
                    </p>
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding: 18px 30px;
                      background-color: #f9fafb;
                      border-top: 1px solid #e5e7eb;
                      color: #9ca3af;
                      font-size: 12px;
                      text-align: center;
                    "
                  >
                    Gara Media website inquiry notification
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: [contactEmail],
    replyTo: inquiry.email,
    subject: `New inquiry from ${inquiry.name} — ${selectedServices}`,
    text,
    html,
  })

  if (error) {
    throw new Error(
      `Resend delivery failed: ${error.message}`,
    )
  }
}