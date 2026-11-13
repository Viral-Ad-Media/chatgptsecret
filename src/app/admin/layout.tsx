import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { signOut } from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admin", robots: { index: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 pb-4">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="font-display text-xl font-bold">Admin</Link>
          <Link href="/admin/posts/new" className="rounded-full bg-brand px-4 py-1.5 text-sm font-semibold text-white hover:bg-brand-dark">
            New post
          </Link>
        </div>
        <div className="flex items-center gap-3 text-sm text-neutral-600">
          <span>{session.user.email}</span>
          <form action={signOut}>
            <button className="rounded-full border border-neutral-300 px-3 py-1 hover:bg-mist">Sign out</button>
          </form>
        </div>
      </div>
      <div className="pt-8">{children}</div>
    </div>
  );
}
