# Banban Knockdown Nakhon Sawan Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a lightweight, maintainable, Local-SEO-optimized static website for เรื่องบ้านบ้านน็อคดาวน์ นครสวรรค์ targeting the keyword "บ้านน็อคดาวน์ นครสวรรค์", deployed to Cloudflare Pages.

**Architecture:** Astro 5 static site, vanilla CSS (ported from existing zip mockup), Zod-validated content collections, Web3Forms for contact, Google Tag Manager for tracking. All content lives in repo (no CMS). Single-source-of-truth NAP via `src/content/site.ts`. Header/footer/CTAs are shared components. Blog posts are markdown files.

**Tech Stack:** Astro 5, TypeScript, Vanilla CSS with custom properties, `@astrojs/sitemap`, `@astrojs/check`, Zod, Vitest, Web3Forms, Google Tag Manager, Cloudflare Pages, Google Fonts (Prompt + Kanit).

**Spec:** [docs/superpowers/specs/2026-05-01-banban-knockdown-website-design.md](../specs/2026-05-01-banban-knockdown-website-design.md)

**Source materials in zip:** `banban-knockdown-design/` contains the reference HTML mockup. Port content + assets from there into the Astro structure.

---

## Working Directory & Repo Setup

The working directory is `/Users/tanawatwattanarach/Documents/client website/banban knockdown/` and is **not yet a git repository**. The Astro project will live at the root of this directory. The existing `banban-knockdown-design/` (unzipped mockup) and `banban knockdown.zip` will be moved into a `_reference/` folder so they're preserved but don't pollute the project root.

---

## Phase 1: Foundation

### Task 1: Initialize repo + Astro project

**Files:**
- Create: `package.json`, `tsconfig.json`, `astro.config.mjs`, `.gitignore`, `.env.example`, `README.md`
- Move: `banban-knockdown-design/` → `_reference/banban-knockdown-design/`
- Move: `banban knockdown.zip` → `_reference/banban-knockdown.zip`

- [ ] **Step 1: Move existing files to `_reference/`**

```bash
cd "/Users/tanawatwattanarach/Documents/client website/banban knockdown"
mkdir -p _reference
mv banban-knockdown-design _reference/
mv "banban knockdown.zip" _reference/banban-knockdown.zip
```

- [ ] **Step 2: Initialize git**

```bash
git init
git branch -m main
```

- [ ] **Step 3: Create `.gitignore`**

```
node_modules/
dist/
.astro/
.env
.env.local
.DS_Store
.vscode/
.idea/
*.log
_reference/banban-knockdown.zip
```

- [ ] **Step 4: Initialize Astro project files**

Create `package.json`:

```json
{
  "name": "baan-knockdown-nakhonsawan",
  "type": "module",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "check": "astro check",
    "test": "vitest run"
  },
  "dependencies": {
    "astro": "^5.0.0",
    "@astrojs/sitemap": "^3.2.0",
    "@astrojs/check": "^0.9.0",
    "typescript": "^5.6.0"
  },
  "devDependencies": {
    "vitest": "^2.1.0",
    "sharp": "^0.33.0"
  }
}
```

Create `tsconfig.json`:

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist", "_reference"],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": ["src/*"]
    }
  }
}
```

Create `.env.example`:

```
PUBLIC_SITE_URL=https://baannockdown-nakhonsawan.com
PUBLIC_GTM_ID=GTM-XXXXXXX
WEB3FORMS_KEY=your-web3forms-access-key
```

- [ ] **Step 5: Install dependencies**

```bash
npm install
```

Expected: dependencies install with no errors.

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "chore: initialize Astro project + move zip mockup to _reference"
```

---

### Task 2: Astro config + sitemap

**Files:**
- Create: `astro.config.mjs`

- [ ] **Step 1: Write `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE_URL = process.env.PUBLIC_SITE_URL || 'https://baannockdown-nakhonsawan.com';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'never',
  build: {
    inlineStylesheets: 'auto',
    assets: '_assets',
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'th', locales: { th: 'th-TH' } },
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  image: { service: { entrypoint: 'astro/assets/services/sharp' } },
  vite: { build: { cssCodeSplit: true } },
});
```

- [ ] **Step 2: Verify config loads**

```bash
npx astro info
```

Expected: prints Astro version + project info, no error.

- [ ] **Step 3: Commit**

```bash
git add astro.config.mjs
git commit -m "feat: configure Astro with sitemap + sharp image service"
```

---

### Task 3: Port site.css with brand tokens

**Files:**
- Read source: `_reference/banban-knockdown-design/assets/site.css`
- Create: `src/styles/site.css`

- [ ] **Step 1: Read the existing CSS**

Run: `cat _reference/banban-knockdown-design/assets/site.css | head -100` to inspect.

- [ ] **Step 2: Create `src/styles/site.css` with brand tokens at the top**

Prepend a `:root` token block (the rest of the file is a verbatim port of the existing CSS — copy from `_reference/banban-knockdown-design/assets/site.css` after the token block). Token block:

```css
:root {
  /* Brand — edit these to rebrand the entire site */
  --brand-green: #0F6B3A;
  --brand-green-dark: #0a4a28;
  --brand-green-light: #1E8A4D;
  --brand-green-tint: #E8F5EC;
  --brand-yellow: #F4C21D;
  --text-dark: #1A1A1A;
  --text-muted: #5a6b62;
  --bg-white: #FFFFFF;

  /* Functional */
  --color-success: #28A745;
  --color-warning: #FFC107;
  --color-error: #DC3545;

  /* Layout */
  --container-max: 1200px;
  --radius-sm: 10px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --shadow-card: 0 10px 30px rgba(0,0,0,0.05);
  --shadow-card-hover: 0 16px 40px rgba(0,0,0,0.08);
}

html { scroll-behavior: smooth; }
body { font-family: 'Prompt', 'Sarabun', system-ui, sans-serif; color: var(--text-dark); background: var(--bg-white); margin: 0; line-height: 1.6; }
* { box-sizing: border-box; }

/* Then paste the rest of _reference/banban-knockdown-design/assets/site.css here,
   replacing hardcoded color hex values with var(--brand-green) etc. where they match. */
```

After pasting, do a search-and-replace within `src/styles/site.css`:
- `#0F6B3A` → `var(--brand-green)`
- `#0a4a28` → `var(--brand-green-dark)`
- `#1E8A4D` → `var(--brand-green-light)`
- `#E8F5EC` → `var(--brand-green-tint)`
- `#F4C21D` → `var(--brand-yellow)`
- `#1A1A1A` → `var(--text-dark)`

- [ ] **Step 3: Verify CSS is syntactically valid**

```bash
npx stylelint src/styles/site.css --formatter compact || true
```

(stylelint not required, just sanity check — file should at least be parseable.)

- [ ] **Step 4: Commit**

```bash
git add src/styles/site.css
git commit -m "feat: port site CSS from mockup with brand tokens"
```

---

### Task 4: Content collections schema

**Files:**
- Create: `src/content/config.ts`

- [ ] **Step 1: Write the Zod schemas**

```ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().max(70),
    description: z.string().min(60).max(170),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string(),
    heroImageAlt: z.string(),
    category: z.enum(['ราคา', 'เปรียบเทียบ', 'คู่มือ', 'บำรุงรักษา', 'ข่าวสาร']),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

- [ ] **Step 2: Verify Astro accepts it**

```bash
npm run check
```

Expected: 0 errors (warnings about empty blog collection are fine — we'll populate later).

- [ ] **Step 3: Commit**

```bash
git add src/content/config.ts
git commit -m "feat: add Zod schema for blog content collection"
```

---

### Task 5: site.ts — NAP single source of truth

**Files:**
- Create: `src/data/site.ts`
- Create: `tests/site.test.ts`

- [ ] **Step 1: Write the failing test first**

```ts
// tests/site.test.ts
import { describe, it, expect } from 'vitest';
import { site } from '../src/data/site';

describe('site config', () => {
  it('has 2 phone numbers from client_information.md', () => {
    expect(site.phones).toEqual(['097-259-2502', '064-092-0412']);
  });

  it('has GBP coordinates for ต.ยางตาล อ.โกรกพระ', () => {
    expect(site.geo.lat).toBeCloseTo(15.6033605, 4);
    expect(site.geo.lng).toBeCloseTo(100.1217694, 4);
  });

  it('lists 5 service areas with นครสวรรค์ first', () => {
    expect(site.serviceAreas[0]).toBe('นครสวรรค์');
    expect(site.serviceAreas).toHaveLength(5);
  });

  it('has email and LINE ID', () => {
    expect(site.email).toBe('baannockdown.ns@gmail.com');
    expect(site.lineId).toBe('@baannockdown');
  });

  it('has founding date and price range for JSON-LD', () => {
    expect(site.founded).toBe('2023');
    expect(site.priceRange).toBe('฿฿');
  });
});
```

- [ ] **Step 2: Run the test to confirm it fails**

```bash
npm test
```

Expected: FAIL — `Cannot find module '../src/data/site'`.

- [ ] **Step 3: Write `src/data/site.ts`**

```ts
export const site = {
  name: 'เรื่องบ้านบ้านน็อคดาวน์ นครสวรรค์',
  nameEn: 'Baan Knockdown Nakhon Sawan',
  url: 'https://baannockdown-nakhonsawan.com',
  description:
    'รับสร้างบ้านน็อคดาวน์ครบวงจร ออกแบบ ผลิต ติดตั้งหน้างาน โครงสร้างเหล็กกันสนิม สร้างเสร็จไว 15–45 วัน ราคาเริ่มต้น 39,000 บาท ให้บริการนครสวรรค์ กำแพงเพชร ชัยนาท พิษณุโลก อุทัยธานี',
  phones: ['097-259-2502', '064-092-0412'],
  phonesE164: ['+66972592502', '+66640920412'],
  lineId: '@baannockdown',
  lineUrl: 'https://line.me/R/ti/p/%40baannockdown',
  facebookUrl: 'https://www.facebook.com/baannockdown.ns', // PLACEHOLDER — verify before launch
  messengerUrl: 'https://m.me/baannockdown.ns',            // PLACEHOLDER — verify before launch
  gbpUrl:
    'https://www.google.com/maps/place/%E0%B9%80%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%99%E0%B9%87%E0%B8%AD%E0%B8%84%E0%B8%94%E0%B8%B2%E0%B8%A7%E0%B8%99%E0%B9%8C/@15.6033605,100.1217694,17z',
  email: 'baannockdown.ns@gmail.com',
  address: {
    th: 'ต.ยางตาล อ.โกรกพระ จ.นครสวรรค์ 60170',
    streetTh: 'ต.ยางตาล อ.โกรกพระ',
    en: 'Yang Tan, Krok Phra, Nakhon Sawan 60170',
    locality: 'นครสวรรค์',
    region: 'นครสวรรค์',
    postalCode: '60170',
    country: 'TH',
  },
  geo: { lat: 15.6033605, lng: 100.1217694 },
  hours: 'ทุกวัน 08:00–17:00 น.',
  openingHours: {
    opens: '08:00',
    closes: '17:00',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const,
  },
  serviceAreas: ['นครสวรรค์', 'กำแพงเพชร', 'ชัยนาท', 'พิษณุโลก', 'อุทัยธานี'] as const,
  priceRange: '฿฿',
  founded: '2023',
  startingPriceTHB: 39000,
  buildTimeDaysMin: 15,
  buildTimeDaysMax: 45,
} as const;

export type Site = typeof site;
```

- [ ] **Step 4: Run the test — expect PASS**

```bash
npm test
```

Expected: PASS — all 5 tests green.

- [ ] **Step 5: Commit**

```bash
git add src/data/site.ts tests/site.test.ts
git commit -m "feat: add site.ts NAP source of truth + tests"
```

---

## Phase 2: Layout & SEO Infrastructure

### Task 6: SEO + LocalBusinessSchema components

**Files:**
- Create: `src/components/SEO.astro`
- Create: `src/components/LocalBusinessSchema.astro`

- [ ] **Step 1: Create `src/components/SEO.astro`**

```astro
---
import { site } from '~/data/site';

