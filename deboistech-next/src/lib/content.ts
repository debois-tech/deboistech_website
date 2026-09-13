// =============================================================
// Static site content — ported from the vanilla widgets in lib/widgets/.
//
// Only blog posts and projects live in Supabase. Everything else
// (services, tech logos, process steps, careers, FAQ, team) is
// editorial copy that changes with a deploy, so it lives here as
// typed data rather than in the database.
// =============================================================

import type { Project } from "@/lib/types";

// ── Site-wide constants ──────────────────────────────────────

export const SITE = {
  name: "deboistech",
  tagline: "Building Solutions. Empowering Futures.",
  description:
    "We build scalable software, AI solutions, and cloud-native products that help businesses innovate, grow, and lead in the digital era.",
  contactEmail: "connect@deboistech.in",
  hrEmail: "hr@deboistech.in",
  location: "Nashik, Maharashtra, India",
  socials: {
    github: "https://github.com/debois-tech",
    linkedin: "https://www.linkedin.com/company/deboistech",
  },
} as const;

/** Canonical origin. Falls back to the production domain at build time. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://deboistech.com"
).replace(/\/$/, "");

// ── Services (3 tiers × 3 offerings) ─────────────────────────

/** Heroicons outline path data — an array for multi-path glyphs. */
export type IconPath = string | string[];

export type ServiceTierId = "build" | "scale" | "accelerate";

export interface Service {
  tier: ServiceTierId;
  iconPath: IconPath;
  title: string;
  problem: string;
  solution: string;
  ctaLabel: string;
}

export interface ServiceTier {
  id: ServiceTierId;
  label: string;
  hook: string;
}

export const SERVICE_TIERS: ServiceTier[] = [
  { id: "build", label: "Build", hook: "Turn ideas into working software" },
  { id: "scale", label: "Scale", hook: "Make your systems handle growth" },
  {
    id: "accelerate",
    label: "Accelerate",
    hook: "Work smarter with AI and design",
  },
];

