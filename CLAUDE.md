# CLAUDE.md — Valtiare (valtiare.com)

## Project Overview

Valtiare is a dark whimsical ("whimsydark") art and fiction universe. The site is the home of the Valtiare universe — a sprawling cosmology of multiple timelines, planets, and dimensions, all under one name. Whether "Valtiare" is a character, a place, or something more abstract is intentionally unresolved.

The site showcases finished artwork — painted miniatures, sculpted models, dioramas, scenes, watercolor and ink drawings, maps, and more — alongside the short fiction that lives in and around that art. **Art leads. Stories support the art.** When someone lands on a piece, the visuals hit first.

Content comes in two forms:
1. **Illustrated stories** — finished artwork (photos, scans, video turnarounds) paired with short fiction. The art is primary; the story weaves through and around it.
2. **Lore entries** — pure text worldbuilding pieces (history, cosmology, cultures, timelines) with no artwork.

There is no AI-generated art anywhere on this site. All artwork is handmade by Matt across physical and traditional media.

This site ties into Matt's broader creative ecosystem (The Hobbinomicon, miniature painting, tabletop gaming) but stands entirely on its own as the canonical home of the Valtiare universe.

## Tech Stack

- **Framework:** Astro (latest stable)
- **Styling:** Tailwind CSS
- **Content:** MDX via Astro Content Collections
- **Hosting:** Netlify
- **DNS:** Cloudflare
- **Domain:** valtiare.com

### Why Astro

- First-class MDX content collections with typed frontmatter schemas
- Zero client JS by default — keeps the site fast, lets the art load quickly
- Island architecture for interactive components (lightbox, filters)
- Matt already knows the framework
- Perfect Netlify integration

## Content Architecture

All content lives in `src/content/` as MDX files.

### Posts (`src/content/posts/`)

The primary content type. Every post is either an illustrated story or a lore entry.

Frontmatter schema:

```yaml
title: string (required)
slug: string (auto-generated from filename if omitted)
description: string (required) # blurb for cards/previews/meta
date: date (required) # publication date
updated: date (optional) # last revision date

# Content classification
type: "illustrated-story" | "lore" # determines layout behavior
storyType: "vignette" | "short-story" | "flash-fiction" | "chapter" (optional) # only for illustrated stories
tags: string[] # flexible tagging: genre, mood, medium, etc.

# Universe placement
timeline: string (optional) # timeline key, e.g. "age-of-ash", "the-sundering"
planet: string (optional) # planet/realm key
dimension: string (optional) # dimensional plane key
arc: string (optional) # narrative arc/series key
arcOrder: number (optional) # position within an arc

# Relationships
characters: string[] (optional) # character slugs referenced in this post
locations: string[] (optional) # location slugs referenced in this post

# Art (illustrated stories only)
heroImage: string (required for illustrated-story) # primary artwork — the first thing visitors see
heroImageAlt: string (required if heroImage set)
medium: string[] (optional) # art medium tags, e.g. ["painted-miniature", "diorama", "watercolor", "ink", "sculpture", "map"]
gallery: # additional images beyond the hero
  - src: string
    alt: string
    caption: string (optional)
    width: number (optional) # for layout hints
    height: number (optional)
galleryLayout: "grid" | "masonry" | "sequential" | "lightbox" (optional, default "sequential")
# "grid" — uniform grid, good for multiple similar shots (e.g. mini from different angles)
# "masonry" — mixed sizes, good for varied media/dimensions
# "sequential" — images flow with the story text (default, most flexible)
# "lightbox" — grid thumbnails that open full-res in overlay
hasVideo: boolean (optional, default false)
videoUrl: string (optional) # YouTube/Vimeo embed for turnaround videos

# Reading
readingTime: number (auto-calculated at build time)
status: "published" | "draft"
```

### Characters (`src/content/characters/`)

