'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        padding: scrolled ? '16px 60px' : '24px 60px',
        background: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,169,110,0.15)' : '1px solid transparent',
      }}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-[22px] font-light tracking-[8px] text-gold no-underline"
        >
          NOIR<span className="text-cream"> ESTATE</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-10 list-none">
          {[
            { label: 'Properties', href: '/properties' },
            { label: 'Services',   href: '/#services' },
            { label: 'About',      href: '/about' },
            { label: 'Journal',    href: '/journal' },
          ].map(item => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-[10px] font-light tracking-[3px] uppercase text-muted no-underline transition-colors duration-300 hover:text-gold"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link href="/contact" className="hidden md:block">
          <button
            className="text-[10px] font-light tracking-[3px] uppercase bg-transparent border border-gold-s text-gold px-6 py-2.5 cursor-pointer transition-all duration-300 hover:bg-gold hover:text-noir-black"
            style={{ border: '1px solid rgba(201,169,110,0.35)' }}
          >
            Private Viewing
          </button>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gold"
          onClick={() => setMenuOpen(v => !v)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden mt-6 pb-6 border-t flex flex-col gap-6 pt-6"
          style={{ borderColor: 'rgba(201,169,110,0.15)' }}
        >
          {[
            { label: 'Properties', href: '/properties' },
            { label: 'Services',   href: '/#services' },
            { label: 'About',      href: '/about' },
            { label: 'Journal',    href: '/journal' },
            { label: 'Contact',    href: '/contact' },
          ].map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[10px] font-light tracking-[4px] uppercase text-muted hover:text-gold transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
