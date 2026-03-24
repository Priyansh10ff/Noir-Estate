import type { Metadata } from 'next'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CustomCursor from '@/components/ui/CustomCursor'
import RevealInit from '@/components/ui/RevealInit'
import { getBlogPostBySlug } from '@/lib/queries'
import { urlForImage } from '@/lib/sanity'
import { ArrowLeft } from 'lucide-react'

interface Props { params: { slug: string } }

const PLACEHOLDER_CONTENT = {
  title: 'Prime London Markets: What to Expect in 2025',
  category: 'Market Insights',
  date: 'March 2025',
  readTime: 6,
  img: 'photo-1486325212027-8081e485255e',
  excerpt: 'London\'s prime property market has demonstrated remarkable resilience through economic cycles. As we enter 2025, a confluence of factors — from shifting interest rate expectations to evolving buyer demographics — is reshaping the landscape for ultra-luxury real estate.',
  body: [
    { heading: 'The Resilience of Prime Central London', text: 'Prime Central London (PCL) has long been considered a safe harbour for international capital. Despite macroeconomic headwinds, demand from UHNW buyers — particularly from the Middle East, Southeast Asia, and the Americas — has remained robust. Properties above the £10M threshold have seen a 12% increase in transaction velocity compared to 2023.' },
    { heading: 'New Neighbourhoods of Desire', text: 'While Mayfair and Knightsbridge retain their crown, emerging micro-markets in Nine Elms, White City, and Battersea Power Station are attracting a new generation of luxury buyers. These developments combine architectural ambition with modern amenities in ways that period properties simply cannot match.' },
    { heading: 'The Off-Market Premium', text: 'An estimated 40% of all transactions above £5M in London now occur off-market. This trend — driven by a desire for privacy and efficiency — has elevated the role of relationship-driven brokerages like NOIR Estate, who curate access rather than simply advertise properties.' },
  ],
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: PLACEHOLDER_CONTENT.title }
}

export default async function JournalPostPage({ params }: Props) {
  let post: Awaited<ReturnType<typeof getBlogPostBySlug>> = null
  try { post = await getBlogPostBySlug(params.slug) } catch {}

  const usePlaceholder = !post

  return (
    <>
      <CustomCursor />
      <RevealInit />
      <Navbar />
      <main>
        {/* Hero */}
        <div
          className="relative flex items-end px-[60px] pb-16"
          style={{
            height: 520,
            background: usePlaceholder
              ? `linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.85) 100%), url('https://images.unsplash.com/${PLACEHOLDER_CONTENT.img}?w=1600&q=80') center/cover`
              : `linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.85) 100%)`,
          }}
        >
          <div style={{ maxWidth: 760 }}>
            <Link
              href="/journal"
              className="flex items-center gap-2 no-underline mb-8 transition-colors hover:text-gold"
              style={{ color: 'var(--muted)', fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase' }}
            >
              <ArrowLeft size={12} /> Back to Journal
            </Link>
            <span className="text-[8px] tracking-[3px] uppercase px-2.5 py-1 mb-5 inline-block" style={{ background: 'var(--gold)', color: 'var(--black)' }}>
              {usePlaceholder ? PLACEHOLDER_CONTENT.category : post?.category}
            </span>
            <h1 className="font-display font-light leading-tight mb-5" style={{ fontSize: 'clamp(28px,4vw,52px)' }}>
              {usePlaceholder ? PLACEHOLDER_CONTENT.title : post?.title}
            </h1>
            <p className="text-[10px] tracking-[2px]" style={{ color: 'var(--muted)' }}>
              {usePlaceholder ? PLACEHOLDER_CONTENT.date : new Date(post!._createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              {' · '}
              {usePlaceholder ? PLACEHOLDER_CONTENT.readTime : post?.readTime} min read
            </p>
          </div>
        </div>

        {/* Article Body */}
        <div className="px-[60px] py-[80px] grid grid-cols-1 lg:grid-cols-3 gap-16">
          <article className="lg:col-span-2 reveal">
            <p className="font-display text-[20px] font-light italic leading-relaxed mb-10" style={{ color: 'var(--white)', borderLeft: '2px solid var(--gold)', paddingLeft: 24 }}>
              {usePlaceholder ? PLACEHOLDER_CONTENT.excerpt : post?.excerpt}
            </p>

            {usePlaceholder ? (
              <div className="space-y-10">
                {PLACEHOLDER_CONTENT.body.map(section => (
                  <div key={section.heading}>
                    <h2 className="font-display text-[26px] font-light mb-4">{section.heading}</h2>
                    <p className="text-[13px] font-light leading-loose" style={{ color: 'var(--muted)' }}>{section.text}</p>
                  </div>
                ))}
              </div>
            ) : post?.body && (
              <div className="prose prose-invert prose-gold max-w-none">
                <PortableText value={post.body} />
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="space-y-8 reveal reveal-delay-2">
            {/* Author */}
            <div className="p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <p className="text-[9px] tracking-[3px] uppercase mb-4" style={{ color: 'var(--gold)' }}>Author</p>
              <p className="font-display text-[18px] font-light mb-1">
                {usePlaceholder ? 'Alexandra Whitmore' : post?.author?.name}
              </p>
              <p className="text-[10px] tracking-[1px]" style={{ color: 'var(--muted)' }}>
                {usePlaceholder ? 'Head of Market Research' : post?.author?.title}
              </p>
            </div>

            {/* CTA */}
            <div className="p-6" style={{ background: 'var(--surface2)', borderLeft: '2px solid var(--gold)' }}>
              <p className="text-[9px] tracking-[3px] uppercase mb-3" style={{ color: 'var(--gold)' }}>Interested?</p>
              <p className="text-[12px] font-light leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
                Speak with our team about current opportunities in this market.
              </p>
              <Link href="/contact" className="btn-primary text-[9px] inline-block">Book a Call</Link>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  )
}
