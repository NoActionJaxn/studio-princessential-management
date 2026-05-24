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
  return `
    <h2>New Business Inquiry</h2>
    <table cellpadding="6" style="border-collapse:collapse;">
      <tr><td><strong>Name</strong></td><td>${doc.name}</td></tr>
      <tr><td><strong>Email</strong></td><td><a href="mailto:${doc.email}">${doc.email}</a></td></tr>
      <tr><td><strong>Phone</strong></td><td><a href="tel:${doc.phone}">${doc.phone}</a></td></tr>
      <tr><td><strong>Company</strong></td><td>${doc.company}</td></tr>
      <tr><td><strong>Event</strong></td><td>${doc.event}</td></tr>
      <tr><td><strong>Purpose</strong></td><td>${doc.purpose}</td></tr>
    </table>
    <h3>Message</h3>
    <p style="white-space:pre-wrap;">${doc.message}</p>
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
    throw new Error(`MailerSend API error: ${response.status} ${response.statusText}`)
  }

  console.log('Email sent successfully via MailerSend')
});
