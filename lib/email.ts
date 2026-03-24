import { Resend } from 'resend'
import type { InquiryFormData, BookingFormData } from '@/types'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM   = process.env.RESEND_FROM_EMAIL!
const TO     = process.env.RESEND_TO_EMAIL!

// ─── Inquiry Email ────────────────────────────────────────────────────────────

export async function sendInquiryEmail(data: InquiryFormData) {
  const subject = data.propertyTitle
    ? `New Inquiry: ${data.propertyTitle}`
    : `New ${data.type} Inquiry from ${data.firstName} ${data.lastName}`

  // Email to the agency
  await resend.emails.send({
    from: FROM,
    to:   TO,
    subject,
    html: `
      <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#111;color:#f5f0e8;padding:40px;">
        <div style="border-bottom:1px solid rgba(201,169,110,0.3);padding-bottom:24px;margin-bottom:24px;">
          <h1 style="font-size:28px;font-weight:300;color:#C9A96E;letter-spacing:4px;text-transform:uppercase;">
            NOIR ESTATE
          </h1>
          <p style="font-size:11px;letter-spacing:3px;color:#888;margin-top:4px;">NEW INQUIRY RECEIVED</p>
        </div>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:10px 0;border-bottom:1px solid #1f1f1f;color:#888;font-size:12px;letter-spacing:1px;width:140px;">Name</td>
              <td style="padding:10px 0;border-bottom:1px solid #1f1f1f;font-size:13px;">${data.firstName} ${data.lastName}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #1f1f1f;color:#888;font-size:12px;letter-spacing:1px;">Email</td>
              <td style="padding:10px 0;border-bottom:1px solid #1f1f1f;font-size:13px;color:#C9A96E;">${data.email}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #1f1f1f;color:#888;font-size:12px;letter-spacing:1px;">Phone</td>
              <td style="padding:10px 0;border-bottom:1px solid #1f1f1f;font-size:13px;">${data.phone || '—'}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #1f1f1f;color:#888;font-size:12px;letter-spacing:1px;">Type</td>
              <td style="padding:10px 0;border-bottom:1px solid #1f1f1f;font-size:13px;text-transform:capitalize;">${data.type}</td></tr>
          ${data.budget ? `<tr><td style="padding:10px 0;border-bottom:1px solid #1f1f1f;color:#888;font-size:12px;letter-spacing:1px;">Budget</td>
              <td style="padding:10px 0;border-bottom:1px solid #1f1f1f;font-size:13px;">${data.budget}</td></tr>` : ''}
          ${data.propertyTitle ? `<tr><td style="padding:10px 0;border-bottom:1px solid #1f1f1f;color:#888;font-size:12px;letter-spacing:1px;">Property</td>
              <td style="padding:10px 0;border-bottom:1px solid #1f1f1f;font-size:13px;">${data.propertyTitle}</td></tr>` : ''}
        </table>
        <div style="margin-top:24px;padding:20px;background:#181818;border-left:2px solid #C9A96E;">
          <p style="font-size:12px;color:#888;letter-spacing:2px;margin-bottom:8px;">MESSAGE</p>
          <p style="font-size:13px;line-height:1.8;font-style:italic;">"${data.message}"</p>
        </div>
      </div>
    `,
  })

  // Auto-reply to the client
  await resend.emails.send({
    from: FROM,
    to:   data.email,
    subject: 'Thank you for your inquiry — NOIR Estate',
    html: `
      <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#111;color:#f5f0e8;padding:40px;">
        <h1 style="font-size:28px;font-weight:300;color:#C9A96E;letter-spacing:4px;text-transform:uppercase;margin-bottom:8px;">NOIR ESTATE</h1>
        <p style="font-size:11px;letter-spacing:3px;color:#888;margin-bottom:32px;">PRIVATE RESIDENCES</p>
        <p style="font-size:15px;font-weight:300;margin-bottom:16px;">Dear ${data.firstName},</p>
        <p style="font-size:13px;line-height:2;color:#ccc;">
          Thank you for reaching out to NOIR Estate. We have received your inquiry and a member of our private client team will be in contact with you within 24 hours.
        </p>
        <p style="font-size:13px;line-height:2;color:#ccc;margin-top:16px;">
          In the meantime, you are welcome to explore our current collection of exclusive properties at your leisure.
        </p>
        <div style="margin:32px 0;border-top:1px solid rgba(201,169,110,0.2);border-bottom:1px solid rgba(201,169,110,0.2);padding:20px 0;">
          <p style="font-size:11px;letter-spacing:3px;color:#888;margin-bottom:4px;">YOUR REFERENCE</p>
          <p style="font-size:18px;font-style:italic;color:#C9A96E;">#NE-${Date.now().toString(36).toUpperCase()}</p>
        </div>
        <p style="font-size:12px;color:#888;margin-top:24px;">With warmest regards,</p>
        <p style="font-size:14px;font-weight:300;color:#f5f0e8;">The NOIR Estate Private Client Team</p>
      </div>
    `,
  })
}

