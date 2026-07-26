# NextJS + Supabase Conversion Plan — deboistech Website

> **For any AI agent or developer reading this document:**
> Your job is to execute the steps below in order. Each step has a checkbox `[ ]`.
> **When you complete a step, mark it `[x]` in this file and commit the change.**
> This ensures the next agent or session always knows exactly what's done and what's next.
> Do not skip ahead — follow the phases sequentially.

---

> **Current site**: Static HTML + Tailwind CSS v3 + vanilla JS (9 pages, 13 JS files, all data hardcoded or in `localStorage`).
>
> **Goal**: NextJS 16 App Router + Tailwind CSS v4 + Supabase (OAuth, PostgreSQL, blog CRUD, projects).
>
> **Latest toolchain (July 2026)**:
> - **Next.js 16.2+** (`create-next-app@latest` — App Router default, Turbopack stable)
> - **React 19** (built-in, server components, server actions)
> - **Tailwind CSS v4** (`@tailwindcss/postcss`, CSS-first `@theme` config, automatic content detection, 70% smaller CSS output)
> - **Supabase** (`@supabase/ssr` v1 — replaces deprecated `@supabase/auth-helpers-nextjs`)
> - **TypeScript** (strict mode, path aliases)

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
deboistech-next/
├── src/                         ← (if --src-dir flag used, otherwise root app/)
│   ├── app/
│   │   ├── globals.css          ← @import "tailwindcss"; + @theme + custom utilities
│   │   ├── layout.tsx           ← Root layout (Navbar + Footer + AuthProvider)
│   │   ├── page.tsx             ← Home page
│   │   ├── services/page.tsx
│   │   ├── products/page.tsx
│   │   ├── about/page.tsx
│   │   ├── blogs/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── careers/page.tsx
│   │   ├── auth/
│   │   │   ├── page.tsx
│   │   │   └── callback/route.ts
│   │   ├── studio/page.tsx
│   │   ├── sitemap.ts
│   │   ├── not-found.tsx
│   │   ├── error.tsx
│   │   └── feed.xml/route.ts
│   └── components/
│       ├── providers/
│       │   └── auth-provider.tsx
│       ├── layout/
│       │   ├── navbar.tsx
│       │   └── footer.tsx
│       ├── blog/
│       │   ├── blog-card.tsx
│       │   ├── blog-detail.tsx
│       │   ├── blog-sections.tsx
│       │   ├── blog-studio.tsx
│       │   └── blog-stats.tsx
│       ├── projects/
│       │   └── project-card.tsx
│       ├── ui/
│       │   ├── card-section.tsx
│       │   ├── featured-product.tsx
│       │   ├── tech-marquee.tsx
│       │   ├── process-steps.tsx
│       │   ├── solution-card.tsx
│       │   ├── careers.tsx
│       │   └── scroll-reveal.tsx
│       └── auth/
│           └── login-modal.tsx
├── lib/
│   ├── types.ts
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   ├── queries/
│   │   ├── blog.ts
│   │   ├── projects.ts
│   │   └── profiles.ts
│   └── actions/
│       ├── blog.ts
│       ├── projects.ts
│       ├── auth.ts
│       └── contact.ts
├── public/
│   ├── images/
│   └── favicon.png
├── middleware.ts                    ← root-level for Supabase session refresh + route protection
├── postcss.config.mjs
├── next.config.ts
├── tsconfig.json
├── package.json
└── .env.local
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

### SECURITY DEFINER Function for Blog Stats

```sql
-- Safe SECURITY DEFINER pattern: fixed search_path prevents RLS bypass
CREATE OR REPLACE FUNCTION increment_blog_stat(
  p_post_id uuid,
  p_field text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  EXECUTE format(
    'UPDATE public.blog_stats SET %I = %I + 1, updated_at = now() WHERE post_id = $1',
    p_field, p_field
  ) USING p_post_id;
END;
$$;

-- Grant execution to anon + authenticated roles (safe because the function
-- is intentionally narrow — it only increments specific counter columns)
GRANT EXECUTE ON FUNCTION increment_blog_stat TO anon, authenticated;
```

### SQL Function to Create blog_stats Row on Post Insert

```sql
-- Trigger: auto-create stats row when a blog post is created
CREATE OR REPLACE FUNCTION create_blog_stats_row()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.blog_stats (post_id) VALUES (NEW.id);
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_create_blog_stats
  AFTER INSERT ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION create_blog_stats_row();
```

### Seed Data

- **3 blog posts** — migrate the existing defaults from `blog-detail.js` lines 52–129 into `blog_posts` table
- **2 projects** — migrate TenantPlane + MotoAdmin from `product-card.js` into `projects` table
- **1 admin profile** — your own Google/GitHub account, manually inserted into `profiles` so you can start writing

---

## Phase 0: Deploy Current Static Site (Do this first)

**Goal**: Get the existing site live so users see no downtime during conversion.

- [ ] **0.1** Pick a static host — Vercel, Netlify, Cloudflare Pages, or GitHub Pages
  - Recommendation: **Vercel** (simplest, zero-config for static)
