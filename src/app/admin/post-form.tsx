"use client";

import { useActionState, useState } from "react";
import type { Category } from "@/db/schema";
import type { FormState } from "./actions";

type Initial = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  published: boolean;
  categories: string[];
};

const input = "mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function PostForm({
  action,
  categories,
  initial,
}: {
  action: (prev: FormState, form: FormData) => Promise<FormState>;
  categories: Category[];
  initial: Initial;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const [slug, setSlug] = useState(initial.slug);
  const [slugTouched, setSlugTouched] = useState(!!initial.slug);

  return (
    <form action={formAction} className="grid gap-6 lg:grid-cols-[1fr_280px]">
      <div className="space-y-5">
        <label className="block text-sm font-medium">
          Title
          <input
            name="title"
            required
            defaultValue={initial.title}
            className={input}
            onChange={(e) => !slugTouched && setSlug(slugify(e.target.value))}
          />
        </label>
        <label className="block text-sm font-medium">
          URL slug
          <div className="mt-1 flex items-center rounded-lg border border-neutral-300 focus-within:border-brand">
            <span className="pl-3 text-neutral-500">/</span>
            <input
              name="slug"
              required
              value={slug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(e.target.value);
              }}
              className="w-full rounded-lg px-1 py-2 outline-none"
            />
          </div>
        </label>
        <label className="block text-sm font-medium">
          Excerpt
          <textarea name="excerpt" rows={2} defaultValue={initial.excerpt} className={input} />
        </label>
        <label className="block text-sm font-medium">
          Content (Markdown)
          <textarea name="content" rows={24} defaultValue={initial.content} className={`${input} font-mono text-sm`} />
        </label>
      </div>
      <aside className="space-y-5">
        <label className="flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" name="published" defaultChecked={initial.published} className="size-4 accent-brand" />
          Published
        </label>
        <label className="block text-sm font-medium">
          Cover image URL
          <input name="coverImage" defaultValue={initial.coverImage} placeholder="/images/categories/seo.jpg" className={input} />
        </label>
        <fieldset>
          <legend className="text-sm font-medium">Topics</legend>
          <div className="mt-2 max-h-80 space-y-1.5 overflow-y-auto rounded-lg border border-neutral-200 p-3">
            {categories.map((c) => (
              <label key={c.slug} className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="categories" value={c.slug} defaultChecked={initial.categories.includes(c.slug)} className="accent-brand" />
                {c.name}
              </label>
            ))}
          </div>
        </fieldset>
        {state?.error ? <p className="text-sm text-red-600">{state.error}</p> : null}
        <button disabled={pending} className="w-full rounded-full bg-brand py-2.5 font-semibold text-white hover:bg-brand-dark disabled:opacity-60">
          {pending ? "Saving…" : "Save post"}
        </button>
      </aside>
    </form>
  );
}
