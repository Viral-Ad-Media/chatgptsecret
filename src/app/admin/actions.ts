"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getDb, schema } from "@/db";
import { getAuth, requireAdmin } from "@/lib/auth";
import { headers } from "next/headers";

const postInput = z.object({
  title: z.string().trim().min(3).max(200),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and dashes"),
  excerpt: z.string().trim().max(400),
  content: z.string(),
  coverImage: z.string().trim().max(500),
  published: z.boolean(),
  categories: z.array(z.string()),
});

export type FormState = { error?: string } | undefined;

const RESERVED = new Set(["admin", "about", "api", "blog", "sign-in", "tools", "sitemap.xml", "robots.txt"]);

function parse(form: FormData) {
  return postInput.safeParse({
    title: form.get("title"),
    slug: form.get("slug"),
    excerpt: form.get("excerpt") ?? "",
    content: form.get("content") ?? "",
    coverImage: form.get("coverImage") ?? "",
    published: form.get("published") === "on",
    categories: form.getAll("categories").map(String),
  });
}

async function slugTaken(slug: string, exceptId?: number) {
  const db = getDb();
  const [cat] = await db.select().from(schema.categories).where(eq(schema.categories.slug, slug)).limit(1);
  if (cat || RESERVED.has(slug)) return true;
  const [post] = await db.select({ id: schema.posts.id }).from(schema.posts).where(eq(schema.posts.slug, slug)).limit(1);
  return !!post && post.id !== exceptId;
}

async function setCategories(postId: number, slugs: string[]) {
  const db = getDb();
  await db.delete(schema.postCategories).where(eq(schema.postCategories.postId, postId));
  if (slugs.length) {
    await db.insert(schema.postCategories).values(slugs.map((categorySlug) => ({ postId, categorySlug })));
  }
}

export async function savePost(id: number | null, _prev: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = parse(form);
  if (!parsed.success) return { error: parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ") };
  const { categories, coverImage, ...data } = parsed.data;

  if (await slugTaken(data.slug, id ?? undefined)) return { error: "That URL slug is already used by a page, post or topic." };

  const db = getDb();
  const values = { ...data, coverImage: coverImage || null, updatedAt: new Date() };
  let postId = id;
  if (id) {
    await db.update(schema.posts).set(values).where(eq(schema.posts.id, id));
  } else {
    const [row] = await db.insert(schema.posts).values(values).returning({ id: schema.posts.id });
    postId = row.id;
  }
  await setCategories(postId!, categories);

  revalidatePath("/", "layout");
  redirect("/admin?saved=1");
}

export async function deletePost(id: number) {
  await requireAdmin();
  await getDb().delete(schema.posts).where(eq(schema.posts.id, id));
  revalidatePath("/", "layout");
  redirect("/admin");
}

export async function signOut() {
  await getAuth().api.signOut({ headers: await headers() });
  redirect("/sign-in");
}