- [ ] **0.2** Build Tailwind: `npm run build` (produces `css/style.css` + bundles)
- [ ] **0.3** Deploy the repo root as-is using the host's CLI or git push
  - For Vercel: `npx vercel --prod` (detects static HTML project automatically)
- [ ] **0.4** Point your domain's DNS to the host (CNAME/ALIAS record)
- [ ] **0.5** Verify: visit `https://yourdomain.com` — all 9 pages work

---

## Phase 1: Scaffold NextJS Project

**Goal**: Create a fresh NextJS 16 project, port Tailwind config and assets, install Supabase.

### 1.1 Create NextJS Project

- [x] **1.1.1** `npx create-next-app@latest deboistech-next --typescript --app --tailwind --eslint --src-dir`
  - This gives you: NextJS 16, React 19, Tailwind CSS v4, TypeScript, App Router
  - Note: `--tailwind` flag auto-installs `@tailwindcss/postcss` and sets up `@import "tailwindcss"` in `globals.css`
- [x] **1.1.2** `cd deboistech-next`
- [x] **1.1.3** `npm run dev` — verify the default starter page loads on localhost:3000

### 1.2 Port Tailwind Config (v3 → v4 Migration)

Tailwind v4 uses **CSS-first configuration** — no more `tailwind.config.js`. All custom values go into a `@theme` block in `globals.css`.

- [x] **1.2.1** Read `tailwind.config.js` from the current site (for `primary` color palette, `Inter` font, screens, etc.)
- [x] **1.2.2** In `src/app/globals.css`, replace placeholder `@theme` with:
  ```css
  @import "tailwindcss";

  @theme {
    --color-primary-50: #eef2ff;
    --color-primary-100: #e0e7ff;
    --color-primary-200: #c7d2fe;
    --color-primary-300: #a5b4fc;
    --color-primary-400: #818cf8;
    --color-primary-500: #6366f1;
    --color-primary-600: #4f46e5;
    --color-primary-700: #4338ca;
    --color-primary-800: #3730a3;
    --color-primary-900: #312e81;
    --color-primary-950: #1e1b4b;
    --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
  }
  ```
  (Replace the exact hex values with whatever the current site's `tailwind.config.js` defines — this is a typical Indigo palette)
- [x] **1.2.3** Copy the current site's `Inter` font setup — system fallback stack configured in `globals.css`

### 1.3 Port Custom CSS Utility Classes

- [x] **1.3.1** Read `css/style.css` from the current site
- [x] **1.3.2** Extract the custom utility classes (`.card`, `.reveal`, `.eyebrow`, `.section-heading`, `.section-subheading`, `.btn-primary`, `.btn-secondary`, `.placeholder-box`) and place them in `globals.css` below the `@theme` block, inside a `@layer utilities { }` block:
  ```css
  @layer utilities {
    .card { @apply ... }
    .reveal { opacity: 0; transform: translateY(1.5rem); transition: all 0.6s ease-out; }
    .reveal.visible { opacity: 1; transform: translateY(0); }
    .eyebrow { @apply ... }
    /* etc. */
  }
  ```

### 1.4 Copy Static Assets

- [x] **1.4.1** Copy `images/` folder → `public/images/`
- [x] **1.4.2** Copy `favicon.png` → `public/favicon.png`
- [x] **1.4.3** Verify assets load at `http://localhost:3000/images/...` (dev server returned HTTP 200 for `/`)

### 1.5 Set Up Path Aliases (tsconfig.json)

`create-next-app` with `--src-dir` already sets up `@/*` → `./src/*`. Verify/add these:

- [x] **1.5.1** Ensure `tsconfig.json` has these paths:
  ```json
  {
    "compilerOptions": {
      "paths": {
        "@/*": ["./src/*"],
        "@/components/*": ["./src/components/*"],
        "@/lib/*": ["./src/lib/*"]
      }
    }
  }
  ```

### 1.6 Install Supabase

- [x] **1.6.1** `npm install @supabase/supabase-js @supabase/ssr`
  - `@supabase/ssr` is the modern SSR package (replaces `@supabase/auth-helpers-nextjs` which is deprecated)
- [x] **1.6.2** Create `.env.local` with placeholder values:
  ```
  NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
  SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
  ```
  (Actual values added in Phase 4 after creating the Supabase project)

---

## Phase 2: Shared Layout, Types & Data Layer

**Goal**: Create the root layout, all TypeScript interfaces, data access layer, and all reusable components.

### 2.1 Root Layout

- [x] **2.1.1** Create `src/app/layout.tsx`:
  - Import Inter font via `next/font/google`
  - Export `metadata` object (site title, description, OG)
  - Wrap children in `<html>` + `<body>` with font classes
  - Include `<Navbar />` at top, `<Footer />` at bottom
  - Wrap with `<AuthProvider>` (created later, but place it now with a TODO stub)

### 2.2 TypeScript Types (`lib/types.ts`)

- [x] **2.2.1** Create `src/lib/types.ts`:

```typescript
// ── Domain Union ──
export type BlogDomain = 'ml' | 'devops' | 'web' | 'general';

// ── Blog Block (individual rich-text/content block inside the JSONB body array) ──
export interface BlogBlock {
  id: string;
  type: 'heading' | 'paragraph' | 'image' | 'code' | 'list' | 'quote';
  content?: string;
  level?: 1 | 2 | 3;            // for heading blocks
  language?: string;             // for code blocks
  items?: string[];              // for list blocks
  src?: string;                  // for image blocks
  alt?: string;                  // for image blocks
  caption?: string;              // for image blocks
  attribution?: string;          // for quote blocks
}

// ── Blog Post ──
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  thumbnail_alt: string;
  domain: BlogDomain;
  tags: string[];
  body: BlogBlock[];
  status: 'draft' | 'published';
  author_id: string | null;
  author_name: string;
  author_avatar: string;
  author_role: string;
  published_date: string | null;
  created_at: string;
  updated_at: string;
}

// ── Blog Stats ──
export interface BlogStats {
  post_id: string;
  views: number;
  reads: number;
  likes: number;
  shares: number;
  updated_at: string;
}

// ── Project ──
export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  full_description: string;
  icon_svg: string;
  icon_bg: string;
  icon_color: string;
  image_url: string;
  image_alt: string;
  link_url: string;
  link_label: string;
  link_target: string;
  tech_stack: string[];
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// ── Profile ──
export interface Profile {
  id: string;
  name: string;
  avatar_url: string | null;
  role: string;
  created_at: string;
}

// ── Contact Message ──
export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}
```

### 2.3 Data Access Layer

#### 2.3.1 Supabase Clients

- [x] **2.3.1a** Create `src/lib/supabase/client.ts` — Browser client:

```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

- [x] **2.3.1b** Create `src/lib/supabase/server.ts` — Server client:

```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )
}
```

- [x] **2.3.1c** Create `src/lib/supabase/middleware.ts` — Middleware client:

```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  return { supabaseResponse, user }
}
```

#### 2.3.2 Query Modules

- [x] **2.3.2a** Create `src/lib/queries/blog.ts`:

```typescript
import { createClient } from '@/lib/supabase/server'
import type { BlogPost, BlogStats } from '@/lib/types'

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('published_date', { ascending: false })
  return data ?? []
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  return data
}

