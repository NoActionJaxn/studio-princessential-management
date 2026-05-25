import { env } from 'node:process'
import { documentEventHandler } from '@sanity/functions'
import { createClient } from '@sanity/client'

const {
  MAILERSEND_API_KEY = '',
  MAILERSEND_FROM_EMAIL = '',
} = env

interface PostData {
  _id: string
  name: string;
  email: string;
  phone?: string;
  company: string;
  event?: string;
  purpose: string;
  message: string;
}

function buildPlainText(doc: Record<string, string>): string {
  return [
    `New Business Inquiry`,
    `---`,
    `Name:    ${doc.name}`,
    `Email:   ${doc.email}`,
    `Phone:   ${doc.phone}`,
    `Company: ${doc.company}`,
    `Event:   ${doc.event}`,
    `Purpose: ${doc.purpose}`,
    ``,
    `Message:`,
    doc.message,
  ].join('\n')
}

function buildHtml(doc: Record<string, string>): string {
  const initials = doc.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body { margin: 0; padding: 0; background: #f4f4f0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    a { color: inherit; text-decoration: none; }
  </style>
</head>
<body>
  <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 16px;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; overflow:hidden; border:1px solid #e5e5e0;">

        <!-- Header -->
        <tr>
          <td style="background:#1a1a1a; padding:32px 40px;">
            <p style="font-size:11px; letter-spacing:0.08em; color:#888; margin:0 0 6px; text-transform:uppercase;">Business Inquiry</p>
            <p style="font-size:22px; font-weight:500; color:#ffffff; margin:0;">New inquiry received</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px 40px;">

            <!-- Sender -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px; padding-bottom:24px; border-bottom:1px solid #e5e5e0;">
              <tr>
                <td width="48" valign="middle">
                  <div style="width:48px; height:48px; border-radius:50%; background:#EEEDFE; text-align:center; line-height:48px; font-size:15px; font-weight:500; color:#3C3489;">${initials}</div>
                </td>
                <td style="padding-left:14px;" valign="middle">
                  <p style="font-size:15px; font-weight:500; color:#111; margin:0;">${doc.name}</p>
                  <p style="font-size:13px; color:#666; margin:4px 0 0;">${doc.company}</p>
                </td>
              </tr>
            </table>

            <!-- Detail grid (2-col table for email clients) -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              <tr>
                <td width="50%" style="padding:0 6px 12px 0;">
                  <table width="100%" cellpadding="12" style="background:#f9f9f7; border-radius:8px;">
                    <tr><td>
                      <p style="font-size:11px; letter-spacing:0.06em; color:#999; margin:0 0 4px; text-transform:uppercase;">Email</p>
                      <p style="font-size:13px; font-weight:500; color:#111; margin:0; word-break:break-all;">
                        <a href="mailto:${doc.email}" style="color:#111;">${doc.email}</a>
                      </p>
                    </td></tr>
                  </table>
                </td>
                <td width="50%" style="padding:0 0 12px 6px;">
                  <table width="100%" cellpadding="12" style="background:#f9f9f7; border-radius:8px;">
                    <tr><td>
                      <p style="font-size:11px; letter-spacing:0.06em; color:#999; margin:0 0 4px; text-transform:uppercase;">Phone</p>
                      <p style="font-size:13px; font-weight:500; color:#111; margin:0;">
                        <a href="tel:${doc.phone}" style="color:#111;">${doc.phone ?? '-'}</a>
                      </p>
                    </td></tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td width="50%" style="padding:0 6px 0 0;">
                  <table width="100%" cellpadding="12" style="background:#f9f9f7; border-radius:8px;">
                    <tr><td>
                      <p style="font-size:11px; letter-spacing:0.06em; color:#999; margin:0 0 4px; text-transform:uppercase;">Event</p>
                      <p style="font-size:13px; font-weight:500; color:#111; margin:0;">${doc.event ?? '-'}</p>
                    </td></tr>
                  </table>
                </td>
                <td width="50%" style="padding:0 0 0 6px;">
                  <table width="100%" cellpadding="12" style="background:#f9f9f7; border-radius:8px;">
                    <tr><td>
                      <p style="font-size:11px; letter-spacing:0.06em; color:#999; margin:0 0 4px; text-transform:uppercase;">Purpose</p>
                      <p style="font-size:13px; font-weight:500; color:#111; margin:0;">${doc.purpose}</p>
                    </td></tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Message -->
            <table width="100%" cellpadding="16" cellspacing="0" style="border:1px solid #e5e5e0; border-radius:8px; margin-bottom:24px;">
              <tr><td>
                <p style="font-size:11px; letter-spacing:0.06em; color:#999; margin:0 0 8px; text-transform:uppercase;">Message</p>
                <p style="font-size:14px; color:#333; line-height:1.7; margin:0; white-space:pre-wrap;">${doc.message}</p>
              </td></tr>
            </table>

            <!-- CTA -->
            <a href="mailto:${doc.email}" style="display:inline-block; background:#1a1a1a; color:#ffffff; font-size:13px; font-weight:500; padding:10px 20px; border-radius:8px; text-decoration:none;">
              Reply to ${doc.name} →
            </a>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 40px; border-top:1px solid #e5e5e0;">
            <p style="font-size:12px; color:#999; margin:0;">This message was submitted via the contact form on your website.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
`
}

export const handler = documentEventHandler<PostData>(async ({ event, context }) => {

  const client = createClient({
    ...context.clientOptions,
    apiVersion: '2026-05-23',
    useCdn: false,
  })

  const contactPage = await client.fetch(
    `*[_type == "contactPage" && _id == "contactPage"][0]{ targetEmail }`
  )

  if (!contactPage?.targetEmail) {
    throw new Error('No targetEmail found on contactPage document')
  }

  const data = {
    _id: event.data._id,
    name: event.data.name,
    email: event.data.email,
    company: event.data.company,
    event: event.data?.event ?? "-",
    phone: event.data?.phone ?? "-",
    purpose: event.data.purpose,
    message: event.data.message,
  }

  const payload = {
    from: { email: MAILERSEND_FROM_EMAIL, name: data.name },
    to: [{ email: contactPage.targetEmail }],
    subject: `New Business Inquiry from ${data.name} — ${data.company}`,
    text: buildPlainText(data),
    html: buildHtml(data),
  }

  const response = await fetch('https://api.mailersend.com/v1/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${MAILERSEND_API_KEY}`,
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
  const errorBody = await response.text()
  throw new Error(`MailerSend API error: ${response.status} ${response.statusText} — ${errorBody}`)
}

  console.log('Email sent successfully via MailerSend')
});
