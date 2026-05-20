# Becker's Healthcare — Design System

A design system for **Becker's Healthcare**, the B2B healthcare-media network best known for *Becker's Hospital Review* and its family of specialty sites (ASC, Spine, Dental, Payer, Behavioral, Physician, Oncology, Cardiology). Becker's serves 500,000+ hospital and health-system executives with daily news, newsletters, live + virtual events, webinars, whitepapers, and podcasts.

**Tagline triad (from brand board): Professional · Trusted · Engaging.**

---

## Sources used

- `uploads/Becker's _ Client Boards.png` — primary brand board (logo, color swatches, type specimens, sample web layout, sample article layout).
- `uploads/Becker's _ Client Boards (1).png` — second variant with a navy "Professional · Trusted · Engaging" tag block.
- Live site: `https://www.beckershospitalreview.com/` — used to pull the real logo PNG and the icon set (events, webinars, whitepapers, podcasts) used across the site. Theme identifies itself as "Becker's Healthcare" by 10up.
- Public newsletter / homepage / article markup for copy patterns, navigation structure, and category taxonomy.

> No Figma file or codebase was attached. If you have access to either, re-attach via the Import menu — this system is currently built from the brand boards + the live site's publicly fetchable assets.

---

## Index / Manifest

**Root**
- `README.md` — this file (context, content rules, visual foundations, iconography, index).
- `colors_and_type.css` — CSS vars + class presets. Import this before anything else.
- `SKILL.md` — Agent Skills–compatible entry point for Claude Code.

**Folders**
- `assets/logos/` — Becker's Hospital Review wordmark (PNG from live site).
- `assets/icons/` — SVG icons used on the live site (events, webinars, whitepapers, podcasts).
- `assets/placeholders/` — generic image placeholders for mocks.
- `fonts/` — (empty; using Google Fonts substitutions — see Font Substitution note).
- `preview/` — Design-System-tab preview cards (type, color, spacing, components, brand).
- `ui_kits/bhr-web/` — UI kit for Becker's Hospital Review website.
- `ui_kits/newsletter/` — UI kit for the daily newsletter email.

**Products represented**
- `bhr-web` — Becker's Hospital Review, the flagship web property. Homepage, article, featured/most-read cards, category nav, site-switcher, newsletter CTA.
- `newsletter` — The daily email newsletter that's central to the business ("Join the 500,000+ healthcare executives who start their day with Becker's").

---

## Font Substitution — IMPORTANT

The brand boards show a serif display face + a humanist sans. **No font files were provided.** I've substituted:

| Brand slot | Substitute (Google Fonts) | Notes |
|---|---|---|
| Display serif (headlines) | **Noto Serif** | Per client guidance. Clean editorial serif with strong weight range; pairs well with the sans for the serif/sans contrast the brand uses. |
| UI sans (body / nav / meta) | **Fira Sans** | Per client guidance. Humanist sans with a strong weight range and good screen rendering at small sizes. |

**Ask:** If Becker's uses a licensed serif (e.g. a custom cut, Freight Text, Chronicle) or a different sans (e.g. a proprietary Sentinel/Proxima), please drop the `.woff2` files into `fonts/` and I'll wire up `@font-face` and remove the Google Fonts `@import`.

---

## Content Fundamentals

**Voice: Authoritative, concise, news-wire.** Becker's writes *about* healthcare leaders *for* healthcare leaders — it is not explanatory journalism, it is industry trade reporting. Every piece is written as if the reader already runs a hospital.

**Person & address**
- **Third person throughout.** Articles are reported, not written as "I" or "we". No direct "you" in body copy.
- Direct address ("you") only appears in marketing surfaces and email subject lines.
- Executives are named, titled, and tied to a system on first mention: *"Mark Cuban, founder of Cost Plus Drugs…"*, *"Dr. Jane Doe, chief medical officer of Providence…"*.

**Casing**
- Headlines use **sentence case**, not title case. Example from the boards:
  - "Maryland's first new med school in 100 years approved for inaugural class"
  - "Why 40% of hospitals are still losing money, according to CFOs"
- Nav labels, buttons, CTAs: **Title Case** ("Subscribe", "View All Webinars", "More Newsletters").
- Kickers / category tags: **UPPERCASE**, tight tracking, in red.

**Headline patterns (observe on site)**
- Numbered list leads: *"34 recent hospital, health system executive moves"*, *"8 systems restructuring C-suites in 2026"*.
- Attribution colons: *"Highest-earning execs at HCA, Tenet, UHS and CHS"*, *"Days cash on hand at 50 health systems"*.
- Named-executive leads: *"Providence's physician chief on its 'holistic' approach to value-based care"*.
- Short, specific, *number-dense* — no clickbait "you won't believe" constructions.

**Body copy**
- Reporter-style lede: who/what/where in the first two sentences.
- Short paragraphs (1–3 sentences). Lots of whitespace.
- AP-style numbers, dates, titles. Locations abbreviated (*"Hagerstown, Md."*, *"Little Rock, Ark."*).
- Sign-off: `By: Firstname Lastname` + relative timestamp (`2 days ago`) or dated (`Wednesday, April 15th, 2026`).

**Tone words** — *professional, trusted, engaging* (from the board), plus: measured, executive, informed. **Not**: playful, snarky, casual, exclamatory.

**Emoji: Never.** No emoji appear anywhere on the site or boards. Do not add them.

**Unicode glyphs: sparingly** — en-dashes for date ranges (`Apr 13 – 16, 2026`), ampersands in section labels (`Leadership & Management`, `Transactions & Valuation`), straight-quote-free apostrophes (`Becker's`, `Hospital Review's`).