```yaml
name: string (required)
slug: string (auto-generated from filename if omitted)
epithet: string (optional) # e.g. "The Bearer of the Pale Stone"
description: string (required) # short intro
timeline: string (optional)
planet: string (optional)
dimension: string (optional)
portrait: string (optional) # character portrait image path
portraitAlt: string (optional)
status: "active" | "deceased" | "unknown" | "eternal"
tags: string[]
```

MDX body contains the full character profile/lore.

### Locations (`src/content/locations/`)

```yaml
name: string (required)
slug: string (auto-generated from filename if omitted)
description: string (required)
locationType: "planet" | "realm" | "city" | "region" | "dimension" | "landmark" | "ruin"
timeline: string (optional) # if location is timeline-specific
planet: string (optional) # parent planet if this is a sub-location
dimension: string (optional)
coverImage: string (optional)
coverImageAlt: string (optional)
mapImage: string (optional) # if there's a map of this location
tags: string[]
```

### Timelines (`src/content/timelines/`)

```yaml
name: string (required)
slug: string (auto-generated from filename if omitted)
description: string (required)
order: number (optional) # chronological sort order within the cosmology
coverImage: string (optional)
coverImageAlt: string (optional)
tags: string[]
```

### Content Relationships

- Posts reference characters and locations by slug
- Posts are placed in the universe via timeline, planet, dimension fields
- Posts can belong to narrative arcs (ordered)
- Characters and locations reference their timeline/planet/dimension
- All relationships resolve at build time to generate cross-links
- Tags provide the flexible secondary navigation layer

### Image Assets

- Post artwork: `public/images/posts/[post-slug]/`
- Character portraits: `public/images/characters/`
- Location art: `public/images/locations/`
- Maps: `public/images/maps/`
- UI/brand assets: `public/images/ui/`

**Image formats:** High-res photos (JPG/PNG), digital scans, video embeds (YouTube/Vimeo for turnarounds). Use Astro's `<Image>` component for optimization. Serve multiple sizes via srcset for responsive loading. All images must have alt text.

**No AI-generated art.** Every image on the site is handmade.

## Site Structure & Pages

### Landing Page (`/`)

Art-forward. This page should feel like stepping into the universe.

- Full-bleed hero showcasing a signature piece of artwork with atmospheric overlay text
- Brief atmospheric intro to the Valtiare universe (1-2 sentences, not an essay)
- Featured/pinned post (most impressive or most recent illustrated story)
- Recent posts grid — art-forward cards where the image dominates
- Teaser links to explore by narrative arc, timeline, or tags
- The landing page should feel like a gallery entrance, not a blog homepage

### Posts Archive (`/stories/`)

Note: URL uses "stories" for visitor-friendly naming even though the content type is "posts."

- Art-forward card grid — large thumbnails dominate, text is secondary
- Filter by: tags, timeline, planet, dimension, medium, arc, content type (illustrated/lore)
- Sort by: date (default), reading time
- Cards show: hero image (large), title, description snippet, medium tags, reading time
- Lore entries (no art) get a distinct card style — text-focused with an ornamental border instead of an image

### Post Page (`/stories/[slug]`)

**For illustrated stories (art + fiction):**
- Hero image: full-width or near-full-width, the first thing you see
- Title and metadata bar below the hero (date, reading time, medium, tags, universe placement)
- Story content flows with art — the layout depends on `galleryLayout`:
  - **Sequential (default):** Images appear inline at full or large width as the story unfolds. Text wraps around and between images. This is the editorial magazine feel.
  - **Grid:** Image grid section (e.g. 2x2, 3-column) above or within the story. Good for showing a mini from multiple angles.
  - **Masonry:** Mixed-size image layout for varied media. Good for posts mixing photos, scans, and drawings.
  - **Lightbox:** Thumbnail grid that opens high-res images in an overlay. Good for detail-heavy work.
- Video embed section if `hasVideo` is true (turnaround videos for sculptures/minis)
- Character cards for referenced characters
- Arc navigation (prev/next) if part of a series
- Related posts (same arc, same characters, same tags, same universe region)

