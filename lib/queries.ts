import { sanityClient, isSanityConfigured } from './sanity'
import type { Property, Agent, Testimonial, BlogPost } from '@/types'

const IMAGE_FRAGMENT = `{
  _type, alt,
  "asset": asset->{ _id, _ref, url },
  hotspot, crop
}`

const AGENT_FRAGMENT = `{
  _id, name, title, phone, email, bio, calcomUsername,
  "photo": photo${IMAGE_FRAGMENT}
}`

// Safe fetch — returns empty array if Sanity is not configured
async function safeFetch<T>(query: string, params?: Record<string, unknown>): Promise<T[]> {
  if (!isSanityConfigured) return []
  try {
    return await sanityClient.fetch(query, params ?? {})
  } catch {
    return []
  }
}

// Safe single fetch — returns null if not configured
async function safeFetchOne<T>(query: string, params?: Record<string, unknown>): Promise<T | null> {
  if (!isSanityConfigured) return null
  try {
    return await sanityClient.fetch(query, params ?? {})
  } catch {
    return null
  }
}

// ─── Properties ──────────────────────────────────────────────────────────────

export async function getFeaturedProperties(): Promise<Property[]> {
  return safeFetch(`
    *[_type == "property" && isFeatured == true] | order(_createdAt desc)[0...6] {
      _id, _createdAt, slug, title, tagline, location,
      price, currency, priceLabel, status, tag, category,
      specs, isFeatured,
      "featuredImage": featuredImage${IMAGE_FRAGMENT},
      "agent": agent->${AGENT_FRAGMENT}
    }
  `)
}

export async function getAllProperties(filters?: {
  category?: string
  minPrice?: number
  maxPrice?: number
  status?: string
}): Promise<Property[]> {
  let filter = '*[_type == "property"'
  if (filters?.category) filter += ` && category == "${filters.category}"`
  if (filters?.status)   filter += ` && status == "${filters.status}"`
  filter += '] | order(isFeatured desc, _createdAt desc)'

  return safeFetch(`
    ${filter} {
      _id, _createdAt, slug, title, tagline, location,
      price, currency, priceLabel, status, tag, category,
      specs, isFeatured,
      "featuredImage": featuredImage${IMAGE_FRAGMENT},
      "agent": agent->${AGENT_FRAGMENT}
    }
  `)
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  return safeFetchOne(`
    *[_type == "property" && slug.current == $slug][0] {
      _id, _createdAt, slug, title, tagline, location,
      price, currency, priceLabel, status, tag, category,
      specs, description, features, amenities,
      isFeatured, videoUrl, virtualTourUrl, brochureUrl,
      "featuredImage": featuredImage${IMAGE_FRAGMENT},
      "images": images[]${IMAGE_FRAGMENT},
      "agent": agent->${AGENT_FRAGMENT}
    }
  `, { slug })
}

export async function getRelatedProperties(propertyId: string, category: string): Promise<Property[]> {
  return safeFetch(`
    *[_type == "property" && _id != $propertyId && category == $category][0...3] {
      _id, slug, title, location, price, currency,
      priceLabel, status, tag, specs,
      "featuredImage": featuredImage${IMAGE_FRAGMENT}
    }
  `, { propertyId, category })
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export async function getTestimonials(): Promise<Testimonial[]> {
  return safeFetch(`
    *[_type == "testimonial"] | order(_createdAt desc)[0...6] {
      _id, quote, author, role, location, rating,
      "photo": photo${IMAGE_FRAGMENT}
    }
  `)
}

// ─── Journal / Blog ───────────────────────────────────────────────────────────

export async function getBlogPosts(): Promise<BlogPost[]> {
  return safeFetch(`
    *[_type == "post"] | order(_createdAt desc)[0...9] {
      _id, _createdAt, slug, title, excerpt, category, readTime,
      "featuredImage": featuredImage${IMAGE_FRAGMENT},
      "author": author->${AGENT_FRAGMENT}
    }
  `)
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return safeFetchOne(`
    *[_type == "post" && slug.current == $slug][0] {
      _id, _createdAt, slug, title, excerpt, category, readTime, body,
      "featuredImage": featuredImage${IMAGE_FRAGMENT},
      "author": author->${AGENT_FRAGMENT}
    }
  `, { slug })
}

// ─── Agents ───────────────────────────────────────────────────────────────────

export async function getAgents(): Promise<Agent[]> {
  return safeFetch(`
    *[_type == "agent"] | order(name asc) ${AGENT_FRAGMENT}
  `)
}

// ─── Site Config ──────────────────────────────────────────────────────────────

export async function getSiteConfig() {
  return safeFetchOne(`
    *[_type == "siteConfig"][0] {
      stats, heroTitle, heroSubtitle, heroTagline
    }
  `)
}