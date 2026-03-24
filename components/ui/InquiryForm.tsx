'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'

const schema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName:  z.string().min(1, 'Required'),
  email:     z.string().email('Valid email required'),
  phone:     z.string().optional(),
  budget:    z.string().optional(),
  message:   z.string().min(10, 'Please provide more detail'),
  type:      z.enum(['general', 'property', 'valuation', 'buying', 'selling']).default('general'),
})

type FormData = z.infer<typeof schema>

interface InquiryFormProps {
  propertyId?:    string
  propertyTitle?: string
  defaultType?:   FormData['type']
  onSuccess?:     () => void
}

export default function InquiryForm({
  propertyId,
  propertyTitle,
  defaultType = 'general',
  onSuccess,
}: InquiryFormProps) {
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { type: defaultType },
  })

  async function onSubmit(data: FormData) {
    setLoading(true)
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, propertyId, propertyTitle }),
      })
      const result = await res.json()
      if (result.success) {
        toast.success('Your inquiry has been received.')
        reset()
        onSuccess?.()
      } else {
        toast.error(result.error || 'Something went wrong.')
      }
    } catch {
      toast.error('Failed to send. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {propertyTitle && (
        <div className="p-4 mb-2" style={{ background: 'var(--surface2)', borderLeft: '2px solid var(--gold)' }}>
          <p className="text-[9px] tracking-[3px] uppercase mb-1" style={{ color: 'var(--gold)' }}>Regarding Property</p>
          <p className="text-[13px] font-light">{propertyTitle}</p>
        </div>
      )}

      {/* Type selector */}
      <div>
        <label className="text-[9px] tracking-[3px] uppercase block mb-3" style={{ color: 'var(--muted)' }}>Inquiry Type</label>
        <select {...register('type')} className="input-gold" style={{ background: 'transparent' }}>
          <option value="general"   style={{ background: '#181818' }}>General Inquiry</option>
          <option value="property"  style={{ background: '#181818' }}>Property Inquiry</option>
          <option value="buying"    style={{ background: '#181818' }}>I Want to Buy</option>
          <option value="selling"   style={{ background: '#181818' }}>I Want to Sell</option>
          <option value="valuation" style={{ background: '#181818' }}>Property Valuation</option>
        </select>
      </div>

      {/* Name row */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <input {...register('firstName')} placeholder="First Name" className="input-gold" />
          {errors.firstName && <p className="text-[10px] text-red-400 mt-1">{errors.firstName.message}</p>}
        </div>
        <div>
          <input {...register('lastName')} placeholder="Last Name" className="input-gold" />
          {errors.lastName && <p className="text-[10px] text-red-400 mt-1">{errors.lastName.message}</p>}
        </div>
      </div>

      {/* Contact row */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <input {...register('email')} type="email" placeholder="Email Address" className="input-gold" />
          {errors.email && <p className="text-[10px] text-red-400 mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <input {...register('phone')} type="tel" placeholder="Phone Number" className="input-gold" />
        </div>
      </div>

      {/* Budget */}
      <div>
        <select {...register('budget')} className="input-gold" style={{ background: 'transparent' }}>
          <option value="" style={{ background: '#181818' }}>Budget Range (Optional)</option>
          <option value="1M-5M"  style={{ background: '#181818' }}>$1M – $5M</option>
          <option value="5M-10M" style={{ background: '#181818' }}>$5M – $10M</option>
          <option value="10M-25M" style={{ background: '#181818' }}>$10M – $25M</option>
          <option value="25M-50M" style={{ background: '#181818' }}>$25M – $50M</option>
          <option value="50M+"    style={{ background: '#181818' }}>$50M+</option>
          <option value="POA"     style={{ background: '#181818' }}>Prefer not to say</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <textarea
          {...register('message')}
          placeholder="Your message..."
          rows={4}
          className="input-gold resize-none"
          style={{ borderBottom: '1px solid var(--border-s)', paddingTop: 8 }}
        />
        {errors.message && <p className="text-[10px] text-red-400 mt-1">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full text-center"
        style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'wait' : 'pointer' }}
      >
        {loading ? 'Sending...' : 'Send Inquiry'}
      </button>

      <p className="text-[9px] font-light tracking-wide text-center" style={{ color: 'var(--muted)' }}>
        We respond within 24 hours. Complete discretion guaranteed.
      </p>
    </form>
  )
}
