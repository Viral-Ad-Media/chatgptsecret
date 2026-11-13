import { getCategories } from "@/lib/data";
import { savePost } from "../../actions";
import { PostForm } from "../../post-form";

export default async function NewPostPage() {
  const categories = await getCategories();
  return (
    <>
      <h1 className="mb-6 font-display text-2xl font-bold">New post</h1>
      <PostForm
        action={savePost.bind(null, null)}
        categories={categories}
        initial={{ title: "", slug: "", excerpt: "", content: "", coverImage: "", published: false, categories: [] }}
      />
    </>
  );
}
