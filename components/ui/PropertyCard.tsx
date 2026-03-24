import Link from 'next/link'
import Image from 'next/image'
import type { Property } from '@/types'
import { formatPrice, formatSqft } from '@/lib/utils'
import { urlForImage } from '@/lib/sanity'

interface PropertyCardProps {
  property: Property
  size?: 'default' | 'large' | 'small'
}

export default function PropertyCard({ property, size = 'default' }: PropertyCardProps) {
  const { slug, title, location, price, currency, priceLabel, status, tag, specs, featuredImage } = property

  const imgSrc = featuredImage?.asset?.url
    ? urlForImage(featuredImage, size === 'large' ? 1200 : 800, size === 'large' ? 900 : 600)
    : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'

  const aspectClass = size === 'large' ? 'aspect-[4/3]' : 'aspect-[3/2]'

  return (
    <Link href={`/properties/${slug.current}`} className="group block no-underline">
      <div className="relative overflow-hidden" style={{ background: 'var(--surface)' }}>
        {/* Image */}
        <div className={`relative ${aspectClass} overflow-hidden`}>
          <Image
            src={imgSrc}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Overlay */}
          <div
            className="absolute inset-0 transition-opacity duration-400"
            style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.1) 60%)' }}
          />

          {/* Tag */}
          {tag && (
            <div className="absolute top-4 left-4">
              <span
                className="text-[8px] font-normal tracking-[3px] uppercase px-2.5 py-1"
                style={{ background: 'var(--gold)', color: 'var(--black)' }}
              >
                {tag}
              </span>
            </div>
          )}

          {/* Status badge */}
          {status === 'under_offer' && (
            <div className="absolute top-4 right-4">
              <span className="text-[8px] font-normal tracking-[2px] uppercase px-2.5 py-1 bg-amber-900/80 text-amber-300">
                Under Offer
              </span>
            </div>
          )}

          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="font-display text-[22px] font-light mb-1" style={{ color: 'var(--white)' }}>
              {title}
            </h3>
            <p className="text-[10px] font-light tracking-[2px] mb-4" style={{ color: 'var(--muted)' }}>
              {location.city}, {location.country}
            </p>
            <div className="flex items-center gap-4">
              <span className="font-display text-[20px] font-light" style={{ color: 'var(--gold)' }}>
                {priceLabel || formatPrice(price, currency)}
              </span>
              <div className="flex gap-4" style={{ color: 'var(--muted)' }}>
                <span className="text-[9px] tracking-[2px] uppercase">{specs.bedrooms} Beds</span>
                <span className="text-[9px] tracking-[2px] uppercase">{specs.bathrooms} Baths</span>
                <span className="text-[9px] tracking-[2px] uppercase">{formatSqft(specs.sqft)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
