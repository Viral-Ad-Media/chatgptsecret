import type { Metadata } from "next";
import { PostGrid } from "@/components/post-card";
import { getPublishedPosts } from "@/lib/data";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Blog",
  description: "Guides and roundups of the best AI, SEO, marketing and business tools.",
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="font-display text-4xl font-extrabold">Blog</h1>
      <p className="mt-3 max-w-2xl text-lg text-neutral-600">
        Practical guides to the software behind modern online businesses, from SEO to email to AI video.
      </p>
      <div className="mt-10">
        <PostGrid posts={posts} />
      </div>
    </div>
  );
}
