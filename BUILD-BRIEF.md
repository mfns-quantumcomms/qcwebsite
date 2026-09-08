# Quantum Comms website: build brief for page authors

Read this whole file before writing any page. It is the contract between the foundation (layout, tokens, components, registers) and the pages.

## What this site is for

Quantum Comms Pty Ltd (ABN 32 603 340 932) is an Australian telecommunications rigging, civil works and truck-mounted EWP hire contractor, trading since 2013 (formerly Quantum Travel Towers). It is a **closed B2B business**: work comes through carrier supplier panels, tier-one subcontracting, utilities and tenders, not inbound web leads. The website's job is **verification and credibility during procurement due diligence**, then a reference for existing clients and recruits. Write for a carrier project manager, a tier-one procurement officer, a utility HSEQ reviewer, or a rigger looking for a job. No marketing hype, no keyword stuffing, no "we are passionate".

## Brand

The site implements **Brand Guidelines 2026 (Brand Kit v2)**. Read `BRAND.md` before you write any
markup, and never work around it:

- **Colour.** Ink `#15191C`, Quantum Green `#3F9C2F`, Deep Green `#1E6B27`, Graphite `#3A4248`,
  Steel `#6C767D`, Concrete `#E7E9EB`, Mist `#F3F4F5`, white. Safety Orange `#E4600E` is for HSEQ
  and site signage only. Quantum Green appears **once per page** and never as body text on white.
  Links, buttons and small green text use Deep Green.
- **Type.** Archivo variable only, weights 400, 500 and 600. Width does the expressive work:
  110 for the wordmark and display, 105 for H1, 100 for everything else, 85 for tables.
  Sentence case throughout, capitals only in labels and table headers.
- **Logo.** Only through `src/components/Logo.astro`. Never redraw the mark.
- **Graphic device.** The 45 degree cut, top-right, once per layout, via the `.cut` class. Nothing else.
- **No dashes.** No em dashes or en dashes in copy. Ranges use the word "to".

## Hard rules

1. **No numeric claim is typed into a page.** Fleet counts, heights, headcount, years, certificate numbers come from `src/data/company.ts` or the content collections, and only render when the register marks them appropriate. Never write "28 EWPs", "101 m", "Australia's largest", "1147 projects", "50 years" anywhere. If you need a number, import it. If the register says `verified: false`, render a qualified phrase ("on order", "to be confirmed", "per our capability statement") or omit the number.
2. **Australian English.** organisation, licence (noun), programme, metres, colour, tyre, kerb, mobilise. Metric units with a space: `70 m`, `700 kg`, `12.5 m/s`. Dates as 4 June 2025.
3. **No fabrication.** Do not invent clients, projects, testimonials, staff names, phone numbers, certificate numbers or dates. Where the client must supply something, render a clearly worded placeholder inside `<p class="notice">` and add it to `openQuestions` in your report. Case studies (`src/content/projects`) are published only with `published: true`; do not create fake ones. You may create ONE example file with `published: false` to show the template.
4. **Every page** uses `Base.astro` with a unique `title` (no brand suffix, the layout adds it) and a `description` (120 to 160 characters, plain, specific). Every page except home starts with `Hero` variant `page` or `photo` and includes `Breadcrumbs` in the `breadcrumbs` slot, and ends with `CtaBand` (customise heading/text/actions to the page). Utility and legal pages may skip the CtaBand.
5. **Accessibility (WCAG 2.2 AA).** One `h1` per page, heading levels in order, alt text from `src/data/images.ts` `alts`, `aria-current` on active nav, visible focus (already in CSS), 44 px targets (buttons/links already sized), tables with `caption` and `th scope`, forms with labels. No text in images. No uppercase paragraphs.
6. **Photos** only from `src/data/images.ts` via `<Image src={photos.key} alt={alts.key} widths={[400, 800, 1200]} sizes="..." />` from `astro:assets`. Never hotlink. Never use the legacy logo PNG.
7. **Links** use trailing slashes (`/fleet/`). Internal links only to routes that exist in the sitemap below. External links get `rel="noopener" target="_blank"`.
8. **Do not run `astro build` or `astro dev`.** Other authors are working in parallel. You may run `npx astro check` once at the end. Do not edit files outside your assigned group. Do not edit `src/styles/global.css`, `Base.astro`, `Header.astro`, `Footer.astro`, `company.ts`, `nav.ts`, `content.config.ts`. If you need a new shared style, use a scoped `<style>` in your page.
9. **Structured data** where noted: services get `Service` JSON-LD (provider = organisation @id `https://www.quantumcomms.com.au/#organization`), depots get `LocalBusiness`, fleet units get `Product` with `additionalProperty` for specs, news gets `NewsArticle`/`Article`, capability statement gets `WebPage`. Pass via the `jsonLd` prop on `Base`.
10. **Tone.** Plain, direct, specific. Short paragraphs. Lists for scopes. Sentences under ~22 words. Say what the reader can verify and where.

