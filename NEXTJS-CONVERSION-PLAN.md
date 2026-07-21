# NextJS + Supabase Conversion Plan — deboistech Website

> **For any AI agent or developer reading this document:**
> Your job is to execute the steps below in order. Each step has a checkbox `[ ]`.
> **When you complete a step, mark it `[x]` in this file and commit the change.**
> This ensures the next agent or session always knows exactly what's done and what's next.
> Do not skip ahead — follow the phases sequentially.

---

> **Current site**: Static HTML + Tailwind CSS + vanilla JS (9 pages, 13 JS files, all data hardcoded or in `localStorage`).
>
> **Goal**: NextJS App Router + Supabase (OAuth, database, blog CRUD, projects).

---

## Architecture & Data Flow

### Flutter vs NextJS Equivalent

| Flutter Layer  | NextJS Equivalent                                                          | What it does                                                                                                                                        |
| -------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **DB**         | Supabase (PostgreSQL)                                                      | The database itself                                                                                                                                 |
| **Model**      | TypeScript types (`lib/types.ts`)                                          | Shape definitions for every entity                                                                                                                  |
| **Controller** | **Server Components** + **Server Actions** + **lib/queries.ts**            | Fetching data, writing data, business logic — runs on server, never reaches client                                                                  |
| **Provider**   | **React Server Components** (inherent) + **React Context** (for auth only) | Server Components _are_ the data provider — they fetch and pass data down. No global state library needed. Client-side state only for auth session. |
| **Frontend**   | React Components (Server + Client)                                         | Renders UI                                                                                                                                          |

### Data Fetching Flow

```
                    PUBLIC PAGES (read-only)
                    ───────────────────────
  [Browser] → Server Component → supabase.query() → PostgreSQL
       ↑              │
       └── HTML ──────┘   (data fetched & rendered on server,
                           no client waterfall, no loading spinners)


                    PROTECTED PAGES (mutations)
                    ────────────────────────────
  [Browser] → Client Component → Server Action → supabase.query() → PostgreSQL
                                       │
                                  └── revalidate / redirect ──→ UI updates


                    AUTH FLOW
                    ─────────
  [Browser] → OAuth Provider → Supabase Auth callback → Cookie set →
              NextJS Middleware reads cookie → protects /studio routes
```

**Key principle**: Server Components fetch data directly — no API layer needed for your own database. You call `supabase.from('blog_posts').select(...)` inside the component and it renders HTML. The query never reaches the client.

### File Structure

```
lib/
├── types.ts              ← All TypeScript interfaces (Models)
├── supabase/
│   ├── client.ts         ← Browser Supabase client
│   ├── server.ts         ← Server Supabase client
│   └── middleware.ts     ← Session refresh
├── actions/
│   ├── blog.ts           ← blog Server Actions (mutations)
│   ├── projects.ts       ← project Server Actions
│   └── auth.ts           ← login/logout Server Actions
├── queries/
│   ├── blog.ts           ← blog read operations
│   ├── projects.ts       ← project read operations
│   └── profiles.ts       ← profile read operations

components/
├── providers/
│   └── auth-provider.tsx ← Auth context (Provider)
├── layout/
│   ├── navbar.tsx
│   └── footer.tsx
├── blog/
│   ├── blog-card.tsx
│   ├── blog-detail.tsx
│   ├── blog-sections.tsx
│   ├── blog-studio.tsx
│   └── blog-stats.tsx
├── projects/
│   └── project-card.tsx
├── ui/
│   ├── card-section.tsx
│   ├── featured-product.tsx
│   ├── tech-marquee.tsx
│   ├── process-steps.tsx
│   ├── solution-card.tsx
│   └── careers.tsx
└── ...
```

---

## Database Scope

**Only 3 domain tables** + supporting tables.

| Table              | Purpose                                                             |
| ------------------ | ------------------------------------------------------------------- |
| `profiles`         | Synced from OAuth login — stores name, avatar, role                 |
| `blog_posts`       | All blog content — published + drafts                               |
| `projects`         | Products/portfolio items (currently hardcoded in `product-card.js`) |
| `blog_stats`       | View/read/like/share counters per post                              |
| `contact_messages` | (Optional) Contact form submissions                                 |