export async function getPostStats(postId: string): Promise<BlogStats | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('blog_stats')
    .select('*')
    .eq('post_id', postId)
    .single()
  return data
}

export async function getAllSlugs(): Promise<string[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('status', 'published')
  return data?.map(p => p.slug) ?? []
}
```

- [x] **2.3.2b** Create `src/lib/queries/projects.ts`:

```typescript
import { createClient } from '@/lib/supabase/server'
import type { Project } from '@/lib/types'

export async function getProjects(): Promise<Project[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true })
  return data ?? []
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('projects')
    .select('*')
    .eq('featured', true)
    .order('sort_order', { ascending: true })
  return data ?? []
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single()
  return data
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('projects')
    .select('slug')
  return data?.map(p => p.slug) ?? []
}
```

- [x] **2.3.2c** Create `src/lib/queries/profiles.ts`:

```typescript
import { createClient } from '@/lib/supabase/server'
import type { Profile } from '@/lib/types'

export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  return data
}

export async function upsertProfile(profile: Partial<Profile> & { id: string }): Promise<Profile | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('profiles')
    .upsert(profile)
    .select()
    .single()
  return data
}
```

#### 2.3.3 Action Modules

- [x] **2.3.3a** Create `src/lib/actions/blog.ts`:

```typescript
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import type { BlogBlock } from '@/lib/types'

export async function upsertPost(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const id = formData.get('id') as string | null
  const slug = formData.get('slug') as string
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const thumbnail = formData.get('thumbnail') as string
  const thumbnailAlt = formData.get('thumbnail_alt') as string
  const domain = formData.get('domain') as string
  const tags = JSON.parse(formData.get('tags') as string || '[]') as string[]
  const body = JSON.parse(formData.get('body') as string || '[]') as BlogBlock[]
  const status = formData.get('status') as 'draft' | 'published'

  const post = {
    slug,
    title,
    description,
    thumbnail,
    thumbnail_alt: thumbnailAlt,
    domain,
    tags,
    body,
    status,
    author_id: user.id,
    published_date: status === 'published' ? new Date().toISOString() : null,
  }

  if (id) {
    await supabase.from('blog_posts').update(post).eq('id', id)
  } else {
    await supabase.from('blog_posts').insert(post)
  }

  revalidatePath('/blogs')
  revalidatePath('/')
  if (status === 'published') revalidatePath(`/blogs/${slug}`)
  redirect('/studio')
}

