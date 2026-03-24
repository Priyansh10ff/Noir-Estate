'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (data.success) {
        router.push('/admin')
        router.refresh()
      } else {
        setError('Invalid password. Please try again.')
      }
    } catch {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'var(--black)' }}
    >
      <div className="w-full max-w-sm p-10" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="text-center mb-10">
          <h1 className="font-display text-[28px] font-light mb-1" style={{ color: 'var(--gold)' }}>
            NOIR<span style={{ color: 'var(--white)' }}> ESTATE</span>
          </h1>
          <p className="text-[9px] tracking-[4px] uppercase" style={{ color: 'var(--muted)' }}>Admin Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="text-[9px] tracking-[3px] uppercase block mb-2" style={{ color: 'var(--muted)' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="input-gold w-full"
              placeholder="Enter admin password"
              required
            />
          </div>

          {error && (
            <p className="text-[10px] tracking-wide" style={{ color: '#ef4444' }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full text-center"
            style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'wait' : 'pointer' }}
          >
            {loading ? 'Authenticating...' : 'Enter'}
          </button>
        </form>

        <p className="text-center mt-6 text-[9px]" style={{ color: 'var(--muted)' }}>
          Set <code className="text-gold text-[10px]">ADMIN_SECRET</code> in .env.local
        </p>
      </div>
    </div>
  )
}
