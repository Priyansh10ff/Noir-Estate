'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Building2, MessageSquare, Calendar, FileText, Settings, LogOut, ExternalLink } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Dashboard',   href: '/admin',             icon: <LayoutDashboard size={16} /> },
  { label: 'Properties',  href: '/admin/properties',  icon: <Building2 size={16} /> },
  { label: 'Inquiries',   href: '/admin/inquiries',   icon: <MessageSquare size={16} /> },
  { label: 'Bookings',    href: '/admin/bookings',    icon: <Calendar size={16} /> },
  { label: 'Journal',     href: '/admin/journal',     icon: <FileText size={16} /> },
  { label: 'Settings',    href: '/admin/settings',    icon: <Settings size={16} /> },
]

export default function AdminSidebar() {
  const pathname = usePathname() ?? ''

  return (
    <aside
      className="fixed top-0 left-0 h-full w-64 flex flex-col"
      style={{ background: 'var(--surface)', borderRight: '1px solid var(--border)', zIndex: 50 }}
    >
      {/* Logo */}
      <div className="px-6 py-8" style={{ borderBottom: '1px solid var(--border)' }}>
        <p className="font-display text-[18px] font-light tracking-[6px]" style={{ color: 'var(--gold)' }}>
          NOIR<span style={{ color: 'var(--white)' }}> ESTATE</span>
        </p>
        <p className="text-[8px] tracking-[3px] uppercase mt-1" style={{ color: 'var(--muted)' }}>Admin Portal</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(item => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 no-underline transition-all duration-200 rounded-none"
              style={{
                background:    isActive ? 'rgba(201,169,110,0.1)' : 'transparent',
                color:         isActive ? 'var(--gold)' : 'var(--muted)',
                borderLeft:    isActive ? '2px solid var(--gold)' : '2px solid transparent',
                fontSize:      10,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                fontWeight:    300,
              }}
            >
              <span style={{ color: isActive ? 'var(--gold)' : 'var(--muted)' }}>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer Links */}
      <div className="px-4 py-4 space-y-1" style={{ borderTop: '1px solid var(--border)' }}>
        <a
          href="/studio"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 no-underline transition-colors duration-200 text-[10px] tracking-[2px] uppercase"
          style={{ color: 'var(--muted)', fontWeight: 300 }}
        >
          <ExternalLink size={14} />
          Sanity Studio
        </a>
        <a
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 no-underline transition-colors duration-200 text-[10px] tracking-[2px] uppercase"
          style={{ color: 'var(--muted)', fontWeight: 300 }}
        >
          <ExternalLink size={14} />
          View Site
        </a>
        <form action="/api/admin/logout" method="POST">
          <button
            type="submit"
            className="flex items-center gap-3 px-4 py-3 w-full text-left transition-colors duration-200 text-[10px] tracking-[2px] uppercase"
            style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontWeight: 300, fontFamily: 'Montserrat, sans-serif' }}
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  )
}