export const SERVICES: Service[] = [
  // ── Tier 1: Build ──
  {
    tier: "build",
    iconPath:
      "M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z",
    title: "Product Engineering",
    problem:
      "Your product roadmap keeps slipping because your team is juggling too many priorities.",
    solution:
      "We embed a dedicated squad that owns the full lifecycle — from architecture to launch — so you hit milestones without burning out your internal team.",
    ctaLabel: "Talk to us about Product Engineering",
  },
  {
    tier: "build",
    iconPath: "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5",
    title: "Web Development",
    problem: "Your current site looks dated, loads slowly, and converts poorly.",
    solution:
      "We build fast, responsive web apps on modern stacks (React, Next.js, Node) with performance and SEO baked in from day one.",
    ctaLabel: "Talk to us about Web Development",
  },
  {
    tier: "build",
    iconPath:
      "M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3",
    title: "Mobile Apps",
    problem:
      "Your users expect a native app experience, but cross-platform tools feel limiting.",
    solution:
      "We choose the right approach — native, Flutter, or React Native — based on your performance needs and timeline. No one-size-fits-all.",
    ctaLabel: "Talk to us about Mobile Apps",
  },

  // ── Tier 2: Scale ──
  {
    tier: "scale",
    iconPath:
      "M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z",
    title: "Cloud Engineering",
    problem:
      "Your cloud bill is unpredictable and your infrastructure can't handle traffic spikes.",
    solution:
      "We design auto-scaling, cost-optimized architectures on AWS, Azure, or GCP with Infrastructure as Code and CI/CD from day one.",
    ctaLabel: "Talk to us about Cloud Engineering",
  },
  {
    tier: "scale",
    iconPath: "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5",
    title: "Enterprise Applications",
    problem: "Your teams work in silos because your systems don't talk to each other.",
    solution:
      "We build API-first microservices and integrate legacy systems so data flows seamlessly across your organization.",
    ctaLabel: "Talk to us about Enterprise Applications",
  },
  {
    tier: "scale",
    iconPath: [
      "M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z",
      "M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    ],
    title: "DevOps & Automation",
    problem:
      "Releases are stressful and your team spends more time fixing deployments than shipping features.",
    solution:
      "We set up CI/CD pipelines, container orchestration, and monitoring so your team deploys confidently, multiple times a day.",
    ctaLabel: "Talk to us about DevOps & Automation",
  },

  // ── Tier 3: Accelerate ──
  {
    tier: "accelerate",
    iconPath:
      "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z",
    title: "AI Solutions",
    problem: "You're sitting on data but can't turn it into actionable insights.",
    solution:
      "We integrate LLMs, build custom models, and automate workflows so your team makes decisions faster and your product gets smarter.",
    ctaLabel: "Talk to us about AI Solutions",
  },
  {
    tier: "accelerate",
    iconPath:
      "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42",
    title: "UI/UX Design",
    problem: "Users sign up but don't stick around — your product is hard to use.",
    solution:
      "We run user research, wireframe flows, and prototype before a single line of code is written. Design that actually converts.",
    ctaLabel: "Talk to us about UI/UX Design",
  },
  {
    tier: "accelerate",
    iconPath:
      "M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18",
    title: "Consulting",
    problem:
      "You need a technical strategy but don't want a 100-page deck you'll never read.",
    solution:
      "We deliver actionable roadmaps, architecture reviews, and hands-on advisory — practical advice you can execute next week.",
    ctaLabel: "Talk to us about Consulting",
  },
];

/** Home page shows one representative offering from each tier. */
export const SOLUTIONS: Service[] = [SERVICES[0], SERVICES[3], SERVICES[6]];

// ── Featured product spotlight ───────────────────────────────

export const FEATURED_PRODUCT = {
  eyebrow: "Featured product",
  titleLead: "Tenant",
  titleAccent: "Plane",
  description:
    "A Kubernetes management platform built to simplify cluster provisioning, monitoring, deployment, and operations across cloud environments.",
  items: [
    "Cluster Management",
    "RBAC & Access Control",
    "Multi Cloud Ready",
    "Monitoring & Alerts",
    "Deployment Automation",
    "Developer Friendly",
  ],
  link: "https://tenantplane.deboistech.in/",
  linkLabel: "Explore TenantPlane",
  image: "/images/products/tenantplane.png",
  imageAlt: "TenantPlane dashboard screenshot",
} as const;

// ── Trusted technologies marquee ─────────────────────────────

export interface TechLogo {
  src: string;
  alt: string;
  /** Intrinsic height override in px — some logos have different aspect ratios. */
  height?: number;
}

export const TECH_LOGOS: TechLogo[] = [
  { src: "/images/trusted_tech/aws.svg", alt: "AWS" },
  { src: "/images/trusted_tech/docker.png", alt: "Docker" },
  { src: "/images/trusted_tech/flutter.png", alt: "Flutter", height: 32 },
  { src: "/images/trusted_tech/gcloud.png", alt: "Google Cloud", height: 64 },
  { src: "/images/trusted_tech/kubernetes.png", alt: "Kubernetes" },
  { src: "/images/trusted_tech/micro.png", alt: "Microsoft" },
  { src: "/images/trusted_tech/mongo.png", alt: "MongoDB" },
  { src: "/images/trusted_tech/node.png", alt: "Node.js" },
];

// ── Development process ──────────────────────────────────────

export interface ProcessStep {
  iconPath: IconPath;
  title: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    iconPath:
      "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
    title: "Discover",
    description: "Understanding your business and goals",
  },
  {
    iconPath:
      "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10",
    title: "Design",
    description: "Planning architecture and user experience",
  },
  {
    iconPath: "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5",
    title: "Develop",
    description: "Building scalable and high-quality software",
  },
  {
    iconPath:
      "M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5",
    title: "Deploy",
    description: "Secure deployment and migration",
  },
  {
    iconPath:
      "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155",
    title: "Support",
    description: "Continuous support and improvement",
  },
];

// ── Home page: team & culture pillars ────────────────────────

export const CULTURE_PILLARS: ProcessStep[] = [
  {
    iconPath:
      "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z",
    title: "Collaborative by Nature",
    description:
      "We believe the best solutions come from diverse minds working together.",
  },
  {
    iconPath:
      "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25",
    title: "Learning Always",
    description:
      "We encourage curiosity and invest in continuous learning and growth.",
  },
  {
    iconPath:
      "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
    title: "Ownership First",
    description:
      "We take ownership of challenges and are committed to delivering impact.",
  },
];

// ── Contact page: trust indicators ───────────────────────────

export const CONTACT_ASSURANCES: ProcessStep[] = [
  {
    iconPath:
      "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155",
    title: "Quick Response",
    description: "Reply within 24 business hours",
  },
  {
    iconPath:
      "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
    title: "Confidential",
    description: "Your info is safe with us",
  },
  {
    iconPath:
      "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z",
    title: "Free Consultation",
    description: "Let's discuss your idea and find the right path",
  },
];

export const CONTACT_TOPICS = [
  "Cloud Engineering",
  "AI Solutions",
  "Enterprise Applications",
  "Product Engineering",
  "Other",
] as const;

// ── About page ───────────────────────────────────────────────

