# Quantum Comms website

Static site for Quantum Comms Pty Ltd (quantumcomms.com.au). Built with Astro 5, plain CSS design tokens, and content collections that act as the single fact register. Deploys to Cloudflare Pages with one Pages Function for the enquiry form.

## Run

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs dist/
npm run preview
npm run check      # type and template checks
```

## Where facts live (edit these, never the pages)

| What | File | Notes |
|---|---|---|
| Company identity, phones, hours, ABN, certifications, headline facts, programmes, training, plant | `src/data/company.ts` | Every item has `verified` and `source`. Unverified items never render as headline numbers. |
| Fleet units | `src/content/fleet/*.yaml` | One file per unit. `status: in-service | on-order | to-confirm`. Specs render on `/fleet/<id>/`. |
| Depots | `src/content/depots/*.yaml` | `confirmed: true` is required for a depot to get a page, contact card and structured data. |
| Services | `src/content/services/*.md` | Frontmatter for scope and proof, body for the long copy. |
| News and press | `src/content/news/*.md` | `verified: true` once the link and quote are checked with the publisher. |
| Case studies | `src/content/projects/*.md` | Publish with `published: true` only after the client approves. |
| Photos | `src/assets/photos/` + `src/data/images.ts` | Add the file, import it in `images.ts`, write alt text in `alts`. |
| Navigation | `src/data/nav.ts` | |
| Redirects from the old site | `public/_redirects` | All 24 legacy URLs and the three old PDFs. |
| Security headers and CSP | `public/_headers` | |

Rule: no numeric or superlative claim is typed into a page. Import it from a register or leave it out. See `BUILD-BRIEF.md`.

## Before launch: items the client must confirm

Search the code for `verified: false` and `confirmed: false`, and read the notices on `/compliance/`, `/fleet/`, `/locations/` and `/capability-statement/`. In short:

1. Fleet register: which units are in service, the S104HLA delivery date, OEM and SWL for the Actros and MAN units, any trailer-mounted units.
2. Depots: confirm SA, WA and Penrith (address, phone, staffing). Set `confirmed: true` to publish.
3. ISO certificate numbers, registrar and expiry; supply the certificate PDFs.
4. Leadership title for Andrew Drenovski; any other leaders to list.
5. Which programmes and past clients from the 2019 capability statement are still current.
6. Insurance types and limits for the compliance page and prequal pack.
7. Legal review of `/privacy/`, `/terms/`, `/hire-terms/`, `/accessibility/`.
8. Press links for the two news items.

## Deploy (Cloudflare Pages)

- Build command `npm run build`, output directory `dist`, Node 20 or later.
- `functions/api/enquiry.ts` is picked up automatically as `POST /api/enquiry`.
- Environment variables: `RESEND_API_KEY`, `ENQUIRY_FROM` (a sender on a DKIM-verified domain), `ENQUIRY_TO_DEFAULT`, optional `ENQUIRY_TO_HIRE`, `ENQUIRY_TO_HSEQ`, `ENQUIRY_TO_TENDERS`, `ENQUIRY_TO_CAREERS`, `ENQUIRY_WEBHOOK_URL` (CRM or Teams), `TURNSTILE_SECRET`, and build-time `PUBLIC_TURNSTILE_SITE_KEY`.
- Point `www.quantumcomms.com.au` at the Pages project, redirect the apex to `www`, enable HSTS at the zone, and re-register `quantumtraveltowers.com.au` if recoverable and redirect it.
- After launch: submit `sitemap-index.xml` in Search Console, remove the old Universal Analytics tag from any remaining assets, align LinkedIn and Instagram bios with the register.

## Structure

```
src/
  layouts/Base.astro        head, SEO, Organization JSON-LD, header, footer
  components/               Header, Footer, Logo, Hero, Breadcrumbs, CtaBand, FleetTable, DepotCard, EnquiryForm, ProofStrip
  pages/                    routes (see BUILD-BRIEF.md sitemap)
  content/                  fleet, depots, services, news, projects
  data/                     company.ts, images.ts, nav.ts
  lib/facts.ts              helpers that read the registers
  styles/global.css         tokens and base styles
functions/api/enquiry.ts    Cloudflare Pages Function for the form
public/                     _headers, _redirects, robots.txt, favicon, logo, OG image
```
