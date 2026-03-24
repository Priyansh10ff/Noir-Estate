import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendNewsletterWelcomeEmail } from '@/lib/email'

const NewsletterSchema = z.object({
  email:       z.string().email('Valid email required'),
  preferences: z.array(z.enum(['new_listings', 'market_reports', 'events', 'journal'])).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email } = NewsletterSchema.parse(body)

    // Send welcome email via Resend
    await sendNewsletterWelcomeEmail(email)

    // Optional: Add to Resend audience / Mailchimp list
    // await addToAudience(email)

    return NextResponse.json({
      success: true,
      message: 'Welcome to our private circle.',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: 'Invalid email address' }, { status: 400 })
    }
    return NextResponse.json({ success: false, error: 'Subscription failed' }, { status: 500 })
  }
}