interface Props {
  title: string;
  description: string;
  image?: string;
  canonicalPath: string;     // e.g., '/services'
  ogType?: 'website' | 'article';
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const { title, description, image = '/og-default.jpg', canonicalPath, ogType = 'website', noindex = false, jsonLd } = Astro.props;
const canonical = new URL(canonicalPath, site.url).toString();
const ogImage = new URL(image, site.url).toString();
const jsonLdArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
---
<title>{title}</title>
<meta name="description" content={description} />
{noindex && <meta name="robots" content="noindex, nofollow" />}
{!noindex && <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />}
<meta name="geo.region" content="TH-60" />
<meta name="geo.placename" content="Nakhon Sawan" />
<meta name="geo.position" content={`${site.geo.lat};${site.geo.lng}`} />
<meta name="ICBM" content={`${site.geo.lat}, ${site.geo.lng}`} />
<link rel="canonical" href={canonical} />
<link rel="alternate" hreflang="th-TH" href={canonical} />

<meta property="og:type" content={ogType} />
<meta property="og:locale" content="th_TH" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={ogImage} />
<meta property="og:url" content={canonical} />
<meta property="og:site_name" content={site.name} />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImage} />

{jsonLdArray.map((schema) => (
  <script type="application/ld+json" set:html={JSON.stringify(schema)} />
))}
```

- [ ] **Step 2: Create `src/components/LocalBusinessSchema.astro`**

```astro
---
import { site } from '~/data/site';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'GeneralContractor',
  '@id': `${site.url}/#business`,
  name: site.name,
  alternateName: site.nameEn,
  description: site.description,
  url: site.url,
  logo: `${site.url}/logo-circle.png`,
  image: `${site.url}/og-default.jpg`,
  telephone: site.phonesE164,
  email: site.email,
  priceRange: site.priceRange,
  foundingDate: site.founded,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.streetTh,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: site.geo.lat,
    longitude: site.geo.lng,
  },
  areaServed: site.serviceAreas.map((name) => ({ '@type': 'AdministrativeArea', name })),
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: site.openingHours.days,
    opens: site.openingHours.opens,
    closes: site.openingHours.closes,
  },
  sameAs: [site.facebookUrl, site.gbpUrl, site.lineUrl].filter(Boolean),
};
---
<script type="application/ld+json" set:html={JSON.stringify(schema)} />
```

- [ ] **Step 3: Verify type-check passes**

```bash
npm run check
```

Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/SEO.astro src/components/LocalBusinessSchema.astro
git commit -m "feat: add SEO + LocalBusinessSchema components"
```

---

### Task 7: BaseLayout

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/GTM.astro`

- [ ] **Step 1: Create `src/components/GTM.astro`**

```astro
---
const GTM_ID = import.meta.env.PUBLIC_GTM_ID;
---
{GTM_ID && (
  <>
    <script is:inline define:vars={{ GTM_ID }}>
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',GTM_ID);
    </script>
  </>
)}
```

And the noscript fallback (added in body):

```astro
---
const GTM_ID = import.meta.env.PUBLIC_GTM_ID;
---
{GTM_ID && (
  <noscript>
    <iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} height="0" width="0" style="display:none;visibility:hidden"></iframe>
  </noscript>
)}
```

Save the second snippet as `src/components/GTMNoScript.astro`.

- [ ] **Step 2: Create `src/layouts/BaseLayout.astro`**

```astro
---
import '~/styles/site.css';
import SEO from '~/components/SEO.astro';
import LocalBusinessSchema from '~/components/LocalBusinessSchema.astro';
import GTM from '~/components/GTM.astro';
import GTMNoScript from '~/components/GTMNoScript.astro';
import Header from '~/components/Header.astro';
import Footer from '~/components/Footer.astro';
import FloatingCTAs from '~/components/FloatingCTAs.astro';

interface Props {
  title: string;
  description: string;
  image?: string;
  canonicalPath: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  pageId?: string;
}

const { title, description, image, canonicalPath, ogType, noindex, jsonLd, pageId } = Astro.props;
---
<!doctype html>
<html lang="th">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="theme-color" content="#0F6B3A" />
<link rel="icon" type="image/png" href="/favicon.png" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700;800&family=Kanit:wght@500;600;700;800&display=swap" rel="stylesheet" />
<SEO {title} {description} {image} {canonicalPath} {ogType} {noindex} {jsonLd} />
<LocalBusinessSchema />
<GTM />
</head>
<body data-page={pageId}>
<GTMNoScript />
<Header />
<main>
  <slot />
</main>
<Footer />
<FloatingCTAs />
</body>
</html>
```

- [ ] **Step 3: Type-check**

```bash
npm run check
```

Expected: errors about missing `Header`, `Footer`, `FloatingCTAs` — that's expected. We'll build them next.

- [ ] **Step 4: Commit (do not block on check errors yet)**

```bash
git add src/layouts/BaseLayout.astro src/components/GTM.astro src/components/GTMNoScript.astro
git commit -m "feat: add BaseLayout with GTM + SEO + LocalBusinessSchema"
```

---

### Task 8: Header component

**Files:**
- Create: `src/components/Header.astro`
- Reference: `_reference/banban-knockdown-design/index.html` (look for the `<nav>` block)

- [ ] **Step 1: Read the existing header HTML from the mockup**

Run: `grep -A 30 '<header' _reference/banban-knockdown-design/index.html | head -50`

- [ ] **Step 2: Create `src/components/Header.astro`**

```astro
---
import { site } from '~/data/site';

const navItems = [
  { href: '/', label: 'หน้าแรก' },
  { href: '/services', label: 'บริการ' },
  { href: '/models', label: 'แบบบ้าน / ราคา' },
  { href: '/portfolio', label: 'ผลงาน' },
  { href: '/process', label: 'ขั้นตอน' },
  { href: '/about', label: 'เกี่ยวกับเรา' },
  { href: '/blog', label: 'บทความ' },
  { href: '/contact', label: 'ติดต่อเรา' },
];
const currentPath = Astro.url.pathname.replace(/\/$/, '') || '/';
---
<header class="site-header">
  <div class="container header-row">
    <a href="/" class="brand" aria-label={site.name}>
      <img src="/logo-header.png" alt={site.name} width="180" height="48" />
    </a>
    <nav class="primary-nav" aria-label="หลัก">
      <ul>
        {navItems.map((item) => (
          <li>
            <a href={item.href} aria-current={currentPath === item.href ? 'page' : undefined}>{item.label}</a>
          </li>
        ))}
      </ul>
    </nav>
    <div class="header-cta">
      <a href={`tel:${site.phonesE164[0]}`} class="btn btn-ghost">📞 {site.phones[0]}</a>
      <a href="/contact" class="btn btn-primary">ขอใบเสนอราคา</a>
    </div>
    <button class="hamburger" aria-label="เปิดเมนู" aria-expanded="false" aria-controls="mobile-nav">
      <span></span><span></span><span></span>
    </button>
  </div>
  <nav id="mobile-nav" class="mobile-nav" aria-label="มือถือ" hidden>
    <ul>
      {navItems.map((item) => <li><a href={item.href}>{item.label}</a></li>)}
      <li><a href="/contact" class="btn btn-primary">ขอใบเสนอราคา</a></li>
    </ul>
  </nav>
</header>

<script>
  const btn = document.querySelector<HTMLButtonElement>('.hamburger');
  const nav = document.getElementById('mobile-nav');
  btn?.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    if (nav) nav.hidden = expanded;
  });
</script>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Header.astro
git commit -m "feat: add Header with nav + hamburger toggle"
```

---

### Task 9: Footer + FloatingCTAs

**Files:**
- Create: `src/components/Footer.astro`
- Create: `src/components/FloatingCTAs.astro`

- [ ] **Step 1: Create `src/components/Footer.astro`**

```astro
---
import { site } from '~/data/site';
const year = new Date().getFullYear();
---
<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      <img src="/logo-header.png" alt={site.name} width="180" height="48" />
      <p>{site.description}</p>
    </div>
    <div>
      <h4>เมนู</h4>
      <ul class="footer-links">
        <li><a href="/services">บริการ</a></li>
        <li><a href="/models">แบบบ้าน / ราคา</a></li>
        <li><a href="/portfolio">ผลงาน</a></li>
        <li><a href="/process">ขั้นตอน</a></li>
        <li><a href="/about">เกี่ยวกับเรา</a></li>
        <li><a href="/blog">บทความ</a></li>
        <li><a href="/faq">คำถามที่พบบ่อย</a></li>
      </ul>
    </div>
    <div>
      <h4>ติดต่อ</h4>
      <ul class="footer-contact">
        {site.phones.map((p, i) => (
          <li><a href={`tel:${site.phonesE164[i]}`}>📞 {p}</a></li>
        ))}
        <li><a href={site.lineUrl}>LINE: {site.lineId}</a></li>
        <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
        <li>{site.address.th}</li>
        <li>{site.hours}</li>
      </ul>
    </div>
    <div>
      <h4>พื้นที่ให้บริการ</h4>
      <ul class="service-areas">
        {site.serviceAreas.map((area) => <li>{area}</li>)}
      </ul>
    </div>
  </div>
  <div class="container footer-bottom">
    <small>© {year} {site.name}. สงวนลิขสิทธิ์.</small>
  </div>
</footer>
```

- [ ] **Step 2: Create `src/components/FloatingCTAs.astro`**

```astro
---
import { site } from '~/data/site';
---
<div class="floating-ctas" aria-label="ติดต่อด่วน">
  <a href={`tel:${site.phonesE164[0]}`} class="fc-btn fc-call" aria-label="โทรเลย">
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  </a>
  <a href={site.lineUrl} class="fc-btn fc-line" aria-label="แชท LINE" rel="noopener" target="_blank">
    <span>LINE</span>
  </a>
  <a href={site.messengerUrl} class="fc-btn fc-fb" aria-label="ทัก Facebook Messenger" rel="noopener" target="_blank">
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2C6.48 2 2 6.16 2 11.3c0 2.92 1.46 5.52 3.74 7.22V22l3.42-1.88c.91.25 1.87.39 2.84.39 5.52 0 10-4.16 10-9.21S17.52 2 12 2zm.99 12.42l-2.55-2.71-4.95 2.71 5.43-5.78 2.6 2.71 4.9-2.71-5.43 5.78z"/></svg>
  </a>
</div>
```

- [ ] **Step 3: Type-check + dev server smoke test**

```bash
npm run check
```

Expected: 0 errors (Header/Footer/FloatingCTAs all defined now).

```bash
npm run dev &
sleep 3
curl -s http://localhost:4321/ | head -20
kill %1
```

Expected: error about missing `pages/index.astro` — that's fine, we build pages later.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.astro src/components/FloatingCTAs.astro
git commit -m "feat: add Footer + FloatingCTAs (sticky mobile call/LINE/FB)"
```

---

## Phase 3: Content Data + Assets

### Task 10: Populate content data files

**Files:**
- Create: `src/data/services.ts`, `src/data/models.ts`, `src/data/portfolio.ts`, `src/data/faq.ts`
- Create: `tests/data.test.ts`
- Reference: `_reference/banban-knockdown-design/uploads/website_structure.md`

- [ ] **Step 1: Write the data validation test**

```ts
// tests/data.test.ts
import { describe, it, expect } from 'vitest';
import { services } from '../src/data/services';
import { models } from '../src/data/models';
import { portfolio } from '../src/data/portfolio';
import { faqs } from '../src/data/faq';

describe('content data', () => {
  it('has 6 services with unique slugs', () => {
    expect(services).toHaveLength(6);
    const slugs = new Set(services.map((s) => s.slug));
    expect(slugs.size).toBe(6);
  });

  it('has 4 model categories with starting prices', () => {
    expect(models.length).toBeGreaterThanOrEqual(4);
    models.forEach((m) => {
      expect(m.startingPriceTHB).toBeGreaterThan(0);
      expect(m.images.length).toBeGreaterThan(0);
    });
  });

  it('has at least 8 portfolio items with categories', () => {
    expect(portfolio.length).toBeGreaterThanOrEqual(8);
    const validCategories = ['small', '1br', '2br', 'commercial', 'site'];
    portfolio.forEach((p) => {
      expect(validCategories).toContain(p.category);
    });
  });

  it('has at least 6 FAQs', () => {
    expect(faqs.length).toBeGreaterThanOrEqual(6);
    faqs.forEach((f) => {
      expect(f.question.length).toBeGreaterThan(5);
      expect(f.answer.length).toBeGreaterThan(10);
    });
  });
});
```

