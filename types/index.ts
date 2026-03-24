// ─── Property Types ────────────────────────────────────────────────────────────

export interface Property {
  _id: string
  _createdAt: string
  slug: { current: string }
  title: string
  tagline: string
  location: {
    address: string
    city: string
    country: string
    coordinates?: { lat: number; lng: number }
  }
  price: number
  currency: 'USD' | 'GBP' | 'EUR' | 'AED' | 'CHF'
  priceLabel?: string          // e.g. "POA" (Price on Application)
  status: 'available' | 'under_offer' | 'sold' | 'off_market' | 'new'
  tag?: string                 // "Featured" | "New" | "Off Market"
  category: 'penthouse' | 'villa' | 'estate' | 'townhouse' | 'apartment' | 'island'
  specs: {
    bedrooms: number
    bathrooms: number
    sqft: number
    garages?: number
    pool?: boolean
    cinema?: boolean
  }
  description: PortableTextBlock[]
  images: SanityImage[]
  featuredImage: SanityImage
  features: string[]
  amenities: string[]
  agent: Agent
  isFeatured: boolean
  videoUrl?: string
  virtualTourUrl?: string
  brochureUrl?: string
}

export interface Agent {
  _id: string
  name: string
  title: string
  phone: string
  email: string
  photo: SanityImage
  bio: string
  calcomUsername?: string
}

export interface Testimonial {
  _id: string
  quote: string
  author: string
  role: string
  location?: string
  photo?: SanityImage
  rating: number
}

export interface BlogPost {
  _id: string
  _createdAt: string
  slug: { current: string }
  title: string
  excerpt: string
  featuredImage: SanityImage
  category: string
  author: Agent
  body: PortableTextBlock[]
  readTime: number
}

// ─── Form Types ────────────────────────────────────────────────────────────────

export interface InquiryFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
  budget?: string
  propertyId?: string
  propertyTitle?: string
  type: 'general' | 'property' | 'valuation' | 'buying' | 'selling'
}

export interface BookingFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  propertyId?: string
  propertyTitle?: string
  preferredDate: string
  preferredTime: string
  viewingType: 'in_person' | 'virtual'
  message?: string
}

export interface NewsletterFormData {
  email: string
  preferences?: ('new_listings' | 'market_reports' | 'events' | 'journal')[]
}

// ─── API Response Types ─────────────────────────────────────────────────────────

export interface ApiResponse<T = void> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// ─── Sanity Types ───────────────────────────────────────────────────────────────

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
    url?: string
  }
  alt?: string
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
}

export type PortableTextBlock = {
  _type: string
  _key: string
  [key: string]: unknown
}

// ─── UI Types ──────────────────────────────────────────────────────────────────

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export type ViewingType = 'in_person' | 'virtual'
export type PropertyStatus = Property['status']
export type PropertyCategory = Property['category']
