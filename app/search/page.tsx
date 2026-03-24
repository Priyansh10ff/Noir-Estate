import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CustomCursor from '@/components/ui/CustomCursor'
import RevealInit from '@/components/ui/RevealInit'
import PropertySearch from '@/components/ui/PropertySearch'
import MortgageCalculator from '@/components/ui/MortgageCalculator'

export const metadata: Metadata = { title: 'Search Properties' }

export default function SearchPage() {
  return (
    <>
      <CustomCursor />
      <RevealInit />
      <Navbar />
      <main>
        {/* Header */}
        <div className="px-[60px] pt-40 pb-16" style={{ borderBottom: '1px solid var(--border)' }}>
          <span className="section-label">Find Your Residence</span>
          <h1 className="font-display font-light" style={{ fontSize: 'clamp(42px,6vw,76px)', lineHeight: 1.08 }}>
            Property <em className="italic" style={{ color: 'var(--gold)' }}>Search</em>
          </h1>
          <div className="gold-line mt-4" />
        </div>

        {/* Search */}
        <section className="px-[60px] py-[60px]">
          <PropertySearch />
        </section>

        {/* Mortgage Calculator */}
        <section className="px-[60px] pb-[80px]">
          <MortgageCalculator />
        </section>
      </main>
      <Footer />
    </>
  )
}
