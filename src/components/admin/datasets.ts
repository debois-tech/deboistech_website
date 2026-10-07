// Registry of editable content files. Add a file to /content, import it here,
// and it shows up in the /admin sidebar automatically.
import site from "@content/site.json";
import services from "@content/services.json";
import home from "@content/home.json";
import about from "@content/about.json";
import contact from "@content/contact.json";
import careers from "@content/careers.json";
import faq from "@content/faq.json";
import products from "@content/products.json";
import blog from "@content/blog.json";
import type { Json } from "@/lib/json-edit";

export interface Dataset {
  key: string;
  label: string;
  file: string;
  hint: string;
  /** What is in the repo right now. */
  published: Json;
}

const d = (key: string, label: string, hint: string, published: unknown): Dataset => ({
  key,
  label,
  file: `${key}.json`,
  hint,
  published: published as Json,
});

export const DATASETS: Dataset[] = [
  d("careers", "Careers", "Open roles on /careers. Each role needs a title, tags and an apply link.", careers),
  d("products", "Products", "Cards on the home page and /products. Tick Featured to show on the home page.", products),
  d("blog", "Blog posts", "Write, preview and publish. Drafts stay hidden until status is Published.", blog),
  d("services", "Services", "The Build / Scale / Accelerate tiers. Tick Featured to show on the home page.", services),
  d("faq", "FAQ", "Questions on /faq. Tick Show on about for the short list on /about.", faq),
  d("about", "About & team", "What-we-do cards and the team on /about.", about),
  d("home", "Home page", "Featured product, technology logos, process steps and culture pillars.", home),
  d("contact", "Contact", "Trust points and the topic dropdown on the contact form.", contact),
  d("site", "Site settings", "Name, tagline, emails, social links and the site URL.", site),
];
