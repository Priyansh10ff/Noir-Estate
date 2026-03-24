# NOIR Estate — Next.js 14 + Sanity CMS + Resend + Cal.com

A production-ready luxury real estate landing page built with Next.js 14 App Router, Sanity CMS, Resend email, and Cal.com booking.

---

## Tech Stack

| Layer        | Technology               |
|--------------|--------------------------|
| Framework    | Next.js 14 (App Router)  |
| Styling      | Tailwind CSS             |
| CMS          | Sanity v3                |
| Email        | Resend                   |
| Booking      | Cal.com embed            |
| Forms        | React Hook Form + Zod    |
| Deployment   | Vercel                   |

---

## Project Structure

```
noir-estate/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── properties/
│   │   ├── page.tsx                # All properties listing + filters
│   │   └── [slug]/page.tsx         # Single property detail
│   ├── contact/page.tsx            # Contact + inquiry + booking
│   ├── api/
│   │   ├── inquiry/route.ts        # POST: send inquiry email via Resend
│   │   ├── booking/route.ts        # POST: booking request + confirmation email
│   │   ├── newsletter/route.ts     # POST: newsletter signup
│   │   └── properties/route.ts    # GET: filtered properties from Sanity
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx              # Sticky nav with scroll effect
│   │   └── Footer.tsx              # Footer + newsletter form
│   ├── sections/
│   │   ├── HeroSection.tsx         # Full-screen hero
│   │   └── HomeSections.tsx        # Stats, Marquee, Services, Testimonial, CTA
│   └── ui/
│       ├── PropertyCard.tsx        # Reusable property card
│       ├── InquiryForm.tsx         # Validated inquiry form
│       ├── BookingForm.tsx         # Viewing request + Cal.com embed
│       ├── CustomCursor.tsx        # Gold cursor
│       └── RevealInit.tsx          # Scroll reveal trigger
├── lib/
│   ├── sanity.ts                   # Sanity client + image URL builder
│   ├── queries.ts                  # All GROQ queries
│   ├── email.ts                    # Resend email templates
│   └── utils.ts                   # Helpers (formatPrice, etc.)
├── sanity/
│   └── schemas/index.ts            # All Sanity schemas
├── sanity.config.ts                # Sanity Studio config
├── types/index.ts                  # TypeScript types
└── styles/globals.css              # Global CSS + design tokens
```

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment variables
```bash
cp .env.local.example .env.local
```

Fill in `.env.local`:

```env
# Sanity CMS (https://sanity.io)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_write_token

# Resend Email (https://resend.com)
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@yourdomain.com
RESEND_TO_EMAIL=contact@yourdomain.com

# Cal.com (https://cal.com)
NEXT_PUBLIC_CALCOM_USERNAME=your-username
NEXT_PUBLIC_CALCOM_EVENT_TYPE=private-viewing
```

### 3. Set up Sanity
```bash
# Create a new Sanity project
npx sanity init

# Or run the Studio locally
npm run studio
```

### 4. Set up Resend
1. Go to https://resend.com and create a free account
2. Add your domain and verify DNS
3. Generate an API key and add to `.env.local`

### 5. Set up Cal.com
1. Create account at https://cal.com
2. Create an event type called "Private Viewing" (30 or 60 min)
3. Set `NEXT_PUBLIC_CALCOM_USERNAME` in your env
4. In `BookingForm.tsx`, uncomment the `<Cal />` embed and install:
   ```bash
   npm install @calcom/embed-react
   ```

### 6. Run the dev server
```bash
npm run dev
```

Open http://localhost:3000

---

## Pages

| Route                     | Description                           |
|---------------------------|---------------------------------------|
| `/`                       | Homepage with hero, listings, services|
| `/properties`             | All properties with category filters  |
| `/properties/[slug]`      | Single property with booking form     |
| `/contact`                | Contact page with full forms          |
| `/studio`                 | Sanity Studio (admin panel)           |

---

## API Routes

| Method | Endpoint             | Description                        |
|--------|----------------------|------------------------------------|
| POST   | `/api/inquiry`       | Send inquiry + auto-reply email    |
| POST   | `/api/booking`       | Submit viewing request             |
| POST   | `/api/newsletter`    | Newsletter signup                  |
| GET    | `/api/properties`    | Filtered property list             |

---

## What to Add Next (Fiverr Upsell Features)

These features can be added as premium gig extras:

- **Property Search** — full-text search via Sanity or Algolia
- **Saved Properties** — wishlist via localStorage or auth
- **Virtual Tour** — Matterport iframe integration
- **Interactive Map** — Mapbox GL JS property locations
- **Mortgage Calculator** — client-side calculator widget
- **Market Reports** — downloadable PDF brochures
- **Multi-language** — next-intl for i18n
- **Admin Dashboard** — protected /admin route with property management UI
- **Authentication** — NextAuth.js for agent login
- **Property Comparison** — side-by-side property comparison page

---

## Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard or:
vercel env add RESEND_API_KEY
vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID
# ... etc
```

---

## Design System

| Token         | Value                  |
|---------------|------------------------|
| Primary Black | `#0A0A0A`              |
| Surface       | `#181818`              |
| Gold          | `#C9A96E`              |
| Gold Light    | `#E8CC9A`              |
| Cream White   | `#F5F0E8`              |
| Muted Gray    | `#888880`              |
| Font Display  | Cormorant Garamond 300 |
| Font Body     | Montserrat 200–400     |

---

Built by [Your Name] — Available on Fiverr for customisation and deployment.