export const ABOUT_CAPABILITIES = [
  {
    title: "IT Solutions",
    description:
      "Custom software, web apps, cloud infrastructure, automation, integrations, and support for growing businesses.",
  },
  {
    title: "ERP-Grade Products",
    description:
      "Workflow platforms, admin systems, dashboards, billing flows, CRM modules, and operations tools built with enterprise discipline.",
  },
  {
    title: "Open-Source Products",
    description:
      "Reusable engineering assets and public products that improve transparency, developer adoption, and long-term maintainability.",
  },
  {
    title: "Industrial Training Programs",
    description:
      "Project-led training in software development, cloud, DevOps, full-stack engineering, and production-ready team workflows.",
  },
] as const;

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin: string;
}

export const TEAM: TeamMember[] = [
  {
    name: "Omkar Kokane",
    role: "CEO",
    image: "/images/employee/omkar.jpeg",
    linkedin: "https://www.linkedin.com/in/omkar-kokane/",
  },
  {
    name: "Aditya Bankar",
    role: "CTO",
    image: "/images/employee/aditya.PNG",
    linkedin: "https://www.linkedin.com/in/adityabankar21/",
  },
  {
    name: "Yash Pawar",
    role: "DevOps Engineer",
    image: "/images/employee/yash.jpeg",
    linkedin: "https://www.linkedin.com/in/yash-pawar-862702287/",
  },
  {
    name: "Vedant Wagh",
    role: "Software Development Engineer",
    image: "/images/employee/vedant.jpeg",
    linkedin: "https://www.linkedin.com/in/vedantwagh1405/",
  },
  {
    name: "Sakshi Dhatrak",
    role: "ML Engineer",
    image: "/images/employee/sakshi.jpeg",
    linkedin: "https://www.linkedin.com/in/sakshidhatrak/",
  },
];

// ── Careers ──────────────────────────────────────────────────

export const CAREER_APPLY_URL = `mailto:${SITE.hrEmail}`;

export interface OpenRole {
  iconPath: IconPath;
  title: string;
  description: string;
  tags: string[];
  applyUrl: string;
}

export const OPEN_ROLES: OpenRole[] = [
  {
    iconPath:
      "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
    title: "UI/UX Intern",
    description:
      "Help shape the visual identity of our products. Work on UI/UX design, branding, and marketing assets alongside our engineering team.",
    tags: ["Remote", "Internship", "Part-Time"],
    applyUrl: "https://forms.gle/YSRR41uF4pX58DcH8",
  },
];

// ── FAQ ──────────────────────────────────────────────────────

export interface FaqItem {
  q: string;
  /** Plain paragraph answer. */
  a: string;
  /** Optional bullet list rendered under the answer. */
  bullets?: string[];
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "What services does deboistech provide?",
    a: "We provide end-to-end technology solutions, including:",
    bullets: [
      "Website Development",
      "Mobile App Development",
      "Custom Software Development",
      "AI & Machine Learning Solutions",
      "ERP Development",
      "CRM Development",
      "UI/UX Design",
      "Graphic Design & Branding",
      "SEO Services",
      "GEO (Generative Engine Optimization)",
      "DevOps & Cloud Solutions",
      "SaaS Product Development",
      "API Development & Integrations",
      "Website Maintenance & Support",
    ],
  },
  {
    q: "Is deboistech a software company or a digital agency?",
    a: "deboistech is a technology company that combines software engineering, product development, cloud technologies, AI, and creative design services. We work with startups, SMEs, educational institutions, and enterprises to build scalable digital products and business solutions.",
  },
  {
    q: "Where is deboistech located?",
    a: "deboistech is based in Nashik, Maharashtra, and serves clients across India and internationally through remote collaboration and online project delivery.",
  },
  {
    q: "Do you work with clients outside Nashik?",
    a: "Yes. Although we are headquartered in Nashik, we work with businesses, startups, educational institutions, and organizations across India and overseas.",
  },
  {
    q: "Why should I choose deboistech?",
    a: "We focus on understanding business problems before writing code. Our team combines technical expertise, modern technologies, user-centric design, and scalable architecture to deliver reliable digital solutions tailored to each client's goals.",
  },
  {
    q: "Can deboistech build a website for my business?",
    a: "Yes. We design and develop business websites, corporate websites, portfolio websites, eCommerce stores, educational platforms, landing pages, and custom web applications optimized for performance, SEO, and user experience.",
  },
  {
    q: "Do you develop mobile applications?",
    a: "Yes. We develop Android, iOS, and cross-platform mobile applications tailored to your business requirements using modern development frameworks.",
  },
  {
    q: "Do you build custom software?",
    a: "Yes. We specialize in developing custom software solutions for businesses, including internal management systems, automation tools, customer portals, and enterprise applications.",
  },
  {
    q: "Does deboistech develop ERP and CRM systems?",
    a: "Yes. We develop customized ERP and CRM solutions that help businesses manage operations, inventory, customers, sales, employees, finance, and reporting efficiently.",
  },
  {
    q: "Do you provide AI development services?",
    a: "Yes. We build AI-powered applications, intelligent automation solutions, chatbots, document processing systems, recommendation engines, and machine learning solutions for businesses.",
  },
  {
    q: "Can you redesign my existing website?",
    a: "Absolutely. We can redesign outdated websites to improve visual appearance, mobile responsiveness, speed, SEO performance, accessibility, and user experience.",
  },
  {
    q: "Do you provide UI/UX and graphic design services?",
    a: "Yes. Our design services include UI/UX design, branding, logo design, marketing creatives, social media graphics, presentations, and complete brand identity design.",
  },
  {
    q: "What industries do you work with?",
    a: "We work with startups, educational institutions, healthcare organizations, manufacturing companies, retail businesses, hospitality, logistics, professional services, and many other industries.",
  },
  {
    q: "Do you provide SEO services?",
    a: "Yes. We help businesses improve their online visibility through technical SEO, on-page optimization, local SEO, content strategy, website performance optimization, and search engine best practices.",
  },
  {
    q: "What is GEO (Generative Engine Optimization)?",
    a: "Generative Engine Optimization (GEO) focuses on making your business and content discoverable by AI-powered search experiences like ChatGPT, Google AI Overviews, Gemini, and other AI assistants through structured, authoritative, and helpful content.",
  },
  {
    q: "Can deboistech help my business appear in AI search results?",
    a: "Yes. We create AI-friendly content, structured website architecture, FAQ sections, schema markup, knowledge content, and technical optimizations that improve the likelihood of your business being surfaced in AI-generated answers.",
  },
  {
    q: "How long does a typical project take?",
    a: "Project timelines depend on complexity. Simple websites may take a few weeks, while custom software, mobile applications, or enterprise solutions may require several months. A detailed timeline is shared before development begins.",
  },
  {
    q: "Do you offer website maintenance after launch?",
    a: "Yes. We provide ongoing maintenance, security updates, performance optimization, backups, feature enhancements, and technical support after your project goes live.",
  },
  {
    q: "How can I get a quote?",
    a: "Simply contact us with your project requirements. After understanding your goals, features, and timeline, we'll provide a customized proposal and estimate.",
  },
  {
    q: "Do you work with startups?",
    a: "Yes. We enjoy partnering with startups from the idea stage through product design, MVP development, scaling, and long-term technical support.",
  },
  {
    q: "Can I schedule a consultation before starting a project?",
    a: "Absolutely. We offer consultations to understand your business requirements, discuss possible solutions, recommend the right technology stack, and help you plan your project.",
  },
];

