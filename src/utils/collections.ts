import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;
export type Character = CollectionEntry<'characters'>;
export type Location = CollectionEntry<'locations'>;
export type Timeline = CollectionEntry<'timelines'>;

const isPublished = (p: Post) => p.data.status !== 'draft';

export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', isPublished);
  return posts.sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
}

export async function getPostsInArc(arc: string): Promise<Post[]> {
  const posts = await getCollection('posts', (p) => isPublished(p) && p.data.arc === arc);
  return posts.sort((a, b) => (a.data.arcOrder ?? 0) - (b.data.arcOrder ?? 0));
}

export async function getPostsForCharacter(slug: string): Promise<Post[]> {
  const posts = await getPublishedPosts();
  return posts.filter((p) => p.data.characters.some((c) => c.id === slug));
}

export async function getPostsForLocation(slug: string): Promise<Post[]> {
  const posts = await getPublishedPosts();
  return posts.filter(
    (p) =>
      p.data.locations.some((l) => l.id === slug) || p.data.planet?.id === slug,
  );
}
