# Banban Knockdown Nakhon Sawan — Website Design Spec

**Date:** 2026-05-01
**Client:** เรื่องบ้านบ้านน็อคดาวน์ นครสวรรค์ (Baan Knockdown Nakhon Sawan)
**Primary keyword target:** บ้านน็อคดาวน์ นครสวรรค์
**Repository working directory:** `/Users/tanawatwattanarach/Documents/client website/banban knockdown/`

---

## 1. Goals & Constraints

### Business goals
- Generate qualified leads for prefab/knockdown house construction in Nakhon Sawan and 4 nearby provinces
- Build credibility through real project photos, structured pricing, and detailed process info
- Rank on Google for "บ้านน็อคดาวน์ นครสวรรค์" and related local long-tail queries

### User-stated constraints
- **Lightweight** — fast load times, minimal bundle size
- **Easy to maintain** — client/developer edits content directly in code (no CMS)
- **Local SEO best practice** — focus on the keyword "บ้านน็อคดาวน์ นครสวรรค์"
- **No CMS** — all page and blog content lives in the repo as text/markdown files
- **Use the design from `banban knockdown.zip`** — Claude Design has already produced a complete static HTML mockup; treat it as the visual reference

---

## 2. Source Materials (already provided in the zip)

`banban-knockdown-design/` contains:
- 8 main HTML pages: `index`, `services`, `models`, `portfolio`, `process`, `about`, `blog`, `contact`
- 4 blog post HTML files in `blog/`
- `assets/site.css` (already follows the brand design system)
- `assets/site.js`
- `assets/photos/` (real project photography)
- `assets/logo-circle.png`, `assets/logo-header.png`, `assets/fb-cover.png`
- `uploads/client_information.md` — authoritative business info
- `uploads/design_system.md` — brand colors, typography, components
- `uploads/website_structure.md` — page-by-page content spec
- `uploads/example webiste design for style.jpg` — visual reference

The HTML mockup already contains comprehensive SEO meta tags, JSON-LD structured data (`GeneralContractor`, `FAQPage`), geo tags, and canonical URLs. The implementation will port content from this mockup into a maintainable Astro structure.

---

## 3. Technology Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Astro 5** | Outputs pure static HTML; near-zero JS by default; built-in content collections + image optimization |
| Styling | **Vanilla CSS** (port `assets/site.css`) | No framework needed; existing CSS already matches design system; CSS custom properties for brand tokens |
| Content | **Astro Content Collections** (Zod-typed) | Type-safe markdown + TypeScript data files; build fails on schema mismatch |
| Images | **Astro `<Image>`** + `@astrojs/sitemap` | Auto WebP/AVIF, responsive `srcset`, lazy loading, auto sitemap |
| Fonts | **Google Fonts: Prompt + Kanit** (preconnect + display=swap) | Match brand spec |
| Form backend | **Web3Forms** (free, no-account-required tier acceptable) | Submissions emailed to `baannockdown.ns@gmail.com`; honeypot anti-spam; no backend required |
| Tracking | **Google Tag Manager** (`PUBLIC_GTM_ID` env var) | Single snippet; client can manage GA4/Meta Pixel/LINE Pixel without code changes |
| Hosting | **Cloudflare Pages** | Bangkok edge nodes (best Thailand TTFB); free SSL; auto-deploy from GitHub; generous free tier |
| Source control | **GitHub** (private repo) | Trigger for CF Pages auto-deploy |

### Performance budget
- HTML + CSS + JS per page (excluding images): **<50KB**
- Total JS shipped: **<5KB** (mobile menu, portfolio filter, lazy map)
- Lighthouse mobile: Performance ≥95, SEO 100, Accessibility ≥95, Best Practices ≥95
- LCP <1.5s, CLS ≈0, INP <100ms

---

## 4. Project Structure

