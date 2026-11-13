import Link from "next/link";
import { getAllPostsForAdmin } from "@/lib/data";

export default async function AdminHome({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const [{ saved }, posts] = await Promise.all([searchParams, getAllPostsForAdmin()]);
  return (
    <>
      {saved ? <p className="mb-6 rounded-lg bg-green-50 p-3 text-sm text-green-800">Post saved.</p> : null}
      <h1 className="font-display text-2xl font-bold">Posts ({posts.length})</h1>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-neutral-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-mist text-neutral-600">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Topics</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Updated</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id} className="border-t border-neutral-200">
                <td className="px-4 py-3">
                  <Link href={`/admin/posts/${p.id}`} className="font-medium hover:text-brand">{p.title}</Link>
                  <div className="text-xs text-neutral-500">/{p.slug}</div>
                </td>
                <td className="px-4 py-3 text-neutral-600">{p.categories.map((c) => c.name).join(", ")}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${p.published ? "bg-green-100 text-green-800" : "bg-neutral-200 text-neutral-700"}`}>
                    {p.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 text-neutral-600">{p.updatedAt.toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