export async function deletePost(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const id = formData.get('id') as string
  await supabase.from('blog_posts').delete().eq('id', id).eq('author_id', user.id)

  revalidatePath('/blogs')
  revalidatePath('/')
  redirect('/studio')
}
```

- [x] **2.3.3b** Create `src/lib/actions/projects.ts`:

```typescript
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function upsertProject(formData: FormData) {
  const supabase = await createClient()
  // Admin check: use service_role client for write operations
  const supabaseAdmin = createServiceClient()

  const id = formData.get('id') as string | null
  const project = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    description: formData.get('description') as string,
    full_description: formData.get('full_description') as string || '',
    icon_svg: formData.get('icon_svg') as string || '',
    image_url: formData.get('image_url') as string || '',
    tech_stack: JSON.parse(formData.get('tech_stack') as string || '[]'),
    featured: formData.get('featured') === 'true',
  }

  if (id) {
    await supabaseAdmin.from('projects').update(project).eq('id', id)
  } else {
    await supabaseAdmin.from('projects').insert(project)
  }

  revalidatePath('/products')
  revalidatePath('/')
}

function createServiceClient() {
  const { createClient } = require('@supabase/supabase-js')
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
```

- [x] **2.3.3c** Create `src/lib/actions/auth.ts`:

```typescript
'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function signIn(provider: 'google' | 'github') {
  const supabase = await createClient()
  const { data } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })
  if (data.url) redirect(data.url)
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}
```

- [x] **2.3.3d** Create `src/lib/actions/contact.ts` (if using Supabase for contact form):

```typescript
'use server'

import { createClient } from '@/lib/supabase/server'

export async function submitContact(formData: FormData) {
  const supabase = await createClient()
  const { error } = await supabase.from('contact_messages').insert({
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    subject: formData.get('subject') as string || '',
    message: formData.get('message') as string,
  })
  if (error) throw new Error('Failed to submit message')
  return { success: true }
}
```

### 2.4 Reusable Components

Each component should be ported from the existing vanilla JS to a React component.

**Rules for all component ports:**
- Components that use `useState`, `useEffect`, `onClick`, `onSubmit` must have `'use client'` directive
- Components that are purely presentational (no hooks, no events) stay as Server Components
- All Tailwind classes from the original translate 1:1
- JSX replaces manual `document.createElement` / `innerHTML`

#### 2.4.1 Layout Components

- [x] **2.4.1a** Port `Navbar` from `lib/js/components.js`:
  - Client component (`'use client'`) — needs state for mobile menu toggle
  - Sticky top nav, hamburger menu on mobile, "Let's Talk" CTA button
  - Use `next/link` for all internal links
  - Show login/avatar conditionally based on auth session (from AuthProvider context)

- [x] **2.4.1b** Port `Footer` from `lib/js/components.js`:
  - Server Component (no interactivity needed)
  - 4-column grid: links, technologies, services, socials
  - Copyright notice with current year

#### 2.4.2 Blog Components

- [x] **2.4.2a** Port `BlogCard` from `lib/widgets/blog-card.js`:
  - Server Component
  - Props: `post: BlogPost`
  - Renders: thumbnail, domain badge, title, description, author row, date
  - Wraps in `next/link` → `/blogs/${post.slug}`

- [x] **2.4.2b** Port `BlogSections` from `lib/widgets/blog-sections.js`:
  - Server Component
  - Fetches published posts grouped by domain
  - Renders domain tabs/sections with grid of `BlogCard` components
  - Remove the old passphrase-modal logic (replaced by login-modal in Phase 5)

- [x] **2.4.2c** Port `BlogDetail` from `lib/widgets/blog-detail.js`:
  - Client Component (needs read-progress, like/share interaction)
  - Props: `post: BlogPost`
  - Renders full article body from `post.body` (map over `BlogBlock[]`)
  - Read-progress bar (scroll-based)
  - Like/Share buttons that call `increment_blog_stat` via Supabase client
  - Not found handling

- [x] **2.4.2d** Port `BlogStudio` from `lib/widgets/blog-detail.js`:
  - Client Component (rich editor, auto-save, publish)
  - Full-screen editor with title, slug, domain picker, tags, blocks editor
  - Auto-save with 1.5s debounce via `useEffect` + `setTimeout`
  - Publish/save draft/delete buttons
  - Image upload (picker → Supabase Storage)

- [x] **2.4.2e** Create `BlogStats` component:
  - Client Component
  - Displays likes, views, reads, shares for a post
  - Calls `increment_blog_stat` RPC on interaction

#### 2.4.3 Project Components

- [x] **2.4.3a** Port `ProductCard` from `lib/widgets/product-card.js`:
  - Server Component
  - Props: `project: Project`
  - Renders: icon (SVG), title, description, tech stack badges, link

#### 2.4.4 UI Components

- [x] **2.4.4a** Port `SolutionCard` from `lib/widgets/solution-card.js`
- [x] **2.4.4b** Port `CardSection` from `lib/widgets/card-section.js`
- [x] **2.4.4c** Port `FeaturedProduct` from `lib/widgets/featured-product.js`
- [x] **2.4.4d** Port `TechMarquee` from `lib/widgets/tech-marquee.js`
- [x] **2.4.4e** Port `ProcessSteps` from `lib/widgets/process-steps.js`
- [x] **2.4.4f** Port `Careers` from `lib/widgets/careers.js`
- [x] **2.4.4g** Create `ScrollReveal` — client component:
  ```typescript
  'use client'

  import { useEffect, useRef, type ReactNode } from 'react'

  export function ScrollReveal({ children, className = '' }: { children: ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const el = ref.current
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('visible')
            observer.unobserve(el)
          }
        },
        { threshold: 0.1 }
      )
      observer.observe(el)
      return () => observer.disconnect()
    }, [])

    return (
      <div ref={ref} className={`reveal ${className}`}>
        {children}
      </div>
    )
  }
  ```

---

## Phase 3: Pages Migration

**Goal**: Create all 9 route pages, mirroring the current site's content and structure.

### Page Creation Order (dependencies first)

- [ ] **3.1 — Home page**: `src/app/page.tsx`
  - Server Component
  - Fetches featured projects + published blog posts via queries
  - Sections in order: Hero (hardcoded) → FeaturedProduct → TechMarquee → CardSection(solutions, hardcoded) → CardSection(products, from Supabase) → CardSection(blog previews, from Supabase) → ProcessSteps → TeamSection (hardcoded) → ContactForm
  - Export `generateMetadata()` for SEO

- [ ] **3.2 — Services page**: `src/app/services/page.tsx`
  - Server Component, fully hardcoded data
  - Grid of service offerings with icons

- [ ] **3.3 — Products page**: `src/app/products/page.tsx`
  - Server Component
  - Fetches all projects from Supabase via `getProjects()`
  - Grid of `ProductCard` components

- [ ] **3.4 — About page**: `src/app/about/page.tsx`
  - Server Component, hardcoded company info + what-we-do cards + CTA

- [ ] **3.5 — Blog listing page**: `src/app/blogs/page.tsx`
  - Server Component
  - Fetches published posts grouped by domain via `getPublishedPosts()`
  - Uses `BlogSections` component

- [ ] **3.6 — Blog detail page**: `src/app/blogs/[slug]/page.tsx`
  - Server Component with `export async function generateMetadata()`
  - Fetches post via `getPostBySlug(slug)` + stats via `getPostStats()`
  - If not found, calls `notFound()`
  - Uses `BlogDetail` client component for the interactive article
  - `generateMetadata` reads post title/description for SEO

- [ ] **3.7 — Contact page**: `src/app/contact/page.tsx`
  - Client Component (form handling)
  - Either POST to FormSubmit.io (keep existing) or use `lib/actions/contact.ts` Server Action
  - Contact form with name, email, subject, message fields

- [ ] **3.8 — Careers page**: `src/app/careers/page.tsx`
  - Server Component, hardcoded open roles listing
  - Uses `Careers` component

### Page Details for Each Route

#### 3.1 Home Page (`app/page.tsx`)

```typescript
import { getFeaturedProjects } from '@/lib/queries/projects'
import { getPublishedPosts } from '@/lib/queries/blog'
import { FeaturedProduct } from '@/components/ui/featured-product'
import { TechMarquee } from '@/components/ui/tech-marquee'
import { CardSection } from '@/components/ui/card-section'
// ... other imports

