import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImage } from '@/types'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder'
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET   || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

export const config = {
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
}

// Only create a real client if we have a valid project ID
const isSanityConfigured = Boolean(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
  /^[a-z0-9-]+$/.test(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
)

export const sanityClient = createClient({
  ...config,
  projectId: isSanityConfigured ? projectId : 'placeholder',
  // Disable network requests when not configured
  useCdn: isSanityConfigured && process.env.NODE_ENV === 'production',
  token: isSanityConfigured ? process.env.SANITY_API_TOKEN : undefined,
})

// Image URL builder
const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImage) {
  return builder.image(source)
}

export function urlForImage(source: SanityImage, width = 800, height?: number) {
  if (!isSanityConfigured || !source?.asset) return ''
  try {
    let imgBuilder = builder.image(source).width(width).auto('format').fit('crop')
    if (height) imgBuilder = imgBuilder.height(height)
    return imgBuilder.url()
  } catch {
    return ''
  }
}

export { isSanityConfigured }