import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

export type SeedPost = {
  slug: string;
  title: string;
  excerpt: string;
  categories: string[];
  cover: string;
  content: string;
};

/** Reads content/posts/*.md (simple `key: value` front matter). */
export function loadSeedPosts(dir = path.join(process.cwd(), "content/posts")): SeedPost[] {
  return readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .map((file) => {
      const raw = readFileSync(path.join(dir, file), "utf8");
      const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
      if (!match) throw new Error(`${file}: missing front matter`);
      const meta: Record<string, string> = {};
      for (const line of match[1].split("\n")) {
        const i = line.indexOf(":");
        if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
      }
      return {
        slug: file.replace(/\.md$/, ""),
        title: meta.title,
        excerpt: meta.excerpt ?? "",
        categories: (meta.categories ?? "").split(",").map((c) => c.trim()).filter(Boolean),
        cover: meta.cover ?? "",
        content: match[2].trim(),
      };
    });
}
