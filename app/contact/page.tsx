import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CustomCursor from '@/components/ui/CustomCursor'
import RevealInit from '@/components/ui/RevealInit'
import InquiryForm from '@/components/ui/InquiryForm'
import BookingForm from '@/components/ui/BookingForm'
import { Phone, Mail, MapPin } from 'lucide-react'

export const metadata: Metadata = { title: 'Contact Us' }

const OFFICES = [
  { city: 'New York',  address: '432 Park Avenue, 80th Floor', phone: '+1 212 555 0100', email: 'newyork@noirestate.com'  },
  { city: 'London',    address: '1 Mayfair Place, W1J 8AJ',    phone: '+44 20 7946 0100',email: 'london@noirestate.com'   },
  { city: 'Monaco',    address: 'Le Metropole, Avenue des Beaux-Arts', phone: '+377 99 99 0100', email: 'monaco@noirestate.com' },
  { city: 'Dubai',     address: 'Burj Khalifa, Level 140',     phone: '+971 4 555 0100', email: 'dubai@noirestate.com'    },
]

export default function ContactPage() {
  return (
    <>
      <CustomCursor />
      <RevealInit />
      <Navbar />
      <main>
        {/* Header */}
        <div
          className="px-[60px] pt-40 pb-16 relative overflow-hidden"
          style={{
            background: `
              linear-gradient(rgba(10,10,10,0.88), rgba(10,10,10,0.88)),
              url('https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1600&q=80') center/cover
            `,
            borderBottom: '1px solid var(--border)',
          }}
        >
          <span className="section-label">Get in Touch</span>
          <h1 className="font-display font-light" style={{ fontSize: 'clamp(42px,6vw,76px)', lineHeight: 1.08 }}>
            Begin Your <em className="italic" style={{ color: 'var(--gold)' }}>Conversation</em>
          </h1>
          <div className="gold-line mt-4" />
          <p className="text-[12px] font-extralight tracking-[1px] mt-6 max-w-md" style={{ color: 'var(--muted)', lineHeight: 2 }}>
            Our private client team is available around the clock to answer your questions and arrange viewings at your convenience.
          </p>
        </div>

        {/* Forms + Info */}
        <div className="px-[60px] py-[80px] grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Forms */}
          <div className="space-y-12">
            {/* Inquiry Form */}
            <div className="reveal">
              <span className="section-label">Send an Inquiry</span>
              <h2 className="font-display text-[28px] font-light mb-6">How can we help you?</h2>
              <InquiryForm />
            </div>

            {/* Divider */}
            <div style={{ borderTop: '1px solid var(--border)' }} />

            {/* Booking Form */}
            <div className="reveal">
              <span className="section-label">Private Viewings</span>
              <h2 className="font-display text-[28px] font-light mb-6">Request an Appointment</h2>
              <BookingForm />
            </div>
          </div>

          {/* Right: Offices */}
          <div className="space-y-10 reveal">
            <div>
              <span className="section-label">Our Offices</span>
              <h2 className="font-display text-[28px] font-light mb-8">Global Presence</h2>
            </div>

            <div className="space-y-0" style={{ border: '1px solid var(--border)' }}>
              {OFFICES.map((office, i) => (
                <div
                  key={office.city}
                  className="p-8 transition-colors duration-300 hover:bg-surface2"
                  style={{
                    background: 'var(--surface)',
                    borderBottom: i < OFFICES.length - 1 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  <h3 className="font-display text-[20px] font-light mb-4">{office.city}</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <MapPin size={12} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--gold)' }} />
                      <span className="text-[11px] font-light" style={{ color: 'var(--muted)' }}>{office.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={12} style={{ color: 'var(--gold)' }} />
                      <a href={`tel:${office.phone}`} className="text-[11px] font-light no-underline hover:text-gold transition-colors" style={{ color: 'var(--muted)' }}>
                        {office.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail size={12} style={{ color: 'var(--gold)' }} />
                      <a href={`mailto:${office.email}`} className="text-[11px] font-light no-underline hover:text-gold transition-colors" style={{ color: 'var(--muted)' }}>
                        {office.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Availability notice */}
            <div className="p-6" style={{ background: 'var(--surface2)', borderLeft: '2px solid var(--gold)' }}>
              <p className="text-[9px] tracking-[3px] uppercase mb-2" style={{ color: 'var(--gold)' }}>Response Time</p>
              <p className="text-[12px] font-light leading-relaxed" style={{ color: 'var(--muted)' }}>
                All inquiries are acknowledged within 2 hours. We operate 24/7 for international clients across all time zones.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