export default async function HomePage() {
  const [projects, posts] = await Promise.all([
    getFeaturedProjects(),
    getPublishedPosts(),
  ])

  return (
    <>
      {/* Hero Section — hardcoded JSX */}
      <FeaturedProduct projects={projects} />
      <TechMarquee />
      <CardSection title="Solutions" items={SOLUTIONS} ... />
      <CardSection title="Products" items={projects} ... />
      <CardSection title="Latest Blogs" items={posts.slice(0, 3)} ... />
      {/* ProcessSteps, TeamSection, ContactForm */}
    </>
  )
}
```

#### 3.6 Blog Detail (`app/blogs/[slug]/page.tsx`)

```typescript
import { getPostBySlug, getPostStats } from '@/lib/queries/blog'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.published_date ?? undefined,
      images: post.thumbnail ? [{ url: post.thumbnail }] : [],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()
  const stats = await getPostStats(post.id)

  return <BlogDetail post={post} stats={stats} />
}
```

---

## Phase 4: Supabase Setup

**Goal**: Create Supabase project, run schema, configure OAuth, seed data.

- [ ] **4.1** Go to [database.new](https://database.new) and create a new Supabase project
  - Choose a strong DB password, save it
  - Region: closest to your target audience

- [ ] **4.2** Get API credentials:
  - Go to Project Settings → API
  - Copy `Project URL` → `.env.local` as `NEXT_PUBLIC_SUPABASE_URL`
  - Copy `anon public key` → `.env.local` as `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - Copy `service_role key` → `.env.local` as `SUPABASE_SERVICE_ROLE_KEY`
  - Set `NEXT_PUBLIC_SITE_URL` to `http://localhost:3000` (dev) / `https://yourdomain.com` (prod)

- [ ] **4.3** Run the full SQL schema in Supabase SQL Editor:
  - Execute all CREATE TABLE statements (profiles, blog_posts, blog_stats, projects, contact_messages)
  - Execute all CREATE INDEX statements
  - Execute all RLS policy statements
  - Execute `increment_blog_stat` SECURITY DEFINER function
  - Execute `create_blog_stats_row` trigger function
  - Enable RLS on all tables: `ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;` (repeat for each table)

