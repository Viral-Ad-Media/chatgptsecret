import type { Metadata } from "next";
import Image from "next/image";
import { getTools } from "@/lib/data";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Tool directory",
  description: "A curated directory of AI, SEO, marketing, website and automation tools.",
};

export default async function ToolsPage() {
  const tools = await getTools();
  const groups = [...new Set(tools.map((t) => t.group))];

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="font-display text-4xl font-extrabold">Tool directory</h1>
      <p className="mt-3 max-w-2xl text-lg text-neutral-600">
        {tools.length} tools we&apos;ve covered, grouped by what they help you do.
      </p>

      <nav className="mt-8 flex flex-wrap gap-2">
        {groups.map((g) => (
          <a key={g} href={`#${slugify(g)}`} className="rounded-full bg-mist px-4 py-2 text-sm font-medium hover:bg-neutral-200">
            {g}
          </a>
        ))}
      </nav>

      {groups.map((g) => (
        <section key={g} id={slugify(g)} className="scroll-mt-24 pt-14">
          <h2 className="font-display text-2xl font-bold">{g}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools
              .filter((t) => t.group === g)
              .map((t) => (
                <a
                  key={t.slug}
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex gap-4 rounded-2xl border border-neutral-200 p-4 transition hover:border-brand hover:shadow-md"
                >
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-xl border border-neutral-100 bg-white">
                    {t.logo ? <Image src={t.logo} alt="" fill sizes="64px" className="object-contain p-1" /> : null}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold">{t.name}</p>
                    <p className="mt-1 text-sm leading-6 text-neutral-600">{t.summary}</p>
                  </div>
                </a>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
