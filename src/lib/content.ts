// Single entry point for site content. Every editable value lives in
// /content/*.json (edited via /admin, exported, committed, rebuilt).
// Import from here, never from the JSON files directly, so shapes stay typed.

import siteJson from "@content/site.json";
import servicesJson from "@content/services.json";
import homeJson from "@content/home.json";
import aboutJson from "@content/about.json";
import contactJson from "@content/contact.json";
import careersJson from "@content/careers.json";
import faqJson from "@content/faq.json";
import productsJson from "@content/products.json";
import blogJson from "@content/blog.json";
import type {
  AboutContent, BlogPost, CareersContent, ContactContent, FaqItem,
  HomeContent, Product, ServicesContent, Site,
} from "@/lib/types";

export const site = siteJson as Site;
export const services = servicesJson as ServicesContent;
export const home = homeJson as HomeContent;
export const about = aboutJson as AboutContent;
export const contact = contactJson as ContactContent;
export const careers = careersJson as CareersContent;
export const faq = faqJson as FaqItem[];
export const products = productsJson as Product[];

const posts = blogJson as unknown as BlogPost[];
/** Newest first; drafts never reach public pages. */
export const publishedPosts = posts
  .filter((post) => post.status === "published")
  .sort((a, b) => b.publishedDate.localeCompare(a.publishedDate));

export const SITE_URL = site.url.replace(/\/$/, "");
