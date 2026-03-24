'use client'

import { useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleNewsletter(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (data.success) {
        toast.success('Welcome to our private circle.')
        setEmail('')
      } else {
        toast.error(data.error || 'Subscription failed.')
      }
    } catch {
      toast.error('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
      <div className="px-[60px] pt-[60px] pb-10">
        {/* Newsletter Strip */}
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 mb-12"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <div>
            <span className="section-label">Private Dispatches</span>
            <p className="font-display text-[22px] font-light" style={{ color: 'var(--white)' }}>
              Join our inner circle
            </p>
          </div>
          <form onSubmit={handleNewsletter} className="flex gap-0 w-full md:w-[440px]">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email address"
              className="input-gold flex-1"
              style={{ borderBottom: '1px solid var(--border-s)' }}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-primary ml-4 whitespace-nowrap"
              style={{ cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? '...' : 'Subscribe'}
            </button>
          </form>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-14 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="font-display text-[20px] font-light tracking-[8px] no-underline block mb-4"
              style={{ color: 'var(--gold)' }}
            >
              NOIR<span style={{ color: 'var(--white)' }}> ESTATE</span>
            </Link>
            <p className="text-[11px] font-extralight leading-relaxed" style={{ color: 'var(--muted)', maxWidth: 240 }}>
              The world's most distinguished luxury real estate consultancy. Where architecture meets aspiration.
            </p>
          </div>

          {/* Properties */}
          <FooterCol title="Properties" links={[
            { label: 'Penthouses',    href: '/properties?category=penthouse' },
            { label: 'Villas',        href: '/properties?category=villa' },
            { label: 'Estates',       href: '/properties?category=estate' },
            { label: 'Off-Market',    href: '/properties?status=off_market' },
            { label: 'New Listings',  href: '/properties?status=new' },
          ]} />

          {/* Company */}
          <FooterCol title="Company" links={[
            { label: 'Our Story',  href: '/about' },
            { label: 'Our Team',   href: '/about#team' },
            { label: 'Journal',    href: '/journal' },
            { label: 'Press',      href: '/about#press' },
            { label: 'Careers',    href: '/about#careers' },
          ]} />

          {/* Offices */}
          <div>
            <h4 className="text-[9px] font-light tracking-[4px] uppercase mb-5" style={{ color: 'var(--gold)' }}>
              Global Offices
            </h4>
            <ul className="space-y-3">
              {[
                { city: 'New York',  detail: '+1 212 555 0100' },
                { city: 'London',    detail: '+44 20 7946 0100' },
                { city: 'Monaco',    detail: '+377 99 99 0100' },
                { city: 'Dubai',     detail: '+971 4 555 0100' },
              ].map(o => (
                <li key={o.city}>
                  <p className="text-[11px] font-light" style={{ color: 'var(--white)' }}>{o.city}</p>
                  <p className="text-[10px] font-extralight" style={{ color: 'var(--muted)' }}>{o.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <span className="text-[10px] font-extralight tracking-wide" style={{ color: 'var(--muted)' }}>
            © {new Date().getFullYear()} NOIR Estate. All rights reserved.
          </span>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms', 'Cookies'].map(item => (
              <Link
                key={item}
                href="#"
                className="text-[9px] font-light tracking-[2px] uppercase no-underline transition-colors duration-300 hover:text-gold"
                style={{ color: 'var(--muted)' }}
              >
                {item}
              </Link>
            ))}
          </div>
          <div className="flex gap-5">
            {['Instagram', 'LinkedIn', 'WeChat'].map(s => (
              <a
                key={s}
                href="#"
                className="text-[9px] font-light tracking-[3px] uppercase no-underline transition-colors duration-300 hover:text-gold"
                style={{ color: 'var(--muted)' }}
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="text-[9px] font-light tracking-[4px] uppercase mb-5" style={{ color: 'var(--gold)' }}>
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map(l => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-[11px] font-extralight tracking-wide no-underline transition-colors duration-300 hover:text-cream"
              style={{ color: 'var(--muted)' }}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
