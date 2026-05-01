# Deployment Runbook — Banban Knockdown Nakhon Sawan

This guide walks you through publishing the site from your local machine to Cloudflare Pages. Complete every step in order.

---

## Prerequisites

Before you start, make sure you have:

- **Node 20+** installed (`node -v`)
- **Git** installed and the project committed on `main`
- **GitHub account** — either install the `gh` CLI or use github.com in a browser
- **Cloudflare account** — free tier is fine (https://dash.cloudflare.com/sign-up)
- **Web3Forms account** — free (https://web3forms.com)
- **Google Tag Manager account** — optional, free (https://tagmanager.google.com)

---

## Step 1: Create the GitHub Repository

### Option A — GitHub CLI (fastest)

```bash
cd "/Users/tanawatwattanarach/Documents/client website/banban knockdown"

# Authenticate if you haven't already
gh auth login

# Create a private repo and push
gh repo create banban-knockdown-nakhonsawan \
  --private \
  --source=. \
  --remote=origin \
  --push
```

### Option B — GitHub web UI

1. Go to https://github.com/new
2. Repository name: `banban-knockdown-nakhonsawan`
3. Visibility: Private (or Public — your choice)
4. Do **not** add a README, .gitignore, or licence (the repo already has them)
5. Click **Create repository**
6. Back in Terminal, run the commands GitHub shows you:

```bash
cd "/Users/tanawatwattanarach/Documents/client website/banban knockdown"
git remote add origin https://github.com/<your-username>/banban-knockdown-nakhonsawan.git
git branch -M main
git push -u origin main
```

After this step your code is on GitHub and ready to connect to Cloudflare.

---

## Step 2: Get a Web3Forms Access Key

The contact form uses Web3Forms to send submissions to `baannockdown.ns@gmail.com` without a back-end server.

1. Go to https://web3forms.com
2. Enter `baannockdown.ns@gmail.com` and click **Create Access Key**
3. Check your inbox and confirm the email address
4. Copy the access key — it looks like `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
5. Save it somewhere safe; you will need it in Step 4

---

## Step 3: (Optional) Create a Google Tag Manager Container

Skip this step if you do not plan to use GTM right away.

1. Go to https://tagmanager.google.com
2. Click **Create account**
   - Account name: `Banban Knockdown NS`
   - Country: Thailand
   - Container name: your domain (e.g. `baannockdown-nakhonsawan.com`)
   - Target platform: **Web**
3. Click **Create** and accept the terms
4. Copy the Container ID — it looks like `GTM-XXXXXXX`
5. You can ignore the "Install GTM snippet" instructions — the Astro site handles that automatically

---

## Step 4: Set Up Cloudflare Pages

1. Log in at https://dash.cloudflare.com
2. In the left sidebar click **Workers & Pages**
3. Click **Create application** → select the **Pages** tab
4. Click **Connect to Git**
5. Authorise Cloudflare to access your GitHub account, then select the `banban-knockdown-nakhonsawan` repository
6. Set the build configuration:

   | Setting | Value |
   |---|---|
   | Production branch | `main` |
   | Framework preset | Astro (auto-detected; if not, select manually) |
   | Build command | `npm run build` |
   | Build output directory | `dist` |

7. Expand **Environment variables** and add these four variables:

   | Variable name | Value |
   |---|---|
   | `PUBLIC_SITE_URL` | `https://<your-pages-subdomain>.pages.dev` (update to custom domain later) |
   | `PUBLIC_GTM_ID` | `GTM-XXXXXXX` (from Step 3; leave blank if skipped) |
   | `WEB3FORMS_KEY` | your key from Step 2 |
   | `NODE_VERSION` | `20` |

   > To find your pages subdomain before deploying: Cloudflare auto-generates it as
   > `<project-name>.pages.dev`. You can update `PUBLIC_SITE_URL` after the first deploy
   > once you know the exact URL.

8. Click **Save and Deploy**

Cloudflare will clone the repo, install dependencies, run `npm run build`, and publish `dist/`. The first deploy takes about 2–3 minutes. Subsequent deploys triggered by `git push` to `main` are automatic.

---

## Step 5: Verify the Deployment

Once the deploy status shows **Success**, open the `*.pages.dev` URL and check:

- [ ] Home page renders correctly (hero, services, models, portfolio sections visible)
- [ ] Navigation links work (About, Services, Models, Portfolio, Blog, FAQ, Contact)
- [ ] Blog index at `/blog/` loads and posts are listed
- [ ] FAQ page at `/faq/` loads with accordion
- [ ] Contact form at `/contact/` submits successfully — verify an email arrives at `baannockdown.ns@gmail.com`
- [ ] Sitemap accessible at `/sitemap-index.xml`
- [ ] Test on a real mobile phone: sticky CTA buttons (phone + LINE) appear and tap correctly
- [ ] Open browser DevTools → Console: no errors

---

## Step 6: Add a Custom Domain (When Ready)

Do this once you have purchased a domain (e.g. `baannockdown-nakhonsawan.com`).

1. In the Cloudflare Pages project, click **Custom domains** → **Set up a custom domain**
2. Enter your domain and follow the DNS instructions:
   - **If your domain's DNS is managed by Cloudflare:** a CNAME record is added automatically
   - **If your domain's DNS is at a registrar (e.g. Namecheap, GoDaddy):** add a `CNAME` record pointing to `<project-name>.pages.dev`, or for an apex domain use Cloudflare's nameservers (free) to enable CNAME flattening
3. SSL is issued automatically — wait a few minutes for it to become active
4. Update the environment variable `PUBLIC_SITE_URL` in Cloudflare Pages dashboard:
   - Workers & Pages → your project → Settings → Environment variables
   - Change `PUBLIC_SITE_URL` to `https://baannockdown-nakhonsawan.com`
5. Trigger a redeploy: Workers & Pages → Deployments → **Retry deployment** on the latest build
   (Or simply push a small change to `main` and CF Pages will rebuild automatically)

---

## Step 7: Local SEO Setup (Post-Launch)

After the site is live with a stable URL, complete these off-site tasks:

- [ ] **Google Search Console** — go to https://search.google.com/search-console, add the property, submit `https://baannockdown-nakhonsawan.com/sitemap-index.xml`
- [ ] **Google Business Profile** — add the site URL in the **Website** field at https://business.google.com
- [ ] **Facebook Page** — add the site URL in the About section → Website field
- [ ] **LINE Official Account** — add the site URL in your OA profile
- [ ] **Encourage Google Reviews** — send the review link to happy customers; aim for 10+ reviews within the first month to boost local pack visibility
- [ ] **Bing Webmaster Tools** — https://www.bing.com/webmasters (submit sitemap there too)

---

## Quick Reference: Environment Variables

| Variable | Where to get it |
|---|---|
| `PUBLIC_SITE_URL` | Your domain (or `*.pages.dev` URL initially) |
| `PUBLIC_GTM_ID` | Google Tag Manager → Admin → Container ID |
| `WEB3FORMS_KEY` | https://web3forms.com after email confirmation |
| `NODE_VERSION` | Always `20` |

## Quick Reference: Cloudflare Build Settings

```
Framework preset : Astro
Build command    : npm run build
Output directory : dist
Node version     : 20 (set via NODE_VERSION env var)
```