```
banban-knockdown/
├── public/
│   ├── favicon.png
│   ├── robots.txt
│   ├── photos/                       (project photos copied from zip)
│   └── logo-header.png
├── src/
│   ├── content/
│   │   ├── config.ts                 (Zod schemas for all collections)
│   │   ├── site.ts                   (NAP single source of truth)
│   │   ├── services.ts               (6 services array)
│   │   ├── models.ts                 (4 house model categories + pricing)
│   │   ├── portfolio.ts              (gallery items with category)
│   │   ├── faq.ts                    (used on FAQ page + FAQPage JSON-LD)
│   │   └── blog/                     (markdown blog posts)
│   │       ├── baan-knockdown-price-2026.md
│   │       ├── baan-knockdown-vs-brick.md
│   │       ├── choose-baan-knockdown.md
│   │       └── maintain-baan-knockdown.md
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── FloatingCTAs.astro
│   │   ├── SEO.astro
│   │   ├── LocalBusinessSchema.astro
│   │   ├── Hero.astro
│   │   ├── TrustBar.astro
│   │   ├── WhyChooseUs.astro
│   │   ├── ServiceCard.astro
│   │   ├── ServiceList.astro
│   │   ├── ModelCard.astro
│   │   ├── ModelGrid.astro
│   │   ├── PortfolioGrid.astro
│   │   ├── Process.astro
│   │   ├── Promotion.astro
│   │   ├── FinalCTA.astro
│   │   ├── ContactForm.astro
│   │   ├── MapEmbed.astro
│   │   └── FAQ.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── services.astro
│   │   ├── models.astro
│   │   ├── portfolio.astro
│   │   ├── process.astro
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── promotions.astro
│   │   ├── faq.astro
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   └── 404.astro
│   └── styles/
│       └── site.css                  (brand tokens at top, ported from zip)
├── astro.config.mjs                  (sitemap integration, site URL)
├── package.json
├── tsconfig.json
├── .env.example
├── .gitignore
└── README.md                         (Thai-language maintenance guide)
```

### Single-source-of-truth principle
- Phone number / address / hours: **`src/content/site.ts`** only
- Brand color: **`src/styles/site.css`** CSS custom properties (top of file)
- Blog post: one `.md` file in `src/content/blog/`
- Portfolio item: one entry in `src/content/portfolio.ts` + image in `public/photos/`
- Service / model: one entry in respective `.ts` data file
- FAQ: one entry in `src/content/faq.ts` (auto-updates page + JSON-LD)

---

## 5. Content Model (Zod schemas)

### `site.ts`
```ts
export const site = {
  name: "เรื่องบ้านบ้านน็อคดาวน์ นครสวรรค์",
  nameEn: "Baan Knockdown Nakhon Sawan",
  url: "https://baannockdown-nakhonsawan.com", // PLACEHOLDER — domain TBD
  phones: ["097-259-2502", "064-092-0412"],    // from client_information.md
  lineId: "@baannockdown",
  facebookUrl: "https://facebook.com/baannockdown.ns", // verify before launch
  gbpUrl: "https://www.google.com/maps/place/.../@15.6033605,100.1217694",
  email: "baannockdown.ns@gmail.com",
  address: {
    th: "ต.ยางตาล อ.โกรกพระ จ.นครสวรรค์ 60170",
    en: "Yang Tan, Krok Phra, Nakhon Sawan 60170",
  },
  geo: { lat: 15.6033605, lng: 100.1217694 }, // from GBP
  hours: "ทุกวัน 08:00–17:00 น.",
  openingHours: { opens: "08:00", closes: "17:00", days: ["Mo","Tu","We","Th","Fr","Sa","Su"] },
  serviceAreas: ["นครสวรรค์", "กำแพงเพชร", "ชัยนาท", "พิษณุโลก", "อุทัยธานี"],
  priceRange: "฿฿",
  founded: "2023",
}
```

### Blog post frontmatter schema
```ts
z.object({
  title: z.string().max(70),
  description: z.string().min(100).max(170),
  publishDate: z.date(),
  updatedDate: z.date().optional(),
  heroImage: z.string(),
  heroImageAlt: z.string(),  // must contain primary or secondary keyword
  category: z.enum(["ราคา", "เปรียบเทียบ", "คู่มือ", "บำรุงรักษา", "ข่าวสาร"]),
  tags: z.array(z.string()),
  draft: z.boolean().default(false),
})
```

