import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CustomCursor from '@/components/ui/CustomCursor'
import RevealInit from '@/components/ui/RevealInit'
import { getBlogPosts } from '@/lib/queries'
import { urlForImage } from '@/lib/sanity'

export const metadata: Metadata = { title: 'Journal' }
export const revalidate = 60

const PLACEHOLDER_POSTS = [
  { slug: 'prime-london-markets-2025',      title: 'Prime London Markets: What to Expect in 2025',        category: 'Market Insights',  date: 'March 2025',    img: 'photo-1486325212027-8081e485255e', readTime: 6  },
  { slug: 'art-of-off-market',              title: 'The Art of the Off-Market Transaction',                category: 'Private Sales',    date: 'February 2025', img: 'photo-1600047509807-ba8f99d2cdde', readTime: 5  },
  { slug: 'ultra-luxury-design-trends',     title: 'Ultra-Luxury Design Trends Shaping 2025',             category: 'Architecture',     date: 'January 2025',  img: 'photo-1600607688969-a5bfcd646154', readTime: 7  },
  { slug: 'investing-in-monaco-real-estate',title:'Monaco Real Estate: A Comprehensive Investment Guide',       category: 'Investment',       date: 'December 2024', img: 'photo-1512917774080-9991f1c4c750', readTime: 9  },
  { slug: 'staging-luxury-properties',      title: 'The Science Behind Staging a Luxury Property',        category: 'Interior Design',  date: 'November 2024', img: 'photo-1600210492493-0946911123ea', readTime: 4  },
  { slug: 'global-relocation-guide',        title: 'The Ultimate Global Relocation Guide for HNWIs',      category: 'Lifestyle',        date: 'October 2024',  img: 'photo-1436491865332-7a61a109cc05', readTime: 8  },
]

export default async function JournalPage() {
  let posts: Awaited<ReturnType<typeof getBlogPosts>> = []
  try { posts = await getBlogPosts() } catch {}

  const usePlaceholder = posts.length === 0

  return (
    <>
      <CustomCursor />
      <RevealInit />
      <Navbar />
      <main>
        {/* Header */}
        <div className="px-[60px] pt-40 pb-16" style={{ borderBottom: '1px solid var(--border)' }}>
          <span className="section-label">Insights & Perspectives</span>
          <h1 className="font-display font-light" style={{ fontSize: 'clamp(42px,6vw,76px)', lineHeight: 1.08 }}>
            The <em className="italic" style={{ color: 'var(--gold)' }}>Journal</em>
          </h1>
          <div className="gold-line mt-4" />
        </div>

        {/* Featured Post */}
        {usePlaceholder ? (
          <Link
            href={`/journal/${PLACEHOLDER_POSTS[0].slug}`}
            className="block relative overflow-hidden group no-underline"
            style={{ height: 480 }}
          >
            <div
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]"
              style={{
                background: `
                  linear-gradient(to right, rgba(10,10,10,0.9) 40%, rgba(10,10,10,0.2) 100%),
                  url('https://images.unsplash.com/${PLACEHOLDER_POSTS[0].img}?w=1600&q=80') center/cover
                `,
              }}
            />
            <div className="absolute inset-0 flex items-center px-[60px]">
              <div style={{ maxWidth: 560 }}>
                <span className="text-[8px] tracking-[3px] uppercase px-2.5 py-1 mb-6 inline-block" style={{ background: 'var(--gold)', color: 'var(--black)' }}>
                  {PLACEHOLDER_POSTS[0].category}
                </span>
                <h2 className="font-display text-[36px] font-light leading-tight mb-4">{PLACEHOLDER_POSTS[0].title}</h2>
                <p className="text-[10px] tracking-[2px]" style={{ color: 'var(--muted)' }}>
                  {PLACEHOLDER_POSTS[0].date} · {PLACEHOLDER_POSTS[0].readTime} min read
                </p>
              </div>
            </div>
          </Link>
        ) : posts[0] && (
          <Link href={`/journal/${posts[0].slug.current}`} className="block relative overflow-hidden group no-underline" style={{ height: 480 }}>
            <div
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]"
              style={{
                background: `linear-gradient(to right, rgba(10,10,10,0.9) 40%, rgba(10,10,10,0.2) 100%)`,
              }}
            />
            <div className="absolute inset-0 flex items-center px-[60px]">
              <div style={{ maxWidth: 560 }}>
                <span className="text-[8px] tracking-[3px] uppercase px-2.5 py-1 mb-6 inline-block" style={{ background: 'var(--gold)', color: 'var(--black)' }}>
                  {posts[0].category}
                </span>
                <h2 className="font-display text-[36px] font-light leading-tight mb-4">{posts[0].title}</h2>
                <p className="text-[10px] tracking-[2px]" style={{ color: 'var(--muted)' }}>
                  {new Date(posts[0]._createdAt).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })} · {posts[0].readTime} min read
                </p>
              </div>
            </div>
          </Link>
        )}

        {/* Grid */}
        <div className="px-[60px] py-[80px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {(usePlaceholder ? PLACEHOLDER_POSTS.slice(1) : posts.slice(1)).map((post, i) => {
              const isReal = !usePlaceholder
              const slug    = isReal ? (post as any).slug.current : (post as any).slug
              const cat     = (post as any).category
              const date    = isReal
                ? new Date((post as any)._createdAt).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
                : (post as any).date
              const rt      = (post as any).readTime
              const imgSrc  = isReal && (post as any).featuredImage
                ? urlForImage((post as any).featuredImage, 600, 400)
                : `https://images.unsplash.com/${(post as any).img}?w=600&q=80`

              return (
                <Link
                  key={slug}
                  href={`/journal/${slug}`}
                  className={`reveal reveal-delay-${i % 3} group block no-underline`}
                >
                  <div className="relative overflow-hidden mb-6" style={{ aspectRatio: '3/2' }}>
                    <div
                      className="w-full h-full transition-transform duration-700 group-hover:scale-[1.05]"
                      style={{ background: `url('${imgSrc}') center/cover` }}
                    />
                  </div>
                  <span className="text-[8px] tracking-[3px] uppercase" style={{ color: 'var(--gold)' }}>{cat}</span>
                  <h3 className="font-display text-[20px] font-light mt-2 mb-2 leading-snug group-hover:text-gold transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-[10px] tracking-[1px]" style={{ color: 'var(--muted)' }}>
                    {date} · {rt} min read
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