- [ ] **4.4** Enable OAuth providers in Supabase Dashboard:
  - Authentication → Providers → Google: enable, add Client ID + Client Secret from Google Cloud Console
  - Authentication → Providers → GitHub: enable, add Client ID + Client Secret from GitHub OAuth App
  - Authentication → URL Configuration: add `http://localhost:3000/auth/callback` and `https://yourdomain.com/auth/callback`

- [ ] **4.5** Create Supabase Storage bucket:
  - Storage → New bucket → name: `blog-images`, public, no file size limit (or 10MB max)

- [ ] **4.6** Seed data:
  - **Admin profile**: Manually insert your profile row (get your user ID after first OAuth login, or use a known UUID)
    ```sql
    INSERT INTO profiles (id, name, avatar_url, role)
    VALUES ('your-user-uuid', 'Your Name', 'https://...', 'Admin');
    ```
  - **3 blog posts**: Run INSERT statements for each post (extract content from `blog-detail.js` lines 52–129)
  - **2 projects**: Run INSERT for TenantPlane + MotoAdmin (from `product-card.js`)
  - Verify seed data: `SELECT * FROM blog_posts; SELECT * FROM projects;`

---

## Phase 5: Authentication (Supabase OAuth)

**Goal**: Implement OAuth login/logout with Google + GitHub, protect `/studio` routes.

- [ ] **5.1** Create `src/components/providers/auth-provider.tsx`:

```typescript
'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { User } from '@supabase/supabase-js'

interface AuthContextValue {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextValue>({ user: null, loading: true })

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      router.refresh()
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
```

- [ ] **5.2** Create `src/app/auth/page.tsx` — Login page with OAuth buttons:

```typescript
import { signIn } from '@/lib/actions/auth'
import { AuthButton } from '@/components/auth/auth-button'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-6 rounded-xl border p-8">
        <h1 className="text-2xl font-bold text-center">Sign in to deboistech</h1>
        <form action={signIn.bind(null, 'google')}>
          <button type="submit" className="w-full btn-primary">Continue with Google</button>
        </form>
        <form action={signIn.bind(null, 'github')}>
          <button type="submit" className="w-full btn-secondary">Continue with GitHub</button>
        </form>
      </div>
    </div>
  )
}
```

- [ ] **5.3** Create `src/app/auth/callback/route.ts` — OAuth callback handler:

```typescript
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/studio'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) return NextResponse.redirect(`${origin}${next}`)
  }

  return NextResponse.redirect(`${origin}/auth?error=AuthError`)
}
```

- [ ] **5.4** Create `src/middleware.ts` — route protection + session refresh:

```typescript
import { updateSession } from '@/lib/supabase/middleware'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request)
  const { pathname } = request.nextUrl

  // Protect /studio and all sub-routes
  if (pathname.startsWith('/studio') && !user) {
    const url = new URL('/auth', request.url)
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

- [ ] **5.5** Create `src/app/auth/login-modal.tsx` — Modal with OAuth buttons:
  - Client component
  - Replaces the old passphrase modal in blog sections
  - Shows "Sign in to write" — triggers OAuth flow

- [ ] **5.6** Remove `lib/js/auth.js` — no more hardcoded passphrase
- [ ] **5.7** Add `NEXT_PUBLIC_SITE_URL` to `.env.local`

---

## Phase 6: Blog CRUD + Studio

**Goal**: Build the full blog management interface at `/studio`.

- [ ] **6.1** Create `src/app/studio/page.tsx`:
  - Client Component (since it uses auth + editor interactions)
  - Protected by middleware (Phase 5.4)
  - Fetches all posts authored by current user (published + drafts)
  - Shows list of posts with Edit/Delete buttons
  - "New Post" button opens editor

- [ ] **6.2** Port `renderBlogStudio()` + `initBlogStudio()` into `BlogStudio` component:
  - Full rich editor with:
    - Title input
    - Slug input (auto-generated from title, editable)
    - Domain select (ml/devops/web/general)
    - Tags input (comma-separated)
    - Thumbnail URL + alt text
    - Block-based body editor (add/remove/reorder BlogBlocks)
  - Replaces old DOM-based rendering with React state

- [ ] **6.3** Wire auto-save (1.5s debounce):
  ```typescript
  const [dirty, setDirty] = useState(false)
  const saveTimer = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (!dirty) return
    saveTimer.current = setTimeout(async () => {
      const formData = new FormData()
      // ... populate formData from state
      await upsertPost(formData)
      setDirty(false)
    }, 1500)
    return () => clearTimeout(saveTimer.current)
  }, [dirty, formDataState])
  ```

- [ ] **6.4** Wire publish button:
  - Sets `status = 'published'` and `published_date = now()`
  - Calls `upsertPost` with status='published'

- [ ] **6.5** Wire delete:
  - Confirmation dialog
  - Calls `deletePost` Server Action

- [ ] **6.6** Implement image upload:
  - File input → onChange → upload to Supabase Storage `blog-images` bucket
  - Returns public URL → insert as image block
  ```typescript
  const supabase = createClient()
  const { data } = await supabase.storage
    .from('blog-images')
    .upload(`posts/${Date.now()}_${file.name}`, file)
  const publicUrl = supabase.storage.from('blog-images').getPublicUrl(data.path).data.publicUrl
  ```

- [ ] **6.7** Create `src/app/api/revalidate/route.ts`:
  ```typescript
  import { revalidatePath } from 'next/cache'
  import { NextRequest, NextResponse } from 'next/server'

  export async function GET(request: NextRequest) {
    const secret = request.nextUrl.searchParams.get('secret')
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }
    revalidatePath('/blogs')
    return NextResponse.json({ revalidated: true })
  }
  ```

- [ ] **6.8** Test full cycle:
  1. Navigate to `/auth` → sign in with Google/GitHub
  2. Navigate to `/studio` → "New Post"
  3. Type title → slug auto-fills → choose domain → add blocks
  4. Wait 1.5s → auto-save triggers (status = draft)
  5. Preview: not visible on `/blogs` yet
  6. Click "Publish" → status changes to published
  7. Navigate to `/blogs` → post appears
  8. Click post → `/blogs/[slug]` renders full article with stats
  9. Delete post → removed from `/blogs`

---

## Phase 7: Projects from DB

**Goal**: Replace hardcoded project data with Supabase queries.

- [ ] **7.1** Update `src/app/page.tsx`:
  - Replace hardcoded project array with `const projects = await getFeaturedProjects()`
  - Pass to `CardSection(products)` and `FeaturedProduct`

- [ ] **7.2** Update `src/app/products/page.tsx`:
  - Fetch all projects via `getProjects()`
  - Render as grid of `ProjectCard` components
  - Tech stack badges, description, links

- [ ] **7.3** Verify TenantPlane + MotoAdmin render correctly from DB:
  - Check icon (SVG), title, description, tech_stack, link all display
  - Verify sorting respects `sort_order`

---

## Phase 8: Contact Form

**Goal**: Choose and implement contact form handling.

- [ ] **8.1** Decision: keep FormSubmit.io OR use Supabase `contact_messages` table

**Option A — FormSubmit (keep existing):**
- [ ] **8.2a** Create `src/app/contact/page.tsx` as a Client Component
- [ ] **8.3a** Form POSTs to `https://formsubmit.io/send/your-form-id`
- [ ] **8.4a** On success → show "Thank you" message, on error → show error

