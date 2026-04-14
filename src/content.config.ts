import { defineCollection, z, reference } from 'astro:content';
import { glob } from 'astro/loaders';

/* ---------------------------------------------------------------------------
   Shared pieces
--------------------------------------------------------------------------- */

const galleryLayout = z
  .enum(['grid', 'masonry', 'sequential', 'lightbox'])
  .default('sequential');

const postStatus = z.enum(['published', 'draft']).default('published');

// Strip trailing /index so folder-based entries get clean slugs.
const stripIndex = ({ entry }: { entry: string }) =>
  entry.replace(/\/index\.(md|mdx)$/i, '').replace(/\.(md|mdx)$/i, '');

/* ---------------------------------------------------------------------------
   Posts — illustrated stories + lore entries
--------------------------------------------------------------------------- */

const posts = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/posts',
    generateId: stripIndex,
  }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        description: z.string(),
        date: z.coerce.date(),
        updated: z.coerce.date().optional(),

        // In-universe date string (free-form, varies by cosmology/calendar)
        inUniverseDate: z.string().optional(),

        type: z.enum(['illustrated-story', 'lore']),
        storyType: z
          .enum(['vignette', 'short-story', 'flash-fiction', 'chapter'])
          .optional(),

        // Universe placement (no timeline — timelines are not reader-facing)
        planet: reference('locations').optional(),
        dimension: z.string().optional(),

        // Arcs are the primary narrative organizing axis.
        // Typically a tabletop campaign's emergent story line.
        arc: reference('arcs').optional(),
        arcOrder: z.number().optional(),

        characters: z.array(reference('characters')).default([]),
        locations: z.array(reference('locations')).default([]),

        heroImage: image().optional(),
        heroImageAlt: z.string().optional(),
        medium: z.array(z.string()).default([]),
        gallery: z
          .array(
            z.object({
              src: image(),
              alt: z.string(),
              caption: z.string().optional(),
              width: z.number().optional(),
              height: z.number().optional(),
            }),
          )
          .default([]),
        galleryLayout,

        hasVideo: z.boolean().default(false),
        videoUrl: z.string().url().optional(),

        status: postStatus,
      })
      .superRefine((data, ctx) => {
        if (data.type === 'illustrated-story') {
          if (!data.heroImage) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ['heroImage'],
              message: 'heroImage is required for illustrated-story posts',
            });
          }
          if (!data.heroImageAlt) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ['heroImageAlt'],
              message: 'heroImageAlt is required when heroImage is set',
            });
          }
        }
      }),
});

/* ---------------------------------------------------------------------------
   Characters
--------------------------------------------------------------------------- */

const characters = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/characters',
    generateId: stripIndex,
  }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      epithet: z.string().optional(),
      description: z.string(),
      planet: reference('locations').optional(),
      dimension: z.string().optional(),
      portrait: image().optional(),
      portraitAlt: z.string().optional(),
      status: z
        .enum(['active', 'deceased', 'unknown', 'eternal'])
        .default('unknown'),
    }),
});

/* ---------------------------------------------------------------------------
   Locations
--------------------------------------------------------------------------- */

const locations = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/locations',
    generateId: stripIndex,
  }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string(),
      locationType: z.enum([
        'planet',
        'realm',
        'city',
        'region',
        'dimension',
        'landmark',
        'ruin',
      ]),
      planet: reference('locations').optional(),
      dimension: z.string().optional(),
      coverImage: image().optional(),
      coverImageAlt: z.string().optional(),
      mapImage: image().optional(),
    }),
});

/* ---------------------------------------------------------------------------
   Arcs — narrative spines, typically campaign-driven
--------------------------------------------------------------------------- */

const arcs = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/arcs',
    generateId: stripIndex,
  }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string(),
      order: z.number().optional(),
      coverImage: image().optional(),
      coverImageAlt: z.string().optional(),
      status: z
        .enum(['ongoing', 'complete', 'hiatus', 'unpublished'])
        .default('ongoing'),
    }),
});

export const collections = { posts, characters, locations, arcs };