- [ ] **Step 2: Confirm test fails**

```bash
npm test
```

Expected: FAIL — modules not found.

- [ ] **Step 3: Create `src/data/services.ts`**

```ts
export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  benefits: string[];
  iconKey: 'house' | 'design' | 'install' | 'extend' | 'rental' | 'shop';
  image?: string;
}

export const services: Service[] = [
  {
    slug: 'rabsang-baan-knockdown',
    title: 'รับสร้างบ้านน็อคดาวน์',
    shortDescription: 'บริการสร้างบ้านสำเร็จรูปพร้อมติดตั้ง ครบจบในที่เดียว',
    longDescription:
      'รับสร้างบ้านน็อคดาวน์ในนครสวรรค์และพื้นที่ใกล้เคียง ตั้งแต่การออกแบบ ผลิตโครงสร้างเหล็กกันสนิม จนถึงการติดตั้งหน้างาน เน้นคุณภาพและความตรงต่อเวลา',
    benefits: ['สร้างไว 15–45 วัน', 'ควบคุมงบประมาณได้', 'เหมาะกับหลายการใช้งาน'],
    iconKey: 'house',
  },
  {
    slug: 'okbab-baan',
    title: 'ออกแบบบ้าน',
    shortDescription: 'ออกแบบบ้านให้เหมาะกับงบประมาณและพื้นที่',
    longDescription:
      'ทีมออกแบบจะปรับแบบบ้านน็อคดาวน์ให้พอดีกับงบประมาณ พื้นที่หน้างาน และไลฟ์สไตล์การใช้งานของลูกค้า ฟรีแบบเบื้องต้น',
    benefits: ['ปรับแบบได้ตามงบ', 'ให้คำปรึกษาฟรี', 'วางแผนพื้นที่ใช้งานจริง'],
    iconKey: 'design',
  },
  {
    slug: 'tit-tang-naa-ngan',
    title: 'ติดตั้งหน้างาน',
    shortDescription: 'ทีมงานติดตั้งพร้อมดูแลหน้างานจนส่งมอบ',
    longDescription:
      'ทีมงานติดตั้งบ้านน็อคดาวน์มืออาชีพ ทำงานเป็นระบบ รวดเร็ว ตรวจสอบทุกขั้นตอนก่อนส่งมอบ',
    benefits: ['รวดเร็วและเป็นระบบ', 'ตรวจสอบก่อนส่งมอบ', 'รับประกันคุณภาพงาน'],
    iconKey: 'install',
  },
  {
    slug: 'tor-toem-baan',
    title: 'ต่อเติมบ้าน',
    shortDescription: 'ต่อเติม ปรับปรุง เพิ่มพื้นที่ใช้สอย',
    longDescription:
      'รับต่อเติมพื้นที่ใช้สอยให้บ้านปัจจุบัน ห้องครัว ห้องนอน ห้องเก็บของ ด้วยโครงสร้างน็อคดาวน์ที่ติดตั้งรวดเร็วไม่รบกวนการใช้งานบ้านเดิม',
    benefits: ['ติดตั้งรวดเร็ว', 'ไม่รบกวนบ้านเดิม', 'ปรับขนาดได้ตามใจ'],
    iconKey: 'extend',
  },
  {
    slug: 'baan-chao-resort',
    title: 'บ้านเช่า / รีสอร์ท',
    shortDescription: 'เหมาะสำหรับธุรกิจปล่อยเช่าและรีสอร์ท',
    longDescription:
      'ออกแบบบ้านน็อคดาวน์สำหรับนักลงทุนทำบ้านเช่ารายเดือน รีสอร์ทขนาดเล็ก หรือ Airbnb ก่อสร้างไว คุมต้นทุนได้ คืนทุนเร็ว',
    benefits: ['คืนทุนเร็ว', 'ขยายเฟสได้', 'ออกแบบให้ดูดี'],
    iconKey: 'rental',
  },
  {
    slug: 'rang-cafe',
    title: 'ร้านค้า / คาเฟ่',
    shortDescription: 'ออกแบบให้เหมาะกับการใช้งานเชิงพาณิชย์',
    longDescription:
      'รับสร้างร้านค้า คาเฟ่ ออฟฟิศขนาดเล็ก ด้วยบ้านน็อคดาวน์ — ดีไซน์ทันสมัย เปิดให้บริการได้ภายใน 1–2 เดือน',
    benefits: ['ดีไซน์ทันสมัย', 'เปิดร้านได้ไว', 'โยกย้ายได้ในอนาคต'],
    iconKey: 'shop',
  },
];
```

- [ ] **Step 4: Create `src/data/models.ts`**

```ts
export type ModelCategory = 'small' | '1br' | '2br' | 'commercial';

export interface HouseModel {
  slug: string;
  title: string;
  category: ModelCategory;
  sizeRange: string;
  startingPriceTHB: number;
  suitableFor: string;
  features: string[];
  images: string[];
}

export const models: HouseModel[] = [
  {
    slug: 'baan-small-8-10',
    title: 'บ้านขนาดเล็ก 8–10 ตร.ม.',
    category: 'small',
    sizeRange: '8–10 ตร.ม.',
    startingPriceTHB: 39000,
    suitableFor: 'อยู่คนเดียว / บ้านพักชั่วคราว / ห้องเก็บของ',
    features: ['โครงสร้างเหล็กกันสนิม', 'ผนัง PU/EPS กันความร้อน', 'ติดตั้ง 7–15 วัน'],
    images: ['/photos/model-small-1.jpg', '/photos/model-small-2.jpg'],
  },
  {
    slug: 'baan-1-bedroom',
    title: 'บ้าน 1 ห้องนอน 24–36 ตร.ม.',
    category: '1br',
    sizeRange: '24–36 ตร.ม.',
    startingPriceTHB: 101500,
    suitableFor: 'บ้านพักอาศัยขนาดเล็ก / คู่รักเริ่มต้น',
    features: ['1 ห้องนอน 1 ห้องน้ำ', 'มีระเบียงด้านหน้า', 'พร้อมระบบไฟฟ้า'],
    images: ['/photos/model-1br-1.jpg', '/photos/model-1br-2.jpg'],
  },
  {
    slug: 'baan-2-bedroom',
    title: 'บ้าน 2 ห้องนอน 36–60 ตร.ม.',
    category: '2br',
    sizeRange: '36–60 ตร.ม.',
    startingPriceTHB: 250000,
    suitableFor: 'ครอบครัว / บ้านหลังที่สอง',
    features: ['2 ห้องนอน 1 ห้องน้ำ', 'ห้องครัว + ห้องนั่งเล่น', 'ปรับแบบได้'],
    images: ['/photos/model-2br-1.jpg', '/photos/model-2br-2.jpg'],
  },
  {
    slug: 'baan-resort-cafe',
    title: 'บ้านรีสอร์ท / ร้านค้า / คาเฟ่',
    category: 'commercial',
    sizeRange: 'ตามแบบ',
    startingPriceTHB: 150000,
    suitableFor: 'ธุรกิจปล่อยเช่า / ร้านค้า / คาเฟ่',
    features: ['ดีไซน์ทันสมัย', 'ปรับเลย์เอาต์ได้', 'พร้อมระบบเชิงพาณิชย์'],
    images: ['/photos/model-commercial-1.jpg', '/photos/model-commercial-2.jpg'],
  },
];
```

- [ ] **Step 5: Create `src/data/portfolio.ts`** — populate at least 8 items based on photos available in `_reference/banban-knockdown-design/assets/photos/`

```ts
export type PortfolioCategory = 'small' | '1br' | '2br' | 'commercial' | 'site';

export interface PortfolioItem {
  title: string;
  category: PortfolioCategory;
  location: string;
  description?: string;
  images: { src: string; alt: string }[];
}

export const portfolio: PortfolioItem[] = [
  { title: 'บ้านน็อคดาวน์ 1 ห้องนอน สีส้ม', category: '1br', location: 'อ.โกรกพระ นครสวรรค์',
    images: [{ src: '/photos/portfolio-1.jpg', alt: 'บ้านน็อคดาวน์ 1 ห้องนอน นครสวรรค์ สีส้ม' }] },
  { title: 'บ้านน็อคดาวน์ขนาดเล็ก 8 ตร.ม.', category: 'small', location: 'อ.เมือง นครสวรรค์',
    images: [{ src: '/photos/portfolio-2.jpg', alt: 'บ้านน็อคดาวน์ขนาดเล็ก 8 ตร.ม. นครสวรรค์' }] },
  { title: 'บ้านน็อคดาวน์ 2 ห้องนอน สำหรับครอบครัว', category: '2br', location: 'อ.ชุมแสง นครสวรรค์',
    images: [{ src: '/photos/portfolio-3.jpg', alt: 'บ้านน็อคดาวน์ 2 ห้องนอน นครสวรรค์' }] },
  { title: 'คาเฟ่น็อคดาวน์ดีไซน์โมเดิร์น', category: 'commercial', location: 'อ.พยุหะคีรี นครสวรรค์',
    images: [{ src: '/photos/portfolio-4.jpg', alt: 'คาเฟ่บ้านน็อคดาวน์ นครสวรรค์' }] },
  { title: 'รีสอร์ทบ้านน็อคดาวน์ 4 หลัง', category: 'commercial', location: 'อุทัยธานี',
    images: [{ src: '/photos/portfolio-5.jpg', alt: 'รีสอร์ทบ้านน็อคดาวน์ อุทัยธานี' }] },
  { title: 'หน้างานติดตั้งโครงสร้างเหล็ก', category: 'site', location: 'อ.โกรกพระ นครสวรรค์',
    images: [{ src: '/photos/portfolio-6.jpg', alt: 'หน้างานติดตั้งบ้านน็อคดาวน์ นครสวรรค์' }] },
  { title: 'บ้านน็อคดาวน์ 1 ห้องนอน สีขาว', category: '1br', location: 'ชัยนาท',
    images: [{ src: '/photos/portfolio-7.jpg', alt: 'บ้านน็อคดาวน์ 1 ห้องนอน ชัยนาท' }] },
  { title: 'บ้านน็อคดาวน์เช่ารายเดือน', category: '1br', location: 'กำแพงเพชร',
    images: [{ src: '/photos/portfolio-8.jpg', alt: 'บ้านน็อคดาวน์เช่ารายเดือน กำแพงเพชร' }] },
];
```

(Image filenames will be aligned in Task 11 when copying assets.)

- [ ] **Step 6: Create `src/data/faq.ts`**

```ts
export type FaqCategory = 'pricing' | 'process' | 'materials' | 'service-area' | 'warranty';

export interface Faq {
  question: string;
  answer: string;
  category: FaqCategory;
}

export const faqs: Faq[] = [
  {
    question: 'บ้านน็อคดาวน์ นครสวรรค์ ราคาเริ่มต้นเท่าไหร่?',
    answer:
      'บ้านน็อคดาวน์ราคาเริ่มต้น 39,000 บาท สำหรับบ้านขนาดเล็ก 8–10 ตร.ม. และเริ่มต้น 101,500 บาทสำหรับบ้าน 1 ห้องนอน 1 ห้องน้ำ ราคาขึ้นอยู่กับขนาด วัสดุ และการติดตั้งหน้างาน',
    category: 'pricing',
  },
  {
    question: 'ใช้เวลาสร้างบ้านน็อคดาวน์กี่วัน?',
    answer:
      'โดยทั่วไปใช้เวลา 15–45 วัน ตั้งแต่เริ่มผลิตโครงสร้างจนถึงส่งมอบ ขึ้นอยู่กับขนาดและความซับซ้อนของแบบบ้าน',
    category: 'process',
  },
  {
    question: 'ให้บริการในพื้นที่ไหนบ้าง?',
    answer:
      'พื้นที่หลักคือนครสวรรค์ รวมถึงพื้นที่ใกล้เคียง กำแพงเพชร ชัยนาท พิษณุโลก อุทัยธานี และจังหวัดข้างเคียงในภาคกลางและภาคเหนือตอนล่าง',
    category: 'service-area',
  },
  {
    question: 'ปรับแบบบ้านได้ไหม?',
    answer:
      'ปรับได้ ทีมงานออกแบบฟรีเบื้องต้นเพื่อให้เหมาะกับงบประมาณ พื้นที่ติดตั้งจริง และการใช้งานของลูกค้าแต่ละราย',
    category: 'process',
  },
  {
    question: 'ใช้วัสดุอะไรบ้าง?',
    answer:
      'โครงสร้าง: เหล็กกันสนิม / ผนัง: PU หรือ EPS / หลังคา: เมทัลชีทพร้อมฉนวน / พื้น: กระเบื้องหรือ SPC / ประตูหน้าต่าง: อลูมิเนียมกระจก / ระบบไฟฟ้าพร้อมใช้งาน',
    category: 'materials',
  },
  {
    question: 'ต้องเตรียมพื้นที่อย่างไรก่อนติดตั้ง?',
    answer:
      'ควรปรับพื้นให้เรียบ มีทางเข้ารถสำหรับขนวัสดุ และมีจุดเชื่อมต่อไฟฟ้า/น้ำประปาในระยะที่เหมาะสม ทีมงานสามารถเข้าประเมินหน้างานฟรีในพื้นที่ใกล้เคียง',
    category: 'process',
  },
  {
    question: 'มีรับประกันงานไหม?',
    answer:
      'รับประกันโครงสร้างและงานติดตั้งตามมาตรฐาน รายละเอียดและระยะเวลารับประกันจะแจ้งในใบเสนอราคาแต่ละโปรเจกต์',
    category: 'warranty',
  },
];
```

