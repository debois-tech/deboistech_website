export type BlogDomain = "ml" | "devops" | "web" | "general";

export interface BlogBlock {
  id: string;
  type: "heading" | "paragraph" | "image" | "code" | "list" | "quote";
  content?: string;
  level?: 1 | 2 | 3;
  language?: string;
  items?: string[];
  src?: string;
  alt?: string;
  caption?: string;
  attribution?: string;
}

export interface BlogPost {
  id: string; slug: string; title: string; description: string;
  thumbnail: string; thumbnail_alt: string; domain: BlogDomain; tags: string[];
  body: BlogBlock[]; status: "draft" | "published"; author_id: string | null;
  author_name: string; author_avatar: string; author_role: string;
  published_date: string | null; created_at: string; updated_at: string;
}

export interface BlogStats { post_id: string; views: number; reads: number; likes: number; shares: number; updated_at: string; }

export interface Project {
  id: string; title: string; slug: string; description: string; full_description: string;
  icon_svg: string; icon_bg: string; icon_color: string; image_url: string; image_alt: string;
  link_url: string; link_label: string; link_target: string; tech_stack: string[];
  featured: boolean; sort_order: number; created_at: string; updated_at: string;
}

export interface Profile { id: string; name: string; avatar_url: string | null; role: string; created_at: string; }
export interface ContactMessage { name: string; email: string; subject: string; message: string; }