## Foundation you can use

- Layout: `@layouts/Base.astro` props `{ title, description, canonical?, ogImage?, noindex?, jsonLd?, bodyClass? }`.
- Components (`@components/*`): `Hero` (variants `page` | `photo` | `home`; props eyebrow, title, lead, image, imageAlt; slot `breadcrumbs`), `Breadcrumbs` (`items: [{label, href?}]`, last item is current page), `CtaBand` (heading, text, primary, secondary, tone), `FleetTable` (`units`, `caption`, `showClass`), `DepotCard` (`depot`, `link`), `EnquiryForm` (`topic`, `source`, `heading`), `ProofStrip` (`tone`), `Logo`.
- CSS classes in `src/styles/global.css`: `.container`, `.section`, `.section--white|--dark|--charcoal|--tight`, `.eyebrow`, `.lead`, `.prose`, `.grid .grid--2|--3|--4`, `.split .split--wide-text`, `.btn .btn--primary|--secondary|--ghost`, `.btn-row`, `.card .card--link .card__cta`, `.chip .chip--green|--warn|--navy`, `.stat .stat__n .stat__l`, `.spec` (dl), `.table-wrap`, `.figure .figure--ratio|--wide`, `.notice .notice--info`, `.field`, `.visually-hidden`, `.caption`, `.text-steel`, `.center`.
- Data: `@data/company` exports `company, leadership, certifications, headlineFacts, programmes, training, plant, depotPolicy, currentYear`. `@data/images` exports `photos, alts`. `@data/nav` exports nav arrays.
- Helpers `src/lib/facts.ts`: `confirmedDepots(), coverageStates(), fleetInService(), fleetAll(), verifiedMaxHeight(), registerMaxHeight(), unitHref(), depotHref(), fmtHeight()`.
- Collections (`astro:content` `getCollection`): `fleet` (yaml, see `src/content.config.ts` for fields), `depots`, `services` (md with body), `news` (md), `projects` (md). Entry `id` is the filename without extension and is the URL slug.
- Facts in the PDFs the client published: see `src/data/company.ts` comments. The 2019 fleet portfolio specs are already in `src/content/fleet`.

## Sitemap (routes that will exist)

```
/                                   home (done)
/services/                          hub
/services/comms-and-rigging/        (content done: src/content/services/comms-and-rigging.md)
/services/civil-works/
/services/steel-fabrication/
/services/thermal-coating/
/services/service-and-maintenance/
/fleet/                             register index, filter by class, table + cards
/fleet/[unit]/                      one page per fleet entry (8 entries)
/fleet/trailer-mounted/             class page (register has no trailer units yet: explain the class, ask client for units)
/fleet/insulated/                   class page (LV unit exists)
/fleet/generators-and-plant/        plant list from company.plant + generator range placeholder
/fleet/how-hire-works/              wet vs dry, operator credentials, inspections, minimum terms (from capability statement); links to /hire-terms/
/projects/                          programmes (company.programmes) + published case studies
/projects/[slug]/                   case-study template (published only)
/locations/                         hub: confirmed depots as cards, coverage states, national note
/locations/[depot]/                 one page per confirmed depot only (use confirmedDepots())
/compliance/                        ISO systems (certifications), training matrix, vehicle kit, inductions, insurances placeholder, prequal pack request (EnquiryForm topic="prequal")
/about/                             story timeline (2013 travel towers, 2015 comms, 2020 fabrication), leadership (leadership array, title flagged unverified), crews, values in plain words, ABN
/about/news/                        list of news entries
/about/news/[slug]/                 news entry
/careers/                           roles we hire for, licences required, depots, EOI via EnquiryForm topic="careers"
/capability-statement/              HTML capability statement generated from registers (company, certifications, services, fleet, depots, training, programmes) + "Download PDF" placeholder note (PDF to be generated at launch)
/contact/                           per-depot cards, after-hours note, document requests, EnquiryForm
/thank-you/                         noindex, shows ref from ?ref=
/privacy/  /terms/  /hire-terms/  /accessibility/   drafts marked "for legal review", noindex=false
/404                                src/pages/404.astro
```

## Report format

When done, return: files written (paths), a two-line summary per page, and `openQuestions` (things the client must supply or confirm), plus any foundation bug you noticed but did not fix.