- [ ] **Step 7: Run tests — expect PASS**

```bash
npm test
```

Expected: all 4 data tests pass.

- [ ] **Step 8: Commit**

```bash
git add src/data/services.ts src/data/models.ts src/data/portfolio.ts src/data/faq.ts tests/data.test.ts
git commit -m "feat: add typed content data (services, models, portfolio, FAQs)"
```

---

### Task 11: Copy assets from zip mockup

**Files:**
- Copy: photos and logos from `_reference/banban-knockdown-design/assets/` → `public/`

- [ ] **Step 1: Inspect available assets**

```bash
ls _reference/banban-knockdown-design/assets/photos/ | head -30
ls _reference/banban-knockdown-design/assets/*.png
```

- [ ] **Step 2: Copy logos to `public/`**

```bash
cp _reference/banban-knockdown-design/assets/logo-header.png public/logo-header.png
cp _reference/banban-knockdown-design/assets/logo-circle.png public/logo-circle.png
cp _reference/banban-knockdown-design/assets/fb-cover.png public/og-default.jpg
```

(If `fb-cover.png` is PNG and you want JPG for OG, convert with `sharp` or just use the PNG and update the SEO component default to `/og-default.png`.)

- [ ] **Step 3: Copy photos and rename to descriptive Thai-keyword filenames where the spec calls for them**

```bash
mkdir -p public/photos
cp -r _reference/banban-knockdown-design/assets/photos/. public/photos/
```

Then for the photos referenced in `portfolio.ts` and `models.ts`, rename or copy them to the names you used:

```bash
# Inspect actual filenames first:
ls public/photos/
# Then rename / symlink to match what services.ts/models.ts/portfolio.ts reference.
# Example (adjust to actual filenames):
# mv public/photos/hero-orange.jpg public/photos/portfolio-1.jpg
```

- [ ] **Step 4: Create a placeholder `favicon.png` (64x64 from the logo-circle)**

```bash
cp _reference/banban-knockdown-design/assets/logo-circle.png public/favicon.png
```

- [ ] **Step 5: Create `public/robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://baannockdown-nakhonsawan.com/sitemap-index.xml
```

- [ ] **Step 6: Verify everything referenced exists**

```bash
node -e "
const fs = require('fs');
const refs = [
  'public/logo-header.png','public/logo-circle.png','public/favicon.png',
  'public/og-default.jpg','public/robots.txt'
];
refs.forEach(r => console.log(r, fs.existsSync(r) ? 'OK' : 'MISSING'));
"
```

Expected: all OK.

- [ ] **Step 7: Commit**

```bash
git add public/
git commit -m "chore: copy logos + photos from zip mockup to public/"
```

---

## Phase 4: Section Components

### Task 12: Hero + TrustBar + WhyChooseUs

**Files:**
- Create: `src/components/Hero.astro`, `src/components/TrustBar.astro`, `src/components/WhyChooseUs.astro`
- Reference: `_reference/banban-knockdown-design/index.html` (lines for `.hero`, `.trust`, `.why-grid`)

- [ ] **Step 1: Create `src/components/Hero.astro`**

```astro
---
import { site } from '~/data/site';
import { Image } from 'astro:assets';
---
<section class="hero" data-screen-label="01 Hero">
  <div class="container hero-grid">
    <div>
      <span class="eyebrow"><span class="dot"></span> บ้านน็อคดาวน์ นครสวรรค์ • โกรกพระ</span>
      <h1>รับสร้าง<span class="accent">บ้านน็อคดาวน์</span><br/>ครบวงจร ราคาคุ้มค่า สร้างไว</h1>
      <p class="lead">ออกแบบ ผลิต และติดตั้งบ้านน็อคดาวน์ครบจบในที่เดียว โครงสร้างเหล็กกันสนิม ปรับแบบได้ตามงบและพื้นที่ของคุณ ให้บริการ{site.serviceAreas.join(' ')} และพื้นที่ใกล้เคียง</p>
      <div class="hero-ctas">
        <a href="/contact" class="btn btn-primary btn-lg">ขอใบเสนอราคาฟรี →</a>
        <a href="/models" class="btn btn-ghost btn-lg">ดูแบบบ้าน</a>
      </div>
      <div class="hero-bullets">
        <div class="b"><strong>{site.buildTimeDaysMin}–{site.buildTimeDaysMax} วัน</strong><span>สร้างเสร็จไว</span></div>
        <div class="b"><strong>฿{site.startingPriceTHB.toLocaleString()}+</strong><span>ราคาเริ่มต้น</span></div>
        <div class="b"><strong>{site.serviceAreas.length} จังหวัด</strong><span>ครอบคลุมพื้นที่</span></div>
      </div>
    </div>
    <div class="hero-visual">
      <div class="hero-photo">
        <img src="/photos/hero-orange.jpg" alt="บ้านน็อคดาวน์ นครสวรรค์ - บ้าน 1 ห้องนอน สีส้ม" loading="eager" width="800" height="600" />
      </div>
      <div class="hero-card">
        <div class="label">ราคาเริ่มต้น</div>
        <div class="price">฿{site.startingPriceTHB.toLocaleString()}</div>
        <div class="small">บ้าน 1 ห้องนอน • พร้อมติดตั้งหน้างาน</div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Create `src/components/TrustBar.astro`**

Port the `<div class="trust">` block from `_reference/banban-knockdown-design/index.html`. Same SVGs, same labels.

- [ ] **Step 3: Create `src/components/WhyChooseUs.astro`**

Port the `<section data-screen-label="02 Why us">` block — 5 numbered cards.

- [ ] **Step 4: Verify build**

```bash
npm run check
```

Expected: 0 errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.astro src/components/TrustBar.astro src/components/WhyChooseUs.astro
git commit -m "feat: add Hero, TrustBar, WhyChooseUs section components"
```

---

### Task 13: ServiceCard, ServiceList, ModelCard, ModelGrid

**Files:**
- Create: `src/components/ServiceCard.astro`, `src/components/ServiceList.astro`
- Create: `src/components/ModelCard.astro`, `src/components/ModelGrid.astro`

- [ ] **Step 1: Create `src/components/ServiceCard.astro`**

```astro
---
import type { Service } from '~/data/services';
interface Props { service: Service }
const { service } = Astro.props;
---
<article class="service-card">
  <h3>{service.title}</h3>
  <p>{service.shortDescription}</p>
  <ul>
    {service.benefits.map((b) => <li>✓ {b}</li>)}
  </ul>
  <a href={`/services#${service.slug}`} class="link-arrow">ดูเพิ่มเติม →</a>
</article>
```

- [ ] **Step 2: Create `src/components/ServiceList.astro`**

```astro
---
import { services } from '~/data/services';
import ServiceCard from './ServiceCard.astro';
interface Props { limit?: number }
const { limit } = Astro.props;
const items = limit ? services.slice(0, limit) : services;
---
<div class="service-grid">
  {items.map((s) => <ServiceCard service={s} />)}
</div>
```

- [ ] **Step 3: Create `src/components/ModelCard.astro`**

```astro
---
import type { HouseModel } from '~/data/models';
interface Props { model: HouseModel }
const { model } = Astro.props;
---
<article class="model-card">
  <img src={model.images[0]} alt={`${model.title} บ้านน็อคดาวน์ นครสวรรค์`} loading="lazy" width="600" height="400" />
  <div class="model-body">
    <h3>{model.title}</h3>
    <div class="model-meta">
      <span>📐 {model.sizeRange}</span>
      <span class="price">฿{model.startingPriceTHB.toLocaleString()}+</span>
    </div>
    <p>{model.suitableFor}</p>
    <ul>
      {model.features.map((f) => <li>✓ {f}</li>)}
    </ul>
    <a href="/contact" class="btn btn-primary">ขอใบเสนอราคา</a>
  </div>
</article>
```

- [ ] **Step 4: Create `src/components/ModelGrid.astro`**

```astro
---
import { models } from '~/data/models';
import ModelCard from './ModelCard.astro';
interface Props { limit?: number }
const { limit } = Astro.props;
const items = limit ? models.slice(0, limit) : models;
---
<div class="model-grid">
  {items.map((m) => <ModelCard model={m} />)}
</div>
```

- [ ] **Step 5: Verify**

```bash
npm run check
```

Expected: 0 errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/ServiceCard.astro src/components/ServiceList.astro src/components/ModelCard.astro src/components/ModelGrid.astro
git commit -m "feat: add Service + Model card/grid components"
```

---

### Task 14: Process, Promotion, FinalCTA, FAQ components

**Files:**
- Create: `src/components/Process.astro`, `src/components/Promotion.astro`, `src/components/FinalCTA.astro`, `src/components/FAQ.astro`

- [ ] **Step 1: Create `src/components/Process.astro`**

```astro
---
const steps = [
  { n: 1, title: 'ติดต่อสอบถาม / ขอใบเสนอราคา', desc: 'ลูกค้าส่งรายละเอียด งบประมาณ หรือแบบที่สนใจ' },
  { n: 2, title: 'ประเมินหน้างาน / สรุปแบบ', desc: 'ทีมงานประเมินพื้นที่และสรุปความต้องการ' },
  { n: 3, title: 'ตกลงราคาและมัดจำ', desc: 'ยืนยันแบบ ราคา และเงื่อนไขการทำงาน' },
  { n: 4, title: 'เริ่มผลิตโครงสร้าง', desc: 'ผลิตตามแบบและวัสดุที่ตกลงในโรงงาน' },
  { n: 5, title: 'ติดตั้งหน้างาน', desc: 'ทีมงานเข้าติดตั้งตามกำหนด' },
  { n: 6, title: 'ส่งมอบงาน', desc: 'ตรวจสอบงานและส่งมอบให้ลูกค้า พร้อมรับประกัน' },
];
---
<ol class="process-list">
  {steps.map((s) => (
    <li class="process-item">
      <div class="process-num">{s.n.toString().padStart(2, '0')}</div>
      <div>
        <h3>{s.title}</h3>
        <p>{s.desc}</p>
      </div>
    </li>
  ))}
</ol>
```

- [ ] **Step 2: Create `src/components/Promotion.astro`**

```astro
---
const promos = [
  { icon: '🎁', title: 'ฟรีออกแบบเบื้องต้น', desc: 'ปรึกษาทีมออกแบบฟรี ไม่มีค่าใช้จ่าย' },
  { icon: '📍', title: 'ฟรีประเมินหน้างาน', desc: 'พื้นที่นครสวรรค์และจังหวัดใกล้เคียง' },
  { icon: '💰', title: 'ส่วนลดพิเศษ', desc: 'สำหรับลูกค้าที่จองภายในเดือนนี้' },
];
---
<div class="promo-grid">
  {promos.map((p) => (
    <article class="promo-card">
      <div class="promo-icon">{p.icon}</div>
      <h3>{p.title}</h3>
      <p>{p.desc}</p>
    </article>
  ))}
</div>
```

- [ ] **Step 3: Create `src/components/FinalCTA.astro`**

