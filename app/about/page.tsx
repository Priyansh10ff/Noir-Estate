import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CustomCursor from '@/components/ui/CustomCursor'
import RevealInit from '@/components/ui/RevealInit'
import { getAgents } from '@/lib/queries'

export const metadata: Metadata = { title: 'About Us' }
export const revalidate = 3600

const PLACEHOLDER_TEAM = [
  { name: 'Edward Hawthorne',  title: 'Founder & CEO',              img: 'photo-1560250097-0b93528c311a' },
  { name: 'Isabelle Fontaine', title: 'Director, Private Sales',    img: 'photo-1573496359142-b8d87734a5a2' },
  { name: 'Marcus Chen',       title: 'Head of Acquisitions',       img: 'photo-1507003211169-0a1dd7228f2d' },
  { name: 'Sophia Laurent',    title: 'International Liaison',      img: 'photo-1580489944761-15a19d674a2f' },
]

const VALUES = [
  { num: '01', title: 'Discretion',    desc: 'Every client engagement is handled with absolute confidentiality. Our reputation is built on trust.' },
  { num: '02', title: 'Excellence',    desc: 'We hold ourselves to the highest standards — in the properties we represent and the service we deliver.' },
  { num: '03', title: 'Relationships', desc: 'Lasting partnerships, not transactions. We work with clients across generations and borders.' },
  { num: '04', title: 'Knowledge',     desc: 'Decades of combined expertise across every prime market globally, accessible through a single point of contact.' },
]

export default async function AboutPage() {
  let agents: Awaited<ReturnType<typeof getAgents>> = []
  try { agents = await getAgents() } catch {}

  const team = agents.length > 0 ? agents : PLACEHOLDER_TEAM

  return (
    <>
      <CustomCursor />
      <RevealInit />
      <Navbar />
      <main>
        {/* Hero */}
        <div
          className="relative px-[60px] pt-48 pb-24 overflow-hidden"
          style={{
            background: `
              linear-gradient(rgba(10,10,10,0.8), rgba(10,10,10,0.8)),
              url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80') center/cover
            `,
          }}
        >
          <span className="section-label">Our Story</span>
          <h1 className="font-display font-light mb-6" style={{ fontSize: 'clamp(42px,6vw,76px)', lineHeight: 1.08, maxWidth: 700 }}>
            A House Built on <em className="italic" style={{ color: 'var(--gold)' }}>Conviction</em>
          </h1>
          <div className="gold-line" />
          <p className="text-[13px] font-light leading-loose mt-8" style={{ color: 'var(--muted)', maxWidth: 580 }}>
            Founded in 2008, NOIR Estate was born from a single belief: that the world's most remarkable properties deserve representation that matches their calibre. From a small London office, we have grown into a global consultancy trusted by heads of state, cultural institutions, and private collectors alike.
          </p>
        </div>

        {/* Values */}
        <section className="px-[60px] py-[100px]" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
          <div className="reveal mb-14">
            <span className="section-label">What We Stand For</span>
            <h2 className="font-display font-light" style={{ fontSize: 'clamp(32px,4vw,52px)' }}>
              Our <em className="italic" style={{ color: 'var(--gold)' }}>Principles</em>
            </h2>
            <div className="gold-line mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0.5" style={{ background: 'var(--border)' }}>
            {VALUES.map((v, i) => (
              <div
                key={v.num}
                className={`reveal reveal-delay-${i} p-10`}
                style={{ background: 'var(--surface)' }}
              >
                <span className="font-display text-[48px] font-light block mb-6 leading-none" style={{ color: 'rgba(201,169,110,0.2)' }}>
                  {v.num}
                </span>
                <h3 className="font-display text-[22px] font-light mb-3">{v.title}</h3>
                <p className="text-[11px] font-light leading-loose" style={{ color: 'var(--muted)' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Numbers */}
        <section className="px-[60px] py-[80px]" style={{ background: 'var(--black)' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0.5" style={{ border: '1px solid var(--border)', background: 'var(--border)' }}>
            {[
              { num: '2008',  label: 'Year Founded' },
              { num: '18',    label: 'Global Offices' },
              { num: '$4.2B', label: 'Annual Sales Volume' },
              { num: '1,200+',label: 'Clients Served' },
            ].map((s, i) => (
              <div key={s.label} className={`reveal reveal-delay-${i} py-12 text-center`} style={{ background: 'var(--black)' }}>
                <span className="font-display text-[44px] font-light block" style={{ color: 'var(--gold)' }}>{s.num}</span>
                <span className="text-[9px] tracking-[3px] uppercase mt-2 block" style={{ color: 'var(--muted)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section id="team" className="px-[60px] py-[100px]" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
          <div className="reveal mb-14">
            <span className="section-label">The People</span>
            <h2 className="font-display font-light" style={{ fontSize: 'clamp(32px,4vw,52px)' }}>
              Our <em className="italic" style={{ color: 'var(--gold)' }}>Team</em>
            </h2>
            <div className="gold-line mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0.5" style={{ background: 'var(--border)' }}>
            {team.map((member, i) => {
              const name  = (member as any).name
              const title = (member as any).title
              const imgSrc = (member as any).photo?.asset?.url
                ? (member as any).photo.asset.url
                : `https://images.unsplash.com/${(PLACEHOLDER_TEAM[i % PLACEHOLDER_TEAM.length] as any).img}?w=400&q=80`

              return (
                <div
                  key={name}
                  className={`reveal reveal-delay-${i % 4} group overflow-hidden`}
                  style={{ background: 'var(--surface)' }}
                >
                  <div
                    className="transition-transform duration-700 group-hover:scale-[1.04]"
                    style={{
                      aspectRatio: '3/4',
                      background: `url('${imgSrc}') center/cover`,
                      filter: 'grayscale(20%)',
                    }}
                  />
                  <div className="p-6">
                    <h3 className="font-display text-[20px] font-light mb-1">{name}</h3>
                    <p className="text-[9px] tracking-[2px] uppercase" style={{ color: 'var(--gold)' }}>{title}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Press */}
        <section id="press" className="px-[60px] py-[80px]" style={{ background: 'var(--black)', borderTop: '1px solid var(--border)' }}>
          <div className="reveal mb-14">
            <span className="section-label">Recognition</span>
            <h2 className="font-display font-light" style={{ fontSize: 'clamp(28px,3.5vw,44px)' }}>
              As Featured <em className="italic" style={{ color: 'var(--gold)' }}>In</em>
            </h2>
            <div className="gold-line mt-4" />
          </div>
          <div className="flex flex-wrap gap-12 items-center reveal">
            {['The Financial Times', 'Architectural Digest', 'Forbes', 'The Wall Street Journal', 'Wallpaper*', 'Robb Report'].map(pub => (
              <span
                key={pub}
                className="font-display text-[18px] font-light italic transition-colors duration-300 hover:text-gold"
                style={{ color: 'rgba(245,240,232,0.25)', cursor: 'default' }}
              >
                {pub}
              </span>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