**For lore entries (text only):**
- No hero image — instead, an atmospheric header with ornamental styling and the title
- Full prose layout optimized for reading (max-width ~680px, generous line height)
- Universe placement metadata (timeline, planet, dimension)
- Cross-links to related characters, locations, and posts
- Ornamental dividers between sections

### Characters Index (`/characters/`)

- Portrait grid — art dominates
- Name and epithet below portrait
- Filter by timeline, planet, dimension, tags
- Characters without portraits get a stylized placeholder (ornamental frame with name)

### Character Page (`/characters/[slug]`)

- Large portrait
- Name, epithet, status
- MDX body (full lore profile)
- Universe placement (timeline, planet, dimension)
- All posts featuring this character, displayed as art-forward cards

### Locations Index (`/locations/`)

- Card grid with cover images/maps
- Filter by type (planet, realm, city, etc.), timeline, dimension
- Location hierarchy hinted at visually (planets are larger cards, sub-locations are smaller)

### Location Page (`/locations/[slug]`)

- Cover image and/or map
- MDX body (description, history, lore)
- All posts set in this location
- All characters associated with this location
- Sub-locations if applicable

### Universe Explorer (`/universe/`)

The narrative-first navigation hub. This is where visitors go to understand the shape of the cosmology.

- Visual overview of timelines (horizontal or vertical timeline visualization)
- Planets/dimensions as navigable nodes
- Narrative arcs displayed as story threads visitors can follow
- This page can start simple (organized lists with ornamental styling) and evolve into something more interactive later
- Think "world bible table of contents" — not a wiki, but a curated guided entry point

### About (`/about`)

- Author bio
- "Everything here is handmade" — emphasize the craft
- Connection to broader creative work (Hobbinomicon, miniatures, tabletop gaming)
- No outbound social media links (mattglbrt.com hub handles that)

## Design System

### Aesthetic: Whimsydark / Dark Whimsical

Not pure grimdark — there's wonder and strangeness alongside the darkness. Think: a candlelit cabinet of curiosities, an illuminated bestiary found in a collapsed library, fairy tales told by someone who's seen too much. Dark but with warmth. Eerie but inviting. Grim but beautiful.

The art is the star. The design should frame and elevate the artwork, never compete with it.

### Color Palette

**Primary Background:** Deep warm black — `#0e0d0b` to `#14130f`
**Surface/Cards:** Dark warm brown-black — `#1b1915` to `#231f1b`
**Text Primary:** Warm parchment — `#d4c9a8` to `#e0d5b5`
**Text Secondary/Muted:** Weathered stone — `#7a7468` to `#8a8074`
**Accent Primary:** Deep berry / muted crimson — `#7a2e3b` to `#943548`
**Accent Secondary:** Tarnished gold / antique brass — `#8a7635` to `#a68d42`
**Accent Tertiary:** Deep forest / verdigris — `#3a5a4a` to `#4a6b58` (the whimsical touch)
**Border/Dividers:** Dark iron — `#2a2826` to `#3a3835`
**Hover/Glow:** Warm candlelight — `rgba(166, 141, 66, 0.12)`
**Image borders/frames:** Aged brass — `#6b5d3e` with dark inner shadow

### Typography

**Design reference:** The typography is inspired by classic 1980s RPG game manuals — specifically the Wizardry: Proving Grounds of the Mad Overlord manual aesthetic. Bold, confident serif headings with a thin horizontal rule underneath, paired with a warm, highly readable old-style serif body.