// ─── Booking Confirmation Email ───────────────────────────────────────────────

export async function sendBookingConfirmationEmail(data: BookingFormData) {
  const viewingLabel = data.viewingType === 'virtual' ? 'Virtual Viewing' : 'In-Person Viewing'

  await resend.emails.send({
    from: FROM,
    to:   TO,
    subject: `Viewing Request: ${data.propertyTitle || 'Private Viewing'} — ${data.preferredDate}`,
    html: `
      <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#111;color:#f5f0e8;padding:40px;">
        <h1 style="font-size:28px;font-weight:300;color:#C9A96E;letter-spacing:4px;margin-bottom:4px;">NOIR ESTATE</h1>
        <p style="font-size:11px;letter-spacing:3px;color:#888;margin-bottom:32px;">VIEWING REQUEST</p>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:10px 0;border-bottom:1px solid #1f1f1f;color:#888;font-size:12px;width:160px;">Client</td>
              <td style="padding:10px 0;border-bottom:1px solid #1f1f1f;font-size:13px;">${data.firstName} ${data.lastName}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #1f1f1f;color:#888;font-size:12px;">Email</td>
              <td style="padding:10px 0;border-bottom:1px solid #1f1f1f;font-size:13px;color:#C9A96E;">${data.email}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #1f1f1f;color:#888;font-size:12px;">Property</td>
              <td style="padding:10px 0;border-bottom:1px solid #1f1f1f;font-size:13px;">${data.propertyTitle || 'General Viewing'}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #1f1f1f;color:#888;font-size:12px;">Type</td>
              <td style="padding:10px 0;border-bottom:1px solid #1f1f1f;font-size:13px;">${viewingLabel}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #1f1f1f;color:#888;font-size:12px;">Date</td>
              <td style="padding:10px 0;border-bottom:1px solid #1f1f1f;font-size:13px;color:#C9A96E;">${data.preferredDate} at ${data.preferredTime}</td></tr>
        </table>
      </div>
    `,
  })

  // Client confirmation
  await resend.emails.send({
    from: FROM,
    to:   data.email,
    subject: `Your viewing has been requested — NOIR Estate`,
    html: `
      <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#111;color:#f5f0e8;padding:40px;">
        <h1 style="font-size:28px;font-weight:300;color:#C9A96E;letter-spacing:4px;margin-bottom:4px;">NOIR ESTATE</h1>
        <p style="font-size:11px;letter-spacing:3px;color:#888;margin-bottom:32px;">VIEWING CONFIRMATION</p>
        <p style="font-size:15px;margin-bottom:16px;">Dear ${data.firstName},</p>
        <p style="font-size:13px;line-height:2;color:#ccc;">
          Your ${viewingLabel.toLowerCase()} request has been received. Our team will confirm the appointment and send you full details shortly.
        </p>
        <div style="margin:32px 0;padding:24px;background:#181818;border:1px solid rgba(201,169,110,0.2);">
          <p style="font-size:11px;letter-spacing:3px;color:#888;margin-bottom:16px;">APPOINTMENT DETAILS</p>
          <p style="font-size:13px;margin-bottom:8px;">Property: <span style="color:#C9A96E;">${data.propertyTitle || 'Private Viewing'}</span></p>
          <p style="font-size:13px;margin-bottom:8px;">Requested date: <span style="color:#C9A96E;">${data.preferredDate} at ${data.preferredTime}</span></p>
          <p style="font-size:13px;">Format: <span style="color:#C9A96E;">${viewingLabel}</span></p>
        </div>
        <p style="font-size:12px;color:#888;">NOIR Estate Private Client Team</p>
      </div>
    `,
  })
}

// ─── Newsletter ───────────────────────────────────────────────────────────────

export async function sendNewsletterWelcomeEmail(email: string) {
  await resend.emails.send({
    from: FROM,
    to:   email,
    subject: 'Welcome to the NOIR Estate Private Collection',
    html: `
      <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#111;color:#f5f0e8;padding:40px;text-align:center;">
        <h1 style="font-size:32px;font-weight:300;color:#C9A96E;letter-spacing:6px;text-transform:uppercase;">NOIR ESTATE</h1>
        <div style="width:60px;height:1px;background:#8B6F43;margin:20px auto;"></div>
        <p style="font-size:18px;font-style:italic;font-weight:300;margin-bottom:16px;">You are now part of our private circle.</p>
        <p style="font-size:12px;line-height:2;color:#888;max-width:400px;margin:0 auto;">
          Expect curated dispatches: off-market listings, architectural discoveries, and private event invitations — all before they reach the open market.
        </p>
      </div>
    `,
  })
}
