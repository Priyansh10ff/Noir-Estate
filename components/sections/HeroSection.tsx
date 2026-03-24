import Link from 'next/link'

export default function HeroSection() {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ height: '100vh', minHeight: 600 }}
    >
      {/* Background layers */}
      <div
        className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(135deg, #0A0A0A 0%, #1a1208 35%, #0d0d0d 70%, #0A0A0A 100%)' }}
      />
      <div
        className="absolute inset-0 z-1"
        style={{
          opacity: 0.06,
          backgroundImage: 'repeating-linear-gradient(45deg, #C9A96E 0, #C9A96E 1px, transparent 0, transparent 50%)',
          backgroundSize: '24px 24px',
        }}
      />
      <div
        className="absolute inset-0 z-2"
        style={{
          background: `
            linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.1) 40%, rgba(10,10,10,0.7) 80%, rgba(10,10,10,1) 100%),
            url('https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1600&q=80') center/cover no-repeat
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-10 max-w-4xl">
        <p
          className="text-[10px] font-light tracking-[5px] uppercase mb-6"
          style={{
            color: 'var(--gold)',
            opacity: 0,
            animation: 'fadeUp 1s ease 0.3s forwards',
          }}
        >
          Curated Luxury Properties
        </p>
        <h1
          className="font-display font-light mb-7"
          style={{
            fontSize: 'clamp(52px, 8vw, 96px)',
            lineHeight: 1.05,
            letterSpacing: '-1px',
            opacity: 0,
            animation: 'fadeUp 1s ease 0.6s forwards',
          }}
        >
          Where <em className="italic" style={{ color: 'var(--gold)' }}>Extraordinary</em>
          <br />Becomes Home
        </h1>
        <p
          className="text-[12px] font-extralight tracking-[2px] mx-auto mb-12 leading-loose"
          style={{
            color: 'var(--muted)',
            maxWidth: 480,
            opacity: 0,
            animation: 'fadeUp 1s ease 0.9s forwards',
          }}
        >
          We present the world's most refined residences — each selected for its architectural distinction and unrivalled setting
        </p>
        <div
          className="flex gap-4 justify-center items-center"
          style={{ opacity: 0, animation: 'fadeUp 1s ease 1.2s forwards' }}
        >
          <Link href="/properties" className="btn-primary">Explore Collection</Link>
          <Link href="/contact" className="btn-ghost">Request Private Viewing</Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        style={{ opacity: 0, animation: 'fadeIn 1s ease 2s forwards' }}
      >
        <span className="text-[9px] tracking-[4px] uppercase" style={{ color: 'var(--muted)' }}>Scroll</span>
        <div className="w-px h-10 origin-top" style={{ background: 'var(--gold-dim)', animation: 'scrollPulse 2s ease-in-out infinite' }} />
      </div>
    </section>
  )
}
