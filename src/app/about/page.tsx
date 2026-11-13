import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "ChatGPT Secret helps entrepreneurs find the right AI and marketing tools.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="font-display text-4xl font-extrabold">About ChatGPT Secret</h1>
      <div className="relative mt-8 aspect-[16/7] overflow-hidden rounded-2xl bg-night">
        <Image src="/images/brand/generative-ai.jpg" alt="" fill sizes="(min-width: 896px) 896px, 100vw" className="object-cover" />
      </div>
      <div className="prose-post mt-10">
        <p>
          There are thousands of AI, marketing and business tools, and new ones launch every week. Most
          people don&apos;t need more options. They need someone to tell them which few are worth learning.
        </p>
        <p>
          ChatGPT Secret exists to do that. We research and compare the tools behind modern online businesses,
          across SEO, websites and funnels, email, social media, video, sales outreach and AI, and explain what
          each one is actually good for.
        </p>
        <h2>How we choose what to recommend</h2>
        <ul>
          <li><strong>Usefulness first.</strong> A tool has to solve a real problem for a small business or creator.</li>
          <li><strong>Honesty about risk.</strong> If a tool can get your site penalized or your account banned, we say so.</li>
          <li><strong>No pay-to-play rankings.</strong> Some links may earn us a commission, but that never decides what we list.</li>
        </ul>
        <h2>Start here</h2>
        <p>
          New to building online? Read our guide to <Link href="/best-website-and-funnel-builder-tools-2023">website and funnel builders</Link>,
          then <Link href="/top-9-seo-keyword-research-tools">keyword research tools</Link>, or browse the full <Link href="/tools">tool directory</Link>.
        </p>
      </div>
    </div>
  );
}
