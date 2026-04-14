import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedPosts } from '../utils/collections';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();

  return rss({
    title: 'Valtiare',
    description:
      'Handmade art and short fiction from the Valtiare universe.',
    site: context.site ?? 'https://valtiare.com',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/stories/${post.id}/`,
    })),
    customData: '<language>en-us</language>',
    stylesheet: false,
  });
}
