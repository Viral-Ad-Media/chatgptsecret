import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/markdown";
import { PostGrid } from "@/components/post-card";
import { getCategory, getPostBySlug, getPostsInCategory } from "@/lib/data";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

// Posts and categories both live at the site root, matching the old WordPress URLs.
async function resolve(slug: string) {
  const post = await getPostBySlug(slug);
  if (post) return { kind: "post" as const, post };
  const category = await getCategory(slug);
  if (category) return { kind: "category" as const, category };
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const found = await resolve((await params).slug);
  if (!found) return {};
  if (found.kind === "post") {
    const { post } = found;
    return {
      title: post.title,
      description: post.excerpt,
      alternates: { canonical: `/${post.slug}` },
      openGraph: { type: "article", title: post.title, description: post.excerpt, images: post.coverImage ? [post.coverImage] : undefined },
    };
  }
  return { title: found.category.name, description: found.category.description, alternates: { canonical: `/${found.category.slug}` } };
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;
  const found = await resolve(slug);
  if (!found) notFound();

  if (found.kind === "category") {
    const { category } = found;
    const posts = await getPostsInCategory(category.slug);
    return (
      <>
        <section className="relative isolate overflow-hidden bg-night text-white">
          {category.image ? <Image src={category.image} alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-40" /> : null}
          <div className="mx-auto max-w-6xl px-4 py-20">
            <p className="text-sm font-semibold tracking-widest text-gold uppercase">Topic</p>
            <h1 className="mt-2 font-display text-4xl font-extrabold sm:text-5xl">{category.name}</h1>
            <p className="mt-4 max-w-xl text-lg text-white/80">{category.description}</p>
          </div>
        </section>
        <div className="mx-auto max-w-6xl px-4 py-14">
          <PostGrid posts={posts} />
        </div>
      </>
    );
  }

  const { post } = found;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    image: post.coverImage ?? undefined,
  };

  return (
    <article>
      <header className="bg-night text-white">
        <div className="mx-auto max-w-3xl px-4 pt-16 pb-24">
          <div className="flex flex-wrap gap-3">
            {post.categories.map((c) => (
              <Link key={c.slug} href={`/${c.slug}`} className="text-xs font-semibold tracking-widest text-gold uppercase hover:underline">
                {c.name}
              </Link>
            ))}
          </div>
          <h1 className="mt-3 font-display text-4xl leading-tight font-extrabold sm:text-5xl">{post.title}</h1>
          <p className="mt-5 text-lg text-white/80">{post.excerpt}</p>
          <p className="mt-6 text-sm text-white/60">
            Updated {post.updatedAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </header>
      {post.coverImage ? (
        <div className="mx-auto -mt-14 max-w-3xl px-4">
          <div className="relative aspect-[16/8] overflow-hidden rounded-2xl shadow-xl">
            <Image src={post.coverImage} alt="" fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
          </div>
        </div>
      ) : null}
      <div className="mx-auto max-w-3xl px-4 py-12">
        <Markdown>{post.content}</Markdown>
        <div className="mt-16 rounded-2xl bg-mist p-6">
          <p className="font-display font-semibold">Looking for more tools?</p>
          <p className="mt-1 text-sm text-neutral-600">
            Browse all the tools we cover in the <Link href="/tools" className="font-medium text-brand hover:underline">tool directory</Link>.
          </p>
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </article>
  );
}
