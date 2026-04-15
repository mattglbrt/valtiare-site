# Valtiare

Handmade art and short fiction by Matt Gilbert. Built with Astro, Tailwind, and MDX. Deployed on Netlify from this repo's `master` branch.

---

## Local dev

```sh
npm install          # first time
npm run dev          # dev server with hot reload (usually on :4321)
npm run build        # production build to ./dist
npm run preview      # serve the built output locally
```

**If the dev server gets weird after heavy content edits:** nuke Astro's caches and restart.

```sh
rm -rf node_modules/.astro .astro dist && npm run dev
```

This also fixes the "images not updating" and "deleted entries still showing up" classes of bug — Astro persists a content data store at `node_modules/.astro/data-store.json` that can go stale.

---

## Image sizing reference

Astro's image pipeline converts every source image to WebP (and sometimes AVIF) at multiple resolutions automatically. **You never need to pre-convert or pre-resize.** Give it the biggest sensible source, and Astro will generate the `srcset` for every surface that uses it.

### Universal rules

- **Format:** JPEG for photographs, PNG only if you need lossless (line art with text, sharp edges). Don't pre-convert to WebP/AVIF — Astro does it.
- **Quality:** JPEG at ~85%. Above that, diminishing returns; file size doubles for almost no visible gain.
- **Color profile:** sRGB. Adobe RGB and Display P3 can shift on browsers.
- **Size:** Source can be bigger than the target. Astro downscales, never upscales. Err toward bigger.
- **Aspect ratio is enforced** on most slots via CSS `object-cover` — those slots center-crop. Compose with your subject in the middle third, not at the edges.

### Per-slot targets

| Slot | Target source | Aspect | Notes |
|---|---|---|---|
| **Post hero** (top of every story page) | **2400 × 1350** | **16:9 landscape** | Full viewport width, max 85vh, `object-cover`. Cinematic framing. |
| **Landing featured card** (big card above the grid on `/`) | **2000 × 1000** | **2:1 landscape** | Free aspect, but wide reads best. Inside a max-w-6xl container. |
| **Post cards** (stories archive + landing grid + featured-posts blocks on character/location/arc pages) | **1200 × 720** | **5:3 landscape** | Fixed 5:3. Subject centered. |
| **Character portrait** (detail page, archive grid, inline cards — one source for all three) | **1200 × 1600** | **3:4 portrait** | |
| **Location cover — country / city / region** | **1800 × 1080** | **5:3 landscape** | Full-width cover above the detail header. |
| **Location cover — planet** | **1920 × 1080** | **16:9 landscape** | Renders wider than other locations on the archive grid. |
| **Arc cover** | **1800 × 1080** | **5:3 landscape** | Same slot as country covers. |
| **World map** (inside lore posts) | **~2800 × 2100** or native | free | Current world map is already in the right range. |
| **Favicon** | **512 × 512 SVG** + **180 × 180 PNG** apple-touch-icon | square | Drop at `public/favicon.svg` and `public/apple-touch-icon.png` |

### Social share cards (OG / Twitter)

Any hero image on a post automatically becomes its share card on Facebook, LinkedIn, and Twitter. **Facebook/LinkedIn crop to 1.91:1, Twitter also 1.91:1.** If the miniature sits at the very top or very bottom of a 16:9 hero, the social crop will cut it off.

**Rule of thumb:** Keep the subject in the **middle third** of any hero image. That way you get clean share previews on every platform without needing dedicated OG images.

### Shooting workflow for painted miniatures

If you're using one photo of a miniature in multiple slots (character page + post hero), shoot and edit at **1600 × 2400 (2:3 portrait)**. That serves:

- The character portrait (3:4 crop, loses a small band off top or bottom) ✓
- The post hero (16:9 crop — but this wastes most of the frame)

When you're ready to separate them, shoot **two compositions per miniature**:

1. A **portrait shot** (3:4, 1200 × 1600+) for the character page — tight, dark background, the figure as subject.
2. A **landscape scene shot** (16:9 or 2:1, 2400 × 1350+) for the post hero — the miniature in a scene, with room to breathe around it.

That's when the site really starts to sing.

---

## Content authoring

All reader-facing content lives in `src/content/` as MDX:

```
src/content/
├── posts/          Illustrated stories and lore entries
├── characters/     Character profiles (one folder each)
├── locations/      Countries, cities, regions, planets
└── arcs/           Campaign-driven narrative arcs
```

**To add a post:** create `src/content/posts/<slug>/index.mdx` with the frontmatter from [src/content.config.ts](src/content.config.ts). Set `type: "illustrated-story"` for posts with art or `type: "lore"` for pure worldbuilding. For illustrated stories, `heroImage` and `heroImageAlt` are required.

**To add a character:** `src/content/characters/<slug>/index.mdx`. The `characters:` array on a post references character slugs to thread relationships through the site automatically.

**To add a location:** `src/content/locations/<slug>/index.mdx`. Set `locationType` (planet, country, city, etc.) and optionally `world:` to reference a parent location.

**Images live in `src/assets/`** and are referenced from MDX with relative paths like `../../../assets/characters/Thorek.jpg`. Astro's content schema validates these and the image pipeline processes them at build time.

---

## Deploying

Merging to `master` triggers a Netlify deploy. That's it. `netlify.toml` in the repo root holds the build config.

---

## Tech stack

- **Astro** — static site generator, MDX content collections, image pipeline
- **Tailwind CSS v4** — CSS-first design tokens in `src/styles/global.css`
- **MDX** — rich content in Markdown with embedded components
- **Netlify** — hosting + CDN
- **Cloudflare** — DNS

---

## A note on the design

No light mode. No AI-generated art. No social links in the chrome. Every image is handmade.
