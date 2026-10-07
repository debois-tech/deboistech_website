// Validates /content/*.json. Runs before every build (npm run check:content),
// so a bad file exported from /admin fails loudly instead of breaking pages.
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (name) => JSON.parse(fs.readFileSync(path.join(root, "content", `${name}.json`), "utf8"));
const errors = [];
const err = (file, msg) => errors.push(`content/${file}.json: ${msg}`);
const str = (file, where, v) => typeof v === "string" && v.trim() !== "" || err(file, `${where} must be a non-empty string`);
const list = (file, where, v) => Array.isArray(v) || (err(file, `${where} must be an array`), false);
const icon = (file, where, v) => list(file, where, v) && v.every((p) => typeof p === "string" && p) || err(file, `${where} must be a list of path strings`);
const localImage = (file, where, src) => {
  if (!str(file, where, src) || /^https?:\/\//.test(src)) return;
  if (!src.startsWith("/")) return err(file, `${where} must start with "/" or http`);
  if (!fs.existsSync(path.join(root, "public", src))) err(file, `${where} -> public${src} does not exist`);
};
const link = (file, where, v) => /^(https?:\/\/|mailto:|\/)/.test(v ?? "") || err(file, `${where} must be an http(s), mailto: or / link`);

const load = (name) => {
  try { return read(name); } catch (e) { err(name, `cannot parse (${e.message})`); return null; }
};

const site = load("site");
if (site) {
  for (const k of ["name", "tagline", "description", "url", "contactEmail", "hrEmail", "location"]) str("site", k, site[k]);
}

const services = load("services");
if (services && list("services", "tiers", services.tiers) && list("services", "services", services.services)) {
  const ids = new Set(services.tiers.map((t) => t.id));
  services.services.forEach((s, i) => {
    if (!ids.has(s.tier)) err("services", `services[${i}].tier "${s.tier}" is not a known tier`);
    str("services", `services[${i}].title`, s.title);
    icon("services", `services[${i}].iconPath`, s.iconPath);
  });
}

const home = load("home");
if (home) {
  localImage("home", "featuredProduct.image", home.featuredProduct?.image);
  link("home", "featuredProduct.link", home.featuredProduct?.link);
  if (list("home", "techLogos", home.techLogos)) home.techLogos.forEach((l, i) => localImage("home", `techLogos[${i}].src`, l.src));
  for (const k of ["processSteps", "culturePillars"]) {
    if (list("home", k, home[k])) home[k].forEach((s, i) => { str("home", `${k}[${i}].title`, s.title); icon("home", `${k}[${i}].iconPath`, s.iconPath); });
  }
}

const about = load("about");
if (about && list("about", "team", about.team)) about.team.forEach((m, i) => { str("about", `team[${i}].name`, m.name); localImage("about", `team[${i}].image`, m.image); link("about", `team[${i}].linkedin`, m.linkedin); });

const contact = load("contact");
if (contact) list("contact", "topics", contact.topics);

const careers = load("careers");
if (careers && list("careers", "roles", careers.roles)) {
  link("careers", "generalApplyUrl", careers.generalApplyUrl);
  careers.roles.forEach((r, i) => { str("careers", `roles[${i}].title`, r.title); link("careers", `roles[${i}].applyUrl`, r.applyUrl); icon("careers", `roles[${i}].iconPath`, r.iconPath); });
}

const faq = load("faq");
if (faq && list("faq", "root", faq)) faq.forEach((f, i) => { str("faq", `[${i}].q`, f.q); str("faq", `[${i}].a`, f.a); list("faq", `[${i}].bullets`, f.bullets); });

const products = load("products");
if (products && list("products", "root", products)) {
  const seen = new Set();
  products.forEach((p, i) => {
    if (seen.has(p.slug)) err("products", `duplicate slug "${p.slug}"`);
    seen.add(p.slug);
    str("products", `[${i}].title`, p.title); icon("products", `[${i}].iconPath`, p.iconPath);
    if (p.image) localImage("products", `[${i}].image`, p.image);
    if (p.linkUrl) link("products", `[${i}].linkUrl`, p.linkUrl);
  });
}

const blog = load("blog");
if (blog && list("blog", "root", blog)) {
  const seen = new Set();
  blog.forEach((p, i) => {
    const at = `[${i}] "${p.slug}"`;
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.slug ?? "")) err("blog", `${at}: slug must be lowercase-with-dashes`);
    if (seen.has(p.slug)) err("blog", `duplicate slug "${p.slug}"`);
    seen.add(p.slug);
    str("blog", `${at}.title`, p.title);
    if (!["ml", "devops", "web", "general"].includes(p.domain)) err("blog", `${at}: bad domain "${p.domain}"`);
    if (!["draft", "published"].includes(p.status)) err("blog", `${at}: bad status "${p.status}"`);
    if (p.status === "published" && !p.publishedDate) err("blog", `${at}: published posts need publishedDate`);
    list("blog", `${at}.body`, p.body);
  });
}

if (errors.length) {
  console.error(`\ncheck-content: ${errors.length} problem(s)\n  - ${errors.join("\n  - ")}\n`);
  process.exit(1);
}
console.log("check-content: all content files OK");
