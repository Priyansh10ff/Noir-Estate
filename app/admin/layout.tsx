import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import AdminSidebar from '@/components/layout/AdminSidebar'

export const metadata: Metadata = { title: { default: 'Admin', template: '%s | NOIR Admin' } }

function isAuthenticated() {
  const cookieStore = cookies()
  const adminSecret = process.env.ADMIN_SECRET
  if (!adminSecret) return false
  return cookieStore.get('admin_session')?.value === adminSecret
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!isAuthenticated()) redirect('/admin/login')

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--black)' }}>
      <AdminSidebar />
      <main className="flex-1 ml-64 p-10">
        {children}
      </main>
    </div>
  )
}
