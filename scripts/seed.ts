/**
 * Seeds Neon with the recovered site structure and the rewritten posts.
 * Safe to re-run: rows are upserted by slug.
 *
 *   npm run db:push   # create tables
 *   npm run db:seed   # load content
 */
import { config } from "dotenv";
config({ path: ".env.local" });
config();

import { sql } from "drizzle-orm";
import { getDb, schema } from "../src/db";
import { seedCategories } from "../src/content/categories";
import { loadSeedPosts } from "../src/content/load-posts";
import { seedTools } from "../src/content/tools";

async function main() {
  const db = getDb();
  const { categories, posts, postCategories, tools } = schema;

  for (const [i, c] of seedCategories.entries()) {
    await db
      .insert(categories)
      .values({ ...c, sortOrder: i })
      .onConflictDoUpdate({
        target: categories.slug,
        set: { name: c.name, description: c.description, image: c.image, sortOrder: i },
      });
  }
  console.log(`categories: ${seedCategories.length}`);

  for (const [i, t] of seedTools.entries()) {
    await db
      .insert(tools)
      .values({ ...t, sortOrder: i })
      .onConflictDoUpdate({
        target: tools.slug,
        set: { name: t.name, url: t.url, logo: t.logo, group: t.group, summary: t.summary, sortOrder: i },
      });
  }
  console.log(`tools: ${seedTools.length}`);

  const seedPosts = loadSeedPosts();
  const known = new Set(seedCategories.map((c) => c.slug));
  for (const [i, p] of seedPosts.entries()) {
    // Stagger dates so the blog has a stable order.
    const publishedAt = new Date(Date.now() - i * 86_400_000);
    const [row] = await db
      .insert(posts)
      .values({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        content: p.content,
        coverImage: p.cover,
        publishedAt,
      })
      .onConflictDoUpdate({
        target: posts.slug,
        set: { title: p.title, excerpt: p.excerpt, content: p.content, coverImage: p.cover, updatedAt: sql`now()` },
      })
      .returning({ id: posts.id });

    await db.delete(postCategories).where(sql`${postCategories.postId} = ${row.id}`);
    const cats = p.categories.filter((c) => known.has(c));
    if (cats.length) {
      await db.insert(postCategories).values(cats.map((categorySlug) => ({ postId: row.id, categorySlug })));
    }
  }
  console.log(`posts: ${seedPosts.length}`);
}

main().then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  },
);
