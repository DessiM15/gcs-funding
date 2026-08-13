# GCS Funding

Marketing site and lead engine for GCS Funding, LLC (Cypress, TX) — built with
Next.js App Router, TypeScript, Tailwind v4, and Motion.

## Running it

```bash
npm install
cp .env.example .env.local   # fill in RESEND_API_KEY
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
npm run lint
```

## How it is organised

```
src/
  app/                 routes; every page exports metadata via buildMetadata()
    api/lead/          the only conversion endpoint — validates, screens, emails
    sitemap.ts         generated from the data files, so new content self-registers
    robots.ts
  components/          UI, motion primitives, header/footer, lead form, calculators
  content/blog/        markdown posts — add a file, it publishes
  lib/
    site.ts            NAP + business facts. Single source of truth.
    services.ts        the 5 service pages
    industries.ts      the 8 partner vertical pages
    locations.ts       the 6 city pages
    schema.tsx         JSON-LD builders
    seo.ts             metadata helper (title, description, canonical, OG)
```

### Content is data, not markup

Adding a service, a partner vertical, or a city means adding one object to the
relevant file in `src/lib/`. The page, its metadata, its JSON-LD, its nav entry,
and its sitemap row all follow automatically.

Adding a blog post means adding one markdown file to `src/content/blog/` with
frontmatter (`title`, `description`, `date`, `targetKeyword`, `category`).

### SEO decisions baked in

- Every page has a hand-written title and meta description, plus a canonical URL
- JSON-LD `@graph` with `FinancialService`/`LocalBusiness`, `Organization`,
  `Person`, `Service`, `FAQPage`, `BreadcrumbList`, and `Article` on posts
- All 15 legacy WordPress URLs 301 to their new equivalents (`next.config.ts`)
- Fonts self-hosted via `next/font` — no third-party request, no layout shift
- Every route is statically prerendered except `/api/lead`
- FAQ answers render open in the DOM rather than behind a click
- `/thank-you` is `noindex` so a conversion page never appears in results

### Client-specific behaviour

- **No phone in the header, by client direction.** The number appears only in the
  footer, in JSON-LD, and on the thank-you page — present for Google to verify
  the entity, not promoted as a contact path. See `src/lib/site.ts`.
- **Refresh returns to the top.** `ScrollReset` sets `history.scrollRestoration`
  to manual. Anchor links are exempt so deep links still work.
- **Logo always goes to the top.** Navigates home from any page; smooth-scrolls up
  when already home.
- **Intro animation shows once per session**, capped at 700ms, skipped entirely
  under `prefers-reduced-motion`.

## Before launch

Search the codebase for `NEEDS_SCOTT` — each hit marks a factual gap awaiting
client confirmation. The two that block work:

1. **The GBP address.** `16635 Spring Cypress Rd, Ste 1872` looks like a private
   mailbox. Google Business Profile prohibits mailbox services and suspends
   listings that use one. Confirm a real office or register as a Service Area
   Business with a hidden address.
2. **Scott's bio, headshot, and track record.** Lending is a YMYL topic; a named,
   photographed expert is the strongest available trust signal. The slot is built
   on `/about`.

Also: verify the sending domain in Resend, and have counsel review the four
policy pages.
