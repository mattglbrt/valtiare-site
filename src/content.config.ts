import { defineCollection, z, reference } from 'astro:content';
import { glob } from 'astro/loaders';

/* ---------------------------------------------------------------------------
   Shared pieces
--------------------------------------------------------------------------- */

const galleryImage = z.object({
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});

const galleryLayout = z
  .enum(['grid', 'masonry', 'sequential', 'lightbox'])
  .default('sequential');

const postStatus = z.enum(['published', 'draft']).default('published');

/* ---------------------------------------------------------------------------
   Posts — illustrated stories + lore entries
--------------------------------------------------------------------------- */

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        description: z.string(),
        date: z.coerce.date(),
        updated: z.coerce.date().optional(),

        type: z.enum(['illustrated-story', 'lore']),
        storyType: z
          .enum(['vignette', 'short-story', 'flash-fiction', 'chapter'])
          .optional(),
        tags: z.array(z.string()).default([]),

        timeline: reference('timelines').optional(),
        planet: reference('locations').optional(),
        dimension: z.string().optional(),
        arc: z.string().optional(),
        arcOrder: z.number().optional(),

        characters: z.array(reference('characters')).default([]),
        locations: z.array(reference('locations')).default([]),

        heroImage: image().optional(),
        heroImageAlt: z.string().optional(),
        medium: z.array(z.string()).default([]),
        gallery: z.array(galleryImage).default([]),
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
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/characters' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      epithet: z.string().optional(),
      description: z.string(),
      timeline: reference('timelines').optional(),
      planet: reference('locations').optional(),
      dimension: z.string().optional(),
      portrait: image().optional(),
      portraitAlt: z.string().optional(),
      status: z.enum(['active', 'deceased', 'unknown', 'eternal']).default('unknown'),
      tags: z.array(z.string()).default([]),
    }),
});

/* ---------------------------------------------------------------------------
   Locations
--------------------------------------------------------------------------- */

const locations = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/locations' }),
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
      timeline: reference('timelines').optional(),
      planet: reference('locations').optional(),
      dimension: z.string().optional(),
      coverImage: image().optional(),
      coverImageAlt: z.string().optional(),
      mapImage: image().optional(),
      tags: z.array(z.string()).default([]),
    }),
});

/* ---------------------------------------------------------------------------
   Timelines
--------------------------------------------------------------------------- */

const timelines = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/timelines' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string(),
      order: z.number().optional(),
      coverImage: image().optional(),
      coverImageAlt: z.string().optional(),
      tags: z.array(z.string()).default([]),
    }),
});

export const collections = { posts, characters, locations, timelines };