- **Headings (h1/h2):** Bold old-style serif. Use **Sorts Mill Goudy** (Google Fonts — a direct revival of Goudy Old Style) in bold/700 weight, or **EB Garamond** bold as fallback. Uppercase or title case. Centered on lore pages; left-aligned on illustrated story pages. Every h1/h2 gets a **thin horizontal rule** directly beneath it (1px, tarnished gold `#8a7635`, ~60-80% of heading width, centered under the text). This heading + rule pattern is a core visual signature of the site.
- **Subheadings (h3-h4):** Same font family (Sorts Mill Goudy or EB Garamond) at regular weight, slightly smaller. No rule underneath. Distinguishes from h1/h2 by weight and size, not by font change.
- **Body text:** **Sorts Mill Goudy** regular weight or **EB Garamond** regular (400). These are warm, readable old-style serifs with the classic RPG manual feel. 18px+ base size, 1.7-1.8 line height. Reading comfort is the absolute priority — these are long-form stories.
- **UI/metadata:** Clean sans-serif. "Inter" or "Source Sans 3". Tags, dates, reading time, filters. Small, understated — never competes with the serif prose.
- **Font loading:** Self-host or use Google Fonts with `display=swap`. Preload the heading font weight.

**Layout dimensions:**
- Max prose width: ~680px
- Max image width: wider than prose — ~900-960px or full-bleed depending on layout
- Generous whitespace around images — let the art breathe

### Illustrated Column Borders

**Design reference:** Inspired by the Wizardry manual page layout — illustrated stone columns with creeping vines that frame the text content on the left and right sides.

This is a signature visual element of the site. On **lore entry pages** and optionally on the **Universe Explorer** page, the prose content is framed by decorative illustrated column borders that run vertically along both sides of the text.

**Implementation approach:**
- The columns are SVG or PNG assets placed as `position: sticky` or `background-image` elements on either side of the content column.
- The column art should be built in sections: a **top cap** (capital/gargoyle/ornamental top), a **repeating middle segment** (the shaft with vines/moss/cracks that tiles vertically), and a **bottom base** (pedestal/foundation).
- The top cap and bottom base are fixed-height. The middle segment repeats via `background-repeat: repeat-y` or by programmatically stacking SVG segments, allowing the columns to **grow with the content length**.
- The columns sit outside the prose max-width, flanking the text. On desktop, the full effect is visible. On tablet, the columns may be partially visible or reduced in opacity. On mobile, the columns are hidden entirely to preserve reading space.
- The column art style: **weathered stone with organic overgrowth** — vines, moss, small roots, cracks. Whimsydark tone: not pristine classical columns, but ancient ones being slowly reclaimed by nature. Small details like a tiny skull, a carved rune, a perched moth, or a glowing fungus in the cracks add character.
- Color palette for the column art should be muted and integrated with the background — dark stone grays, mossy greens (`#3a5a4a`), faint warm highlights. They frame the content without competing with it.

**Where to use columns:**
- **Lore entry pages:** Always. These text-only pages benefit most from the framing.
- **Universe Explorer page:** Yes, to reinforce the "ancient tome" feeling.
- **Illustrated story pages:** No. The art is the visual focus; columns would compete.
- **Index/archive pages:** No. Card grids need the full width.
- **Landing page:** Optional — could frame the introductory text section only.

**Responsive behavior:**
- Desktop (1024px+): Full column borders visible on both sides
- Tablet (768-1023px): Columns fade to ~30% opacity or show only inner edge details
- Mobile (<768px): Columns hidden entirely; the heading + rule pattern carries the aesthetic alone

**Asset creation notes:**
- Column art will need to be created as actual artwork (SVG preferred for scalability, PNG fallback for complex illustrated detail)
- Placeholder for v1: simple CSS/SVG geometric columns (straight lines with subtle texture) that can be replaced with illustrated art later
- The column assets live in `public/images/ui/columns/` — `column-left-top.svg`, `column-left-mid.svg`, `column-left-base.svg` (and mirrored for right)

### Art Presentation

**This is the most important design consideration.** The site exists to showcase art.

