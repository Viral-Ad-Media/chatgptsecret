export type SeedCategory = {
  slug: string;
  name: string;
  description: string;
  image: string;
};

// The 16 categories from the original site's sitemap, in the same URLs.
export const seedCategories: SeedCategory[] = [
  { slug: "artificial-intelligence", name: "Artificial Intelligence", description: "AI models, assistants and the tools built on top of them.", image: "/images/categories/artificial-intelligence.jpg" },
  { slug: "seo", name: "SEO", description: "Keyword research, rank tracking, audits and link building.", image: "/images/categories/seo.jpg" },
  { slug: "website", name: "Website", description: "Builders, funnels, hosting and everything that puts you online.", image: "/images/categories/website.jpg" },
  { slug: "writing", name: "Writing", description: "Copywriting, content and AI writing assistants.", image: "/images/categories/writing.jpg" },
  { slug: "design", name: "Design", description: "Visual design, page layout and creative tools.", image: "/images/categories/design.jpg" },
  { slug: "video", name: "Video", description: "Video editing, AI video and audio production.", image: "/images/categories/video.jpg" },
  { slug: "social-media", name: "Social Media", description: "Scheduling, growth and automation for social channels.", image: "/images/categories/social-media.jpg" },
  { slug: "sales", name: "Sales", description: "Prospecting, outreach and pipeline tools.", image: "/images/categories/sales.jpg" },
  { slug: "customers-users", name: "Customers & Users", description: "CRM, support and audience engagement.", image: "/images/categories/customers-users.jpg" },
  { slug: "operations", name: "Operations", description: "Automation and workflows that keep a business running.", image: "/images/categories/operations.jpg" },
  { slug: "productivity", name: "Productivity", description: "Tools that save time on repetitive work.", image: "/images/categories/productivity.jpg" },
  { slug: "no-code", name: "No-code", description: "Build sites, funnels and automations without writing code.", image: "/images/categories/no-code.jpg" },
  { slug: "code", name: "Code", description: "Developer tools and code-friendly platforms.", image: "/images/categories/code.jpg" },
  { slug: "financial", name: "Financial", description: "Payments, checkout and the money side of online business.", image: "/images/categories/financial.jpg" },
  { slug: "education", name: "Education", description: "Guides and tools for learning new skills.", image: "/images/categories/education.jpg" },
  { slug: "personal", name: "Personal", description: "Tools for creators, freelancers and solo founders.", image: "/images/categories/personal.jpg" },
];
