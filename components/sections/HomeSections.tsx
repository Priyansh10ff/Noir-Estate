'use client'

// ─── Stats Strip ──────────────────────────────────────────────────────────────

export function StatsStrip() {
  const stats = [
    { num: '$4.2B', label: 'Sales Volume' },
    { num: '340+',  label: 'Premium Listings' },
    { num: '18',    label: 'Global Markets' },
    { num: '97%',   label: 'Client Satisfaction' },
  ]
  return (
    <div
      className="flex"
      style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
    >
      {stats.map((s, i) => (
        <div
          key={s.label}
          className="reveal flex-1 py-9 px-10 text-center transition-colors duration-300 hover:bg-surface2"
          style={{ borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none' }}
        >
          <span className="font-display text-[40px] font-light block" style={{ color: 'var(--gold)' }}>{s.num}</span>
          <span className="text-[9px] font-light tracking-[3px] uppercase mt-1 block" style={{ color: 'var(--muted)' }}>{s.label}</span>
        </div>
      ))}
    </div>
  )
}

// ─── Marquee ──────────────────────────────────────────────────────────────────

export function MarqueeStrip() {
  const items = ['Penthouse Suites', 'Waterfront Estates', 'Private Villas', 'Sky Residences', 'Heritage Mansions', 'Countryside Retreats']
  const doubled = [...items, ...items]
  return (
    <div style={{ background: 'var(--gold)', padding: '18px 0', overflow: 'hidden' }}>
      <div className="flex" style={{ animation: 'marquee 25s linear infinite', whiteSpace: 'nowrap' }}>
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="font-display text-[18px] font-light italic px-10" style={{ color: 'var(--black)', flexShrink: 0 }}>
              {item}
            </span>
            <span className="text-[8px]" style={{ color: 'rgba(10,10,10,0.4)' }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Services Section ─────────────────────────────────────────────────────────

export function ServicesSection() {
  const services = [
    {
      num: '01',
      name: 'Private Acquisitions',
      desc: 'Discreet property sourcing for discerning clients who demand access to off-market and pre-market opportunities worldwide.',
    },
    {
      num: '02',
      name: 'Portfolio Management',
      desc: 'Comprehensive oversight of luxury real estate portfolios, maximising returns while preserving the integrity of each asset.',
    },
    {
      num: '03',
      name: 'Interior Curation',
      desc: 'Collaborating with the world\'s finest designers to furnish, stage, and present properties to their fullest potential.',
    },
    {
      num: '04',
      name: 'Global Relocation',
      desc: 'End-to-end relocation services for international clients, managing every detail from legal to lifestyle.',
    },
  ]
  return (
    <section
      id="services"
      className="px-[60px] py-[100px]"
      style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
    >
      <div className="max-w-[640px] reveal">
        <span className="section-label">Our Expertise</span>
        <h2 className="font-display font-light mb-4" style={{ fontSize: 'clamp(36px,5vw,58px)', lineHeight: 1.1 }}>
          A Full Spectrum of <em className="italic" style={{ color: 'var(--gold)' }}>Bespoke</em> Services
        </h2>
        <div className="gold-line mb-12" />
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        style={{ gap: 1, background: 'var(--border)', border: '1px solid var(--border)' }}
      >
        {services.map((s, i) => (
          <div
            key={s.num}
            className={`reveal reveal-delay-${i} p-10 transition-colors duration-300 hover:bg-surface2`}
            style={{ background: 'var(--surface)' }}
          >
            <span
              className="font-display text-[48px] font-light block mb-6 leading-none transition-colors duration-300"
              style={{ color: 'rgba(201,169,110,0.2)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(201,169,110,0.2)')}
            >
              {s.num}
            </span>
            <h3 className="font-display text-[22px] font-light mb-3">{s.name}</h3>
            <p className="text-[11px] font-extralight leading-loose" style={{ color: 'var(--muted)' }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Testimonial Section ──────────────────────────────────────────────────────

export function TestimonialSection() {
  return (
    <section
      className="px-[60px] py-[120px] text-center"
      style={{ background: 'var(--black)' }}
    >
      <span className="section-label reveal">Client Testimonial</span>
      <blockquote className="font-display font-light italic mx-auto mb-9 reveal" style={{
        fontSize: 'clamp(22px,3vw,36px)',
        lineHeight: 1.5,
        maxWidth: 780,
      }}>
        "Working with NOIR Estate was unlike any experience I'd had in property. They understood not just what I needed, but why — and delivered something far beyond expectation."
      </blockquote>
      <p className="text-[10px] font-light tracking-[4px] uppercase reveal" style={{ color: 'var(--gold)' }}>
        Elara Montague
      </p>
      <p className="text-[9px] font-extralight tracking-[2px] mt-1 reveal" style={{ color: 'var(--muted)' }}>
        Private Collector & Art Patron, New York
      </p>
    </section>
  )
}

// ─── CTA Section ──────────────────────────────────────────────────────────────

export function CTASection() {
  return (
    <section
      className="relative px-[60px] py-[140px] text-center overflow-hidden"
      style={{
        background: `
          linear-gradient(rgba(10,10,10,0.75), rgba(10,10,10,0.75)),
          url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80') center/cover
        `,
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(201,169,110,0.05), transparent)' }}
      />
      <h2
        className="font-display font-light mb-5 relative z-10 reveal"
        style={{ fontSize: 'clamp(42px,6vw,76px)' }}
      >
        Begin Your <em className="italic" style={{ color: 'var(--gold)' }}>Journey</em>
      </h2>
      <p className="text-[11px] font-extralight tracking-[2px] mb-12 relative z-10 reveal" style={{ color: 'var(--muted)' }}>
        Private viewings available by appointment. Global portfolio. Complete discretion.
      </p>
      <div className="flex gap-4 justify-center relative z-10 reveal">
        <a href="/contact" className="btn-primary">Request a Consultation</a>
        <a href="/properties" className="btn-ghost">View Collection</a>
      </div>
    </section>
  )
}