Everything else stays as hardcoded data in components (solutions, services, tech logos, process steps, careers, team info).

### Full SQL Schema

```sql
-- 1. PROFILES (auto-created on first OAuth login)
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  avatar_url text,
  role text DEFAULT 'Author',
  created_at timestamptz DEFAULT now()
);

-- 2. BLOG POSTS
CREATE TABLE blog_posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text DEFAULT '',
  thumbnail text DEFAULT '',
  thumbnail_alt text DEFAULT '',
  domain text NOT NULL DEFAULT 'general' CHECK (domain IN ('ml','devops','web','general')),
  tags text[] DEFAULT '{}',
  body jsonb NOT NULL DEFAULT '[]'::jsonb,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  author_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  author_name text NOT NULL DEFAULT 'deboistech',
  author_avatar text DEFAULT '',
  author_role text DEFAULT 'Author',
  published_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 3. BLOG STATS (1:1 with posts)
CREATE TABLE blog_stats (
  post_id uuid PRIMARY KEY REFERENCES blog_posts(id) ON DELETE CASCADE,
  views integer DEFAULT 0,
  reads integer DEFAULT 0,
  likes integer DEFAULT 0,
  shares integer DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

-- 4. PROJECTS (products you build/showcase)
CREATE TABLE projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  full_description text DEFAULT '',
  icon_svg text DEFAULT '',
  icon_bg text DEFAULT 'bg-primary-100',
  icon_color text DEFAULT 'text-primary-600',
  image_url text DEFAULT '',
  image_alt text DEFAULT '',
  link_url text DEFAULT '',
  link_label text DEFAULT 'Learn more →',
  link_target text DEFAULT '_blank',
  tech_stack text[] DEFAULT '{}',
  featured boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 5. CONTACT MESSAGES (optional — replaces FormSubmit)
CREATE TABLE contact_messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  subject text DEFAULT '',
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_domain ON blog_posts(domain);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_projects_sort ON projects(sort_order);
```

### RLS Policies

```sql
-- PROFILES: anyone can read; only own profile can insert/update
CREATE POLICY "profiles_public_read" ON profiles FOR SELECT USING (true);
CREATE POLICY "profiles_own_insert"  ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_own_update"  ON profiles FOR UPDATE USING (auth.uid() = id);

-- BLOG_POSTS: anyone can read published; only author can CRUD own drafts
CREATE POLICY "posts_published_read" ON blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "posts_own_all"        ON blog_posts FOR ALL USING (auth.uid() = author_id);

-- BLOG_STATS: anyone can read; server-side RPC increments
CREATE POLICY "stats_public_read"    ON blog_stats FOR SELECT USING (true);
-- (writes handled via SECURITY DEFINER functions)

-- PROJECTS: anyone can read; only admins write (via service_role)
CREATE POLICY "projects_public_read" ON projects FOR SELECT USING (true);
-- (writes via server client with service_role key)

-- CONTACT: anyone can insert; only admins read
CREATE POLICY "contact_public_insert" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "contact_admin_read"    ON contact_messages FOR SELECT USING (auth.role() = 'service_role');
```

### Seed Data

- **3 blog posts** — migrate the existing defaults from `blog-detail.js` lines 52–129 into `blog_posts` table
- **2 projects** — migrate TenantPlane + MotoAdmin from `product-card.js` into `projects` table
- **1 admin profile** — your own Google/GitHub account, manually inserted into `profiles` so you can start writing

---

## Phase 0: Deploy Current Static Site (Do this first)

- [ ] Pick a static host — Vercel, Netlify, Cloudflare Pages, or GitHub Pages
- [ ] Build Tailwind: `npm run build`
- [ ] Deploy the repo root as-is
- [ ] Point your domain's DNS

---

## Phase 1: Scaffold NextJS Project

