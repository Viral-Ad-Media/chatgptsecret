import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-32 text-center">
      <p className="font-display text-6xl font-extrabold text-brand">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold">This page has moved or doesn&apos;t exist</h1>
      <p className="mt-3 text-neutral-600">Try the blog or the tool directory instead.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/blog" className="rounded-full bg-brand px-5 py-2.5 font-semibold text-white hover:bg-brand-dark">Blog</Link>
        <Link href="/tools" className="rounded-full border border-neutral-300 px-5 py-2.5 font-semibold hover:bg-mist">Tools</Link>
      </div>
    </div>
  );
}
