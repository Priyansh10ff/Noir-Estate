import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Property } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, currency: Property['currency'] = 'USD'): string {
  const symbols: Record<Property['currency'], string> = {
    USD: '$', GBP: '£', EUR: '€', AED: 'AED ', CHF: 'CHF '
  }
  const sym = symbols[currency]
  if (price >= 1_000_000) {
    return `${sym}${(price / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
  }
  if (price >= 1_000) {
    return `${sym}${(price / 1_000).toFixed(0)}K`
  }
  return `${sym}${price.toLocaleString()}`
}

export function formatSqft(sqft: number): string {
  return sqft.toLocaleString() + ' ft²'
}

export function getStatusLabel(status: Property['status']): string {
  const labels: Record<Property['status'], string> = {
    available:   'Available',
    under_offer: 'Under Offer',
    sold:        'Sold',
    off_market:  'Off Market',
    new:         'New Listing',
  }
  return labels[status]
}

export function getStatusColor(status: Property['status']): string {
  const colors: Record<Property['status'], string> = {
    available:   'bg-emerald-900/40 text-emerald-400',
    under_offer: 'bg-amber-900/40 text-amber-400',
    sold:        'bg-red-900/40 text-red-400',
    off_market:  'bg-zinc-800 text-zinc-400',
    new:         'bg-blue-900/40 text-blue-400',
  }
  return colors[status]
}

export function truncate(str: string, n: number): string {
  return str.length > n ? str.slice(0, n - 1) + '…' : str
}

export function generateTimeSlots(): string[] {
  const slots: string[] = []
  for (let h = 9; h <= 17; h++) {
    slots.push(`${h.toString().padStart(2, '0')}:00`)
    if (h < 17) slots.push(`${h.toString().padStart(2, '0')}:30`)
  }
  return slots
}

export function getMinBookingDate(): string {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
}