---

## Visual Foundations

**Color vibe.** A tight palette of **deep navy + crimson red** on **cool-tinted white**. Navy (`#091F3E`) is the identity color — it carries the icons, the mastheads, the nav. Red (`#9A1B2A`–`#C41E3A`) is reserved for the wordmark, kickers, links, and "Subscribe" CTAs — it's *accent*, not decoration. Neutrals are cool, not warm; no beige, no cream.

**Type.** Editorial serif for every headline ("Heading" specimen on the boards is a chunky, high-contrast serif — PT Serif is the substitute). Sans-serif for body, nav, kickers, meta, UI. The serif/sans contrast is the whole typographic identity — do not replace headlines with sans.

**Backgrounds.** White or `#F5F8FC` (ice-tinted) for content. Deep navy (`#091F3E` → `#061733`) for event cards, deck cover panels, and footer. **No gradients, no hand-drawn illustrations, no repeating patterns, no textures.** Full-bleed photography is used for article hero images only — real healthcare/executive photography, never illustration.

**Imagery.** Editorial photojournalism — real hospitals, real executives, real cityscapes. Color-wise: natural, slightly desaturated, no heavy filter. Occasional staged photo illustration (the board shows a pink background with a pill-collage cross — that treatment is editorial-feature level, used sparingly).

**Borders.** 1px hairlines in `--bh-gray-200` or `--bh-ice-200`. Dividers are horizontal rules between stacked items (see the article list on the boards). On navy surfaces: `rgba(255,255,255,0.12)`.

**Shadows.** Minimal. `--shadow-sm` on raised nav/sticky elements; `--shadow-md` on hover for cards. **No** soft glowing halos, no 30px blurred drop-shadows. Becker's is an editorial surface — shadows exist to lift interactive elements, not to decorate.

**Corner radii.** **Largely square.** Cards are square-cornered or 2–4px. Tags and pills get `--radius-pill`. CTA buttons use `--radius-sm` (4px). This is a *print-publication* feel, deliberately low on roundness.

**Layout rules.**
- Two- and three-column editorial grids on web.
- Top nav is a full-width bar with site-switcher row above (BHR · Clinical · Health IT · CFO · ASC · Spine · Dental · Payer · Behavioral · Physician).
- The logo sits top-left, red `Subscribe` button top-right.
- Generous horizontal rules between stacked article cards.
- Section headers (`## Most Read`, `## Upcoming Events`) use serif + a thin red underline.

**Cards.** Square corners, 1px hairline border or no border + white bg on tinted page. Image on top, kicker (red, uppercase), then serif headline, then byline + timestamp. **No** drop-shadow on normal state.

**Hover states.**
- Links: **darken** to `--bh-red-700` → `--bh-red-600` and **underline**.
- Cards: headline shifts from navy-900 to red; no scale transform.
- Buttons (solid red): `--bh-red-800` → `--bh-red-700`.
- Nav items: underline appears beneath label.

**Press states.** Slight darken (`--bh-red-900` for red CTAs). **No** shrink transform — this is not a consumer app.

**Animation.** Minimal. `transition: color .15s ease; transition: background-color .15s ease`. No bounces, no entrance animations, no parallax. This is a newsroom — content loads and is read.

**Transparency / blur.** Used only for the "Subscribe" newsletter CTA overlay on article pages and for the sticky subscribe bar. Subtle `backdrop-filter: blur(8px)` on sticky bars over content. Otherwise opaque.

**Fixed elements.** Top nav bar can be sticky. A small "Subscribe Today" pill pins bottom-right on article pages (see board 2 — the small red pill under the avatar).

**Inverse surfaces.** Deep navy (`--bh-navy-800` → `--bh-navy-900`) is used for: event cards, footer, the "Professional · Trusted · Engaging" hero on brand collateral, and newsletter cover bands. Text on inverse is white; accent is `--bh-ice-200` or red.

---

## Iconography

**System in use:** the live site uses a small set of custom SVG icons (single-color, `#091F3E` navy fill, `~24×24`, rounded inside the glyph but with clean geometric outer shapes). I've copied the four confirmed icons the homepage uses into `assets/icons/`:

- `events.svg` — calendar with tick marks
- `webinars.svg` — screen + sound waves
- `whitepapers.svg` — stacked pages
- `podcasts.svg` — microphone

**Style rules:**
- Single-color fill in `--bh-navy-800` (never red — red is reserved for the wordmark and links).
- Filled shapes with selective cutouts (not stroked-outline icons).
- Size rendered at 24px, 32px, or 48–64px on the "Becker's offerings" tiles.
- Always paired with a sans-serif label below.

**When you need an icon not in the set:** use **Lucide** icons (CDN: `https://unpkg.com/lucide-static@latest/icons/<name>.svg`) as a substitute — their geometric filled variants are the closest stylistic match. Override fill to `var(--bh-navy-800)`. **Flag the substitution** in any deliverable.

**Emoji:** never. **Unicode glyphs as icons:** never — use real SVGs.

---

## How to use this system (for agents and humans)

1. `@import` or `<link>` `colors_and_type.css` at the top of any HTML file.
2. Pull logos from `assets/logos/`, icons from `assets/icons/`.
3. Reference `ui_kits/bhr-web/` components for web surfaces and `ui_kits/newsletter/` for email.
4. Match voice: third-person, sentence-case headlines, no emoji, reporter-style.
5. Keep corners square, colors restrained, shadows minimal. When in doubt: **more editorial, less app**.
