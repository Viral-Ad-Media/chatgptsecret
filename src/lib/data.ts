import "server-only";
import { and, asc, desc, eq, inArray } from "drizzle-orm";
import { getDb, schema } from "@/db";

const { posts, categories, postCategories, tools } = schema;

export type PostWithCategories = schema.Post & { categories: schema.Category[] };

async function attachCategories(rows: schema.Post[]): Promise<PostWithCategories[]> {
  if (!rows.length) return [];
  const links = await getDb()
    .select({ postId: postCategories.postId, category: categories })
    .from(postCategories)
    .innerJoin(categories, eq(postCategories.categorySlug, categories.slug))
    .where(inArray(postCategories.postId, rows.map((r) => r.id)))
    .orderBy(asc(categories.sortOrder));
  return rows.map((r) => ({
    ...r,
    categories: links.filter((l) => l.postId === r.id).map((l) => l.category),
  }));
}

export async function getPublishedPosts(limit?: number) {
  const q = getDb()
    .select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.publishedAt));
  return attachCategories(limit ? await q.limit(limit) : await q);
}

export async function getPostBySlug(slug: string) {
  const [row] = await getDb()
    .select()
    .from(posts)
    .where(and(eq(posts.slug, slug), eq(posts.published, true)))
    .limit(1);
  if (!row) return null;
  const [withCats] = await attachCategories([row]);
  return withCats;
}

export async function getCategories() {
  return getDb().select().from(categories).orderBy(asc(categories.sortOrder));
}

export async function getCategory(slug: string) {
  const [row] = await getDb().select().from(categories).where(eq(categories.slug, slug)).limit(1);
  return row ?? null;
}

export async function getPostsInCategory(slug: string) {
  const rows = await getDb()
    .select({ post: posts })
    .from(posts)
    .innerJoin(postCategories, eq(postCategories.postId, posts.id))
    .where(and(eq(postCategories.categorySlug, slug), eq(posts.published, true)))
    .orderBy(desc(posts.publishedAt));
  return attachCategories(rows.map((r) => r.post));
}

export async function getTools() {
  return getDb().select().from(tools).orderBy(asc(tools.sortOrder));
}

/* Admin */

export async function getAllPostsForAdmin() {
  return attachCategories(await getDb().select().from(posts).orderBy(desc(posts.publishedAt)));
}

export async function getPostById(id: number) {
  const [row] = await getDb().select().from(posts).where(eq(posts.id, id)).limit(1);
  if (!row) return null;
  const [withCats] = await attachCategories([row]);
  return withCats;
}