/** Short subset shown inline on the About page. */
export const ABOUT_FAQ_ITEMS: FaqItem[] = [
  FAQ_ITEMS[0],
  FAQ_ITEMS[2],
  FAQ_ITEMS[3],
  FAQ_ITEMS[4],
];

// ── Project fallbacks ────────────────────────────────────────
//
// The projects table is the source of truth once Supabase is wired
// up (Phase 4). Until then — and any time the query returns empty —
// these two seed rows keep the products surfaces populated. They
// match the shape of the `projects` table exactly, so the same
// components render both.

const EPOCH = "1970-01-01T00:00:00.000Z";

export const FALLBACK_PROJECTS: Project[] = [
  {
    id: "fallback-tenantplane",
    title: "TenantPlane",
    slug: "tenantplane",
    description:
      "Kubernetes management platform for cluster provisioning, monitoring, and operations across cloud environments.",
    full_description: "",
    icon_svg:
      '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />',
    icon_bg: "bg-primary-100",
    icon_color: "text-primary-600",
    image_url: "/images/products/tenantplanecropped.png",
    image_alt: "TenantPlane screenshot",
    link_url: "https://tenantplane.deboistech.in/",
    link_label: "Explore TenantPlane",
    link_target: "_blank",
    tech_stack: ["Kubernetes", "Go", "React", "AWS"],
    featured: true,
    sort_order: 0,
    created_at: EPOCH,
    updated_at: EPOCH,
  },
  {
    id: "fallback-motoadmin",
    title: "MotoAdmin",
    slug: "motoadmin",
    description:
      "Driving school management platform for customer CRM, document tracking, automated WhatsApp reminders, invoicing, and multi-branch operations.",
    full_description: "",
    icon_svg:
      '<path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75M8.25 15l1.5 1.5L12 13.5" />',
    icon_bg: "bg-orange-100",
    icon_color: "text-orange-600",
    image_url: "/images/products/motoadmin.png",
    image_alt: "MotoAdmin screenshot",
    link_url: "https://www.motoadmin.in/",
    link_label: "Explore MotoAdmin",
    link_target: "_blank",
    tech_stack: ["Next.js", "PostgreSQL", "WhatsApp API"],
    featured: true,
    sort_order: 1,
    created_at: EPOCH,
    updated_at: EPOCH,
  },
];
