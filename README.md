# ChatGPT Secret

The rebuilt [chatgptsecret.com](https://chatgptsecret.com): a guide to the best AI, SEO, marketing and business tools.

Rebuilt from the October 19, 2026 WordPress file backup on **Next.js 16**, **Tailwind CSS 4**, **Neon Postgres** (via Drizzle ORM) and **Better Auth**.

## What's here

| Route | What it is |
| --- | --- |
| `/` | Home: hero, latest guides, topic grid |
| `/blog` | All published posts |
| `/tools` | Tool directory (88 tools in 9 groups) |
| `/about` | About page |
| `/<post-slug>` and `/<topic-slug>` | Posts and topics, at the same root URLs the WordPress site used |
| `/sign-in`, `/admin` | Admin sign-in and post editor (Markdown) |
| `/sitemap.xml`, `/robots.txt` | Generated from the database |

Content seeds live in `content/posts/*.md` (12 rewritten posts), `src/content/categories.ts` (16 topics) and `src/content/tools.ts`.

## Setup

```bash
npm install
cp .env.example .env.local   # fill in DATABASE_URL, BETTER_AUTH_SECRET, ADMIN_EMAILS
npm run db:push              # create tables in Neon
npm run db:seed              # load topics, tools and posts (safe to re-run)
npm run dev
```

Then open `/sign-in`, choose **Create the admin account**, and register with an email listed in `ADMIN_EMAILS`. Nobody else can sign up.

For local development without Neon, point `DATABASE_URL` at a local Postgres (`postgresql://user:pass@localhost:5432/db`); the app switches to the `pg` driver automatically.

## Deploying

Any Node host works (Vercel is simplest). Set the same four environment variables, with `BETTER_AUTH_URL` set to the public URL, run `npm run db:push && npm run db:seed` once against the production database, and deploy.

## About the old site

The WordPress backup was compromised (PHP backdoors in `/about`, `/design`, `/tools`, `/writing` and webshells in `wp-admin`), and no database dump survived. Nothing from it is used here except images and the URL structure recovered from the SEO plugin's sitemaps. Treat any credentials from the old `wp-config.php` as leaked.
