import Image from "next/image";
import Link from "next/link";

const nav = [
  { href: "/blog", label: "Blog" },
  { href: "/tools", label: "Tools" },
  { href: "/seo", label: "SEO" },
  { href: "/artificial-intelligence", label: "AI" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="shrink-0" aria-label="ChatGPT Secret home">
          <Image src="/images/brand/logo.png" alt="ChatGPT Secret" width={678} height={89} priority className="h-7 w-auto" />
        </Link>
        <nav className="flex items-center gap-1 overflow-x-auto text-sm font-medium">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 whitespace-nowrap text-neutral-700 transition hover:bg-mist hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
