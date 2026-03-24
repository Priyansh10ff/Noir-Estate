import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CustomCursor from '@/components/ui/CustomCursor'
import RevealInit from '@/components/ui/RevealInit'
import InquiryForm from '@/components/ui/InquiryForm'
import BookingForm from '@/components/ui/BookingForm'
import { getPropertyBySlug, getRelatedProperties } from '@/lib/queries'
import { formatPrice, formatSqft } from '@/lib/utils'
import { urlForImage } from '@/lib/sanity'
import { Bed, Bath, Maximize, Car, MapPin } from 'lucide-react'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const property = await getPropertyBySlug(params.slug)
    if (!property) return { title: 'Property Not Found' }
    return {
      title: `${property.title} — ${property.location.city}`,
      description: property.tagline,
    }
  } catch {
    return { title: 'Property' }
  }
}

export default async function PropertyPage({ params }: Props) {
  let property: Awaited<ReturnType<typeof getPropertyBySlug>> = null

  try {
    property = await getPropertyBySlug(params.slug)
  } catch { /* Sanity not configured */ }

  if (!property) {
    // If Sanity is not configured, show a demo page instead of 404
    return <DemoPropertyPage slug={params.slug} />
  }

  const relatedProperties = await getRelatedProperties(property._id, property.category)
  const heroImg = property.featuredImage?.asset?.url
    ? urlForImage(property.featuredImage, 1600, 900)
    : 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1600&q=80'

  return (
    <>
      <CustomCursor />
      <RevealInit />
      <Navbar />
      <main>
        {/* Hero Image */}
        <div className="relative" style={{ height: '70vh', minHeight: 500 }}>
          <Image src={heroImg} alt={property.title} fill className="object-cover" priority />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.8) 100%)' }} />
          <div className="absolute bottom-0 left-0 right-0 px-[60px] pb-14">
            {property.tag && (
              <span className="text-[8px] tracking-[3px] uppercase px-2.5 py-1 mb-4 inline-block" style={{ background: 'var(--gold)', color: 'var(--black)' }}>
                {property.tag}
              </span>
            )}
            <h1 className="font-display font-light mb-3" style={{ fontSize: 'clamp(36px,5vw,64px)' }}>
              {property.title}
            </h1>
            <p className="flex items-center gap-2 text-[11px] tracking-[2px]" style={{ color: 'var(--muted)' }}>
              <MapPin size={12} />
              {property.location.address}, {property.location.city}, {property.location.country}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="px-[60px] py-[60px] grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left: Details */}
          <div className="lg:col-span-2 space-y-12">
            {/* Price & Specs */}
            <div className="flex flex-wrap items-start gap-10" style={{ borderBottom: '1px solid var(--border)', paddingBottom: 32 }}>
              <div>
                <p className="text-[9px] tracking-[3px] uppercase mb-2" style={{ color: 'var(--muted)' }}>Asking Price</p>
                <p className="font-display text-[40px] font-light" style={{ color: 'var(--gold)' }}>
                  {property.priceLabel || formatPrice(property.price, property.currency)}
                </p>
              </div>
              <div className="flex gap-8 mt-2">
                {[
                  { icon: <Bed size={16} />,      val: `${property.specs.bedrooms} Bedrooms` },
                  { icon: <Bath size={16} />,     val: `${property.specs.bathrooms} Bathrooms` },
                  { icon: <Maximize size={16} />, val: formatSqft(property.specs.sqft) },
                  ...(property.specs.garages ? [{ icon: <Car size={16} />, val: `${property.specs.garages} Garages` }] : []),
                ].map(spec => (
                  <div key={spec.val} className="text-center">
                    <div className="mb-2 flex justify-center" style={{ color: 'var(--gold)' }}>{spec.icon}</div>
                    <p className="text-[10px] tracking-[1px]" style={{ color: 'var(--muted)' }}>{spec.val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            {property.tagline && (
              <p className="font-display text-[22px] font-light italic leading-relaxed" style={{ color: 'var(--white)' }}>
                "{property.tagline}"
              </p>
            )}

            {/* Features */}
            {property.features?.length > 0 && (
              <div>
                <h3 className="text-[9px] tracking-[4px] uppercase mb-6" style={{ color: 'var(--gold)' }}>Key Features</h3>
                <ul className="grid grid-cols-2 gap-3">
                  {property.features.map(f => (
                    <li key={f} className="flex items-center gap-3">
                      <span style={{ width: 4, height: 4, background: 'var(--gold)', borderRadius: '50%', flexShrink: 0 }} />
                      <span className="text-[11px] font-light">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right: Forms */}
          <div className="space-y-10">
            {/* Book Viewing */}
            <div className="p-8" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <h3 className="font-display text-[22px] font-light mb-6">Book a Viewing</h3>
              <BookingForm propertyId={property._id} propertyTitle={property.title} />
            </div>

            {/* Inquiry */}
            <div className="p-8" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <h3 className="font-display text-[22px] font-light mb-6">Make an Inquiry</h3>
              <InquiryForm propertyId={property._id} propertyTitle={property.title} defaultType="property" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

// ── Demo Property page when Sanity is not yet configured ──────────────────────
function DemoPropertyPage({ slug }: { slug: string }) {
  const demos: Record<string, { title: string; location: string; price: string; img: string; beds: number; baths: number; sqft: string }> = {
    'placeholder-0': { title: 'The Meridian Penthouse', location: 'Manhattan, New York', price: '$24,500,000', img: 'photo-1600596542815-ffad4c1539a9', beds: 5, baths: 6, sqft: '8,200' },
    'placeholder-1': { title: 'Villa Serena',           location: 'Côte d\'Azur, France', price: '€18,900,000', img: 'photo-1600607687939-ce8a6c25118c', beds: 7, baths: 8, sqft: '12,000' },
    'placeholder-2': { title: 'Obsidian Tower 42',      location: 'Mayfair, London',     price: '£11,750,000', img: 'photo-1600585154340-be6161a56a0c', beds: 4, baths: 4, sqft: '4,800' },
  }
  const p = demos[slug] || demos['placeholder-0']

  return (
    <>
      <CustomCursor />
      <RevealInit />
      <Navbar />
      <main>
        <div className="relative" style={{ height: '70vh', minHeight: 500 }}>
          <div
            className="absolute inset-0"
            style={{ background: `url('https://images.unsplash.com/${p.img}?w=1600&q=80') center/cover` }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.8) 100%)' }} />
          <div className="absolute bottom-0 left-0 right-0 px-[60px] pb-14">
            <span className="text-[8px] tracking-[3px] uppercase px-2.5 py-1 mb-4 inline-block" style={{ background: 'var(--gold)', color: 'var(--black)' }}>Featured</span>
            <h1 className="font-display font-light mb-3" style={{ fontSize: 'clamp(36px,5vw,64px)' }}>{p.title}</h1>
            <p className="text-[11px] tracking-[2px]" style={{ color: 'var(--muted)' }}>{p.location}</p>
          </div>
        </div>

        <div className="px-[60px] py-[60px] grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 32 }}>
              <p className="font-display text-[40px] font-light" style={{ color: 'var(--gold)' }}>{p.price}</p>
              <p className="text-[11px] tracking-[2px] mt-2" style={{ color: 'var(--muted)' }}>
                {p.beds} Bedrooms · {p.baths} Bathrooms · {p.sqft} ft²
              </p>
            </div>
            <p className="font-display text-[22px] font-light italic leading-relaxed">
              "An extraordinary residence that redefines the standard of luxury living — a rare opportunity for the most discerning buyer."
            </p>
            <div className="p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <p className="text-[9px] tracking-[3px] uppercase mb-2" style={{ color: 'var(--gold)' }}>Connect Sanity CMS</p>
              <p className="text-[11px] font-light leading-relaxed" style={{ color: 'var(--muted)' }}>
                Add your <code className="text-gold text-[11px]">NEXT_PUBLIC_SANITY_PROJECT_ID</code> to .env.local to load real property data, images, descriptions, and agent info.
              </p>
            </div>
          </div>
          <div className="space-y-10">
            <div className="p-8" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <h3 className="font-display text-[22px] font-light mb-6">Book a Viewing</h3>
              <BookingForm propertyTitle={p.title} />
            </div>
            <div className="p-8" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <h3 className="font-display text-[22px] font-light mb-6">Make an Inquiry</h3>
              <InquiryForm propertyTitle={p.title} defaultType="property" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