### Service schema
```ts
z.object({
  slug: z.string(),
  title: z.string(),
  shortDescription: z.string(),
  longDescription: z.string(),
  benefits: z.array(z.string()),
  icon: z.string(),  // svg path or icon name
  image: z.string().optional(),
})
```

### Model schema
```ts
z.object({
  slug: z.string(),
  title: z.string(),
  sizeRange: z.string(),         // e.g., "8–10 ตร.ม."
  startingPriceTHB: z.number(),  // for Product/Offer JSON-LD
  suitableFor: z.string(),
  features: z.array(z.string()),
  images: z.array(z.string()),
  category: z.enum(["small", "1br", "2br", "commercial"]),
})
```

### Portfolio schema
```ts
z.object({
  title: z.string(),
  category: z.enum(["small", "1br", "2br", "commercial", "site"]),
  location: z.string(),                 // e.g., "อ.เมือง นครสวรรค์"
  description: z.string().optional(),
  completionMonths: z.string().optional(),  // e.g., "2026-03"
  images: z.array(z.object({ src: z.string(), alt: z.string() })),
})
```

### FAQ schema
```ts
z.object({
  question: z.string(),
  answer: z.string(),  // plain text, used in both UI and FAQPage JSON-LD
  category: z.enum(["pricing", "process", "materials", "service-area"]).optional(),
})
```

---

## 6. Page Inventory & SEO Targets

| Route | Title (≤60 chars) | Primary keyword | Secondary keywords |
|---|---|---|---|
| `/` | บ้านน็อคดาวน์ นครสวรรค์ รับสร้างครบวงจร เริ่ม 39,000฿ | บ้านน็อคดาวน์ นครสวรรค์ | รับสร้างบ้านน็อคดาวน์, ราคาเริ่มต้น |
| `/services` | บริการรับสร้างบ้านน็อคดาวน์ นครสวรรค์ ครบวงจร | รับสร้างบ้านน็อคดาวน์ นครสวรรค์ | ออกแบบ, ติดตั้ง, ต่อเติม |
| `/models` | แบบบ้านน็อคดาวน์ + ราคา นครสวรรค์ 2026 | แบบบ้านน็อคดาวน์, บ้านน็อคดาวน์ราคา | บ้าน 1 ห้องนอน, บ้านรีสอร์ท |
| `/portfolio` | ผลงานบ้านน็อคดาวน์ นครสวรรค์ + พื้นที่ใกล้เคียง | ผลงานบ้านน็อคดาวน์ นครสวรรค์ | บ้านน็อคดาวน์จริง |
| `/process` | ขั้นตอนสร้างบ้านน็อคดาวน์ 6 ขั้น ครบวงจร | ขั้นตอนสร้างบ้านน็อคดาวน์ | สร้างบ้าน 15-45 วัน |
| `/about` | เรื่องบ้านบ้านน็อคดาวน์ นครสวรรค์ — เกี่ยวกับเรา | brand + นครสวรรค์ | วัสดุ, โครงสร้าง |
| `/contact` | ติดต่อรับสร้างบ้านน็อคดาวน์ นครสวรรค์ โกรกพระ | ติดต่อบ้านน็อคดาวน์ นครสวรรค์ | LINE, โทร, ขอใบเสนอราคา |
| `/promotions` | โปรโมชั่นบ้านน็อคดาวน์ นครสวรรค์ ฟรีออกแบบ | โปรโมชั่นบ้านน็อคดาวน์ | ฟรีประเมินหน้างาน |
| `/faq` | คำถามที่พบบ่อยเรื่องบ้านน็อคดาวน์ นครสวรรค์ | บ้านน็อคดาวน์ + FAQ | ราคา, ระยะเวลา |
| `/blog` | บทความบ้านน็อคดาวน์ นครสวรรค์ — ความรู้ + คู่มือ | บทความบ้านน็อคดาวน์ | คู่มือ, ความรู้ |
| `/blog/[slug]` | per-post (from frontmatter) | per-post | per-post |

---

## 7. Local SEO Strategy