- **Hero images:** Large. Full-width or near-full-width. High quality. Set the tone for every illustrated post.
- **Inline images:** Wider than the prose column. Break out of the text max-width to command attention.
- **Image frames:** Subtle. Thin aged-brass border and faint drop shadow. The art IS the frame. Optional ornamental corners on key pieces.
- **Lightbox:** Smooth dark overlay. High-res zoom. Arrow navigation. Close on background click or escape. Minimal chrome.
- **Video embeds:** Responsive aspect ratio. Muted frame styling consistent with image frames.
- **Image loading:** Blur-up placeholder or skeleton shimmer. Art-heavy pages need graceful progressive loading.
- **Captions:** Small, muted text. Optional. Below the image, never overlaying.

### Textures & Atmosphere

- Subtle noise/grain overlay on backgrounds (CSS/SVG)
- Faint warm vignetting on page edges
- Ornamental dividers between sections — iron rules with small decorative SVG elements (thorns, moons, small skulls, botanical elements — the whimsydark touch)
- NO bright colors, NO neon, NO tech-feeling gradients
- Subtle warmth — the darkness should feel inhabited, not sterile
- Consider faint particle effect on landing page (floating dust motes or drifting embers) — CSS only, performant

### Cards & Containers

**Post cards (illustrated stories):**
- Image-dominant. Hero image takes up 60-70% of the card.
- Title overlaid on a dark gradient at bottom, or below image with minimal spacing.
- Medium tags as small pills (e.g. "painted miniature", "diorama")
- Reading time and date in muted text
- Hover: subtle warm glow, image slight scale-up

**Post cards (lore entries):**
- No image. Ornamental border frame, title in display font, description excerpt.
- Distinct from illustrated cards at a glance.
- Hover: border glow

**Character cards:** Portrait-dominant, name + epithet below, hover warm glow.
**Location cards:** Cover image/map thumbnail, name + type, hover warm glow.

### Buttons & Interactive

- Primary: deep berry/crimson with parchment text
- Secondary: iron with parchment text
- Tag pills: dark surface, muted text, warm border on hover
- Filter controls: dark, understated, functional
- All interactive elements: 44px minimum touch target

### Responsive Design

- Mobile-first
- Images scale gracefully — hero images remain impactful on mobile
- Cards stack single-column on mobile
- Gallery grids adapt (3-col → 2-col → 1-col)
- Navigation collapses to hamburger
- Lightbox is touch-friendly (swipe between images)

### Dark Mode Note

This IS the dark mode. No light mode. No toggle. The entire identity is dark.

## Reader / Viewer Features

### Reading Time Estimates
- Auto-calculate from word count at build time (~238 wpm)
- Display on cards and post pages
- Format: "X min read"

### Tags & Filtering
- Tags on cards and post pages, clickable to filter archive
- Vocabulary: genre/mood (grimdark, whimsical, eerie, tragic, mythic), medium (painted-miniature, diorama, watercolor, ink, sculpture, map, mixed-media), content (vignette, short-story, lore, chapter)
- Universe metadata (timeline, planet, dimension) also filterable

### Font Size Toggle
- Small / medium / large on post pages
- Persist in localStorage
- Minimal UI in post header

### Gallery / Lightbox
- Client-side island component
- Dark overlay, high-res images, arrow nav, swipe on mobile
- Keyboard accessible (arrows, escape)
- Preload adjacent images

## Navigation

### Main Nav
- **Valtiare** wordmark/logo (links home)
- Stories (→ `/stories/`)
- Characters (→ `/characters/`)
- Locations (→ `/locations/`)
- Universe (→ `/universe/`)
- About (→ `/about`)

### Footer
- Minimal. Copyright. "All artwork handmade by Matt Gilbert." No social links.

## SEO & Meta

- Open Graph + Twitter Card meta on all pages
- og:image from heroImage (illustrated) or branded fallback (lore)
- Titles: "Post Title — Valtiare"
- Canonical URLs, sitemap, RSS feed (`/rss.xml`)
- Schema.org article structured data where applicable

## Performance

- Lighthouse 95+ target
- Image optimization via Astro Image (srcset, WebP/AVIF, lazy loading)
- Preload hero images and display fonts
- Lightbox/filters as Astro islands (client:visible)
- Minimal JS footprint

## Development Conventions

