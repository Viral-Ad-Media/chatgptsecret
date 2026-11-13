import Image from "next/image";
import Link from "next/link";
import type { PostWithCategories } from "@/lib/data";

export function PostCard({ post }: { post: PostWithCategories }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg">
      <Link href={`/${post.slug}`} className="relative aspect-[16/9] overflow-hidden bg-night">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap gap-2">
          {post.categories.slice(0, 2).map((c) => (
            <Link key={c.slug} href={`/${c.slug}`} className="text-xs font-semibold tracking-wide text-brand uppercase">
              {c.name}
            </Link>
          ))}
        </div>
        <h3 className="mt-2 font-display text-lg leading-snug font-semibold">
          <Link href={`/${post.slug}`} className="hover:text-brand">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-neutral-600">{post.excerpt}</p>
      </div>
    </article>
  );
}

export function PostGrid({ posts }: { posts: PostWithCategories[] }) {
  if (!posts.length) {
    return <p className="rounded-2xl bg-mist p-8 text-center text-neutral-600">No posts yet.</p>;
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </div>
  );
}