```astro
---
import { site } from '~/data/site';
interface Props { headline?: string; sub?: string }
const { headline = 'สนใจสร้างบ้านน็อคดาวน์ ปรึกษาฟรีวันนี้',
        sub = 'ส่งแบบหรือพื้นที่หน้างานมาให้ทีมงานประเมินราคาเบื้องต้นได้เลย' } = Astro.props;
---
<section class="final-cta">
  <div class="container final-cta-inner">
    <h2>{headline}</h2>
    <p>{sub}</p>
    <div class="final-cta-buttons">
      <a href={`tel:${site.phonesE164[0]}`} class="btn btn-primary btn-lg">📞 โทรเลย {site.phones[0]}</a>
      <a href={site.lineUrl} class="btn btn-line btn-lg" rel="noopener" target="_blank">แอด LINE {site.lineId}</a>
      <a href={site.messengerUrl} class="btn btn-fb btn-lg" rel="noopener" target="_blank">ทัก Facebook</a>
    </div>
  </div>
</section>
```

- [ ] **Step 4: Create `src/components/FAQ.astro`**

```astro
---
import { faqs as allFaqs, type Faq } from '~/data/faq';
interface Props { items?: Faq[]; limit?: number; emitJsonLd?: boolean }
const { items, limit, emitJsonLd = true } = Astro.props;
const list = (items ?? allFaqs).slice(0, limit ?? Infinity);

const jsonLd = emitJsonLd ? {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: list.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
} : null;
---
<div class="faq-list">
  {list.map((f) => (
    <details class="faq-item">
      <summary>{f.question}</summary>
      <div class="faq-answer"><p>{f.answer}</p></div>
    </details>
  ))}
</div>
{jsonLd && <script type="application/ld+json" set:html={JSON.stringify(jsonLd)} />}
```

- [ ] **Step 5: Verify**

```bash
npm run check
```

Expected: 0 errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/Process.astro src/components/Promotion.astro src/components/FinalCTA.astro src/components/FAQ.astro
git commit -m "feat: add Process, Promotion, FinalCTA, FAQ components"
```

---

### Task 15: PortfolioGrid with category filter + lightbox

**Files:**
- Create: `src/components/PortfolioGrid.astro`

- [ ] **Step 1: Create `src/components/PortfolioGrid.astro`**

```astro
---
import { portfolio, type PortfolioCategory } from '~/data/portfolio';

interface Props { limit?: number; showFilters?: boolean }
const { limit, showFilters = true } = Astro.props;
const items = limit ? portfolio.slice(0, limit) : portfolio;

const categories: { key: PortfolioCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'ทั้งหมด' },
  { key: 'small', label: 'บ้านขนาดเล็ก' },
  { key: '1br', label: 'บ้าน 1 ห้องนอน' },
  { key: '2br', label: 'บ้าน 2 ห้องนอน' },
  { key: 'commercial', label: 'ร้านค้า / รีสอร์ท' },
  { key: 'site', label: 'หน้างานติดตั้ง' },
];
---
{showFilters && (
  <div class="portfolio-filters" role="tablist">
    {categories.map((c) => (
      <button class="filter-btn" data-cat={c.key} aria-selected={c.key === 'all'}>
        {c.label}
      </button>
    ))}
  </div>
)}
<div class="portfolio-grid">
  {items.map((p, i) => (
    <figure class="portfolio-item" data-cat={p.category}>
      <img src={p.images[0].src} alt={p.images[0].alt} loading="lazy" width="600" height="450"
           data-lightbox-src={p.images[0].src} data-lightbox-alt={p.images[0].alt} />
      <figcaption>
        <strong>{p.title}</strong>
        <span>📍 {p.location}</span>
      </figcaption>
    </figure>
  ))}
</div>

<dialog class="lightbox" aria-label="ดูภาพขยาย">
  <button class="lightbox-close" aria-label="ปิด">×</button>
  <img alt="" />
</dialog>

<script>
  // Filter
  const filterBtns = document.querySelectorAll<HTMLButtonElement>('.filter-btn');
  const items = document.querySelectorAll<HTMLElement>('.portfolio-item');
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.cat;
      filterBtns.forEach((b) => b.setAttribute('aria-selected', String(b === btn)));
      items.forEach((it) => {
        it.style.display = (cat === 'all' || it.dataset.cat === cat) ? '' : 'none';
      });
    });
  });

  // Lightbox
  const dialog = document.querySelector<HTMLDialogElement>('.lightbox');
  const dialogImg = dialog?.querySelector<HTMLImageElement>('img');
  const closeBtn = dialog?.querySelector<HTMLButtonElement>('.lightbox-close');
  document.querySelectorAll<HTMLImageElement>('[data-lightbox-src]').forEach((img) => {
    img.addEventListener('click', () => {
      if (!dialog || !dialogImg) return;
      dialogImg.src = img.dataset.lightboxSrc!;
      dialogImg.alt = img.dataset.lightboxAlt!;
      dialog.showModal();
    });
  });
  closeBtn?.addEventListener('click', () => dialog?.close());
  dialog?.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
</script>
```

- [ ] **Step 2: Verify**

```bash
npm run check
```

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/PortfolioGrid.astro
git commit -m "feat: add PortfolioGrid with category filter + lightbox"
```

---

### Task 16: ContactForm + MapEmbed

**Files:**
- Create: `src/components/ContactForm.astro`, `src/components/MapEmbed.astro`

- [ ] **Step 1: Create `src/components/ContactForm.astro`**

```astro
---
const WEB3FORMS_KEY = import.meta.env.WEB3FORMS_KEY;
---
<form action="https://api.web3forms.com/submit" method="POST" class="contact-form" id="contact-form">
  <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
  <input type="hidden" name="subject" value="ติดต่อจากเว็บไซต์ — บ้านน็อคดาวน์ นครสวรรค์" />
  <input type="hidden" name="from_name" value="Banban Knockdown Website" />
  <input type="hidden" name="redirect" value="/contact?sent=1" />
  <input type="checkbox" name="botcheck" style="display:none" tabindex="-1" autocomplete="off" />

  <div class="field">
    <label for="cf-name">ชื่อ <span aria-hidden="true">*</span></label>
    <input id="cf-name" name="name" type="text" required autocomplete="name" />
  </div>
  <div class="field">
    <label for="cf-phone">เบอร์โทร <span aria-hidden="true">*</span></label>
    <input id="cf-phone" name="phone" type="tel" required autocomplete="tel" pattern="[0-9 \-]+" />
  </div>
  <div class="field">
    <label for="cf-line">LINE ID</label>
    <input id="cf-line" name="line_id" type="text" />
  </div>
  <div class="field">
    <label for="cf-type">ประเภทบ้านที่สนใจ</label>
    <select id="cf-type" name="house_type">
      <option value="">เลือก...</option>
      <option>บ้านขนาดเล็ก 8–10 ตร.ม.</option>
      <option>บ้าน 1 ห้องนอน</option>
      <option>บ้าน 2 ห้องนอน</option>
      <option>บ้านรีสอร์ท / ร้านค้า / คาเฟ่</option>
      <option>ต่อเติมบ้าน</option>
      <option>ยังไม่แน่ใจ</option>
    </select>
  </div>
  <div class="field">
    <label for="cf-budget">งบประมาณโดยประมาณ</label>
    <select id="cf-budget" name="budget">
      <option value="">เลือก...</option>
      <option>ต่ำกว่า 100,000 บาท</option>
      <option>100,000 – 300,000 บาท</option>
      <option>300,000 – 600,000 บาท</option>
      <option>มากกว่า 600,000 บาท</option>
    </select>
  </div>
  <div class="field">
    <label for="cf-area">พื้นที่ติดตั้ง / จังหวัด</label>
    <input id="cf-area" name="install_area" type="text" placeholder="เช่น อ.โกรกพระ จ.นครสวรรค์" />
  </div>
  <div class="field">
    <label for="cf-msg">ข้อความเพิ่มเติม</label>
    <textarea id="cf-msg" name="message" rows="4"></textarea>
  </div>
  <button type="submit" class="btn btn-primary btn-lg">ส่งข้อความ</button>
  <p class="form-note">หรือโทรเลยที่ 097-259-2502 / แอดไลน์ @baannockdown</p>
</form>
```

- [ ] **Step 2: Create `src/components/MapEmbed.astro` (lazy-loaded iframe)**

```astro
---
import { site } from '~/data/site';
const mapsEmbedSrc = `https://www.google.com/maps?q=${site.geo.lat},${site.geo.lng}&z=15&output=embed`;
---
<div class="map-embed" data-map-src={mapsEmbedSrc} aria-label="แผนที่ที่ตั้งบริษัท">
  <noscript>
    <iframe src={mapsEmbedSrc} loading="lazy" width="100%" height="400" style="border:0" referrerpolicy="no-referrer-when-downgrade" title="แผนที่ที่ตั้งบริษัท"></iframe>
  </noscript>
</div>
<script>
  const containers = document.querySelectorAll<HTMLElement>('.map-embed');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target as HTMLElement;
      const src = el.dataset.mapSrc;
      if (!src) return;
      const iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.loading = 'lazy';
      iframe.width = '100%';
      iframe.height = '400';
      iframe.style.border = '0';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.title = 'แผนที่ที่ตั้งบริษัท';
      el.appendChild(iframe);
      obs.unobserve(el);
    });
  }, { rootMargin: '200px' });
  containers.forEach((c) => observer.observe(c));
</script>
```

- [ ] **Step 3: Verify**

```bash
npm run check
```

Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/ContactForm.astro src/components/MapEmbed.astro
git commit -m "feat: add ContactForm (Web3Forms) + lazy-loaded MapEmbed"
```

---

## Phase 5: Pages

### Task 17: Home page

**Files:**
- Create: `src/pages/index.astro`

- [ ] **Step 1: Create `src/pages/index.astro`**

```astro
---
import BaseLayout from '~/layouts/BaseLayout.astro';
import Hero from '~/components/Hero.astro';
import TrustBar from '~/components/TrustBar.astro';
import WhyChooseUs from '~/components/WhyChooseUs.astro';
import ServiceList from '~/components/ServiceList.astro';
import ModelGrid from '~/components/ModelGrid.astro';
import Process from '~/components/Process.astro';
import PortfolioGrid from '~/components/PortfolioGrid.astro';
import Promotion from '~/components/Promotion.astro';
import FAQ from '~/components/FAQ.astro';
import FinalCTA from '~/components/FinalCTA.astro';
import { faqs } from '~/data/faq';

const homeFaqs = faqs.slice(0, 3);
---
<BaseLayout
  title="บ้านน็อคดาวน์ นครสวรรค์ รับสร้างครบวงจร เริ่ม 39,000 บาท"
  description="บ้านน็อคดาวน์ นครสวรรค์ — รับออกแบบ ผลิต ติดตั้งบ้านน็อคดาวน์ครบวงจร โครงสร้างเหล็กกันสนิม สร้างเสร็จไว 15–45 วัน ราคาเริ่มต้น 39,000 บาท ให้บริการนครสวรรค์ กำแพงเพชร ชัยนาท พิษณุโลก อุทัยธานี"
  canonicalPath="/"
  pageId="home"
>
  <Hero />
  <TrustBar />

  <section>
    <div class="container">
      <div class="sec-head"><h2>ทำไมต้องเลือกเรา</h2></div>
      <WhyChooseUs />
    </div>
  </section>

  <section>
    <div class="container">
      <div class="sec-head"><h2>บริการของเรา</h2></div>
      <ServiceList />
      <div class="sec-cta"><a href="/services" class="btn btn-ghost">ดูบริการทั้งหมด →</a></div>
    </div>
  </section>

  <section class="bg-tint">
    <div class="container">
      <div class="sec-head"><h2>แบบบ้านยอดนิยม</h2></div>
      <ModelGrid />
      <div class="sec-cta"><a href="/models" class="btn btn-ghost">ดูแบบบ้านและราคาทั้งหมด →</a></div>
    </div>
  </section>

  <section>
    <div class="container">
      <div class="sec-head"><h2>ขั้นตอนการทำงาน</h2></div>
      <Process />
    </div>
  </section>

  <section>
    <div class="container">
      <div class="sec-head"><h2>ผลงานของเรา</h2></div>
      <PortfolioGrid limit={6} showFilters={false} />
      <div class="sec-cta"><a href="/portfolio" class="btn btn-ghost">ดูผลงานทั้งหมด →</a></div>
    </div>
  </section>

  <section class="bg-tint">
    <div class="container">
      <div class="sec-head"><h2>โปรโมชั่น</h2></div>
      <Promotion />
    </div>
  </section>

  <section>
    <div class="container">
      <div class="sec-head"><h2>คำถามที่พบบ่อย</h2></div>
      <FAQ items={homeFaqs} />
      <div class="sec-cta"><a href="/faq" class="btn btn-ghost">ดู FAQ ทั้งหมด →</a></div>
    </div>
  </section>

  <FinalCTA />
</BaseLayout>
```