- Astro Content Collections with Zod schemas
- Components: `src/components/`, Layouts: `src/layouts/`, Pages: `src/pages/`, Utils: `src/utils/`
- Small, single-purpose components
- Tailwind utilities first, `@apply` sparingly
- Conventional commits: feat:, fix:, content:, style:, art:

## Out of Scope (v1)

- Comments or user accounts
- Newsletter signup
- CMS integration
- E-commerce
- Analytics (add Plausible/Fathom later)
- Search (add Pagefind later)
- Light mode
- Sound/ambient audio
- AI-generated art (never)
- Interactive maps (v2 consideration)
- Social media links

## File Structure

```
valtiare/
├── CLAUDE.md
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
├── netlify.toml
├── public/
│   ├── images/
│   │   ├── posts/
│   │   │   └── [post-slug]/
│   │   ├── characters/
│   │   ├── locations/
│   │   ├── maps/
│   │   └── ui/
│   │       ├── columns/  # column border art (top, mid, base for left and right)
│   │       └── dividers/ # ornamental divider SVGs
│   └── fonts/
├── src/
│   ├── content/
│   │   ├── config.ts
│   │   ├── posts/
│   │   ├── characters/
│   │   ├── locations/
│   │   └── timelines/
│   ├── components/
│   │   ├── PostCard.astro
│   │   ├── LoreCard.astro
│   │   ├── CharacterCard.astro
│   │   ├── LocationCard.astro
│   │   ├── Gallery.astro
│   │   ├── Lightbox.astro (client island)
│   │   ├── VideoEmbed.astro
│   │   ├── TagList.astro
│   │   ├── TagFilter.astro (client island)
│   │   ├── ArcNav.astro
│   │   ├── ReadingTime.astro
│   │   ├── FontSizeToggle.astro (client island)
│   │   ├── RelatedPosts.astro
│   │   ├── UniverseMeta.astro
│   │   ├── OrnamentalDivider.astro
│   │   ├── ColumnFrame.astro
│   │   └── ImageFrame.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── IllustratedStoryLayout.astro
│   │   ├── LoreLayout.astro
│   │   ├── CharacterLayout.astro
│   │   └── LocationLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── stories/
│   │   │   ├── index.astro
│   │   │   └── [...slug].astro
│   │   ├── characters/
│   │   │   ├── index.astro
│   │   │   └── [...slug].astro
│   │   ├── locations/
│   │   │   ├── index.astro
│   │   │   └── [...slug].astro
│   │   ├── universe/
│   │   │   └── index.astro
│   │   └── rss.xml.ts
│   ├── utils/
│   │   ├── readingTime.ts
│   │   ├── collections.ts
│   │   └── universe.ts
│   └── styles/
│       └── global.css
└── .gitignore
```

## Placeholder Content

When scaffolding, create sample content so the full system is testable:

- 2 illustrated story posts (with placeholder images — dark atmospheric stock photos or solid dark rectangles with labels)
- 1 lore entry post (text only)
- 2 characters with placeholder portraits
- 2 locations (1 planet, 1 sub-location)
- 1 timeline
- Wire up relationships between them

Use whimsydark themed placeholder text — NOT lorem ipsum. Placeholder stories should read like actual vignettes. This helps evaluate whether the design serves the content.

## Notes for Claude Code

- **Art is primary.** Every design decision should ask: "Does this make the artwork look incredible?" If a layout choice diminishes the art, it's wrong.
- The design should feel handcrafted and atmospheric — like the site itself is an artifact from the Valtiare universe.
- When in doubt: dark, warm, restrained, wonder-tinged.
- Image loading performance is critical — optimize aggressively.
- Mobile matters — social media traffic means primarily mobile visitors.
- The whimsydark tone means beauty in the darkness. Not just grim — also strange, wondrous, melancholic, and occasionally playful in a twisted way.
- Ornamental elements should feel organic — illuminated manuscripts, apothecary labels, old cartography. Not corporate fantasy.
