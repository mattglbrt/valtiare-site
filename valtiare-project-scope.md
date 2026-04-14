# Valtiare — Project Scope & Build Plan

## What Is This Site?

Valtiare is a whimsydark art and fiction universe at **valtiare.com**. It's the canonical home of the Valtiare cosmology — a multiverse of timelines, planets, and dimensions filled with handmade artwork and the stories behind them.

The artwork comes first: painted miniatures, sculpted models, dioramas, watercolors, ink drawings, maps, and mixed media. Every illustrated post pairs finished art with short fiction — vignettes, stories, and chapters that give the art context and life. Some posts are pure lore (text-only worldbuilding). Together they build a universe.

All art is handmade. No AI-generated images. The site is a gallery, a story archive, and a world bible in one.

---

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Astro | First-class MDX, zero JS default, image optimization, Matt knows it |
| Styling | Tailwind CSS | Fast iteration, good purge, pairs well with Astro |
| Content | MDX in repo | Version controlled, typed Zod schemas, no CMS overhead |
| Hosting | Netlify | Matt's existing platform |
| DNS | Cloudflare | Matt's existing DNS |
| Domain | valtiare.com | — |

---

## Content Model

**Posts** — the core content. Two flavors:
- **Illustrated stories:** Art-forward posts pairing finished artwork with short fiction. Support multiple gallery layouts (sequential, grid, masonry, lightbox) and video turnarounds. Art medium is tagged.
- **Lore entries:** Pure text worldbuilding. History, cosmology, cultures. No artwork.

**Characters** — profiles with portraits, epithets, lore bios. Cross-linked to posts and universe placement.

**Locations** — planets, realms, cities, ruins, dimensions. Typed hierarchy. Cover images and maps.

**Timelines** — ordered eras/ages within the cosmology.

Everything is interconnected: posts reference characters and locations, everything gets placed in the universe (timeline, planet, dimension), and narrative arcs thread stories together.

---

## Navigation Philosophy

**Primary: Narrative-first.** Visitors explore by story arc, timeline, and the curated Universe Explorer page. They follow threads through the cosmology.

**Secondary: Flexible tags.** Genre, mood, medium, content type — browse however you want. Filter the archive by any combination.

---

## Pages

| Page | Route | Purpose |
|------|-------|---------|
| Landing | `/` | Atmospheric entry — hero art, featured post, recent grid |
| Stories Archive | `/stories/` | Filterable art-forward card grid of all posts |
| Post Page | `/stories/[slug]` | Full art + story experience (or lore reading layout) |
| Characters Index | `/characters/` | Portrait grid |
| Character Page | `/characters/[slug]` | Portrait, lore, linked posts |
| Locations Index | `/locations/` | Card grid with cover images/maps |
| Location Page | `/locations/[slug]` | Cover art, lore, linked posts and characters |
| Universe Explorer | `/universe/` | Narrative hub — timelines, arcs, cosmology overview |
| About | `/about` | Author bio, handmade ethos |
| RSS | `/rss.xml` | Post feed |

---

## Design Identity

**Whimsydark.** Not pure grimdark — there's wonder and strangeness alongside the darkness. A candlelit cabinet of curiosities. An illuminated bestiary from a collapsed library. Dark but warm. Eerie but inviting.

**Art is the star.** The design frames and elevates artwork. It never competes. Hero images are full-bleed. Inline images break wider than the prose column. Everything is designed to make the handmade art look incredible.

**One mode: dark.** No light mode. No toggle. The entire identity is dark.

Full design system (colors, typography, textures, art presentation, components) is in `CLAUDE.md`.

---

## Build Phases

### Phase 1 — Foundation

**Goal:** Repo scaffolded, builds, deploys to Netlify. Design system implemented. No real content.

- [ ] Initialize Astro project with Tailwind
- [ ] Configure `netlify.toml`
- [ ] Tailwind config: full whimsydark color palette, font stacks, custom utilities
- [ ] Import and configure fonts (blackletter display, serif body, sans UI)
- [ ] `BaseLayout.astro` with global styles, grain overlay, vignetting
- [ ] Responsive navigation (hamburger on mobile)
- [ ] Footer
- [ ] Ornamental divider component (SVG)
- [ ] Image frame component (aged brass border, shadow)
- [ ] Verify: builds, deploys, feels atmospheric on mobile and desktop

