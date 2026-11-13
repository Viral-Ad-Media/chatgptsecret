import Image from "next/image";
import Link from "next/link";
import { PostGrid } from "@/components/post-card";
import { getCategories, getPublishedPosts } from "@/lib/data";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [posts, categories] = await Promise.all([getPublishedPosts(6), getCategories()]);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-night text-white">
        <Image src="/images/brand/hero.jpg" alt="" fill priority sizes="100vw" className="-z-10 object-cover object-right opacity-70" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night via-night/85 to-transparent" />
        <div className="mx-auto max-w-6xl px-4 py-24 sm:py-32">
          <p className="text-sm font-semibold tracking-widest text-gold uppercase">Unlock the tools behind the results</p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl leading-tight font-extrabold sm:text-6xl">
            The <span className="text-brand">secret</span> toolkit for growing online with AI
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80">{site.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/blog" className="rounded-full bg-brand px-6 py-3 font-semibold transition hover:bg-brand-dark">
              Read the guides
            </Link>
            <Link href="/tools" className="rounded-full border border-white/30 px-6 py-3 font-semibold transition hover:bg-white/10">
              Browse the tool directory
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold">Latest guides</h2>
            <p className="mt-2 text-neutral-600">Honest roundups of the tools worth your time and money.</p>
          </div>
          <Link href="/blog" className="hidden text-sm font-semibold text-brand hover:underline sm:block">
            All posts →
          </Link>
        </div>
        <div className="mt-8">
          <PostGrid posts={posts} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-20">
        <h2 className="font-display text-3xl font-bold">Explore by topic</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((c) => (
            <Link key={c.slug} href={`/${c.slug}`} className="group relative isolate aspect-[4/3] overflow-hidden rounded-2xl bg-night">
              {c.image ? (
                <Image src={c.image} alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" className="-z-10 object-cover opacity-60 transition duration-500 group-hover:scale-105 group-hover:opacity-75" />
              ) : null}
              <div className="flex h-full flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                <p className="font-display font-semibold">{c.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
