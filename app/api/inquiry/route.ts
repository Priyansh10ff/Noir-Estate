import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendInquiryEmail } from '@/lib/email'

const InquirySchema = z.object({
  firstName:     z.string().min(1, 'First name is required'),
  lastName:      z.string().min(1, 'Last name is required'),
  email:         z.string().email('Valid email required'),
  phone:         z.string().optional().default(''),
  message:       z.string().min(10, 'Please provide more detail'),
  budget:        z.string().optional(),
  propertyId:    z.string().optional(),
  propertyTitle: z.string().optional(),
  type: z.enum(['general', 'property', 'valuation', 'buying', 'selling']).default('general'),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = InquirySchema.parse(body)

    await sendInquiryEmail(data)

    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been received. We will be in touch within 24 hours.',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    console.error('Inquiry API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send inquiry. Please try again.' },
      { status: 500 }
    )
  }
}