**Option B — Supabase (recommended):**
- [ ] **8.2b** Add environment variable `CONTACT_EMAIL` for notification
- [ ] **8.3b** `src/app/contact/page.tsx` uses Server Action `submitContact` from `lib/actions/contact.ts`
- [ ] **8.4b** Create `src/lib/actions/contact.ts` (already defined in 2.3.3d)
- [ ] **8.5b** Optional: set up Supabase Edge Function or pg_notify for email notifications
- [ ] **8.6b** On success → `revalidatePath('/contact')` + return success message

---

## Phase 9: SEO & Polish

**Goal**: Full SEO metadata, sitemap, RSS feed, error pages, loading states.

- [ ] **9.1** Add `generateMetadata()` to all pages:

| Page | Dynamic Fields |
|---|---|
| `/` | Static: "deboistech — AI, DevOps & Web Solutions" |
| `/services` | Static: "Services — deboistech" |
| `/products` | Static: "Products — deboistech" |
| `/about` | Static: "About — deboistech" |
| `/blogs` | Static: "Blog — deboistech" |
| `/blogs/[slug]` | Dynamic: post.title, post.description, OG tags |
| `/contact` | Static: "Contact — deboistech" |
| `/careers` | Static: "Careers — deboistech" |

- [ ] **9.2** Create `src/app/sitemap.ts`:

