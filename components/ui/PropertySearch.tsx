'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Search, SlidersHorizontal, X } from 'lucide-react'

interface SearchResult {
  _id:    string
  title:  string
  slug:   { current: string }
  location: { city: string; country: string }
  price:    number
  currency: string
  priceLabel?: string
  category: string
  specs:  { bedrooms: number; bathrooms: number; sqft: number }
  status: string
}

const PLACEHOLDER_RESULTS: SearchResult[] = [
  { _id:'1', title:'The Meridian Penthouse',  slug:{current:'meridian-penthouse'},  location:{city:'Manhattan',country:'USA'},    price:24500000, currency:'USD', category:'penthouse', specs:{bedrooms:5,bathrooms:6,sqft:8200},  status:'available' },
  { _id:'2', title:'Villa Serena',            slug:{current:'villa-serena'},         location:{city:'Côte d\'Azur',country:'France'},price:18900000,currency:'EUR', category:'villa',      specs:{bedrooms:7,bathrooms:8,sqft:12000}, status:'available' },
  { _id:'3', title:'Obsidian Tower 42',       slug:{current:'obsidian-tower-42'},    location:{city:'Mayfair',country:'UK'},       price:11750000, currency:'GBP', category:'penthouse', specs:{bedrooms:4,bathrooms:4,sqft:4800},  status:'off_market' },
  { _id:'4', title:'The Sapphire Villa',      slug:{current:'sapphire-villa'},       location:{city:'Mallorca',country:'Spain'},   price:8500000,  currency:'EUR', category:'villa',      specs:{bedrooms:6,bathrooms:6,sqft:9200},  status:'available' },
  { _id:'5', title:'Crystal Heights',         slug:{current:'crystal-heights'},      location:{city:'Dubai',country:'UAE'},        price:42000000, currency:'AED', category:'penthouse', specs:{bedrooms:5,bathrooms:6,sqft:7800},  status:'new' },
  { _id:'6', title:'The Clifton Estate',      slug:{current:'clifton-estate'},       location:{city:'Cape Town',country:'South Africa'},price:6200000,currency:'USD',category:'estate',   specs:{bedrooms:8,bathrooms:9,sqft:15000}, status:'available' },
]

const CURRENCIES: Record<string, string> = { USD:'$', GBP:'£', EUR:'€', AED:'AED ' }

function fmtPrice(price: number, currency: string) {
  const s = CURRENCIES[currency] || '$'
  if (price >= 1_000_000) return `${s}${(price/1_000_000).toFixed(1)}M`
  return `${s}${(price/1_000).toFixed(0)}K`
}

