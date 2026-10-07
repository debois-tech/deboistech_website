# deboistech website

Marketing site for deboistech. A fully static Next.js site: no server, no database.
All copy and data live in JSON files, and an in-browser admin edits them.

## Stack

| Piece | Choice | Why |
|---|---|---|
| Framework | Next.js 16 (App Router), `output: "export"` | Builds to plain HTML/CSS/JS in `out/`. Host anywhere. |
| UI | React 19 + Tailwind CSS v4 | Existing design, ported unchanged. |
| Data | JSON files in `content/` | No backend needed. One file per area, easy to diff in git. |
| Admin | `/admin`, client-side React | Edits JSON in the browser, exports files. |
| Language | TypeScript (strict) | Types for every content file in `src/lib/types.ts`. |

Why not Astro or plain React (Vite)? The site was already built in Next.js, and the admin needs
React anyway. Static export gives the same output as Astro without a rewrite.

## Commands

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # validates content, then writes the static site to ./out
npm run check:content  # validate content/*.json only
npm run lint
```

Node 20.9 or newer.

## Project layout

```
content/                 All editable data (JSON, one file per area)
  site.json              Name, emails, socials, site URL
  home.json              Featured product, tech logos, process steps, culture
  services.json          Build / Scale / Accelerate tiers and services
  products.json          Product cards
  careers.json           Open roles
  faq.json               FAQ items
  about.json             What-we-do cards and team
  contact.json           Trust points and form topics
  blog.json              Blog posts
public/images/           Images referenced by the content files
docs/                    Migration history and design notes
vercel.json              Vercel build, redirects and headers
scripts/check-content.mjs  Validates content before every build
src/
  app/                   Routes (pages, sitemap, robots, RSS feed)
  components/
    admin/               Dashboard, generic JSON editor, blog studio
    blog/ layout/ projects/ ui/
  lib/
    content.ts           Typed loader: the only place that imports content/*.json
    types.ts             Shape of each content file
    json-edit.ts         Pure helpers used by the admin
    format.ts            Date and label formatting
```

Pages import data from `@/lib/content`, never from the JSON files directly.

## Editing content

### With the admin (recommended)

1. Open `/admin` (for example `http://localhost:3000/admin`). `/admin#blog` opens a section directly.
2. Pick a section and edit. Changes autosave as a **draft in this browser only**. A dot in the sidebar marks sections with unexported changes.
3. Click **Export `<file>.json`**.
4. Replace the same file in `content/` with the downloaded one.
5. Commit and redeploy. `npm run build` validates the file first and fails with a clear message if something is wrong.

"Discard changes" drops your draft and goes back to what is in the repo.

### By hand

Edit the JSON in `content/` directly, then run `npm run check:content`.

### Blog posts

Open `/admin#blog`, click **New post**, write, then **Preview**. A post is public only when
its status is **Published**; drafts stay hidden. Export `blog.json` as above.
Blog images are files, not uploads: put them in `public/images/blog/` and enter the path
(for example `/images/blog/cover.jpg`) in the post.

### Adding a new content file

Add `content/<name>.json`, add its type to `src/lib/types.ts`, export it from `src/lib/content.ts`,
register it in `src/components/admin/datasets.ts` (it then appears in the admin sidebar), and add
its checks to `scripts/check-content.mjs`.

## What the admin is, and is not

- It runs in the browser only. There is no server and no login, so it cannot publish by itself.
  The export, commit, redeploy step is what makes a change public.
- `/admin` is not linked from the site and is excluded from `robots.txt`, but anyone who knows the
  URL can open it. That is safe because edits never leave their own browser, but do not treat it as
  access control.
- `/login` is a placeholder page. Nothing on it works yet.

## Contact form

The form posts directly to [FormSubmit](https://formsubmit.co) and redirects to `/contact/thanks`.
The first submission after deploying sends a confirmation email to the address in
`content/site.json` (`contactEmail`); it must be confirmed once before messages are delivered.
The redirect uses the `url` in `content/site.json`, so set that to the real domain.

## Deploying (Vercel)

Everything Vercel needs is in [`vercel.json`](vercel.json), which overrides the project's saved
dashboard settings. Pushing to the production branch is all it takes:

- install `npm ci`, build `npm run build` (content is validated first), publish `out/`
- clean URLs (`/about`, not `/about.html`)
- permanent redirects from the old `/lib/pages/*.html` URLs to the new routes, so existing search
  results and links keep working
- security headers and long-lived caching for `/_next/static/*`

No environment variables are needed. The site is plain static files, so any other static host also
works: build, then upload `out/`. (You would need to recreate the redirects there.)

Before a launch, check `content/site.json`: `url` feeds canonical links, the sitemap, the RSS feed
and the contact-form redirect, and must be the real domain.

### Images

A static export serves images at the size you commit (no automatic optimization). Resize before
adding: about 1200px wide for photos, saved as JPEG; logos and icons at 2-3x their displayed size.

## More docs

Migration history and design notes live in [`docs/`](docs/).

## Notes

- Next.js 16 has breaking changes from earlier versions. `AGENTS.md` points tooling at the docs
  bundled in `node_modules/next/dist/docs/`; read those before changing framework-level code.
- Images use `next/image` with `unoptimized: true`, because the optimizer needs a server.
- `/blogs/[slug]` is generated at build time from `blog.json`. With no published posts it builds a
  single placeholder page (`/blogs/_`) that shows the 404 view.
