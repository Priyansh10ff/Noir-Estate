import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllProperties } from '@/lib/queries'
import { formatPrice, getStatusLabel } from '@/lib/utils'
import { ExternalLink, Plus } from 'lucide-react'

export const metadata: Metadata = { title: 'Properties' }

export default async function AdminPropertiesPage() {
  let properties: Awaited<ReturnType<typeof getAllProperties>> = []
  try { properties = await getAllProperties() } catch {}

  const placeholders = properties.length === 0

  const displayProps = placeholders
    ? [
        { _id:'1', title:'The Meridian Penthouse',  slug:{current:'meridian-penthouse'}, location:{city:'Manhattan',country:'USA'},     price:24500000, currency:'USD' as const, status:'available' as const,  category:'penthouse', specs:{bedrooms:5,bathrooms:6,sqft:8200},  isFeatured:true  },
        { _id:'2', title:'Villa Serena',             slug:{current:'villa-serena'},        location:{city:'Côte d\'Azur',country:'France'},price:18900000, currency:'EUR' as const, status:'available' as const,  category:'villa',     specs:{bedrooms:7,bathrooms:8,sqft:12000}, isFeatured:true  },
        { _id:'3', title:'Obsidian Tower 42',        slug:{current:'obsidian-tower-42'},   location:{city:'Mayfair',country:'UK'},        price:11750000, currency:'GBP' as const, status:'off_market' as const, category:'penthouse', specs:{bedrooms:4,bathrooms:4,sqft:4800},  isFeatured:false },
        { _id:'4', title:'Crystal Heights',          slug:{current:'crystal-heights'},     location:{city:'Dubai',country:'UAE'},         price:42000000, currency:'AED' as const, status:'new' as const,        category:'penthouse', specs:{bedrooms:5,bathrooms:6,sqft:7800},  isFeatured:true  },
      ]
    : properties

  const statusColors: Record<string, string> = {
    available:   '#4ade80',
    new:         '#60a5fa',
    under_offer: '#fbbf24',
    off_market:  '#888880',
    sold:        '#ef4444',
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-10" style={{ borderBottom: '1px solid var(--border)', paddingBottom: 24 }}>
        <div>
          <span className="section-label">Portfolio</span>
          <h1 className="font-display text-[36px] font-light">Properties</h1>
        </div>
        <div className="flex gap-3">
          <a
            href="/studio"
            target="_blank"
            className="flex items-center gap-2 px-5 py-3 text-[9px] tracking-[2px] uppercase no-underline transition-all duration-200"
            style={{ background: 'var(--gold)', color: 'var(--black)', fontSize: 10, letterSpacing: '2px' }}
          >
            <Plus size={13} /> Add in Sanity
          </a>
        </div>
      </div>

      {placeholders && (
        <div className="p-4 mb-6" style={{ background: 'rgba(201,169,110,0.08)', border: '1px solid rgba(201,169,110,0.2)', borderLeft: '3px solid var(--gold)' }}>
          <p className="text-[10px] tracking-[2px] uppercase" style={{ color: 'var(--gold)' }}>Demo Data</p>
          <p className="text-[11px] font-light mt-1" style={{ color: 'var(--muted)' }}>
            Connect Sanity CMS to manage real property listings. Add <code className="text-gold">NEXT_PUBLIC_SANITY_PROJECT_ID</code> to your .env.local.
          </p>
        </div>
      )}

      {/* Table */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['Property', 'Location', 'Category', 'Price', 'Status', 'Featured', 'Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 9, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 300 }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayProps.map((p, i) => (
              <tr
                key={p._id}
                style={{ borderBottom: i < displayProps.length - 1 ? '1px solid var(--border)' : 'none' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <td style={{ padding: '14px 16px' }}>
                  <p style={{ fontSize: 13, fontWeight: 300 }}>{p.title}</p>
                  <p style={{ fontSize: 10, color: 'var(--muted)', marginTop: 2 }}>{p.specs.bedrooms}bd · {p.specs.bathrooms}ba · {p.specs.sqft.toLocaleString()}ft²</p>
                </td>
                <td style={{ padding: '14px 16px', fontSize: 11, color: 'var(--muted)', fontWeight: 200 }}>
                  {p.location.city}, {p.location.country}
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ fontSize: 9, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', border: '1px solid rgba(201,169,110,0.2)', padding: '3px 8px' }}>
                    {p.category}
                  </span>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, fontWeight: 300, color: 'var(--gold)' }}>
                    {formatPrice(p.price, p.currency)}
                  </span>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{
                    fontSize: 8, letterSpacing: '2px', textTransform: 'uppercase',
                    padding: '3px 8px', background: `${statusColors[p.status]}18`,
                    color: statusColors[p.status], border: `1px solid ${statusColors[p.status]}33`,
                  }}>
                    {getStatusLabel(p.status)}
                  </span>
                </td>
                <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                  {p.isFeatured
                    ? <span style={{ color: 'var(--gold)', fontSize: 16 }}>★</span>
                    : <span style={{ color: 'var(--muted)', fontSize: 16 }}>☆</span>
                  }
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <div className="flex gap-2">
                    <Link
                      href={`/properties/${p.slug.current}`}
                      target="_blank"
                      className="flex items-center gap-1 no-underline text-[9px] tracking-[2px] uppercase px-3 py-1.5 transition-colors"
                      style={{ color: 'var(--muted)', border: '1px solid rgba(201,169,110,0.15)' }}
                    >
                      <ExternalLink size={10} /> View
                    </Link>
                    <a
                      href="/studio"
                      target="_blank"
                      className="flex items-center gap-1 no-underline text-[9px] tracking-[2px] uppercase px-3 py-1.5 transition-colors"
                      style={{ color: 'var(--gold)', border: '1px solid rgba(201,169,110,0.35)' }}
                    >
                      Edit
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
