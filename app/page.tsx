import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CustomCursor from '@/components/ui/CustomCursor'
import RevealInit from '@/components/ui/RevealInit'
import HeroSection from '@/components/sections/HeroSection'
import PropertyCard from '@/components/ui/PropertyCard'
import {
  StatsStrip,
  MarqueeStrip,
  ServicesSection,
  TestimonialSection,
  CTASection,
} from '@/components/sections/HomeSections'
import { getFeaturedProperties } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'NOIR Estate — Luxury Private Residences',
}

export const revalidate = 60 // ISR: revalidate every 60s

export default async function HomePage() {
  // Fetch featured properties from Sanity (falls back to empty array gracefully)
  let properties: Awaited<ReturnType<typeof getFeaturedProperties>> = []
  try {
    properties = await getFeaturedProperties()
  } catch {
    // Sanity not yet configured — page still renders with placeholder UI
  }

  return (
    <>
      <CustomCursor />
      <RevealInit />
      <Navbar />

      <main>
        {/* Hero */}
        <HeroSection />

        {/* Stats */}
        <StatsStrip />

        {/* Gold Marquee */}
        <MarqueeStrip />

        {/* Featured Listings */}
        <section className="px-[60px] py-[100px]" style={{ background: 'var(--black)' }}>
          <div className="flex justify-between items-end mb-14 reveal">
            <div>
              <span className="section-label">Featured Properties</span>
              <h2
                className="font-display font-light"
                style={{ fontSize: 'clamp(36px,5vw,58px)', lineHeight: 1.1 }}
              >
                Current <em className="italic" style={{ color: 'var(--gold)' }}>Collection</em>
              </h2>
              <div className="gold-line mt-4" />
            </div>
            <a
              href="/properties"
              className="text-[10px] font-light tracking-[3px] uppercase no-underline transition-colors hover:text-cream"
              style={{ color: 'var(--gold)' }}
            >
              View All Properties →
            </a>
          </div>

          {properties.length > 0 ? (
            /* ── Real Sanity data ── */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5 reveal">
              {properties.slice(0, 3).map((property, i) => (
                <div key={property._id} className={`reveal reveal-delay-${i}`}>
                  <PropertyCard property={property} size={i === 0 ? 'large' : 'default'} />
                </div>
              ))}
            </div>
          ) : (
            /* ── Placeholder grid (before Sanity connected) ── */
            <div
              className="grid reveal"
              style={{ gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto auto', gap: 2 }}
            >
              {[
                { img: 'photo-1600596542815-ffad4c1539a9', tag: 'Featured',  name: 'The Meridian Penthouse', loc: 'Manhattan, New York',   price: '$24,500,000', beds: 5, baths: 6, sqft: '8,200', large: true },
                { img: 'photo-1600607687939-ce8a6c25118c', tag: 'New',        name: 'Villa Serena',           loc: 'Côte d\'Azur, France', price: '€18,900,000', beds: 7, baths: 8, sqft: '12,000' },
                { img: 'photo-1600585154340-be6161a56a0c', tag: 'Off Market', name: 'Obsidian Tower 42',      loc: 'Mayfair, London',      price: '£11,750,000', beds: 4, baths: 4, sqft: '4,800' },
              ].map((p, i) => (
                <a
                  key={p.name}
                  href="/properties"
                  className="relative overflow-hidden group no-underline block"
                  style={{
                    gridColumn: p.large ? '1' : undefined,
                    gridRow:    p.large ? '1 / span 2' : undefined,
                    aspectRatio: p.large ? undefined : '4/3',
                    minHeight:   p.large ? 500 : undefined,
                  }}
                >
                  <div
                    className="w-full h-full transition-transform duration-700 group-hover:scale-[1.04]"
                    style={{
                      minHeight: p.large ? 500 : 240,
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
                    <h3 className="font-display text-[22px] font-light mb-1">{p.name}</h3>
                    <p className="text-[10px] tracking-[2px] mb-4" style={{ color: 'var(--muted)' }}>{p.loc}</p>
                    <div className="flex items-center gap-4">
                      <span className="font-display text-[20px] font-light" style={{ color: 'var(--gold)' }}>{p.price}</span>
                      <span className="text-[9px] tracking-[2px] uppercase" style={{ color: 'var(--muted)' }}>{p.beds} Beds · {p.baths} Baths · {p.sqft} ft²</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>

        {/* Services */}
        <ServicesSection />

        {/* Testimonial */}
        <TestimonialSection />

        {/* CTA */}
        <CTASection />
      </main>

      <Footer />
    </>
  )
}