### Phase 2 — Content Collections & Schemas

**Goal:** Content model is working. Placeholder content renders.

- [ ] Zod schemas in `src/content/config.ts` for posts, characters, locations, timelines
- [ ] 2 placeholder illustrated story posts (with dark placeholder images)
- [ ] 1 placeholder lore entry post
- [ ] 2 placeholder characters with portrait placeholders
- [ ] 2 placeholder locations (1 planet, 1 sub-location)
- [ ] 1 placeholder timeline
- [ ] Wire relationships between sample content
- [ ] `readingTime.ts` utility
- [ ] Verify: `astro build` succeeds, all content types resolve, relationships work

### Phase 3 — Post Pages (The Core Experience)

**Goal:** The most important pages on the site work beautifully. Art looks incredible.

- [ ] `IllustratedStoryLayout.astro` — hero image (full-width), title, metadata, art+story flow
- [ ] Gallery component with all four layout modes (sequential, grid, masonry, lightbox)
- [ ] Lightbox island (dark overlay, high-res zoom, arrow nav, swipe, keyboard)
- [ ] Video embed component
- [ ] Image breakout styling (images wider than prose column)
- [ ] Blur-up / shimmer image loading placeholders
- [ ] `LoreLayout.astro` — ornamental header, prose-optimized reading layout
- [ ] Arc navigation (prev/next)
- [ ] Related posts component
- [ ] Character cards (inline, for referenced characters)
- [ ] Universe metadata display (timeline, planet, dimension badges)
- [ ] Font size toggle island
- [ ] Tag list component
- [ ] Ornamental section dividers within posts
- [ ] Verify: illustrated posts are visually stunning, lore posts read beautifully, mobile is solid

### Phase 4 — Archive & Index Pages

**Goal:** All browsing/discovery pages work.

- [ ] Stories archive (`/stories/`) — art-forward card grid
- [ ] Post card component (image-dominant for illustrated, ornamental for lore)
- [ ] Tag/filter island (filter by tags, timeline, planet, dimension, medium, arc, type)
- [ ] Characters index (`/characters/`) — portrait grid with filter
- [ ] Character detail page
- [ ] Locations index (`/locations/`) — card grid with hierarchy hints
- [ ] Location detail page
- [ ] Verify: all cross-links work, filtering works, card layouts are responsive

### Phase 5 — Landing Page, Universe Explorer & Polish

**Goal:** Site feels complete and immersive.

- [ ] Landing page — full-bleed hero art, featured post, recent grid, universe teaser links
- [ ] Universe Explorer (`/universe/`) — timeline visualization, arc threads, cosmology overview
- [ ] About page
- [ ] RSS feed (`/rss.xml`)
- [ ] Open Graph / Twitter Card meta on all pages
- [ ] Sitemap
- [ ] Ambient effects (grain, vignetting, optional dust/ember particles on landing)
- [ ] Cross-browser and mobile testing
- [ ] Image optimization audit (srcset, WebP/AVIF, lazy loading)
- [ ] Lighthouse audit — target 95+
- [ ] Verify: immersive, complete, professional, art looks incredible at every screen size

---

## Future Considerations (Not in v1)

- **Pagefind search** — full-text search across all content
- **Interactive cosmology map** — visual universe explorer with clickable nodes
- **Newsletter** — "new story" notifications
- **Analytics** — Plausible or Fathom
- **Print-friendly story pages** — CSS print styles
- **Audio narration** — optional spoken versions of stories
- **Collections/exhibitions** — curated thematic groupings of posts

---

## Out of Scope (Hard No for v1)

- Comments or user accounts
- CMS
- E-commerce
- Social media links or embeds
- Light mode
- Sound effects
- AI-generated art (never, anywhere, ever)
- Search

---

## Notes

- `CLAUDE.md` in the repo root is the authoritative technical spec — schemas, design system, file structure, conventions.
- Placeholder content should be whimsydark themed, not lorem ipsum.
- Design default: dark, warm, restrained, wonder-tinged.
- If a design choice doesn't make the art look incredible, it's wrong.
