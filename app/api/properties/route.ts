import { NextRequest, NextResponse } from 'next/server'
import { getAllProperties } from '@/lib/queries'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const filters = {
    category: searchParams.get('category') || undefined,
    status:   searchParams.get('status')   || undefined,
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
  }

  try {
    const properties = await getAllProperties(filters)
    return NextResponse.json({ success: true, data: properties })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to fetch properties' }, { status: 500 })
  }
}
