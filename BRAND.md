# Quantum Comms brand system, as implemented

This is the website's implementation of **Brand Guidelines 2026 (Brand Kit v2)**. The kit is the
authority. If this file and the kit disagree, the kit wins and this file is wrong.

## Voice

Three words from the kit, and they decide most wording arguments:

- **Precise.** Numbers, names and standards stated exactly. No superlative that cannot be evidenced.
- **Assured.** Written for procurement and HSEQ reviewers. Calm, declarative sentences. No exclamation marks.
- **Plain.** Industry terms used correctly, marketing terms avoided. Say EWP, not cherry picker.

Sentence case throughout. Capitals only in labels and table headers. Australian English.
No em dashes or en dashes anywhere: use a full stop, a comma, a colon, or the word "to" in a range.

The kit's own sample pages print figures such as a fleet count and a maximum reach. Those figures
are not confirmed by the client, so this site does not publish them. See `OPEN-ITEMS.md`. The kit's
first brand value requires exactly that restraint.

## Logo

One component, `src/components/Logo.astro`. Do not draw the mark anywhere else.

The mark is a geometric Q: the ring is the old handset outline resolved to a circle, the tail is set
at 45 degrees to read as a boom, and the single arc carries the signal. One stroke weight, one colour.

| Prop | Values | Notes |
|---|---|---|
| `lockup` | `primary`, `stacked`, `mark` | Primary at 140 px and wider, stacked at 64 px and wider, mark alone at 16 px and wider |
| `variant` | `positive`, `reversed`, `mono`, `on-green` | Positive on white and Mist, reversed on Ink and photography, mono for single colour print, on-green for fleet stripes and hi-vis backing |
| `size` | `sm`, `md`, `lg`, `xl` | Sets the mark size; the wordmark scales from it |

Clear space is half the mark height on all sides. Never stretch, rotate, outline, add effects,
change the green, or set the wordmark in another typeface.

Generated files, rebuilt by hand if the mark ever changes: `public/favicon.svg`,
`public/apple-touch-icon.png`, `public/logo.svg`, `public/og-default.jpg`.

## Colour

| Token | Hex | Role |
|---|---|---|
| Ink | `#15191C` | Headings, dark bands, the one dark |
| Quantum Green | `#3F9C2F` | The mark, a rule, one highlighted figure. On Ink it is 5.1:1 and may carry text. On white it is 3.5:1, so headlines and the mark only, never body text |
| Deep Green | `#1E6B27` | Buttons, links and small text on white, 6.6:1 |
| Graphite | `#3A4248` | Body text |
| Steel | `#6C767D` | Secondary text and captions, 4.7:1 on white |
| Concrete | `#E7E9EB` | Rules, table headers, quiet fills |
| Mist | `#F3F4F5` | Page and section ground |
| White | `#FFFFFF` | Cards, tables, the dominant surface |
| Safety Orange | `#E4600E` | HSEQ documents, hazard callouts and site signage only. Never in marketing or tender layouts |

Proportion, roughly: white 58, Ink 22, Mist 10, Graphite 5, Quantum Green 3, Deep Green 2.
**Quantum Green appears once per page.** No gradients, no tints of green, no full green surfaces.

## Typography

One family: **Archivo variable**, self-hosted from `@fontsource-variable/archivo/standard.css`,
both the weight and the width axis. Weights 400, 500 and 600 only. Office fallback is Arial,
never Calibri, never Times.

Width does the expressive work:

| Role | Weight | Width | Size and leading | Tracking |
|---|---|---|---|---|
| Display | 600 | 110 | 60 / 60 | -0.04em |
| H1 | 600 | 105 | 38 / 41 | -0.03em |
| H2 | 600 | 100 | 26 / 31 | -0.02em |
| H3 | 500 | 100 | 19 / 25 | -0.01em |
| Label | 500 | 100 | 12, uppercase | +0.14em |
| Body | 400 | 100 | 16 / 26 | normal |
| Table | 500 | 85 | 14 / 20 | +0.01em |
| Caption | 400 | 100 | 13 / 20 | normal |

On the web these are anchors, not fixed values: headings use `clamp()` between a phone size and
the kit size, and the width axis is applied through the `font-stretch` values above.

## The 45 degree cut

The tail of the Q, taken from the mark and used **once per layout**: a corner cut on the lead
photograph or panel. Always top-right, always 45 degrees, always a single cut, and the cut equals
the mark height. Never on the logo itself, never on a body text container.

Use the `.cut` utility class. It is the only graphic device on the site. No other shapes, icons,
swooshes or patterns.


## Layout language

The brand kit sets colour, type and the cut. This is how the site turns those into pages that
hold up beside Service Stream, Indara, Nokia and Ericsson. All of it lives in `global.css`.

| Pattern | Class | Use |
|---|---|---|
| Full-bleed hero | `Hero variant="home"` | A photograph with the statement over it and a one-sided scrim, so the photograph stays a photograph and the text still clears 4.5:1 |
| Quick links bar | `.quicklinks` in the hero's `foot` slot | The "start here" row every peer puts under the hero |
| Section head | `.section-head` with `.section-head__rule` | Opens every major section: green rule, eyebrow, statement, lead |
| Media card | `.media-card` | Anything with a photograph. No border, no shadow, a 2 px rule under the label, a slow zoom on hover |
| Arrow link | `.arrow-link` | Every next step. Renders its own arrow and moves it on hover |
| Stat band | `.statband` | A row of large figures. Values come from the register only |
| Feature band | `.feature` (see the home page) | A full-bleed photograph with reversed text, to break a long page |
| Scroll reveal | `.reveal` | Fades and rises on scroll. Visible by default with no JavaScript and under reduced motion |
| Coverage map | `CoverageMap` | Inline SVG of Australia from real state boundaries, one pin per depot, no third party |
| Depot map | `DepotMap` | A map baked at build time, which becomes a pan and zoom Leaflet map when the reader presses Explore the map |

Rhythm: sections alternate white, Mist and Ink so a page never reads as one flat slab.
The header is sticky and condenses once the page moves.

Plain `.card` is still correct for text-only content such as contact details or a specification
panel. The 45 degree cut is used once per page, on the lead photograph, and nowhere else.

## Photography

Own fleet and crews only, from `src/data/images.ts`.

- **Grade.** Neutral white balance, slightly desaturated, lifted blacks. Steel and sky do the work, hi-vis stays saturated.
- **Composition.** Wide frames for scale and height, low angles for booms, tight crops for hands, gauges and log books.
- **Compliance.** Correct PPE and exclusion zones in every published frame. Procurement looks. Reject anything that fails.

## Rollout beyond the website

The kit sequences it digital first, then paper, then steel: website, email signatures, LinkedIn and
the Google Business Profile first, then stationery and the capability statement, then fleet livery,
PPE and site signage. Livery is a white body, an Ink cab block carrying the mark, one 45 degree
Quantum Green stripe at the rear edge, and the fleet number in condensed width.
