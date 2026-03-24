import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { password } = await req.json()

  if (!process.env.ADMIN_SECRET) {
    return NextResponse.json({ success: false, error: 'ADMIN_SECRET not configured' }, { status: 500 })
  }

  if (password !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 })
  }

  const res = NextResponse.json({ success: true })
  res.cookies.set('admin_session', process.env.ADMIN_SECRET, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge:   60 * 60 * 8, // 8 hours
    path:     '/',
  })
  return res
}