- [ ] `npx create-next-app@latest deboistech-next --app --ts --tailwind --eslint`
- [ ] Port `tailwind.config.js` — copy `primary` color palette and `Inter` font config
- [ ] Copy `css/style.css` → `app/globals.css` (keep custom utility classes: `.card`, `.reveal`, `.eyebrow`, `.section-heading`, `.section-subheading`, `.btn-primary`, `.btn-secondary`, `.placeholder-box`, etc.)
- [ ] Copy all assets into `public/`: `images/`, `favicon.png`
- [ ] Set up path aliases in `tsconfig.json` — `@/components/*`, `@/lib/*`, `@/types/*`
- [ ] Install `@supabase/supabase-js` and `@supabase/ssr`

---

## Phase 2: Shared Layout, Types & Data Layer

### 2.1 Root Layout

- [ ] Create `app/layout.tsx` — HTML shell, metadata, global CSS, wrap with Navbar + Footer + AuthProvider

### 2.2 TypeScript Types

- [ ] Create `lib/types.ts` with all interfaces: `BlogPost`, `BlogBlock`, `BlogStats`, `BlogDomain`, `Project`, `Profile`

### 2.3 Data Access Layer

- [ ] Create `lib/supabase/client.ts` — browser Supabase client
- [ ] Create `lib/supabase/server.ts` — server Supabase client
- [ ] Create `lib/queries/blog.ts` — `getPublishedPosts()`, `getPostBySlug()`
- [ ] Create `lib/queries/projects.ts` — `getProjects()`, `getFeaturedProjects()`
- [ ] Create `lib/queries/profiles.ts` — `getProfile()`, `upsertProfile()`
- [ ] Create `lib/actions/blog.ts` — Server Actions for create/update/delete posts
- [ ] Create `lib/actions/projects.ts` — Server Actions for create/update/delete projects

### 2.4 Reusable Components

- [ ] Port `Navbar` from `lib/js/components.js` — sticky nav, mobile hamburger, "Let's Talk" CTA
- [ ] Port `Footer` from `lib/js/components.js` — 4-column link grid, socials, copyright
- [ ] Port `BlogCard` from `lib/widgets/blog-card.js`
- [ ] Port `BlogSections` from `lib/widgets/blog-sections.js` — domain-grouped listing with login modal
- [ ] Port `BlogDetail` from `lib/widgets/blog-detail.js` — article renderer, read progress, like/share
- [ ] Port `BlogStudio` from `lib/widgets/blog-detail.js` — rich editor, auto-save, publish
- [ ] Port `ProductCard` from `lib/widgets/product-card.js`
- [ ] Port `SolutionCard` from `lib/widgets/solution-card.js`
- [ ] Port `CardSection` from `lib/widgets/card-section.js` — generic grid wrapper
- [ ] Port `FeaturedProduct` from `lib/widgets/featured-product.js`
- [ ] Port `TechMarquee` from `lib/widgets/tech-marquee.js`
- [ ] Port `ProcessSteps` from `lib/widgets/process-steps.js`
- [ ] Port `Careers` from `lib/widgets/careers.js`
- [ ] Create `ScrollReveal` — client component wrapping IntersectionObserver for `.reveal` animations

---

## Phase 3: Pages Migration

- [ ] Create `app/page.tsx` — Home page: Hero + FeaturedProduct + TechMarquee + CardSection(solutions) + CardSection(products) + CardSection(blogs, from Supabase) + ProcessSteps + TeamSection + ContactForm
- [ ] Create `app/services/page.tsx` — Services grid (hardcoded data)
- [ ] Create `app/products/page.tsx` — Products grid (fetch from Supabase `projects`)
- [ ] Create `app/about/page.tsx` — Company info, what-we-do cards, CTA
- [ ] Create `app/blogs/page.tsx` — Blog listing grouped by domain (fetch from Supabase `blog_posts`)
- [ ] Create `app/blogs/[slug]/page.tsx` — Individual blog post detail + stats
- [ ] Create `app/contact/page.tsx` — Contact form (keep FormSubmit or use Supabase)
- [ ] Create `app/careers/page.tsx` — Open roles listing (hardcoded data)

---

## Phase 4: Supabase Setup

