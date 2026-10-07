// Shapes of the JSON files in /content. Keep in sync with
// scripts/check-content.mjs, which validates exported files.

/** Heroicons outline path data; an array because some glyphs have several paths. */
export type IconPath = string[];

export interface Site {
  name: string;
  tagline: string;
  description: string;
  url: string;
  contactEmail: string;
  hrEmail: string;
  location: string;
  socials: { github: string; linkedin: string };
}

export type ServiceTierId = "build" | "scale" | "accelerate";
export interface ServiceTier { id: ServiceTierId; label: string; hook: string }
export interface Service {
  tier: ServiceTierId;
  iconPath: IconPath;
  title: string;
  problem: string;
  solution: string;
  ctaLabel: string;
  /** Shown in the home page "Solutions" strip. */
  featured: boolean;
}
export interface ServicesContent { tiers: ServiceTier[]; services: Service[] }

export interface IconItem { iconPath: IconPath; title: string; description: string }
export interface TechLogo { src: string; alt: string; height?: number }
export interface FeaturedProduct {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  description: string;
  items: string[];
  link: string;
  linkLabel: string;
  image: string;
  imageAlt: string;
}
export interface HomeContent {
  featuredProduct: FeaturedProduct;
  techLogos: TechLogo[];
  processSteps: IconItem[];
  culturePillars: IconItem[];
}

export interface TeamMember { name: string; role: string; image: string; linkedin: string }
export interface AboutContent {
  capabilities: { title: string; description: string }[];
  team: TeamMember[];
}

export interface ContactContent { assurances: IconItem[]; topics: string[] }

export interface Role {
  title: string;
  description: string;
  tags: string[];
  applyUrl: string;
  iconPath: IconPath;
}
export interface CareersContent {
  title: string;
  subtitle: string;
  generalApplyUrl: string;
  roles: Role[];
}

export interface FaqItem {
  q: string;
  a: string;
  bullets: string[];
  showOnAbout: boolean;
}

export interface Product {
  slug: string;
  title: string;
  description: string;
  iconPath: IconPath;
  iconBg: string;
  iconColor: string;
  image: string;
  imageAlt: string;
  linkUrl: string;
  linkLabel: string;
  linkTarget: string;
  techStack: string[];
  featured: boolean;
}

export type BlogDomain = "ml" | "devops" | "web" | "general";
export type BlockType = "heading" | "paragraph" | "image" | "code" | "list" | "quote";
export interface BlogBlock {
  type: BlockType;
  content?: string;
  level?: 2 | 3;
  language?: string;
  items?: string[];
  src?: string;
  alt?: string;
  caption?: string;
  attribution?: string;
}
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  thumbnailAlt: string;
  domain: BlogDomain;
  tags: string[];
  body: BlogBlock[];
  status: "draft" | "published";
  authorName: string;
  authorRole: string;
  /** ISO date, set when published. */
  publishedDate: string;
}
