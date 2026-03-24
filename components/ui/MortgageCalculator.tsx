'use client'

import { useState, useMemo } from 'react'

function formatCurrency(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`
  return `$${n.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
}

export default function MortgageCalculator() {
  const [price,    setPrice]    = useState(5_000_000)
  const [deposit,  setDeposit]  = useState(30)
  const [rate,     setRate]     = useState(5.5)
  const [years,    setYears]    = useState(25)
  const [currency, setCurrency] = useState('USD')

  const result = useMemo(() => {
    const principal = price * (1 - deposit / 100)
    const monthlyRate = rate / 100 / 12
    const n = years * 12
    if (monthlyRate === 0) return { monthly: principal / n, principal, totalCost: principal, interest: 0, ltv: 100 - deposit }
    const monthly   = principal * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1)
    const totalCost = monthly * n
    const interest  = totalCost - principal
    return { monthly, principal, totalCost, interest, ltv: 100 - deposit }
  }, [price, deposit, rate, years])

  const currencySymbols: Record<string, string> = { USD: '$', GBP: '£', EUR: '€', AED: 'AED ' }
  const sym = currencySymbols[currency]

  const fmt = (n: number) => {
    if (n >= 1_000_000) return `${sym}${(n / 1_000_000).toFixed(2)}M`
    if (n >= 1_000)     return `${sym}${(n / 1_000).toFixed(0)}K`
    return `${sym}${n.toFixed(0)}`
  }

  return (
    <div className="p-8" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
      <span className="section-label">Finance Calculator</span>
      <h2 className="font-display text-[28px] font-light mb-8">Mortgage Estimator</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Inputs */}
        <div className="space-y-8">
          {/* Currency */}
          <div>
            <label className="text-[9px] tracking-[3px] uppercase block mb-2" style={{ color: 'var(--muted)' }}>Currency</label>
            <div className="flex gap-2">
              {['USD', 'GBP', 'EUR', 'AED'].map(c => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className="text-[9px] tracking-[2px] uppercase px-3 py-2 transition-all duration-200"
                  style={{
                    background:  currency === c ? 'var(--gold)' : 'transparent',
                    color:       currency === c ? 'var(--black)' : 'var(--muted)',
                    border:      `1px solid ${currency === c ? 'var(--gold)' : 'rgba(201,169,110,0.2)'}`,
                    cursor:      'pointer',
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Property Price */}
          <SliderField
            label="Property Price"
            value={price}
            min={500_000}
            max={50_000_000}
            step={500_000}
            display={fmt(price)}
            onChange={setPrice}
          />

          {/* Deposit */}
          <SliderField
            label="Deposit"
            value={deposit}
            min={10}
            max={90}
            step={5}
            display={`${deposit}%  (${fmt(price * deposit / 100)})`}
            onChange={setDeposit}
          />

          {/* Interest Rate */}
          <SliderField
            label="Annual Interest Rate"
            value={rate}
            min={1}
            max={12}
            step={0.1}
            display={`${rate.toFixed(1)}%`}
            onChange={v => setRate(Math.round(v * 10) / 10)}
          />

          {/* Term */}
          <SliderField
            label="Mortgage Term"
            value={years}
            min={5}
            max={35}
            step={5}
            display={`${years} years`}
            onChange={setYears}
          />
        </div>

        {/* Results */}
        <div className="space-y-0" style={{ border: '1px solid var(--border)' }}>
          {[
            { label: 'Monthly Repayment', value: fmt(result.monthly), highlight: true },
            { label: 'Loan Amount',        value: fmt(result.principal) },
            { label: 'Total Repayable',    value: fmt(result.totalCost) },
            { label: 'Total Interest',     value: fmt(result.interest) },
            { label: 'Loan-to-Value',      value: `${result.ltv.toFixed(0)}%` },
          ].map((row, i, arr) => (
            <div
              key={row.label}
              className="flex justify-between items-center px-6 py-5 transition-colors duration-200"
              style={{
                background: row.highlight ? 'rgba(201,169,110,0.08)' : 'transparent',
                borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              <span className="text-[10px] tracking-[2px] uppercase" style={{ color: 'var(--muted)' }}>{row.label}</span>
              <span
                className="font-display font-light"
                style={{ fontSize: row.highlight ? 28 : 20, color: row.highlight ? 'var(--gold)' : 'var(--white)' }}
              >
                {row.value}
              </span>
            </div>
          ))}

          {/* LTV bar */}
          <div className="px-6 py-5" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="flex justify-between mb-2">
              <span className="text-[9px] tracking-[3px] uppercase" style={{ color: 'var(--muted)' }}>Loan vs Deposit</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--surface2)' }}>
              <div
                className="h-full transition-all duration-500"
                style={{ width: `${result.ltv}%`, background: 'linear-gradient(to right, var(--gold-dim), var(--gold))' }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[9px]" style={{ color: 'var(--gold)' }}>Loan {result.ltv.toFixed(0)}%</span>
              <span className="text-[9px]" style={{ color: 'var(--muted)' }}>Deposit {deposit}%</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-[9px] font-light mt-6" style={{ color: 'var(--muted)' }}>
        * This calculator provides indicative figures only. Actual mortgage terms are subject to lender assessment and eligibility. We recommend speaking with a qualified mortgage advisor.
      </p>
    </div>
  )
}

function SliderField({
  label, value, min, max, step, display, onChange,
}: {
  label: string; value: number; min: number; max: number
  step: number; display: string; onChange: (v: number) => void
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="text-[9px] tracking-[3px] uppercase" style={{ color: 'var(--muted)' }}>{label}</label>
        <span className="font-display text-[15px] font-light" style={{ color: 'var(--gold)' }}>{display}</span>
      </div>
      <input
        type="range"
        min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full"
        style={{
          accentColor: 'var(--gold)',
          height: 2,
          background: `linear-gradient(to right, var(--gold) ${((value - min) / (max - min)) * 100}%, rgba(201,169,110,0.15) 0%)`,
        }}
      />
    </div>
  )
}
