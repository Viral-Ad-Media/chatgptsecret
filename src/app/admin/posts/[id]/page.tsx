import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategories, getPostById } from "@/lib/data";
import { deletePost, savePost } from "../../actions";
import { PostForm } from "../../post-form";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();
  const [post, categories] = await Promise.all([getPostById(id), getCategories()]);
  if (!post) notFound();

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-bold">Edit post</h1>
        <div className="flex items-center gap-3 text-sm">
          <Link href={`/${post.slug}`} className="text-brand hover:underline" target="_blank">View live ↗</Link>
          <form action={deletePost.bind(null, post.id)}>
            <button className="rounded-full border border-red-300 px-3 py-1 text-red-700 hover:bg-red-50">Delete</button>
          </form>
        </div>
      </div>
      <PostForm
        action={savePost.bind(null, post.id)}
        categories={categories}
        initial={{
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          coverImage: post.coverImage ?? "",
          published: post.published,
          categories: post.categories.map((c) => c.slug),
        }}
      />
    </>
  );
}