- [ ] **Step 2: Run dev server, browse to home, verify it renders**

```bash
npm run dev &
sleep 4
curl -sI http://localhost:4321/ | head -5
curl -s http://localhost:4321/ | grep -E '<title>|<h1>' | head -3
kill %1 2>/dev/null
```

Expected: HTTP 200, title contains "บ้านน็อคดาวน์ นครสวรรค์", H1 contains "รับสร้าง".

- [ ] **Step 3: Build to catch any prod-only issues**

```bash
npm run build
```

Expected: build succeeds, `dist/index.html` is created.

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: add home page composing all section components"
```

---

### Task 18: Services + Models + Portfolio pages

**Files:**
- Create: `src/pages/services.astro`, `src/pages/models.astro`, `src/pages/portfolio.astro`

- [ ] **Step 1: Create `src/pages/services.astro`**

```astro
---
import BaseLayout from '~/layouts/BaseLayout.astro';
import { services } from '~/data/services';
import { site } from '~/data/site';
import FinalCTA from '~/components/FinalCTA.astro';

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'หน้าแรก', item: site.url + '/' },
    { '@type': 'ListItem', position: 2, name: 'บริการ', item: site.url + '/services' },
  ],
};

const serviceSchemas = services.map((s) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: s.title,
  name: s.title,
  description: s.longDescription,
  provider: { '@id': `${site.url}/#business` },
  areaServed: site.serviceAreas,
}));
---
<BaseLayout
  title="บริการรับสร้างบ้านน็อคดาวน์ นครสวรรค์ ครบวงจร"
  description="บริการรับสร้างบ้านน็อคดาวน์ ออกแบบ ผลิต ติดตั้งหน้างาน ต่อเติมบ้าน บ้านเช่า รีสอร์ท ร้านค้า คาเฟ่ ครบวงจรในนครสวรรค์และพื้นที่ใกล้เคียง"
  canonicalPath="/services"
  jsonLd={[breadcrumb, ...serviceSchemas]}
  pageId="services"
>
  <section class="page-header">
    <div class="container">
      <nav aria-label="breadcrumb"><a href="/">หน้าแรก</a> / บริการ</nav>
      <h1>บริการรับสร้างบ้านน็อคดาวน์ นครสวรรค์</h1>
      <p>ให้บริการออกแบบ ผลิต และติดตั้งบ้านน็อคดาวน์ครบวงจร</p>
    </div>
  </section>

  <section>
    <div class="container">
      {services.map((s) => (
        <article class="service-detail" id={s.slug}>
          <h2>{s.title}</h2>
          <p>{s.longDescription}</p>
          <ul class="benefits">
            {s.benefits.map((b) => <li>✓ {b}</li>)}
          </ul>
        </article>
      ))}
    </div>
  </section>

  <FinalCTA headline="ไม่แน่ใจว่าบริการไหนเหมาะกับคุณ?" sub="ปรึกษาทีมงานฟรี ไม่มีค่าใช้จ่าย" />
</BaseLayout>
```

- [ ] **Step 2: Create `src/pages/models.astro`**

```astro
---
import BaseLayout from '~/layouts/BaseLayout.astro';
import ModelGrid from '~/components/ModelGrid.astro';
import FinalCTA from '~/components/FinalCTA.astro';
import { models } from '~/data/models';
import { site } from '~/data/site';

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'หน้าแรก', item: site.url + '/' },
    { '@type': 'ListItem', position: 2, name: 'แบบบ้าน / ราคา', item: site.url + '/models' },
  ],
};

const productSchemas = models.map((m) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: m.title,
  description: `${m.title} ${m.suitableFor}`,
  image: site.url + m.images[0],
  brand: { '@type': 'Brand', name: site.name },
  offers: {
    '@type': 'Offer',
    priceCurrency: 'THB',
    price: m.startingPriceTHB,
    priceValidUntil: '2027-12-31',
    availability: 'https://schema.org/InStock',
    seller: { '@id': `${site.url}/#business` },
  },
}));
---
<BaseLayout
  title="แบบบ้านน็อคดาวน์ + ราคา นครสวรรค์ 2026"
  description="รวมแบบบ้านน็อคดาวน์ทุกขนาด พร้อมราคาเริ่มต้น บ้านขนาดเล็ก บ้าน 1 ห้องนอน บ้าน 2 ห้องนอน รีสอร์ท ร้านค้า คาเฟ่ ราคาเริ่มต้น 39,000 บาท"
  canonicalPath="/models"
  jsonLd={[breadcrumb, ...productSchemas]}
  pageId="models"
>
  <section class="page-header">
    <div class="container">
      <nav aria-label="breadcrumb"><a href="/">หน้าแรก</a> / แบบบ้าน / ราคา</nav>
      <h1>แบบบ้านน็อคดาวน์ และราคา นครสวรรค์</h1>
      <p>เลือกแบบบ้านให้เหมาะกับงบประมาณและพื้นที่ของคุณ</p>
    </div>
  </section>
  <section>
    <div class="container"><ModelGrid /></div>
  </section>
  <section class="bg-tint">
    <div class="container">
      <p class="note">หมายเหตุ: ราคาขึ้นอยู่กับขนาด วัสดุ แบบบ้าน และพื้นที่ติดตั้ง สามารถขอใบเสนอราคาฟรีได้ตลอด</p>
    </div>
  </section>
  <FinalCTA />
</BaseLayout>
```

- [ ] **Step 3: Create `src/pages/portfolio.astro`**

```astro
---
import BaseLayout from '~/layouts/BaseLayout.astro';
import PortfolioGrid from '~/components/PortfolioGrid.astro';
import FinalCTA from '~/components/FinalCTA.astro';
import { portfolio } from '~/data/portfolio';
import { site } from '~/data/site';

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'หน้าแรก', item: site.url + '/' },
    { '@type': 'ListItem', position: 2, name: 'ผลงาน', item: site.url + '/portfolio' },
  ],
};

const galleryJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  name: 'ผลงานบ้านน็อคดาวน์ นครสวรรค์',
  image: portfolio.flatMap((p) => p.images.map((i) => ({ '@type': 'ImageObject', contentUrl: site.url + i.src, name: i.alt }))),
};
---
<BaseLayout
  title="ผลงานบ้านน็อคดาวน์ นครสวรรค์ + พื้นที่ใกล้เคียง"
  description="รวมผลงานบ้านน็อคดาวน์จริง บ้าน 1 ห้องนอน บ้าน 2 ห้องนอน รีสอร์ท ร้านค้า คาเฟ่ จากนครสวรรค์ กำแพงเพชร ชัยนาท พิษณุโลก อุทัยธานี"
  canonicalPath="/portfolio"
  jsonLd={[breadcrumb, galleryJsonLd]}
  pageId="portfolio"
>
  <section class="page-header">
    <div class="container">
      <nav aria-label="breadcrumb"><a href="/">หน้าแรก</a> / ผลงาน</nav>
      <h1>ผลงานบ้านน็อคดาวน์ นครสวรรค์</h1>
      <p>รวมผลงานบ้านน็อคดาวน์และงานติดตั้งจริง</p>
    </div>
  </section>
  <section>
    <div class="container"><PortfolioGrid /></div>
  </section>
  <FinalCTA />
</BaseLayout>
```

- [ ] **Step 4: Build, dev-server smoke test all 3 pages**

```bash
npm run build
```

Expected: 4 pages built (index + services + models + portfolio).

- [ ] **Step 5: Commit**

```bash
git add src/pages/services.astro src/pages/models.astro src/pages/portfolio.astro
git commit -m "feat: add services, models, portfolio pages with breadcrumb + JSON-LD"
```

---

### Task 19: Process + About + Promotions + FAQ pages

**Files:**
- Create: `src/pages/process.astro`, `src/pages/about.astro`, `src/pages/promotions.astro`, `src/pages/faq.astro`

- [ ] **Step 1: Create `src/pages/process.astro`**

```astro
---
import BaseLayout from '~/layouts/BaseLayout.astro';
import Process from '~/components/Process.astro';
import FinalCTA from '~/components/FinalCTA.astro';
import { site } from '~/data/site';

const breadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'หน้าแรก', item: site.url + '/' },
    { '@type': 'ListItem', position: 2, name: 'ขั้นตอนการทำงาน', item: site.url + '/process' },
  ],
};
---
<BaseLayout
  title="ขั้นตอนสร้างบ้านน็อคดาวน์ 6 ขั้น ครบวงจร"
  description="6 ขั้นตอนสร้างบ้านน็อคดาวน์ ตั้งแต่ขอใบเสนอราคา ประเมินหน้างาน ผลิต ติดตั้ง จนส่งมอบงาน — บริการครบวงจรในนครสวรรค์"
  canonicalPath="/process"
  jsonLd={breadcrumb}
  pageId="process"
>
  <section class="page-header">
    <div class="container">
      <nav aria-label="breadcrumb"><a href="/">หน้าแรก</a> / ขั้นตอนการทำงาน</nav>
      <h1>ขั้นตอนสร้างบ้านน็อคดาวน์ ของเรา</h1>
      <p>วางแผนชัดเจน ตั้งแต่เริ่มต้นจนส่งมอบงาน</p>
    </div>
  </section>
  <section><div class="container"><Process /></div></section>
  <FinalCTA />
</BaseLayout>
```

- [ ] **Step 2: Create `src/pages/about.astro`**

```astro
---
import BaseLayout from '~/layouts/BaseLayout.astro';
import FinalCTA from '~/components/FinalCTA.astro';
import { site } from '~/data/site';

const breadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'หน้าแรก', item: site.url + '/' },
    { '@type': 'ListItem', position: 2, name: 'เกี่ยวกับเรา', item: site.url + '/about' },
  ],
};
---
<BaseLayout
  title="เรื่องบ้านบ้านน็อคดาวน์ นครสวรรค์ — เกี่ยวกับเรา"
  description="เรื่องบ้านบ้านน็อคดาวน์ นครสวรรค์ ให้บริการรับสร้างบ้านน็อคดาวน์ครบวงจรตั้งแต่ปี 2566 เน้นคุณภาพ ความตรงต่อเวลา และให้คำปรึกษาลูกค้าทุกขั้นตอน"
  canonicalPath="/about"
  jsonLd={breadcrumb}
  pageId="about"
>
  <section class="page-header">
    <div class="container">
      <nav aria-label="breadcrumb"><a href="/">หน้าแรก</a> / เกี่ยวกับเรา</nav>
      <h1>เกี่ยวกับ {site.name}</h1>
    </div>
  </section>
  <section>
    <div class="container">
      <h2>เรื่องราวของเรา</h2>
      <p>{site.name} ให้บริการรับสร้างบ้านน็อคดาวน์และบ้านสำเร็จรูปครบวงจร ตั้งแต่ปี 2566 โดยเน้นคุณภาพ ความตรงต่อเวลา และการให้คำแนะนำลูกค้าทุกขั้นตอนตั้งแต่เริ่มจนจบงาน</p>

      <h2>คุณค่าของแบรนด์</h2>
      <ul>
        <li>คุ้มค่า</li><li>รวดเร็ว</li><li>ตรงต่อเวลา</li><li>ปรับแบบได้</li><li>ให้คำปรึกษาจริงใจ</li>
      </ul>

      <h2>วัสดุและโครงสร้าง</h2>
      <ul>
        <li><strong>โครงสร้าง:</strong> เหล็กกันสนิม</li>
        <li><strong>ผนัง:</strong> PU / EPS</li>
        <li><strong>หลังคา:</strong> เมทัลชีทพร้อมฉนวน</li>
        <li><strong>พื้น:</strong> กระเบื้อง / SPC</li>
        <li><strong>ประตูหน้าต่าง:</strong> อลูมิเนียมกระจก</li>
        <li><strong>ระบบไฟฟ้า:</strong> พร้อมใช้งาน</li>
      </ul>
    </div>
  </section>
  <FinalCTA />
