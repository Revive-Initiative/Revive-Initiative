# Revive Initiative — Website

Official website for **Revive Initiative**, a grassroots humanitarian initiative providing transparent, community-driven assistance.

> "From a drop to a lifeline."

## Mission

Revive Initiative's current focus is the **Water Relief Initiative**: delivering **1,000,000 liters** of clean drinking water to displaced families living under extremely difficult conditions. The architecture is built to support future initiatives (Food Parcels, Daily Meals, Milk for Infants, Orphan Sponsorship, University Study Spaces) by simply adding a new page and nav link.

## Tech stack

- HTML5 (semantic, one static page per section of the site)
- Tailwind CSS via CDN (no build step)
- Vanilla JavaScript (no frameworks, no dependencies)
- A small JSON data layer (`/data/*.json`) that pages fetch client-side — swap this for the Google Sheets API later without touching the HTML
- No backend — fully static, hosted on GitHub Pages

## Project structure

```
/assets
  /brand        logo.png, logo-dark.png, favicon.ico, colors.css, brand-guidelines.md
  /images       placeholder photos/illustrations
/css            main.css (design tokens + shared components)
/js             main.js (nav, reveal-on-scroll), data.js (JSON data layer)
/data           water.json, reports.json, campaigns.json
/locales        en.json (live), ar.json (placeholder for future i18n)
/pages          about.html, water-initiative.html, reports.html, gallery.html, contact.html
index.html
404.html
robots.txt
sitemap.xml
CNAME           custom domain for GitHub Pages
README.md
LICENSE
```

## Updating campaign progress (for now)

Progress is manually maintained in `/data/water.json`:

```json
{
  "current_liters": 19000,
  "goal_liters": 1000000,
  "last_updated": "2026-07-15"
}
```

Edit this file and commit — the homepage and Water Initiative page pull from it automatically. When ready, replace the fetch in `js/data.js` (`fetchWaterData()`) with a call to the Google Sheets API and the rest of the site keeps working unchanged.

## Local development

No build step is required, but the site uses **absolute paths** (`/css/...`, `/data/...`) so it needs to be served over HTTP rather than opened directly as a `file://` URL:

```bash
# from the repository root
python3 -m http.server 8000
# then open http://localhost:8000
```

Any static file server works equally well (`npx serve`, VS Code Live Server, etc.).

## Deployment — GitHub Pages + custom domain

The repository is intended to live under a GitHub Organization and deploy via GitHub Pages, with `reviveinitiative.github.io` redirecting to `revive-initiative.org` (purchased on Namecheap).

### 1. Enable GitHub Pages

1. Push this repository to the GitHub organization (e.g. `reviveinitiative/reviveinitiative.github.io` for a user/org page, or any repo name + Pages source `main` / `root`).
2. In **Settings → Pages**, set the source branch to `main` and folder to `/ (root)`.
3. GitHub will build and serve the site at `https://reviveinitiative.github.io/`.

### 2. Point the custom domain at GitHub Pages

The repo includes a `CNAME` file containing `revive-initiative.org`. GitHub Pages reads this file automatically, but the DNS still needs to be configured at your registrar (Namecheap):

**For an apex/root domain (`revive-initiative.org`):** add four `A` records at Namecheap pointing to GitHub's Pages IPs:

```
A   @   185.199.108.153
A   @   185.199.109.153
A   @   185.199.110.153
A   @   185.199.111.153
```

**For the `www` subdomain (optional but recommended):** add a `CNAME` record:

```
CNAME   www   reviveinitiative.github.io.
```

### 3. Configure the domain in GitHub

1. In **Settings → Pages → Custom domain**, enter `revive-initiative.org` and save (this writes/confirms the `CNAME` file).
2. Wait for DNS to propagate (can take up to 24–48 hours) and for GitHub's "DNS check" to pass.
3. Once verified, check **Enforce HTTPS** — GitHub Pages provisions a free TLS certificate (via Let's Encrypt) automatically once DNS is correctly pointed.

### 4. Redirect `reviveinitiative.github.io` → `revive-initiative.org`

Once the custom domain is verified and HTTPS is enforced, GitHub Pages automatically 301-redirects the default `*.github.io` URL to the configured custom domain — no extra configuration needed beyond steps 1–3.

### 5. Verify

- `https://revive-initiative.org` loads the site over HTTPS with a valid certificate.
- `https://reviveinitiative.github.io` redirects to `https://revive-initiative.org`.
- `https://www.revive-initiative.org` (if the `CNAME` record was added) also resolves correctly.

## Contribution guidelines

1. Keep the site framework-free (HTML/Tailwind CDN/vanilla JS) — no build tooling.
2. New content pages go in `/pages`; add a matching link in the shared nav (duplicated at the top of every page) and in `sitemap.xml`.
3. New data should live in `/data/*.json` and be fetched client-side rather than hardcoded into HTML.
4. Follow `assets/brand/brand-guidelines.md` for color, type, and voice.
5. Test keyboard navigation and screen-reader labels (`aria-*`) before committing.

## Roadmap

- [ ] Connect `data/water.json` to the Google Sheets API for live progress updates
- [ ] Add online donation processing
- [ ] Add PDF report uploads and a dedicated report detail template
- [ ] Add gallery filtering by campaign
- [ ] Add Food Parcels / Daily Meals / Milk for Infants / Orphan Sponsorship / University Study Spaces initiative pages
- [ ] Add Arabic translations to `/locales/ar.json` and wire up an i18n switcher
- [ ] Dark mode

## License

MIT — see `LICENSE`.