### A) On-page (per page)
- Unique `<title>` and meta description (per the table above)
- One `<h1>` per page containing the primary keyword
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`
- `lang="th"` on `<html>`, `hreflang="th-TH"` link
- Canonical URL (absolute, includes domain from `site.url`)
- OG tags (title, description, image, locale `th_TH`)
- Image `alt` text containing relevant keywords (e.g., "บ้านน็อคดาวน์ 1 ห้องนอน นครสวรรค์")
- Descriptive image filenames where possible

### B) Structured data (JSON-LD)

Sitewide (in `BaseLayout`):
- `GeneralContractor` with name, address, geo (15.6033605, 100.1217694), phones, hours, `priceRange`, `areaServed` (5 provinces), `sameAs: [gbpUrl, facebookUrl, "https://line.me/R/ti/p/@baannockdown"]`
- `WebSite` with `SearchAction` (sitewide search not implemented but schema is informational)

Per-page:
- `BreadcrumbList` on every non-home page
- `FAQPage` on Home (top 3 FAQs) + dedicated `/faq` page (full list)
- `Service` × 6 on `/services`
- `Product` + `Offer` (with `priceSpecification`) per house model on `/models`
- `ImageGallery` on `/portfolio`
- `Article` per blog post (with `datePublished`, `dateModified`, `author`, `image`, `mainEntityOfPage`)

Validation: every JSON-LD block must pass Google Rich Results Test before launch.

### C) Local SEO infrastructure
- Auto-generated `sitemap.xml` (via `@astrojs/sitemap`) submitted to Google Search Console
- `robots.txt` allows all + sitemap reference
- Service-area sections on Home + Contact explicitly name 5 provinces
- NAP consistency enforced via single `site.ts`
- Internal linking: services link to relevant models and blog posts; blog posts link to relevant service pages
- 4 starter blog posts cover pricing / vs-brick / why-choose / maintenance — long-tail topical authority
- Image SEO: WebP/AVIF via `<Image>`, descriptive `alt`, `loading="lazy"` on below-fold

### D) Outside-of-site (noted in README, not in scope of build)
- Claim & verify Google Business Profile (URL provided)
- Add 10–15 photos to GBP
- Add site URL to GBP "Website" field
- Encourage Google reviews (current count from real GBP — to be sourced, not the placeholder "38" in the existing JSON-LD)
- Submit `sitemap.xml` to Google Search Console + Bing Webmaster Tools

---

## 8. Components

### Layout components
- **`BaseLayout.astro`** — `<!doctype html>` shell, `<head>` (meta + GTM + LocalBusinessSchema), `<body>` (Header, slot, Footer, FloatingCTAs)
- **`SEO.astro`** — accepts `title`, `description`, `image`, `canonical`, `jsonLd` props; emits all per-page meta tags

### Sitewide UI components
- **`Header.astro`** — logo + 7-item nav + desktop "ขอใบเสนอราคา" CTA + hamburger toggle
- **`Footer.astro`** — NAP block + nav links + social + service area chips + copyright
- **`FloatingCTAs.astro`** — sticky bottom-right on mobile only: phone, LINE, Messenger buttons (visible <768px)

### Home-page sections (also reused on subpages where noted)
- **`Hero.astro`** — headline, sublead, dual CTA, hero photo, hero badge, hero price card
- **`TrustBar.astro`** — 4-icon strip
- **`WhyChooseUs.astro`** — 5-card grid
- **`ServiceList.astro`** — 6 service cards (also full Services page)
- **`ModelGrid.astro`** — 4 model cards (also full Models page)
- **`Process.astro`** — 6 numbered steps (also full Process page)
- **`PortfolioGrid.astro`** — image grid + category filter + lightbox (also full Portfolio page)
- **`Promotion.astro`** — promo cards (also full Promotions page)
- **`FAQ.astro`** — accordion (`<details>`/`<summary>`) + FAQPage JSON-LD emit
- **`FinalCTA.astro`** — phone + LINE + Messenger CTA strip

### Page-specific components
- **`ContactForm.astro`** — Web3Forms-powered form: name, phone, LINE ID, house type select, budget select, area, message; honeypot field; thank-you redirect to `/contact?sent=1`
- **`MapEmbed.astro`** — Google Maps iframe wrapper with `loading="lazy"` and intersection observer (loads only when scrolled near)
- **`LocalBusinessSchema.astro`** — emits `GeneralContractor` JSON-LD from `site.ts`

### JS budget (total <5KB)
1. Mobile hamburger toggle (~500B)
2. Portfolio category filter + lightbox (~2KB vanilla)
3. Map lazy-load via IntersectionObserver (~300B)
4. (FAQ uses native `<details>`, no JS)
5. (Form uses native HTML POST, no JS required; progressive enhancement only)

---

## 9. Deployment

### Local development
```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # → dist/
npm run preview
```

### Cloudflare Pages setup
1. Push to GitHub (private OK)
2. CF Pages → Connect to Git → select repo
3. Framework preset: Astro (auto-detected)
4. Build command: `npm run build`
5. Output directory: `dist`
6. Node version: 20
7. Environment variables (in CF dashboard):
   - `WEB3FORMS_KEY` — from web3forms.com
   - `PUBLIC_GTM_ID` — from Google Tag Manager
   - `PUBLIC_SITE_URL` — production URL (use placeholder until domain decided)
8. Add custom domain when ready (CF auto-issues SSL)

After setup: `git push` to `main` → auto-rebuild + auto-deploy. Branch pushes get preview URLs.

---

## 10. Success Criteria

- [ ] All 11 routes (8 main + promotions + faq + blog list + 4 blog posts) render correctly
- [ ] Every page has unique title + meta description matching the SEO table
- [ ] All JSON-LD passes Google Rich Results Test without warnings
- [ ] Lighthouse mobile (production build): Performance ≥95, SEO 100, Accessibility ≥95, Best Practices ≥95
- [ ] Total page weight (HTML+CSS+JS, no images): <50KB per page
- [ ] Total JS shipped: <5KB across the site
- [ ] Contact form submission delivers an email to `baannockdown.ns@gmail.com`
- [ ] Mobile sticky CTAs (call, LINE, Messenger) work on iOS Safari + Android Chrome
- [ ] Build completes in <30s; CF Pages deploy completes in <2min
- [ ] `sitemap.xml` is auto-generated at `/sitemap-index.xml` and lists all 11 routes
- [ ] `README.md` includes Thai-language instructions for: editing phone/address, adding a blog post, adding a portfolio item, changing brand color, deploying

---

## 11. Out of Scope

- Admin login / CMS UI (intentional — no CMS per requirement)
- User accounts, comments, reviews submission form
- E-commerce / online quotation calculator
- Multilingual / English version (Thai-only per keyword target)
- Real-time chat widget (LINE button covers this)
- Backend server, database, or API
- Domain registration (TBD by client)
- Google Business Profile setup (client-side activity, noted in README)
- Migration from any existing site

---

## 12. Open Items / Risks

1. **Domain TBD** — placeholder `baannockdown-nakhonsawan.com` in `site.url` until client picks final domain. All canonical URLs and JSON-LD will use this placeholder; one search-and-replace in `site.ts` updates the entire site.
2. **Phone-number discrepancy** — existing JSON-LD in zip lists 3 numbers; `client_information.md` lists 2. Spec uses the 2 from `client_information.md` (097-259-2502, 064-092-0412) as authoritative. Confirm before launch.
3. **`aggregateRating` placeholder** — existing JSON-LD claims `ratingValue: 4.9, reviewCount: 38`. Schema.org rules require this be a real, verifiable rating from on-site reviews. Will be **removed** from JSON-LD until the client implements actual on-site reviews; Google review count from GBP does not count for site-side `aggregateRating` and emitting fake ratings risks a manual penalty.
4. **Facebook URL** — `client_information.md` names the page but doesn't give the URL. Placeholder will be added; client to confirm.
5. **GBP rich coordinates** — using 15.6033605, 100.1217694 from client-supplied GBP URL (overrides the less-accurate 15.6442, 100.0830 in existing JSON-LD).
6. **Photo licensing** — assuming all photos in the zip are owned/licensed by the client. Confirm before launch.