</BaseLayout>
```

- [ ] **Step 3: Create `src/pages/promotions.astro`**

```astro
---
import BaseLayout from '~/layouts/BaseLayout.astro';
import Promotion from '~/components/Promotion.astro';
import FinalCTA from '~/components/FinalCTA.astro';
import { site } from '~/data/site';
const breadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'หน้าแรก', item: site.url + '/' },
    { '@type': 'ListItem', position: 2, name: 'โปรโมชั่น', item: site.url + '/promotions' },
  ],
};
---
<BaseLayout
  title="โปรโมชั่นบ้านน็อคดาวน์ นครสวรรค์ ฟรีออกแบบ + ประเมิน"
  description="โปรโมชั่นบ้านน็อคดาวน์ ฟรีออกแบบเบื้องต้น ฟรีประเมินหน้างานในพื้นที่นครสวรรค์ ส่วนลดพิเศษสำหรับลูกค้าที่จองภายในเดือนนี้"
  canonicalPath="/promotions"
  jsonLd={breadcrumb}
  pageId="promotions"
>
  <section class="page-header">
    <div class="container">
      <nav aria-label="breadcrumb"><a href="/">หน้าแรก</a> / โปรโมชั่น</nav>
      <h1>โปรโมชั่นบ้านน็อคดาวน์</h1>
    </div>
  </section>
  <section><div class="container"><Promotion /></div></section>
  <FinalCTA />
</BaseLayout>
```

- [ ] **Step 4: Create `src/pages/faq.astro`**

```astro
---
import BaseLayout from '~/layouts/BaseLayout.astro';
import FAQ from '~/components/FAQ.astro';
import FinalCTA from '~/components/FinalCTA.astro';
import { site } from '~/data/site';
const breadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'หน้าแรก', item: site.url + '/' },
    { '@type': 'ListItem', position: 2, name: 'คำถามที่พบบ่อย', item: site.url + '/faq' },
  ],
};
---
<BaseLayout
  title="คำถามที่พบบ่อยเรื่องบ้านน็อคดาวน์ นครสวรรค์"
  description="รวมคำถามที่พบบ่อยเรื่องบ้านน็อคดาวน์ ราคา ระยะเวลาก่อสร้าง วัสดุ พื้นที่ให้บริการ และการเตรียมพื้นที่"
  canonicalPath="/faq"
  jsonLd={breadcrumb}
  pageId="faq"
>
  <section class="page-header">
    <div class="container">
      <nav aria-label="breadcrumb"><a href="/">หน้าแรก</a> / คำถามที่พบบ่อย</nav>
      <h1>คำถามที่พบบ่อย</h1>
    </div>
  </section>
  <section><div class="container"><FAQ /></div></section>
  <FinalCTA />
</BaseLayout>
```

- [ ] **Step 5: Build all pages**

```bash
npm run build
```

Expected: 8 pages built (index + 7 subpages).

- [ ] **Step 6: Commit**

```bash
git add src/pages/process.astro src/pages/about.astro src/pages/promotions.astro src/pages/faq.astro
git commit -m "feat: add process, about, promotions, FAQ pages"
```

---

### Task 20: Contact page + 404

**Files:**
- Create: `src/pages/contact.astro`, `src/pages/404.astro`

- [ ] **Step 1: Create `src/pages/contact.astro`**

```astro
---
import BaseLayout from '~/layouts/BaseLayout.astro';
import ContactForm from '~/components/ContactForm.astro';
import MapEmbed from '~/components/MapEmbed.astro';
import { site } from '~/data/site';

const sent = Astro.url.searchParams.get('sent') === '1';

const breadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'หน้าแรก', item: site.url + '/' },
    { '@type': 'ListItem', position: 2, name: 'ติดต่อเรา', item: site.url + '/contact' },
  ],
};

const contactPoint = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  url: site.url + '/contact',
  about: { '@id': `${site.url}/#business` },
};
---
<BaseLayout
  title="ติดต่อรับสร้างบ้านน็อคดาวน์ นครสวรรค์ โกรกพระ"
  description={`ติดต่อ ${site.name} โทร ${site.phones.join(' / ')} LINE ${site.lineId} อีเมล ${site.email} ที่อยู่ ${site.address.th} เปิดทุกวัน 08:00–17:00 น.`}
  canonicalPath="/contact"
  jsonLd={[breadcrumb, contactPoint]}
  pageId="contact"
>
  <section class="page-header">
    <div class="container">
      <nav aria-label="breadcrumb"><a href="/">หน้าแรก</a> / ติดต่อเรา</nav>
      <h1>ติดต่อเรา</h1>
      <p>สนใจสร้างบ้านน็อคดาวน์ ติดต่อทีมงานเพื่อปรึกษาและขอใบเสนอราคา</p>
    </div>
  </section>

  {sent && (
    <section class="alert-success">
      <div class="container">
        <p>✅ ขอบคุณค่ะ ทีมงานได้รับข้อความของคุณแล้ว จะติดต่อกลับโดยเร็วที่สุด</p>
      </div>
    </section>
  )}

  <section>
    <div class="container contact-grid">
      <div>
        <h2>ส่งข้อความ</h2>
        <ContactForm />
      </div>
      <aside>
        <h2>ข้อมูลติดต่อ</h2>
        <ul class="contact-info">
          {site.phones.map((p, i) => <li>📞 <a href={`tel:${site.phonesE164[i]}`}>{p}</a></li>)}
          <li>💬 LINE: <a href={site.lineUrl} rel="noopener" target="_blank">{site.lineId}</a></li>
          <li>📘 Facebook: <a href={site.facebookUrl} rel="noopener" target="_blank">{site.name}</a></li>
          <li>✉️ <a href={`mailto:${site.email}`}>{site.email}</a></li>
          <li>📍 {site.address.th}</li>
          <li>🕐 {site.hours}</li>
        </ul>
        <h3>พื้นที่ให้บริการ</h3>
        <p>{site.serviceAreas.join(' • ')} และพื้นที่ใกล้เคียง</p>
      </aside>
    </div>
  </section>

  <section>
    <div class="container">
      <h2>แผนที่</h2>
      <MapEmbed />
      <p><a href={site.gbpUrl} rel="noopener" target="_blank">🗺️ เปิดใน Google Maps</a></p>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Create `src/pages/404.astro`**