export default function PropertySearch() {
  const [query,    setQuery]    = useState('')
  const [category, setCategory] = useState('')
  const [minBeds,  setMinBeds]  = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)
  const [showFilters, setFilters] = useState(false)
  const [results,  setResults]  = useState<SearchResult[]>([])
  const [loading,  setLoading]  = useState(false)

  const runSearch = useCallback(async () => {
    setLoading(true)
    try {
      // Try live Sanity API first
      const params = new URLSearchParams()
      if (category) params.set('category', category)
      const res = await fetch(`/api/properties?${params.toString()}`)
      const data = await res.json()
      let list: SearchResult[] = data.success ? data.data : PLACEHOLDER_RESULTS

      // Client-side filter
      if (query) {
        const q = query.toLowerCase()
        list = list.filter(p =>
          p.title.toLowerCase().includes(q) ||
          p.location.city.toLowerCase().includes(q) ||
          p.location.country.toLowerCase().includes(q)
        )
      }
      if (minBeds)  list = list.filter(p => p.specs.bedrooms >= minBeds)
      if (maxPrice) list = list.filter(p => p.price <= maxPrice)

      setResults(list)
    } catch {
      // Fallback to placeholder data with client-side search
      let list = PLACEHOLDER_RESULTS
      if (query)    list = list.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) || p.location.city.toLowerCase().includes(query.toLowerCase()))
      if (category) list = list.filter(p => p.category === category)
      if (minBeds)  list = list.filter(p => p.specs.bedrooms >= minBeds)
      setResults(list)
    } finally {
      setLoading(false)
    }
  }, [query, category, minBeds, maxPrice])

  useEffect(() => {
    const t = setTimeout(runSearch, 300)
    return () => clearTimeout(t)
  }, [runSearch])

  // Init
  useEffect(() => { setResults(PLACEHOLDER_RESULTS) }, [])

  return (
    <div>
      {/* Search Bar */}
      <div
        className="flex items-center gap-4 p-5 mb-4"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <Search size={16} style={{ color: 'var(--gold)', flexShrink: 0 }} />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by property name, city or country..."
          style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            color: 'var(--white)', fontFamily: 'Montserrat, sans-serif',
            fontSize: 13, fontWeight: 200, letterSpacing: '0.5px',
          }}
        />
        {query && (
          <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}>
            <X size={14} />
          </button>
        )}
        <button
          onClick={() => setFilters(v => !v)}
          className="flex items-center gap-2 text-[9px] tracking-[2px] uppercase px-4 py-2 transition-all duration-200"
          style={{
            background: showFilters ? 'var(--gold)' : 'transparent',
            color:      showFilters ? 'var(--black)' : 'var(--muted)',
            border:     `1px solid ${showFilters ? 'var(--gold)' : 'rgba(201,169,110,0.2)'}`,
            cursor:     'pointer',
          }}
        >
          <SlidersHorizontal size={12} />
          Filters
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div
          className="p-6 mb-4 grid grid-cols-2 md:grid-cols-4 gap-6"
          style={{ background: 'var(--surface2)', border: '1px solid var(--border)' }}
        >
          {/* Category */}
          <div>
            <label className="text-[9px] tracking-[3px] uppercase block mb-2" style={{ color: 'var(--muted)' }}>Category</label>
            <select
              value={category} onChange={e => setCategory(e.target.value)}
              className="input-gold"
              style={{ background: 'transparent', width: '100%' }}
            >
              <option value="" style={{ background: '#181818' }}>All Types</option>
              {['penthouse','villa','estate','townhouse','apartment','island'].map(c => (
                <option key={c} value={c} style={{ background: '#181818' }} className="capitalize">{c.charAt(0).toUpperCase()+c.slice(1)}</option>
              ))}
            </select>
          </div>

          {/* Min Bedrooms */}
          <div>
            <label className="text-[9px] tracking-[3px] uppercase block mb-2" style={{ color: 'var(--muted)' }}>Min Bedrooms</label>
            <select
              value={minBeds} onChange={e => setMinBeds(Number(e.target.value))}
              className="input-gold"
              style={{ background: 'transparent', width: '100%' }}
            >
              {[0,2,3,4,5,6,7,8].map(n => (
                <option key={n} value={n} style={{ background: '#181818' }}>{n === 0 ? 'Any' : `${n}+`}</option>
              ))}
            </select>
          </div>

          {/* Max Price */}
          <div>
            <label className="text-[9px] tracking-[3px] uppercase block mb-2" style={{ color: 'var(--muted)' }}>Max Budget (USD)</label>
            <select
              value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))}
              className="input-gold"
              style={{ background: 'transparent', width: '100%' }}
            >
              <option value="0" style={{ background: '#181818' }}>Any</option>
              {[5_000_000,10_000_000,20_000_000,50_000_000].map(n => (
                <option key={n} value={n} style={{ background: '#181818' }}>${(n/1_000_000).toFixed(0)}M</option>
              ))}
            </select>
          </div>

          {/* Clear */}
          <div className="flex items-end">
            <button
              onClick={() => { setCategory(''); setMinBeds(0); setMaxPrice(0); setQuery('') }}
              className="text-[9px] tracking-[3px] uppercase px-4 py-2 transition-colors"
              style={{ background: 'none', border: '1px solid rgba(201,169,110,0.2)', color: 'var(--muted)', cursor: 'pointer' }}
            >
              Clear All
            </button>
          </div>
        </div>
      )}

      {/* Results Count */}
      <p className="text-[10px] tracking-[2px] mb-6" style={{ color: 'var(--muted)' }}>
        {loading ? 'Searching...' : `${results.length} ${results.length === 1 ? 'property' : 'properties'} found`}
      </p>

      {/* Results */}
      {results.length === 0 && !loading ? (
        <div className="py-16 text-center" style={{ border: '1px solid var(--border)' }}>
          <p className="font-display text-[22px] font-light mb-2">No properties found</p>
          <p className="text-[11px]" style={{ color: 'var(--muted)' }}>Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="space-y-0.5">
          {results.map(p => (
            <Link
              key={p._id}
              href={`/properties/${p.slug.current}`}
              className="flex items-center justify-between p-5 group no-underline transition-colors duration-200"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--surface)')}
            >
              <div className="flex items-center gap-6">
                <span
                  className="text-[7px] tracking-[2px] uppercase px-2 py-1 hidden sm:inline"
                  style={{ background: 'rgba(201,169,110,0.1)', color: 'var(--gold)', border: '1px solid rgba(201,169,110,0.2)' }}
                >
                  {p.category}
                </span>
                <div>
                  <h3 className="text-[14px] font-light group-hover:text-gold transition-colors duration-200">{p.title}</h3>
                  <p className="text-[10px] tracking-[1px] mt-0.5" style={{ color: 'var(--muted)' }}>{p.location.city}, {p.location.country}</p>
                </div>
              </div>
              <div className="flex items-center gap-10">
                <span className="text-[10px] tracking-[1px] hidden md:block" style={{ color: 'var(--muted)' }}>
                  {p.specs.bedrooms}bd · {p.specs.bathrooms}ba
                </span>
                <span className="font-display text-[18px] font-light" style={{ color: 'var(--gold)' }}>
                  {p.priceLabel || fmtPrice(p.price, p.currency)}
                </span>
                <span className="text-[9px] tracking-[2px] uppercase" style={{ color: p.status === 'available' || p.status === 'new' ? '#4ade80' : 'var(--muted)' }}>
                  {p.status.replace('_', ' ')}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
