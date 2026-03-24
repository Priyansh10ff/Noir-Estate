import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendBookingConfirmationEmail } from '@/lib/email'

const BookingSchema = z.object({
  firstName:     z.string().min(1),
  lastName:      z.string().min(1),
  email:         z.string().email(),
  phone:         z.string().min(1, 'Phone number is required'),
  propertyId:    z.string().optional(),
  propertyTitle: z.string().optional(),
  preferredDate: z.string().min(1, 'Please select a date'),
  preferredTime: z.string().min(1, 'Please select a time'),
  viewingType:   z.enum(['in_person', 'virtual']),
  message:       z.string().optional().default(''),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = BookingSchema.parse(body)

    // Send confirmation emails via Resend
    await sendBookingConfirmationEmail(data)

    // Optional: Create Cal.com booking via API
    // If you have Cal.com API key, you can programmatically create the booking:
    // await createCalComBooking(data)

    return NextResponse.json({
      success: true,
      message: 'Your viewing request has been submitted. We will confirm your appointment shortly.',
      bookingRef: `NE-${Date.now().toString(36).toUpperCase()}`,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Please check all required fields.', details: error.errors },
        { status: 400 }
      )
    }
    console.error('Booking API error:', error)
    return NextResponse.json(
      { success: false, error: 'Booking failed. Please try again or call us directly.' },
      { status: 500 }
    )
  }
}

// ─── Cal.com API Integration (optional) ──────────────────────────────────────
// async function createCalComBooking(data: z.infer<typeof BookingSchema>) {
//   const response = await fetch('https://api.cal.com/v1/bookings', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${process.env.CALCOM_API_KEY}`,
//     },
//     body: JSON.stringify({
//       eventTypeId: parseInt(process.env.CALCOM_EVENT_TYPE_ID!),
//       start: `${data.preferredDate}T${data.preferredTime}:00.000Z`,
//       responses: {
//         name: `${data.firstName} ${data.lastName}`,
//         email: data.email,
//         phone: data.phone,
//         notes: data.message,
//       },
//       timeZone: 'Europe/London',
//       language: 'en',
//       metadata: { propertyId: data.propertyId, propertyTitle: data.propertyTitle },
//     }),
//   })
//   return response.json()
// }
