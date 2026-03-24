import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CustomCursor from '@/components/ui/CustomCursor'
import RevealInit from '@/components/ui/RevealInit'
import PropertyCard from '@/components/ui/PropertyCard'
import { getAllProperties } from '@/lib/queries'

export const metadata: Metadata = { title: 'Properties' }
export const revalidate = 60

const CATEGORIES = ['All', 'Penthouse', 'Villa', 'Estate', 'Townhouse', 'Apartment', 'Island']

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: { category?: string; status?: string }
}) {
  let properties: Awaited<ReturnType<typeof getAllProperties>> = []
  try {
    properties = await getAllProperties({
      category: searchParams.category,
      status:   searchParams.status,
    })
  } catch { /* Sanity not yet configured */ }

  return (
    <>
      <CustomCursor />
      <RevealInit />
      <Navbar />
      <main>
        {/* Page Header */}
        <div
          className="px-[60px] pt-40 pb-16"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <span className="section-label">Our Portfolio</span>
          <h1
            className="font-display font-light"
            style={{ fontSize: 'clamp(42px,6vw,76px)', lineHeight: 1.08 }}
          >
            The <em className="italic" style={{ color: 'var(--gold)' }}>Collection</em>
          </h1>
          <div className="gold-line mt-4" />
        </div>

        {/* Category Filters */}
        <div
          className="px-[60px] py-6 flex gap-8 overflow-x-auto"
          style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}
        >
          {CATEGORIES.map(cat => {
            const value    = cat === 'All' ? undefined : cat.toLowerCase()
            const isActive = !searchParams.category ? cat === 'All' : searchParams.category === value
            return (
              <a
                key={cat}
                href={value ? `/properties?category=${value}` : '/properties'}
                className="text-[9px] font-light tracking-[3px] uppercase no-underline whitespace-nowrap transition-colors duration-300"
                style={{
                  color:         isActive ? 'var(--gold)' : 'var(--muted)',
                  borderBottom:  isActive ? '1px solid var(--gold)' : '1px solid transparent',
                  paddingBottom: 4,
                }}
              >
                {cat}
              </a>
            )
          })}
        </div>

        {/* Properties Grid */}
        <div className="px-[60px] py-[60px]">
          {properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5">
              {properties.map((property, i) => (
                <div key={property._id} className={`reveal reveal-delay-${Math.min(i % 3, 3)}`}>
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          ) : (
            /* Placeholder grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5">
              {[
                { img: 'photo-1600596542815-ffad4c1539a9', tag: 'Featured',  name: 'The Meridian Penthouse', loc: 'Manhattan, New York',      price: '$24,500,000' },
                { img: 'photo-1600607687939-ce8a6c25118c', tag: 'New',        name: 'Villa Serena',           loc: 'Côte d\'Azur, France',    price: '€18,900,000' },
                { img: 'photo-1600585154340-be6161a56a0c', tag: 'Off Market', name: 'Obsidian Tower 42',      loc: 'Mayfair, London',          price: '£11,750,000' },
                { img: 'photo-1613977257592-4871e5fcd7c4', tag: 'New',        name: 'The Sapphire Villa',     loc: 'Mallorca, Spain',          price: '€8,500,000'  },
                { img: 'photo-1580587771525-78b9dba3b914', tag: 'Featured',   name: 'Crystal Heights',        loc: 'Dubai, UAE',               price: 'AED 42,000,000' },
                { img: 'photo-1416331108676-a22ccb276e35', tag: 'Available',  name: 'The Clifton Estate',     loc: 'Clifton, Cape Town',       price: '$6,200,000'  },
              ].map((p, i) => (
                <a
                  key={p.name}
                  href={`/properties/placeholder-${i}`}
                  className="relative overflow-hidden group no-underline block reveal"
                  style={{ aspectRatio: '4/3' }}
                >
                  <div
                    className="w-full h-full transition-transform duration-700 group-hover:scale-[1.04]"
                    style={{
                      background: `
                        linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.1) 60%),
                        url('https://images.unsplash.com/${p.img}?w=800&q=80') center/cover
                      `,
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-[8px] tracking-[3px] uppercase px-2.5 py-1 mb-3 inline-block" style={{ background: 'var(--gold)', color: 'var(--black)' }}>
                      {p.tag}
                    </span>
                    <h3 className="font-display text-[20px] font-light mb-1">{p.name}</h3>
                    <p className="text-[10px] tracking-[2px] mb-3" style={{ color: 'var(--muted)' }}>{p.loc}</p>
                    <span className="font-display text-[18px] font-light" style={{ color: 'var(--gold)' }}>{p.price}</span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