- [ ] Create Supabase project
- [ ] Run the SQL schema (profiles, blog_posts, blog_stats, projects, contact_messages + indexes + RLS)
- [ ] Create the increment_blog_stat SQL function
- [ ] Enable Google OAuth provider in Supabase dashboard
- [ ] Enable GitHub OAuth provider in Supabase dashboard
- [ ] Create Supabase Storage bucket `blog-images` (public)
- [ ] Seed 3 default blog posts from `blog-detail.js` lines 52–129
- [ ] Seed 2 default projects from `product-card.js`
- [ ] Insert your admin profile manually

---

## Phase 5: Authentication (Supabase OAuth)

- [ ] Create `components/providers/auth-provider.tsx` — React context for user session
- [ ] Create `app/auth/page.tsx` — Login page with Google + GitHub OAuth buttons
- [ ] Create `app/auth/callback/route.ts` — OAuth callback handler
- [ ] Create `lib/supabase/middleware.ts` — session refresh middleware
- [ ] Create `middleware.ts` — route protection: redirect `/studio/*` unauthenticated users
- [ ] Create `components/auth/login-modal.tsx` — modal with OAuth buttons (replaces passphrase modal in blog-sections)
- [ ] Remove `lib/js/auth.js` — no more hardcoded passphrase
- [ ] Create `lib/actions/auth.ts` — `signIn()`, `signOut()` server actions

---

## Phase 6: Blog CRUD + Studio

- [ ] Create `app/studio/page.tsx` — protected page, requires OAuth session
- [ ] Port `renderBlogStudio()` + `initBlogStudio()` into a React `BlogStudio` component
- [ ] Wire auto-save (1.5s debounce) to `lib/actions/blog.ts` upsertPost
- [ ] Wire publish button — sets `status = 'published'`
- [ ] Wire delete — calls `lib/actions/blog.ts` deletePost
- [ ] Implement image upload — picker → Supabase Storage → returns public URL
- [ ] Create `app/api/revalidate/route.ts` — on-demand revalidation for blog pages
- [ ] Test full cycle: create draft → edit → publish → view on `/blogs/[slug]`

---

## Phase 7: Projects from DB

- [ ] Update `app/page.tsx` CardSection(products) to fetch from Supabase `projects`
- [ ] Update `app/products/page.tsx` to fetch from Supabase `projects`
- [ ] Verify TenantPlane + MotoAdmin render correctly from DB data

---

## Phase 8: Contact Form

- [ ] Choose: keep FormSubmit OR switch to Supabase `contact_messages` table
- [ ] If FormSubmit: create React form component that POSTs to FormSubmit
- [ ] If Supabase: create `lib/actions/contact.ts` + submit handler + email notification

---

## Phase 9: SEO & Polish

- [ ] Add `generateMetadata()` to all pages (dynamic title + description)
- [ ] Create `app/sitemap.ts` — auto-generated from blog slugs + project slugs
- [ ] Create `app/feed.xml/route.ts` — RSS feed for blog subscribers
- [ ] Create `app/not-found.tsx` — custom 404 page
- [ ] Create `app/blogs/loading.tsx` — skeleton loading state
- [ ] Create `app/blogs/[slug]/loading.tsx` — skeleton loading state
- [ ] Create `app/error.tsx` — error boundary

---

## Phase 10: Deploy

- [ ] Push to new repo or branch
- [ ] Connect to Vercel
- [ ] Set environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Deploy production branch
- [ ] Update DNS to point to new host
- [ ] Verify everything works on the live domain
- [ ] Remove old static deployment

---

## Effort Summary

| Phase                                     | Time     |
| ----------------------------------------- | -------- |
| 0 — Deploy current site                   | 1 hr     |
| 1 — NextJS scaffold                       | 2–4 hrs  |
| 2 — Layout, types, queries, 15 components | 2–3 days |
| 3 — Migrate 9 pages                       | 2 days   |
| 4 — Supabase schema + seed                | 1 day    |
| 5 — OAuth + protected routes              | 1 day    |
| 6 — Blog CRUD + studio                    | 2–3 days |
| 7 — Projects from DB                      | 4–6 hrs  |
| 8 — Contact form                          | 2–4 hrs  |
| 9 — SEO / sitemap / polish                | 1 day    |
| 10 — Deploy                               | 2–4 hrs  |

**Total: ~10–14 days full-time.**
