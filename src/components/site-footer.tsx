import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-night text-white/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold text-white">
            ChatGPT <span className="rounded bg-brand px-1.5">Secret</span>
          </p>
          <p className="mt-3 text-sm leading-6">{site.tagline}</p>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-white">Explore</p>
          <ul className="mt-3 space-y-2">
            <li><Link className="hover:text-white" href="/blog">Blog</Link></li>
            <li><Link className="hover:text-white" href="/tools">Tool directory</Link></li>
            <li><Link className="hover:text-white" href="/about">About</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-white">Popular topics</p>
          <ul className="mt-3 space-y-2">
            <li><Link className="hover:text-white" href="/seo">SEO</Link></li>
            <li><Link className="hover:text-white" href="/website">Websites & funnels</Link></li>
            <li><Link className="hover:text-white" href="/social-media">Social media</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} ChatGPT Secret. Some links may be affiliate links.
      </div>
    </footer>
  );
}
