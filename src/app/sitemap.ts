import type { MetadataRoute } from "next";
import { getCategories, getPublishedPosts } from "@/lib/data";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, categories] = await Promise.all([getPublishedPosts(), getCategories()]);
  const u = (p: string) => new URL(p, site.url).toString();
  return [
    { url: u("/"), changeFrequency: "weekly", priority: 1 },
    { url: u("/blog"), changeFrequency: "weekly", priority: 0.8 },
    { url: u("/tools"), changeFrequency: "monthly", priority: 0.8 },
    { url: u("/about"), changeFrequency: "yearly", priority: 0.5 },
    ...posts.map((p) => ({ url: u(`/${p.slug}`), lastModified: p.updatedAt, priority: 0.7 })),
    ...categories.map((c) => ({ url: u(`/${c.slug}`), priority: 0.5 })),
  ];
}