```typescript
import type { MetadataRoute } from 'next'
import { getAllSlugs as getBlogSlugs } from '@/lib/queries/blog'
import { getAllProjectSlugs } from '@/lib/queries/projects'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://deboistech.com'

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 1 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/blogs`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/careers`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
  ]

  const [blogSlugs, projectSlugs] = await Promise.all([
    getBlogSlugs(),
    getAllProjectSlugs(),
  ])

  const blogPages = blogSlugs.map(slug => ({
    url: `${baseUrl}/blogs/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const projectPages = projectSlugs.map(slug => ({
    url: `${baseUrl}/products/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...blogPages, ...projectPages]
}
```

- [ ] **9.3** Create `src/app/feed.xml/route.ts` — RSS feed:

```typescript
import { getPublishedPosts } from '@/lib/queries/blog'

export async function GET() {
  const posts = await getPublishedPosts()
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://deboistech.com'

  const items = posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${baseUrl}/blogs/${post.slug}</link>
      <guid>${baseUrl}/blogs/${post.slug}</guid>
      <pubDate>${new Date(post.published_date ?? post.created_at).toUTCString()}</pubDate>
      ${post.tags.map(tag => `<category>${tag}</category>`).join('')}
    </item>
  `).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>deboistech Blog</title>
      <link>${baseUrl}/blogs</link>
      <description>AI, DevOps, Web & General tech insights from deboistech</description>
      <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
      ${items}
    </channel>
  </rss>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}
```

- [ ] **9.4** Create `src/app/not-found.tsx` — custom 404 page
  - Server Component, styled to match site theme
  - "Page not found" message + link to home

- [ ] **9.5** Create `src/app/blogs/loading.tsx`:
  - Skeleton grid of 6 placeholder cards (pulsing grey boxes)

- [ ] **9.6** Create `src/app/blogs/[slug]/loading.tsx`:
  - Skeleton article layout (title bar, content blocks, stats bar)

- [ ] **9.7** Create `src/app/error.tsx`:
  - Client Component with `'use client'`
  - Shows error message + "Try again" button
  - Wraps the app in error boundary

---

## Phase 10: Deploy

**Goal**: Deploy the NextJS app to Vercel, switch DNS, verify everything.

- [ ] **10.1** Push to a new GitHub repository or new branch
  ```bash
  git init
  git add .
  git commit -m "Initial NextJS + Supabase conversion"
  git remote add origin https://github.com/yourusername/deboistech-next.git
  git push -u origin main
  ```

- [ ] **10.2** Connect to Vercel:
  - Go to [vercel.com](https://vercel.com) → Add New Project
  - Import the GitHub repo
  - Framework preset auto-detects Next.js
  - Add environment variables:
    - `NEXT_PUBLIC_SUPABASE_URL`
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
    - `SUPABASE_SERVICE_ROLE_KEY`
    - `NEXT_PUBLIC_SITE_URL` (set to `https://yourdomain.com`)
    - `REVALIDATION_SECRET` (random string for on-demand revalidation)

- [ ] **10.3** Deploy production branch (main)
- [ ] **10.4** Update DNS:
  - In your domain registrar, set CNAME record to `cname.vercel-dns.com`
  - Or follow Vercel's DNS configuration steps for your domain

- [ ] **10.5** Add production callback URLs to Supabase:
  - Authentication → URL Configuration → add `https://yourdomain.com/auth/callback`

- [ ] **10.6** Verify everything on the live domain:
  - All 9 pages load
  - Blog posts render from DB
  - Projects render from DB
  - Google/GitHub OAuth works
  - `/studio` is protected
  - Contact form submits correctly
  - RSS feed at `/feed.xml`
  - Sitemap at `/sitemap.xml`
  - 404 page for unknown routes
  - Meta tags correct (inspect page source)

- [ ] **10.7** Remove old static deployment (or redirect to new URL)
- [ ] **10.8** (Optional) Set up Vercel Analytics + Speed Insights

---

## Effort Summary (Updated with Tailwind v4 migration)

| Phase                                     | Time     | Key Risk                                               |
| ----------------------------------------- | -------- | ------------------------------------------------------ |
| 0 — Deploy current site                   | 1 hr     | None                                                   |
| 1 — NextJS scaffold                       | 3–5 hrs  | Tailwind v3→v4 config migration learning curve         |
| 2 — Layout, types, queries, 15 components | 2–3 days | Porting vanilla DOM logic to React component lifecycle |
| 3 — Migrate 9 pages                       | 2 days   | Ensuring all hardcoded data is correctly ported         |
| 4 — Supabase schema + seed                | 1 day    | RLS policy mistakes, SECURITY DEFINER pitfalls         |
| 5 — OAuth + protected routes              | 1 day    | Cookie handling across browser/server/middleware        |
| 6 — Blog CRUD + studio                    | 2–3 days | Rich editor complexity, auto-save timing issues         |
| 7 — Projects from DB                      | 4–6 hrs  | None (straightforward query swap)                      |
| 8 — Contact form                          | 2–4 hrs  | None (simple form)                                     |
| 9 — SEO / sitemap / polish                | 1 day    | Dynamic metadata edge cases                            |
| 10 — Deploy                               | 2–4 hrs  | DNS propagation delay                                   |

**Total: ~10–14 days full-time.** (Same estimate, but each phase now has detailed sub-steps.)

---

## Environment Variables Reference

| Variable | Where to use | Source |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | All 3 Supabase clients | Supabase Dashboard → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | All 3 Supabase clients | Supabase Dashboard → Settings → API → anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin operations (projects, contact read) | Supabase Dashboard → Settings → API → service_role key |
| `NEXT_PUBLIC_SITE_URL` | Auth callback, sitemap, RSS, canonical URLs | Your domain (dev: `http://localhost:3000`) |
| `REVALIDATION_SECRET` | `app/api/revalidate/route.ts` | Random string you generate |

---

## Quick Reference: Key Commands

```bash
# Development
npm run dev                    # Start dev server (Turbopack by default in NextJS 16)
npm run build                  # Production build
npm run lint                   # ESLint check

# Scaffold (do once)
npx create-next-app@latest deboistech-next --typescript --app --tailwind --eslint --src-dir

# Dependencies
npm install @supabase/supabase-js @supabase/ssr
npm install @tailwindcss/postcss  # Already included by --tailwind flag

# Deploy
npx vercel --prod
```
