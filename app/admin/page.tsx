import type { Metadata } from 'next'
import { getAllProperties } from '@/lib/queries'
import { formatPrice } from '@/lib/utils'
import { TrendingUp, Home, Users, Calendar } from 'lucide-react'

export const metadata: Metadata = { title: 'Dashboard' }

export default async function AdminDashboardPage() {
  let properties: Awaited<ReturnType<typeof getAllProperties>> = []
  let totalValue = 0
  try {
    properties = await getAllProperties()
    totalValue = properties.reduce((sum, p) => sum + (p.price || 0), 0)
  } catch {}

  const stats = [
    { label: 'Active Listings',   value: properties.length || 24,   icon: <Home size={18} />,      color: 'var(--gold)' },
    { label: 'Portfolio Value',   value: formatPrice(totalValue || 245_000_000, 'USD'), icon: <TrendingUp size={18} />, color: '#4ade80' },
    { label: 'Inquiries (Month)', value: 38,  icon: <Users size={18} />,     color: '#60a5fa' },
    { label: 'Viewings Booked',   value: 12,  icon: <Calendar size={18} />,  color: '#f472b6' },
  ]

  const recentInquiries = [
    { name: 'James Harrington',  email: 'j.harrington@email.com', property: 'The Meridian Penthouse', type: 'Viewing Request', date: 'Today, 14:32',      status: 'New'     },
    { name: 'Amira Al-Rashid',   email: 'amira@rashid.ae',        property: 'Crystal Heights',        type: 'Property Inquiry', date: 'Today, 11:15',    status: 'New'     },
    { name: 'Oliver Blackwood',  email: 'o.blackwood@co.uk',      property: 'Obsidian Tower 42',      type: 'Valuation',        date: 'Yesterday, 16:45', status: 'Replied' },
    { name: 'Sophia Chen',       email: 'sophia.chen@mail.com',   property: 'Villa Serena',           type: 'Private Viewing',  date: 'Yesterday, 09:20', status: 'Booked'  },
    { name: 'Rafael Montoya',    email: 'r.montoya@invest.es',    property: 'General Inquiry',        type: 'Buying',           date: '2 days ago',       status: 'Replied' },
  ]

  const statusColors: Record<string, string> = {
    New:     '#fbbf24',
    Replied: '#60a5fa',
    Booked:  '#4ade80',
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-10" style={{ borderBottom: '1px solid var(--border)', paddingBottom: 24 }}>
        <span className="section-label">Overview</span>
        <h1 className="font-display text-[36px] font-light">Dashboard</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map(s => (
          <div
            key={s.label}
            className="p-6"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-[9px] tracking-[3px] uppercase" style={{ color: 'var(--muted)' }}>{s.label}</span>
              <span style={{ color: s.color }}>{s.icon}</span>
            </div>
            <p className="font-display text-[32px] font-light" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Inquiries Table */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="px-6 py-5" style={{ borderBottom: '1px solid var(--border)' }}>
          <h2 className="font-display text-[22px] font-light">Recent Inquiries</h2>
        </div>
        <div className="overflow-x-auto">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Client', 'Property', 'Type', 'Date', 'Status', 'Action'].map(h => (
                  <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontSize: 9, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 300 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentInquiries.map((inq, i) => (
                <tr
                  key={i}
                  className="transition-colors hover:bg-surface2"
                  style={{ borderBottom: i < recentInquiries.length - 1 ? '1px solid var(--border)' : 'none' }}
                >
                  <td style={{ padding: '14px 20px' }}>
                    <p style={{ fontSize: 13, fontWeight: 300 }}>{inq.name}</p>
                    <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.5px' }}>{inq.email}</p>
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: 12, color: 'var(--muted)', fontWeight: 200 }}>{inq.property}</td>
                  <td style={{ padding: '14px 20px', fontSize: 10, color: 'var(--gold)', letterSpacing: '1px' }}>{inq.type}</td>
                  <td style={{ padding: '14px 20px', fontSize: 10, color: 'var(--muted)' }}>{inq.date}</td>
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{
                      fontSize: 8, letterSpacing: '2px', textTransform: 'uppercase',
                      padding: '3px 8px', borderRadius: 2,
                      background: `${statusColors[inq.status]}22`,
                      color: statusColors[inq.status],
                      border: `1px solid ${statusColors[inq.status]}44`,
                    }}>
                      {inq.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <button style={{
                      fontSize: 9, letterSpacing: '2px', textTransform: 'uppercase',
                      background: 'none', border: '1px solid rgba(201,169,110,0.2)',
                      color: 'var(--gold)', padding: '5px 12px', cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}>
                      Reply
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[
          { label: 'Manage Properties', desc: 'Add, edit or archive listings', href: '/admin/properties' },
          { label: 'Sanity Studio',     desc: 'Full CMS editor',               href: '/studio' },
          { label: 'View Live Site',    desc: 'See the public-facing site',    href: '/' },
        ].map(link => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('/studio') || link.href === '/' ? '_blank' : undefined}
            className="block p-6 no-underline transition-colors duration-200 hover:bg-surface2"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <h3 className="font-display text-[18px] font-light mb-1" style={{ color: 'var(--gold)' }}>{link.label}</h3>
            <p className="text-[11px] font-light" style={{ color: 'var(--muted)' }}>{link.desc}</p>
          </a>
        ))}
      </div>
    </div>
  )
}