```astro
---
import BaseLayout from '~/layouts/BaseLayout.astro';
---
<BaseLayout
  title="ไม่พบหน้านี้ — บ้านน็อคดาวน์ นครสวรรค์"
  description="ไม่พบหน้าที่คุณค้นหา"
  canonicalPath="/404"
  noindex={true}
  pageId="404"
>
  <section class="page-header">
    <div class="container">
      <h1>ไม่พบหน้านี้ (404)</h1>
      <p>หน้าที่คุณกำลังหาอาจถูกย้ายหรือลบแล้ว</p>
      <a href="/" class="btn btn-primary">กลับหน้าแรก</a>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 3: Build and verify**

```bash
npm run build
```

Expected: contact + 404 pages built.

- [ ] **Step 4: Commit**

```bash
git add src/pages/contact.astro src/pages/404.astro
git commit -m "feat: add contact page (form + map) and 404 page"
```

---

### Task 21: Blog list + dynamic route + migrate 4 posts

**Files:**
- Create: `src/pages/blog/index.astro`
- Create: `src/pages/blog/[slug].astro`
- Create: `src/content/blog/baan-knockdown-price-2026.md`, `baan-knockdown-vs-brick.md`, `choose-baan-knockdown.md`, `maintain-baan-knockdown.md`
- Reference: `_reference/banban-knockdown-design/blog/*.html`

- [ ] **Step 1: Migrate the 4 blog posts from HTML to markdown**

For each `_reference/banban-knockdown-design/blog/<name>.html`:
1. Extract `<title>` → frontmatter `title`
2. Extract meta description → frontmatter `description`
3. Extract main image → frontmatter `heroImage`
4. Convert article body to markdown
5. Choose category from `['ราคา','เปรียบเทียบ','คู่มือ','บำรุงรักษา']`
6. Use today's date as `publishDate`

Example `src/content/blog/baan-knockdown-price-2026.md`:

```markdown
---
title: "บ้านน็อคดาวน์ ราคาเริ่มต้นเท่าไหร่ในปี 2026?"
description: "อัปเดตราคาบ้านน็อคดาวน์ปี 2026 จากนครสวรรค์ — เริ่มต้น 39,000 บาทสำหรับบ้านขนาดเล็ก พร้อมคำแนะนำการเลือกแบบให้พอดีงบ"
publishDate: 2026-04-15
heroImage: "/photos/blog-pricing.jpg"
heroImageAlt: "บ้านน็อคดาวน์ นครสวรรค์ ราคาเริ่มต้น 39,000 บาท"
category: "ราคา"
tags: ["ราคา", "บ้านน็อคดาวน์", "นครสวรรค์"]
---

## ราคาบ้านน็อคดาวน์ในปี 2026 เริ่มต้นเท่าไหร่?

(...migrated body content...)
```

Repeat for the other 3 posts.

- [ ] **Step 2: Create `src/pages/blog/index.astro`**

```astro
---
import BaseLayout from '~/layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';
import { site } from '~/data/site';

const posts = (await getCollection('blog', ({ data }) => !data.draft))
  .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());

const breadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'หน้าแรก', item: site.url + '/' },
    { '@type': 'ListItem', position: 2, name: 'บทความ', item: site.url + '/blog' },
  ],
};
---
<BaseLayout
  title="บทความบ้านน็อคดาวน์ นครสวรรค์ — ความรู้ + คู่มือ"
  description="รวมบทความและคู่มือเรื่องบ้านน็อคดาวน์ — ราคา การเปรียบเทียบ วิธีเลือก และการบำรุงรักษา จากทีมเรื่องบ้านบ้านน็อคดาวน์ นครสวรรค์"
  canonicalPath="/blog"
  jsonLd={breadcrumb}
  pageId="blog"
>
  <section class="page-header">
    <div class="container">
      <nav aria-label="breadcrumb"><a href="/">หน้าแรก</a> / บทความ</nav>
      <h1>บทความและคู่มือ</h1>
    </div>
  </section>
  <section>
    <div class="container blog-grid">
      {posts.map((post) => (
        <article class="blog-card">
          <a href={`/blog/${post.slug}`}>
            <img src={post.data.heroImage} alt={post.data.heroImageAlt} loading="lazy" width="600" height="400" />
            <div class="blog-card-body">
              <span class="blog-category">{post.data.category}</span>
              <h2>{post.data.title}</h2>
              <p>{post.data.description}</p>
              <time datetime={post.data.publishDate.toISOString()}>
                {post.data.publishDate.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
            </div>
          </a>
        </article>
      ))}
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 3: Create `src/pages/blog/[slug].astro`**

```astro
---
import BaseLayout from '~/layouts/BaseLayout.astro';
import FinalCTA from '~/components/FinalCTA.astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { site } from '~/data/site';

export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.map((post) => ({ params: { slug: post.slug }, props: { post } }));
}

interface Props { post: CollectionEntry<'blog'> }
const { post } = Astro.props;
const { Content } = await post.render();
const url = `${site.url}/blog/${post.slug}`;

const breadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'หน้าแรก', item: site.url + '/' },
    { '@type': 'ListItem', position: 2, name: 'บทความ', item: site.url + '/blog' },
    { '@type': 'ListItem', position: 3, name: post.data.title, item: url },
  ],
};

const article = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  mainEntityOfPage: url,
  headline: post.data.title,
  description: post.data.description,
  image: site.url + post.data.heroImage,
  datePublished: post.data.publishDate.toISOString(),
  dateModified: (post.data.updatedDate ?? post.data.publishDate).toISOString(),
  author: { '@type': 'Organization', name: site.name, url: site.url },
  publisher: { '@id': `${site.url}/#business` },
};
---
<BaseLayout
  title={`${post.data.title} | ${site.name}`}
  description={post.data.description}
  image={post.data.heroImage}
  canonicalPath={`/blog/${post.slug}`}
  ogType="article"
  jsonLd={[breadcrumb, article]}
  pageId="blog-post"
>
  <article class="blog-post">
    <div class="container">
      <nav aria-label="breadcrumb"><a href="/">หน้าแรก</a> / <a href="/blog">บทความ</a> / {post.data.title}</nav>
      <h1>{post.data.title}</h1>
      <div class="post-meta">
        <span class="blog-category">{post.data.category}</span>
        <time datetime={post.data.publishDate.toISOString()}>
          {post.data.publishDate.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
        </time>
      </div>
      <img src={post.data.heroImage} alt={post.data.heroImageAlt} class="post-hero" width="1200" height="600" />
      <div class="post-body">
        <Content />
      </div>
    </div>
  </article>
  <FinalCTA />
</BaseLayout>
```

- [ ] **Step 4: Build and verify all 4 blog posts generate**

```bash
npm run build
ls dist/blog/
```

Expected: `dist/blog/index.html` + 4 directories (one per post slug).

- [ ] **Step 5: Commit**

```bash
git add src/pages/blog/ src/content/blog/
git commit -m "feat: add blog list + dynamic post route + 4 migrated posts"
```

---

## Phase 6: Polish & Launch Prep

### Task 22: README + final env example

**Files:**
- Create: `README.md`
- Update: `.env.example`

- [ ] **Step 1: Write `README.md` (Thai-first maintenance guide)**

```markdown
# เว็บไซต์ เรื่องบ้านบ้านน็อคดาวน์ นครสวรรค์

เว็บไซต์ static แบบ lightweight สร้างด้วย Astro 5 — เน้น Local SEO สำหรับคีย์เวิร์ด **บ้านน็อคดาวน์ นครสวรรค์**

## เริ่มใช้งาน

```bash
npm install
npm run dev      # เปิด http://localhost:4321
npm run build    # สร้างไฟล์ static ใน dist/
npm run preview  # ดูตัวอย่าง production build
npm test         # รัน unit tests
```

## วิธีแก้ไขเนื้อหา

| ต้องการแก้ | แก้ไฟล์ไหน |
|---|---|
| เบอร์โทร / ที่อยู่ / อีเมล / เวลาทำการ | `src/data/site.ts` |
| สีแบรนด์ | `src/styles/site.css` (CSS variables ที่ `:root` ตอนต้นไฟล์) |
| บริการ (6 บริการ) | `src/data/services.ts` |
| แบบบ้าน + ราคา | `src/data/models.ts` |
| ผลงาน / Portfolio | `src/data/portfolio.ts` (เพิ่มรูปใน `public/photos/`) |
| FAQ | `src/data/faq.ts` (อัปเดตทั้งหน้า FAQ และ JSON-LD อัตโนมัติ) |
| โปรโมชั่น | `src/components/Promotion.astro` |

## เพิ่มบทความบล็อกใหม่

สร้างไฟล์ `.md` ใหม่ใน `src/content/blog/` เช่น `my-new-post.md`:

\`\`\`markdown
---
title: "หัวข้อบทความ (สูงสุด 70 ตัวอักษร)"
description: "คำอธิบายสำหรับ meta description (60–170 ตัวอักษร)"
publishDate: 2026-06-01
heroImage: "/photos/my-image.jpg"
heroImageAlt: "คำอธิบายภาพ มีคีย์เวิร์ด"
category: "คู่มือ"
tags: ["บ้านน็อคดาวน์", "นครสวรรค์"]
---

เนื้อหาบทความที่นี่ ใช้ Markdown ปกติได้
\`\`\`

ระบบจะสร้างหน้าเว็บอัตโนมัติที่ `/blog/my-new-post`

## Deploy ไปยัง Cloudflare Pages

1. push repo ไปยัง GitHub
2. ที่ Cloudflare Pages → Connect to Git → เลือก repo
3. Build command: `npm run build`
4. Output dir: `dist`
5. Node version: 20
6. ตั้งค่า Environment Variables ใน CF dashboard:
   - `WEB3FORMS_KEY` (จาก https://web3forms.com)
   - `PUBLIC_GTM_ID` (จาก Google Tag Manager)
   - `PUBLIC_SITE_URL` (เช่น `https://baannockdown-nakhonsawan.com`)
7. เพิ่ม custom domain เมื่อพร้อม (CF จัดการ SSL ให้อัตโนมัติ)

หลังจากตั้งค่าแล้ว ทุก `git push` ไปยัง branch `main` จะ rebuild + redeploy อัตโนมัติ

## Local SEO Checklist (ทำนอกเว็บไซต์)

- [ ] เคลม + verify Google Business Profile
- [ ] เพิ่มรูป 10–15 รูปใน GBP
- [ ] เพิ่ม URL เว็บไซต์ในช่อง "Website" ของ GBP
- [ ] ขอ Google reviews จากลูกค้าจริง
- [ ] Submit `https://baannockdown-nakhonsawan.com/sitemap-index.xml` ใน Google Search Console
- [ ] Submit ใน Bing Webmaster Tools
- [ ] เพิ่ม URL เว็บไซต์ในเพจ Facebook + LINE OA

## โครงสร้างโปรเจกต์

(ดู `docs/superpowers/specs/` สำหรับเอกสารออกแบบเต็ม)
```

- [ ] **Step 2: Update `.env.example`**

```
# Public — embedded in client-side HTML
PUBLIC_SITE_URL=https://baannockdown-nakhonsawan.com
PUBLIC_GTM_ID=GTM-XXXXXXX

# Private — only used at build time
WEB3FORMS_KEY=replace-with-key-from-web3forms-com
```

- [ ] **Step 3: Commit**

```bash
git add README.md .env.example
git commit -m "docs: add Thai-language README maintenance guide"
```

---

### Task 23: Build, Lighthouse audit, JSON-LD validation

**Files:** none — verification only

- [ ] **Step 1: Production build**

```bash
npm run build
```

Expected: build succeeds; `dist/` contains all 12 pages (index + 7 main + promotions + faq + 404 + blog/index + 4 blog posts) + `dist/sitemap-index.xml`.

- [ ] **Step 2: Verify sitemap contains all routes**

```bash
cat dist/sitemap-0.xml | grep -oE '<loc>[^<]+</loc>' | sort
```

Expected: 12+ `<loc>` entries matching all routes.

- [ ] **Step 3: Inspect a page for SEO completeness**

```bash
grep -E '<title>|<meta name="description"|<link rel="canonical"|application/ld\+json' dist/index.html | head -20
```

Expected: title, description, canonical, multiple JSON-LD blocks present.

- [ ] **Step 4: Preview the build locally and run Lighthouse**

```bash
npm run preview &
sleep 3
# Run lighthouse against the preview server
npx --yes lighthouse@latest http://localhost:4321/ --only-categories=performance,seo,accessibility,best-practices --form-factor=mobile --quiet --output=json --output-path=./lighthouse-home.json --chrome-flags="--headless=new"
kill %1
```

Expected: scores ≥ 95/100/95/95. If any fail:
- Performance <95: check image sizes (use `<Image>` instead of `<img>` for non-critical images)
- SEO <100: check meta description length, canonical, alt tags
- Accessibility <95: check color contrast, missing labels, button aria-labels

Iterate until all targets met. **Do not commit until passing.**

- [ ] **Step 5: Validate JSON-LD using Schema.org validator**

```bash
# Pipe each page's JSON-LD to validator (or open https://validator.schema.org/ in browser
# and paste the contents of grep output for each page)
for f in dist/index.html dist/services/index.html dist/models/index.html dist/contact/index.html; do
  echo "=== $f ==="
  grep -oE '<script type="application/ld\+json">.+?</script>' "$f"
done
```

Manually paste each JSON-LD block into https://validator.schema.org/ and https://search.google.com/test/rich-results — fix any errors before launch.

- [ ] **Step 6: Commit any fixes from steps 4–5**

```bash
git add -A
git commit -m "fix: resolve Lighthouse + Rich Results Test issues from audit"
```

---

### Task 24: Deployment setup (CF Pages + GitHub)

**Files:** none — setup steps only

- [ ] **Step 1: Create GitHub repo**

```bash
gh repo create baan-knockdown-nakhonsawan --private --source=. --remote=origin --push
```

(Or via web: create empty repo, then `git remote add origin <url>` + `git push -u origin main`.)

- [ ] **Step 2: In Cloudflare dashboard**

1. Workers & Pages → Create application → Pages → Connect to Git
2. Select `baan-knockdown-nakhonsawan` repo
3. Production branch: `main`
4. Framework preset: Astro (auto-detected)
5. Build command: `npm run build`
6. Build output directory: `dist`
7. Environment variables:
   - `PUBLIC_SITE_URL` = `https://<your-pages-subdomain>.pages.dev` (update later when custom domain added)
   - `PUBLIC_GTM_ID` = `GTM-XXXXXXX` (placeholder until client provides)
   - `WEB3FORMS_KEY` = `<key from web3forms.com>` (sign up first)
   - `NODE_VERSION` = `20`
8. Save and Deploy

- [ ] **Step 3: Verify deployment**

After CF Pages reports "Success", visit the `*.pages.dev` URL. Verify:
- Home page loads
- Navigation works
- Contact form submits successfully (test with your own email)
- Mobile sticky CTAs visible on phone
- Sitemap accessible at `https://<subdomain>.pages.dev/sitemap-index.xml`

- [ ] **Step 4: Document the live URL in README**

Add to top of `README.md`:

```markdown
**Live URL:** https://<your-pages-subdomain>.pages.dev
**Production domain:** TBD
```

- [ ] **Step 5: Commit**

```bash
git add README.md
git commit -m "docs: record live preview URL"
git push
```

- [ ] **Step 6: Project complete — hand off**

Final checklist for client/developer handoff:
- [ ] Live URL works
- [ ] All 12 pages render
- [ ] Form submissions arrive at `baannockdown.ns@gmail.com`
- [ ] Lighthouse mobile passes targets
- [ ] JSON-LD validates with no errors
- [ ] README explains how to add blog posts and edit content
- [ ] Real domain to be pointed at CF Pages when client decides
- [ ] Client to set up Google Business Profile + Search Console + GTM ID

---

## Self-Review Checklist (run after writing — issues fixed inline)

**Spec coverage check:**
- ✅ All 11 routes from spec — Tasks 17–21 cover index, services, models, portfolio, process, about, contact, promotions, faq, blog list, blog [slug]
- ✅ All component list from spec — Tasks 6–16 cover SEO, LocalBusinessSchema, BaseLayout, Header, Footer, FloatingCTAs, Hero, TrustBar, WhyChooseUs, ServiceCard/List, ModelCard/Grid, Process, Promotion, FinalCTA, FAQ, PortfolioGrid, ContactForm, MapEmbed
- ✅ Single-source-of-truth NAP — Task 5 (`site.ts`)
- ✅ Brand tokens at top of CSS — Task 3
- ✅ Zod content schemas — Task 4
- ✅ Sitemap — Task 2 (config) + Task 23 (verification)
- ✅ JSON-LD: GeneralContractor (Task 6), BreadcrumbList (every page task), FAQPage (Task 14), Service (Task 18), Product/Offer (Task 18), ImageGallery (Task 18), Article (Task 21)
- ✅ GTM — Task 7
- ✅ Web3Forms — Task 16
- ✅ Cloudflare Pages deployment — Task 24
- ✅ Lighthouse audit — Task 23
- ✅ README in Thai — Task 22
- ✅ aggregateRating REMOVED (per spec Open Item #3) — `LocalBusinessSchema.astro` (Task 6) deliberately omits it; existing zip mockup's value is not ported

**Placeholder scan:** No "TBD"/"TODO"/"implement later" remaining in code steps. Domain is intentionally `baannockdown-nakhonsawan.com` placeholder per spec; Facebook URL marked as "PLACEHOLDER — verify before launch" with explicit instruction. All other content is concrete.

**Type consistency:** `Service.iconKey`, `HouseModel.category`, `PortfolioCategory`, `FaqCategory` are all defined in their data files (Task 10) and consistently referenced from components (Tasks 13, 14, 15) and pages (Tasks 17–21). `site.phones` and `site.phonesE164` consistently used. `site.serviceAreas` is `readonly tuple` and consumed correctly via `.map()` in components.

**Nothing referenced before defined.** Every component is created before any page that imports it. `BaseLayout` in Task 7 references components built in Tasks 8–9 (Header/Footer/FloatingCTAs); the Task 7 step explicitly notes to expect type-check errors at that point that resolve in Task 8 — flagged in the step.
