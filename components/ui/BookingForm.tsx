'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { generateTimeSlots, getMinBookingDate } from '@/lib/utils'

const schema = z.object({
  firstName:     z.string().min(1, 'Required'),
  lastName:      z.string().min(1, 'Required'),
  email:         z.string().email('Valid email required'),
  phone:         z.string().min(1, 'Phone number required'),
  preferredDate: z.string().min(1, 'Please select a date'),
  preferredTime: z.string().min(1, 'Please select a time'),
  viewingType:   z.enum(['in_person', 'virtual']),
  message:       z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface BookingFormProps {
  propertyId?:    string
  propertyTitle?: string
  onSuccess?:     (ref: string) => void
}

const TIME_SLOTS = generateTimeSlots()

export default function BookingForm({ propertyId, propertyTitle, onSuccess }: BookingFormProps) {
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState<'form' | 'calcom'>('form')

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { viewingType: 'in_person' },
  })

  const viewingType = watch('viewingType')

  async function onSubmit(data: FormData) {
    setLoading(true)
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, propertyId, propertyTitle }),
      })
      const result = await res.json()
      if (result.success) {
        toast.success('Viewing request submitted successfully!')
        reset()
        onSuccess?.(result.bookingRef)
      } else {
        toast.error(result.error || 'Something went wrong.')
      }
    } catch {
      toast.error('Failed to submit. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Mode Toggle */}
      <div className="flex gap-0 mb-8" style={{ borderBottom: '1px solid var(--border)' }}>
        {[
          { id: 'form',   label: 'Request Viewing' },
          { id: 'calcom', label: 'Book via Cal.com' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setMode(tab.id as typeof mode)}
            className="text-[9px] tracking-[3px] uppercase pb-3 px-1 mr-8 transition-all duration-300"
            style={{
              background: 'none',
              border: 'none',
              borderBottom: mode === tab.id ? '1px solid var(--gold)' : '1px solid transparent',
              color: mode === tab.id ? 'var(--gold)' : 'var(--muted)',
              cursor: 'pointer',
              marginBottom: -1,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {mode === 'calcom' ? (
        /* ── Cal.com Embed ───────────────────────────────────────── */
        <div>
          <p className="text-[11px] font-light leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
            Book directly into our agent's calendar with real-time availability.
          </p>
          <div
            className="rounded overflow-hidden"
            style={{ background: 'var(--surface2)', minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {/* Cal.com inline embed — replace with your Cal.com username */}
            {/* 
              To enable: npm install @calcom/embed-react
              Then replace this block with:
              
              import Cal from '@calcom/embed-react'
              <Cal
                calLink={`${process.env.NEXT_PUBLIC_CALCOM_USERNAME}/${process.env.NEXT_PUBLIC_CALCOM_EVENT_TYPE}`}
                style={{ width: '100%', height: '100%', overflow: 'scroll' }}
                config={{ theme: 'dark', hideEventTypeDetails: 'false' }}
              />
            */}
            <div className="text-center p-8">
              <p className="text-[9px] tracking-[4px] uppercase mb-3" style={{ color: 'var(--gold)' }}>Cal.com Integration</p>
              <p className="text-[12px] font-light" style={{ color: 'var(--muted)' }}>
                Set <code className="text-gold text-[11px]">NEXT_PUBLIC_CALCOM_USERNAME</code> in .env.local
                <br />and install <code className="text-gold text-[11px]">@calcom/embed-react</code> to enable live booking.
              </p>
              <a
                href="https://cal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost inline-block mt-6 text-[9px]"
              >
                Create Cal.com Account →
              </a>
            </div>
          </div>
        </div>
      ) : (
        /* ── Booking Form ────────────────────────────────────────── */
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {propertyTitle && (
            <div className="p-4" style={{ background: 'var(--surface2)', borderLeft: '2px solid var(--gold)' }}>
              <p className="text-[9px] tracking-[3px] uppercase mb-1" style={{ color: 'var(--gold)' }}>Property</p>
              <p className="text-[13px] font-light">{propertyTitle}</p>
            </div>
          )}

          {/* Viewing type */}
          <div>
            <label className="text-[9px] tracking-[3px] uppercase block mb-3" style={{ color: 'var(--muted)' }}>
              Viewing Format
            </label>
            <div className="flex gap-4">
              {[
                { value: 'in_person', label: 'In-Person' },
                { value: 'virtual',   label: 'Virtual Tour' },
              ].map(opt => (
                <label
                  key={opt.value}
                  className="flex items-center gap-2 cursor-pointer"
                  style={{ cursor: 'pointer' }}
                >
                  <input
                    type="radio"
                    value={opt.value}
                    {...register('viewingType')}
                    className="accent-gold"
                    style={{ accentColor: 'var(--gold)' }}
                  />
                  <span className="text-[11px] font-light">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Name */}
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

          {/* Contact */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <input {...register('email')} type="email" placeholder="Email Address" className="input-gold" />
              {errors.email && <p className="text-[10px] text-red-400 mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <input {...register('phone')} type="tel" placeholder="Phone Number" className="input-gold" />
              {errors.phone && <p className="text-[10px] text-red-400 mt-1">{errors.phone.message}</p>}
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <input
                {...register('preferredDate')}
                type="date"
                min={getMinBookingDate()}
                className="input-gold"
                style={{ colorScheme: 'dark' }}
              />
              {errors.preferredDate && <p className="text-[10px] text-red-400 mt-1">{errors.preferredDate.message}</p>}
            </div>
            <div>
              <select {...register('preferredTime')} className="input-gold" style={{ background: 'transparent' }}>
                <option value="" style={{ background: '#181818' }}>Preferred Time</option>
                {TIME_SLOTS.map(t => (
                  <option key={t} value={t} style={{ background: '#181818' }}>{t}</option>
                ))}
              </select>
              {errors.preferredTime && <p className="text-[10px] text-red-400 mt-1">{errors.preferredTime.message}</p>}
            </div>
          </div>

          {/* Notes */}
          <textarea
            {...register('message')}
            placeholder="Any special requirements or questions..."
            rows={3}
            className="input-gold resize-none"
            style={{ paddingTop: 8 }}
          />

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full text-center"
            style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'wait' : 'pointer' }}
          >
            {loading ? 'Submitting...' : `Request ${viewingType === 'virtual' ? 'Virtual' : 'In-Person'} Viewing`}
          </button>

          <p className="text-[9px] font-light tracking-wide text-center" style={{ color: 'var(--muted)' }}>
            Our team will confirm your appointment within 2 hours.
          </p>
        </form>
      )}
    </div>
  )
}
