// =============================================================
// lib/widgets/blog-detail.js
// Blog data, detail renderer, local writing studio, and stats.
//
// The site is static today, so custom posts and blog analytics are
// stored in the visitor's browser with localStorage. The data shape is
// intentionally serializable so it can later move to a CMS/backend.
// =============================================================

const BLOG_POSTS_STORAGE_KEY = "deboistech.blog.posts.v1";
const BLOG_STATS_STORAGE_KEY = "deboistech.blog.stats.v1";

const BLOG_DOMAIN_META = {
  ml: {
    domain: "ml",
    title: "Machine Learning",
    tag: "AI/ML",
    tagColor: "bg-purple-100 text-purple-700",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />`,
  },
  devops: {
    domain: "devops",
    title: "DevOps & Cloud",
    tag: "DevOps",
    tagColor: "bg-blue-100 text-blue-700",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />`,
  },
  web: {
    domain: "web",
    title: "Web Development",
    tag: "Web",
    tagColor: "bg-green-100 text-green-700",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />`,
  },
  general: {
    domain: "general",
    title: "Company Notes",
    tag: "Blog",
    tagColor: "bg-primary-100 text-primary-700",
    iconBg: "bg-primary-100",
    iconColor: "text-primary-600",
    iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75v10.5m5.25-5.25H6.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />`,
  },
};

const BLOG_DEFAULT_POSTS = [
  {
    id: "kubernetes-platforms",
    slug: "kubernetes-platforms",
    status: "published",
    domain: "devops",
    title: "Building Kubernetes Platforms That Teams Can Actually Operate",
    thumbnail: "images/products/tenantplane.png",
    thumbnailAlt: "TenantPlane Kubernetes management dashboard",
    author: { name: "deboistech Engineering", avatar: "images/teams/1.png", role: "Cloud & Platform Engineering" },
    publishedDate: "July 15, 2026",
    createdAt: "2026-07-15T00:00:00.000Z",
    updatedAt: "2026-07-15T00:00:00.000Z",
    description: "A practical approach to turning Kubernetes from powerful primitives into a dependable platform that developers and operators can use with confidence.",
    tags: ["Kubernetes", "DevOps", "Platform Engineering"],
    body: [
      { type: "paragraph", text: "Kubernetes is exceptionally capable, but capability alone does not create a good developer experience. Teams still need clear paths for provisioning, deploying, observing, and governing workloads. A useful platform makes those paths obvious without hiding the operational context that keeps production systems healthy." },
      { type: "heading", level: 2, text: "Start with the workflow, not the cluster" },
      { type: "paragraph", text: "The most useful platform decisions begin with the questions a product team asks every day: How do I create an environment? Where do I see a deployment's health? Which resources are costing us money? Who can change production? Designing around these moments produces a platform that feels intentional instead of a dashboard layered over infrastructure." },
      { type: "quote", text: "A platform earns trust when its safest path is also its fastest path.", attribution: "deboistech engineering principle" },
      { type: "heading", level: 2, text: "Make the common path self-service" },
      { type: "paragraph", text: "Self-service does not mean giving every user unrestricted access to every Kubernetes object. It means packaging repeatable operations into well-defined actions, with sensible defaults and the right guardrails. Namespace templates, role-based access, deployment standards, and observability baselines let teams move quickly while keeping the cluster understandable." },
      { type: "list", items: ["Give each team a clear, scoped workspace and ownership model.", "Provide approved deployment patterns instead of requiring every project to invent one.", "Surface health, logs, and cost signals alongside deployment actions.", "Keep audit trails and access controls visible to the people responsible for operations."] },
      { type: "image", src: "images/products/tenantplanecropped.png", alt: "TenantPlane platform overview", caption: "A focused platform connects provisioning, access, and operational context." },
      { type: "heading", level: 2, text: "Treat configuration as a product interface" },
      { type: "paragraph", text: "Infrastructure configuration is often where teams experience the most friction. A compact, documented interface is easier to review, automate, and evolve than a collection of one-off settings. The goal is not to remove flexibility; it is to make the supported choices easy to understand." },
      { type: "code", language: "yaml", code: "service:\n  name: payments-api\n  environment: production\n  resources:\n    requests:\n      cpu: 250m\n      memory: 256Mi\n  observability:\n    metrics: true\n    logs: structured" },
      { type: "heading", level: 2, text: "Build for steady improvement" },
      { type: "paragraph", text: "A platform is never finished at its first launch. The right next improvement comes from watching where people hesitate, repeat manual work, or leave the happy path. At deboistech, we treat that feedback loop as product work: ship a clear capability, observe how it is used, and refine it with the teams who depend on it." },
    ],
  },
  {
    id: "vision-transformers",
    slug: "vision-transformers",
    status: "published",
    domain: "ml",
    title: "Transformers in Computer Vision",
    thumbnail: "",
    thumbnailAlt: "Computer vision model notes",
    author: { name: "deboistech AI Lab", avatar: "images/teams/2.png", role: "AI Engineering" },
    publishedDate: "July 12, 2026",
    createdAt: "2026-07-12T00:00:00.000Z",
    updatedAt: "2026-07-12T00:00:00.000Z",
    description: "How Vision Transformers are reshaping image recognition and when they make sense beside traditional CNN-based systems.",
    tags: ["AI/ML", "Computer Vision", "Transformers"],
    body: [
      { type: "paragraph", text: "Vision Transformers changed the way many teams think about image understanding. Instead of treating pixels only through local convolutional filters, they split an image into patches and learn relationships across those patches with attention." },
      { type: "heading", level: 2, text: "Why attention helps" },
      { type: "paragraph", text: "Attention can connect distant parts of an image early in the model. That is useful for tasks where the meaning of one object depends on another object elsewhere in the frame, such as inspection, medical imaging, or complex product catalogs." },
      { type: "list", items: ["Use transformers when you have enough data or strong pretrained checkpoints.", "Keep CNNs in the conversation for smaller datasets and edge deployments.", "Measure latency and memory before committing to the architecture."] },
      { type: "heading", level: 2, text: "The practical takeaway" },
      { type: "paragraph", text: "The winning model is usually the one that fits the product constraint. At deboistech, we evaluate accuracy, deployment cost, inference latency, explainability, and retraining cadence before selecting a model family." },
    ],
  },
  {
    id: "github-actions-cicd",
    slug: "github-actions-cicd",
    status: "published",
    domain: "devops",
    title: "Building a CI/CD Pipeline with GitHub Actions",
    thumbnail: "",
    thumbnailAlt: "CI/CD workflow notes",
    author: { name: "deboistech Engineering", avatar: "images/teams/3.png", role: "Product Engineering" },
    publishedDate: "July 10, 2026",
    createdAt: "2026-07-10T00:00:00.000Z",
    updatedAt: "2026-07-10T00:00:00.000Z",
    description: "A clear path for automated testing, building, and deployment using GitHub Actions, Docker, and environment gates.",
    tags: ["DevOps", "CI/CD", "Automation"],
    body: [
      { type: "paragraph", text: "A dependable delivery pipeline is less about one YAML file and more about predictable feedback. The best pipelines tell developers what broke, protect production, and make repeatable release steps easy to audit." },
      { type: "heading", level: 2, text: "Start with the feedback loop" },
      { type: "paragraph", text: "Run format checks, unit tests, and lightweight integration tests on every pull request. Reserve heavier deployment checks for merge events or protected branches so the daily loop stays fast." },
      { type: "code", language: "yaml", code: "name: release\non:\n  push:\n    branches: [main]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci\n      - run: npm test\n      - run: docker build -t app:${{ github.sha }} ." },
      { type: "heading", level: 2, text: "Protect the final step" },
      { type: "paragraph", text: "Production releases should include environment approvals, rollback instructions, and visible deployment status. Those small controls help teams move quickly without turning delivery into guesswork." },
    ],
  },
];

const blogPost = BLOG_DEFAULT_POSTS[0];

function readBlogJson(key, fallback) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    return fallback;
  }
}

function writeBlogJson(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function slugifyBlogTitle(value) {
  const slug = String(value || "untitled-blog")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || `blog-${Date.now()}`;
}

function isExternalBlogAsset(value) {
  return /^(https?:|data:|blob:|\.\/|\.\.\/|\/)/.test(String(value || ""));
}

function resolveBlogAsset(value, basePath) {
  if (!value) return "";
  return isExternalBlogAsset(value) ? value : `${basePath || "."}/${value}`;
}

function formatBlogDate(value) {
  if (!value) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" });
}

function stripBlogHtml(html) {
  if (typeof document === "undefined") return String(html || "").replace(/<[^>]*>/g, " ");
  const div = document.createElement("div");
  div.innerHTML = html || "";
  return div.textContent || div.innerText || "";
}

function collectBlogText(post) {
  const blockText = (post.body || [])
    .map((block) => block.text || block.code || (block.items || []).join(" ") || stripBlogHtml(block.html || ""))
    .join(" ");
  return `${post.title || ""} ${post.description || ""} ${blockText}`;
}

function estimateBlogReadTime(post) {
  const words = collectBlogText(post).trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}

function getStoredBlogPosts() {
  const posts = readBlogJson(BLOG_POSTS_STORAGE_KEY, []);
  return Array.isArray(posts) ? posts : [];
}

function normalizeBlogPost(post) {
  const now = new Date().toISOString();
  const id = post.id || slugifyBlogTitle(post.title);
  const domain = BLOG_DOMAIN_META[post.domain] ? post.domain : "general";
  const tags = Array.isArray(post.tags) && post.tags.length ? post.tags : [BLOG_DOMAIN_META[domain].tag];
  return {
    ...post,
    id,
    slug: post.slug || id,
    domain,
    status: post.status || "published",
    title: post.title || "Untitled blog",
    description: post.description || "",
    thumbnail: post.thumbnail || "",
    thumbnailAlt: post.thumbnailAlt || post.title || "Blog cover",
    tags,
    author: {
      name: (post.author && post.author.name) || "deboistech",
      avatar: (post.author && post.author.avatar) || "images/teams/1.png",
      role: (post.author && post.author.role) || "Author",
    },
    createdAt: post.createdAt || now,
    updatedAt: post.updatedAt || now,
    publishedDate: post.publishedDate || formatBlogDate(post.updatedAt || now),
    body: Array.isArray(post.body) && post.body.length ? post.body : [{ type: "paragraph", text: "" }],
  };
}

function getAllBlogPosts(options = {}) {
  const includeDrafts = Boolean(options.includeDrafts);
  const postsById = new Map();
  BLOG_DEFAULT_POSTS.forEach((post) => postsById.set(post.id, normalizeBlogPost(post)));
  getStoredBlogPosts().forEach((post) => postsById.set(post.id, normalizeBlogPost(post)));
  return Array.from(postsById.values())
    .filter((post) => includeDrafts || post.status === "published")
    .sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0));
}

function getPublishedBlogPosts() {
  return getAllBlogPosts({ includeDrafts: false });
}

function findBlogPostById(id, options = {}) {
  const posts = getAllBlogPosts({ includeDrafts: Boolean(options.includeDrafts) });
  if (!id) return posts.find((post) => post.status === "published") || posts[0] || blogPost;
  return posts.find((post) => post.id === id || post.slug === id) || null;
}

function upsertBlogPost(post) {
  const normalized = normalizeBlogPost(post);
  const stored = getStoredBlogPosts().filter((item) => item.id !== normalized.id);
  stored.unshift(normalized);
  writeBlogJson(BLOG_POSTS_STORAGE_KEY, stored);
  return normalized;
}

function deleteStoredBlogPost(id) {
  const stored = getStoredBlogPosts();
  writeBlogJson(BLOG_POSTS_STORAGE_KEY, stored.filter((post) => post.id !== id));
}

function isStoredBlogPost(id) {
  return getStoredBlogPosts().some((post) => post.id === id);
}

function getBlogStatsMap() {
  const stats = readBlogJson(BLOG_STATS_STORAGE_KEY, {});
  return stats && typeof stats === "object" ? stats : {};
}

function getEmptyBlogStats(postId) {
  return {
    postId,
    views: 0,
    reads: 0,
    likes: 0,
    shares: 0,
    maxProgress: 0,
    progressTotal: 0,
    progressSamples: 0,
    averageProgress: 0,
    firstViewedAt: "",
    lastViewedAt: "",
    lastReadAt: "",
  };
}

function getBlogStats(postId) {
  const stats = getBlogStatsMap();
  return { ...getEmptyBlogStats(postId), ...(stats[postId] || {}) };
}

function saveBlogStats(postId, nextStats) {
  const stats = getBlogStatsMap();
  stats[postId] = { ...getEmptyBlogStats(postId), ...nextStats, postId };
  writeBlogJson(BLOG_STATS_STORAGE_KEY, stats);
  return stats[postId];
}

function incrementBlogStat(postId, key, amount = 1) {
  const stats = getBlogStats(postId);
  stats[key] = Number(stats[key] || 0) + amount;
  return saveBlogStats(postId, stats);
}

function trackBlogView(postId) {
  if (!postId) return getEmptyBlogStats("");
  const now = new Date().toISOString();
  const stats = getBlogStats(postId);
  stats.views += 1;
  stats.firstViewedAt = stats.firstViewedAt || now;
  stats.lastViewedAt = now;
  return saveBlogStats(postId, stats);
}

function recordBlogProgress(postId, progress) {
  if (!postId) return;
  const normalized = Math.max(0, Math.min(100, Math.round(progress)));
  const stats = getBlogStats(postId);
  stats.maxProgress = Math.max(stats.maxProgress || 0, normalized);
  stats.progressTotal = Number(stats.progressTotal || 0) + normalized;
  stats.progressSamples = Number(stats.progressSamples || 0) + 1;
  stats.averageProgress = Math.round(stats.progressTotal / stats.progressSamples);

  const readSessionKey = `deboistech.blog.read.${postId}`;
  if (normalized >= 80 && !window.sessionStorage.getItem(readSessionKey)) {
    stats.reads += 1;
    stats.lastReadAt = new Date().toISOString();
    window.sessionStorage.setItem(readSessionKey, "1");
  }
  saveBlogStats(postId, stats);
}

function getBlogDomainMeta(domain) {
  return BLOG_DOMAIN_META[domain] || BLOG_DOMAIN_META.general;
}

function blogPostToCard(post) {
  const meta = getBlogDomainMeta(post.domain);
  return {
    id: post.id,
    title: post.title,
    description: post.description,
    image: post.thumbnail,
    imageAlt: post.thumbnailAlt,
    tag: (post.tags && post.tags[0]) || meta.tag,
    tagColor: meta.tagColor,
    link: "blog-detail.html",
  };
}

function getBlogSectionsWithStoredPosts(sections) {
  const baseSections = Array.isArray(sections) ? sections : [];
  const metaByDomain = { ...BLOG_DOMAIN_META };

  baseSections.forEach((section) => {
    metaByDomain[section.domain] = { ...getBlogDomainMeta(section.domain), ...section };
  });

  const grouped = {};
  getPublishedBlogPosts().forEach((post) => {
    const domain = post.domain || "general";
    const meta = metaByDomain[domain] || BLOG_DOMAIN_META.general;
    if (!grouped[domain]) {
      grouped[domain] = {
        domain,
        title: meta.title,
        iconSvg: meta.iconSvg,
        iconBg: meta.iconBg,
        iconColor: meta.iconColor,
        blogs: [],
      };
    }
    grouped[domain].blogs.push(blogPostToCard(post));
  });

  const orderedDomains = [
    ...baseSections.map((section) => section.domain),
    ...Object.keys(BLOG_DOMAIN_META),
    ...Object.keys(grouped),
  ].filter((domain, index, all) => domain && all.indexOf(domain) === index);

  return orderedDomains.map((domain) => grouped[domain]).filter(Boolean);
}

function sanitizeArticleHtml(html) {
  if (typeof document === "undefined") return String(html || "");

  const allowedTags = new Set(["A", "B", "BLOCKQUOTE", "BR", "CODE", "DIV", "EM", "FIGCAPTION", "FIGURE", "H2", "H3", "H4", "HR", "I", "IMG", "LI", "OL", "P", "PRE", "SPAN", "STRONG", "U", "UL"]);
  const template = document.createElement("template");
  template.innerHTML = html || "";

  const cleanNode = (node) => {
    if (node.nodeType === Node.TEXT_NODE) return document.createTextNode(node.textContent || "");
    if (node.nodeType !== Node.ELEMENT_NODE) return document.createDocumentFragment();

    const tag = node.tagName;
    const fragment = document.createDocumentFragment();
    if (!allowedTags.has(tag)) {
      Array.from(node.childNodes).forEach((child) => fragment.appendChild(cleanNode(child)));
      return fragment;
    }

    const clean = document.createElement(tag.toLowerCase());
    if (tag === "A") {
      const href = node.getAttribute("href") || "";
      if (/^(https?:|mailto:|tel:|#|\/|\.\/|\.\.\/)/.test(href)) {
        clean.setAttribute("href", href);
        clean.setAttribute("target", "_blank");
        clean.setAttribute("rel", "noopener noreferrer");
      }
    }
    if (tag === "IMG") {
      const src = node.getAttribute("src") || "";
      if (/^(https?:|data:image\/|blob:|\/|\.\/|\.\.\/|images\/)/.test(src)) clean.setAttribute("src", src);
      clean.setAttribute("alt", node.getAttribute("alt") || "");
    }
    Array.from(node.childNodes).forEach((child) => clean.appendChild(cleanNode(child)));
    return clean;
  };

  const output = document.createElement("div");
  Array.from(template.content.childNodes).forEach((child) => output.appendChild(cleanNode(child)));
  return output.innerHTML;
}

function renderBlogDetail(post, basePath, statsOverride) {
  const p = basePath || ".";
  const safePost = normalizeBlogPost(post || blogPost);
  const stats = statsOverride || getBlogStats(safePost.id);
  const tags = safePost.tags
    .map((tag) => `<span class="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">${escapeHtml(tag)}</span>`)
    .join("");
  const blocks = safePost.body.map((block) => renderBlogBlock(block, p)).join("\n");
  const cover = safePost.thumbnail
    ? `<figure class="mt-10 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 shadow-sm"><img src="${resolveBlogAsset(safePost.thumbnail, p)}" alt="${escapeHtml(safePost.thumbnailAlt || safePost.title)}" class="aspect-[16/8] w-full object-cover" /></figure>`
    : "";
  const authorAvatar = resolveBlogAsset(safePost.author.avatar, p);
  const publishedDate = safePost.publishedDate || formatBlogDate(safePost.updatedAt);

  return `
    <div id="blog-reading-progress" class="fixed left-0 top-0 z-[60] h-1 w-0 bg-primary-600 transition-[width] duration-150"></div>
    <article class="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div class="mx-auto max-w-4xl">
        <div class="flex items-center justify-between border-b border-gray-100 pb-4 mb-10">
          <div class="flex items-center gap-6 text-gray-500">
            <a href="./blogs.html" class="flex items-center gap-2 hover:text-gray-900 text-sm"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg> Back</a>
          </div>
          <div class="flex items-center gap-4 text-gray-500 relative">
             <button class="hover:text-gray-900" title="Bookmark"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg></button>
             <button class="hover:text-gray-900" title="Play"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></button>
             <button class="hover:text-gray-900" title="Share"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg></button>
             <button id="blog-more-options-btn" class="hover:text-gray-900" title="More options"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg></button>
             <div id="blog-more-options-menu" class="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-100 shadow-lg rounded-xl py-2 hidden z-50 text-sm">
                <a href="./blog-studio.html?edit=${encodeURIComponent(safePost.id)}" class="block px-4 py-2 hover:bg-gray-50 text-gray-700">Edit story</a>
                <button type="button" class="block w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700" onclick="alert('Story settings opened')">Story settings</button>
                <button type="button" class="block w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700" onclick="alert('Views: ${stats.views}\\nReads: ${stats.reads}\\nLikes: ${stats.likes}\\nShares: ${stats.shares}')">Story stats</button>
                <hr class="my-2 border-gray-100">
                <button type="button" data-delete-article="${encodeURIComponent(safePost.id)}" class="block w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 font-medium">Delete story</button>
             </div>
          </div>
        </div>
        <header class="mt-10">
          <div class="flex flex-wrap gap-2">${tags}</div>
          <h1 class="mt-5 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">${escapeHtml(safePost.title)}</h1>
          <p class="mt-6 max-w-3xl text-lg leading-8 text-gray-600 sm:text-xl">${escapeHtml(safePost.description)}</p>
          <div class="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 border-y border-gray-100 py-5">
            <img src="${authorAvatar}" alt="${escapeHtml(safePost.author.name)}" class="h-11 w-11 rounded-full object-cover" />
            <div class="mr-auto">
              <p class="text-sm font-semibold text-gray-900">${escapeHtml(safePost.author.name)}</p>
              <p class="text-sm text-gray-500">${escapeHtml(safePost.author.role)}</p>
            </div>
            <p class="text-sm text-gray-500">${escapeHtml(publishedDate)} <span class="mx-1 text-gray-300">|</span> ${escapeHtml(safePost.readTime || estimateBlogReadTime(safePost))}</p>
          </div>
          <div class="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            ${renderBlogStatPill("Views", stats.views)}
            ${renderBlogStatPill("Reads", stats.reads)}
            ${renderBlogStatPill("Likes", stats.likes)}
            ${renderBlogStatPill("Shares", stats.shares)}
          </div>
        </header>
        ${cover}
        <div id="blog-article-content" class="article-prose mx-auto mt-12 max-w-3xl">${blocks}</div>
        <div class="mx-auto mt-10 flex max-w-3xl flex-wrap gap-3 border-t border-gray-100 pt-8">
          <button id="blog-like-button" type="button" class="inline-flex items-center justify-center rounded-full bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700">Like</button>
          <button id="blog-share-button" type="button" class="inline-flex items-center justify-center rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:border-primary-300 hover:text-primary-700">Share</button>
          <span id="blog-action-status" class="inline-flex items-center text-sm text-gray-500" aria-live="polite"></span>
        </div>
        <aside class="mx-auto mt-14 max-w-3xl rounded-xl border border-primary-100 bg-primary-50 p-6 sm:p-8">
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-primary-700">About the author</p>
          <div class="mt-4 flex items-start gap-4">
            <img src="${authorAvatar}" alt="${escapeHtml(safePost.author.name)}" class="h-12 w-12 rounded-full object-cover" />
            <p class="text-sm leading-6 text-gray-600"><strong class="text-gray-900">${escapeHtml(safePost.author.name)}</strong> shares practical notes from the teams designing, building, and operating products at deboistech.</p>
          </div>
          <a href="./contact.html" class="mt-6 inline-flex items-center text-sm font-semibold text-primary-700 hover:text-primary-800">Talk to our engineering team &rarr;</a>
        </aside>
      </div>
    </article>`;
}

function renderBlogStatPill(label, value) {
  return `
    <div class="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
      <p class="text-xs font-semibold uppercase tracking-wider text-gray-500">${label}</p>
      <p class="mt-1 text-2xl font-bold text-gray-900">${Number(value || 0).toLocaleString()}</p>
    </div>`;
}

function renderBlogBlock(block, basePath) {
  if (block.type === "heading") {
    const level = block.level === 3 ? 3 : 2;
    const classes = level === 3 ? "mt-10 text-2xl font-bold tracking-tight text-gray-900" : "mt-12 text-3xl font-bold tracking-tight text-gray-900";
    return `<h${level} class="${classes}">${escapeHtml(block.text)}</h${level}>`;
  }
  if (block.type === "image") {
    const src = resolveBlogAsset(block.src, basePath);
    return `<figure class="mt-10"><img src="${src}" alt="${escapeHtml(block.alt || "")}" class="w-full rounded-xl border border-gray-100" />${block.caption ? `<figcaption class="mt-3 text-center text-sm leading-6 text-gray-500">${escapeHtml(block.caption)}</figcaption>` : ""}</figure>`;
  }
  if (block.type === "code") return `<div class="mt-8 overflow-hidden rounded-xl border border-gray-800 bg-gray-900"><div class="border-b border-gray-800 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-primary-300">${escapeHtml(block.language || "code")}</div><pre class="overflow-x-auto p-5 text-sm leading-7 text-gray-100"><code>${escapeHtml(block.code)}</code></pre></div>`;
  if (block.type === "list") {
    const tag = block.ordered ? "ol" : "ul";
    return `<${tag} class="mt-6 ${block.ordered ? "list-decimal" : "list-disc"} space-y-3 pl-6 text-lg leading-8 text-gray-700">${(block.items || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</${tag}>`;
  }
  if (block.type === "quote") return `<blockquote class="mt-10 border-l-4 border-primary-500 pl-6"><p class="text-2xl font-medium leading-9 text-gray-800">"${escapeHtml(block.text)}"</p>${block.attribution ? `<footer class="mt-3 text-sm font-semibold text-primary-700">- ${escapeHtml(block.attribution)}</footer>` : ""}</blockquote>`;
  if (block.type === "html") return sanitizeArticleHtml(block.html || "");
  return `<p class="mt-6 text-lg leading-8 text-gray-700">${escapeHtml(block.text)}</p>`;
}

function initBlogDetailInteractions(post) {
  const safePost = normalizeBlogPost(post || blogPost);
  const progressBar = document.getElementById("blog-reading-progress");
  const article = document.getElementById("blog-article-content");
  const likeButton = document.getElementById("blog-like-button");
  const shareButton = document.getElementById("blog-share-button");
  const status = document.getElementById("blog-action-status");

  const setStatus = (message) => {
    if (!status) return;
    status.textContent = message;
    window.setTimeout(() => { status.textContent = ""; }, 2200);
  };

  const updateProgress = () => {
    if (!article) return;
    const rect = article.getBoundingClientRect();
    const total = Math.max(1, article.offsetHeight - window.innerHeight * 0.35);
    const read = Math.min(total, Math.max(0, -rect.top + window.innerHeight * 0.2));
    const percent = Math.round((read / total) * 100);
    if (progressBar) progressBar.style.width = `${Math.max(0, Math.min(100, percent))}%`;
    recordBlogProgress(safePost.id, percent);
  };

  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });

  if (likeButton) {
    likeButton.addEventListener("click", () => {
      const stats = incrementBlogStat(safePost.id, "likes", 1);
      likeButton.textContent = `Liked (${stats.likes})`;
      setStatus("Like saved.");
    });
  }

  if (shareButton) {
    shareButton.addEventListener("click", async () => {
      incrementBlogStat(safePost.id, "shares", 1);
      const url = window.location.href;
      try {
        if (navigator.share) {
          await navigator.share({ title: safePost.title, text: safePost.description, url });
        } else if (navigator.clipboard) {
          await navigator.clipboard.writeText(url);
          setStatus("Link copied.");
        } else {
          setStatus("Share counted.");
        }
      } catch (error) {
        setStatus("Share counted.");
      }
    });
  }

  const moreOptionsBtn = document.getElementById("blog-more-options-btn");
  const moreOptionsMenu = document.getElementById("blog-more-options-menu");
  if (moreOptionsBtn && moreOptionsMenu) {
    moreOptionsBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      moreOptionsMenu.classList.toggle("hidden");
    });
    document.addEventListener("click", () => moreOptionsMenu.classList.add("hidden"));
    moreOptionsMenu.addEventListener("click", (e) => e.stopPropagation());
  }

  document.addEventListener("click", (event) => {
    const deleteBtn = event.target.closest("[data-delete-article]");
    if (deleteBtn && confirm("Are you sure you want to delete this story?")) {
      deleteStoredBlogPost(deleteBtn.dataset.deleteArticle);
      window.location.href = "./blogs.html";
    }
  });
}

function renderBlogStudio({ basePath, pageHref }) {
  const blogPageHref = `${pageHref || "."}/blogs.html`;

  return `
    <div class="flex flex-col min-h-screen bg-white font-sans text-gray-900">
      <header class="flex items-center justify-between px-6 py-3 border-b border-gray-100 sticky top-0 bg-white z-50">
        <div class="flex items-center gap-4">
          <a href="${blogPageHref}" class="font-bold text-xl tracking-tight text-gray-900 hover:text-black">Deboistech</a>
          <span class="text-sm text-gray-500">Draft in <span id="author-name-display">Engineering</span></span>
          <span id="blog-action-status" class="text-xs text-gray-400 ml-2 transition-opacity duration-300 opacity-0">Saved</span>
        </div>
        <div class="flex items-center gap-4">
          <button type="button" id="blog-publish-btn" class="bg-green-600 text-white px-3 py-1.5 rounded-full text-sm font-medium hover:bg-green-700 transition">Publish</button>
          <button type="button" class="text-gray-400 hover:text-gray-600 transition" aria-label="More options">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
          </button>
          <img src="${basePath || "."}/images/teams/1.png" alt="Profile" class="w-8 h-8 rounded-full border border-gray-200">
        </div>
      </header>

      <!-- Publish Modal (Hidden by default) -->
      <div id="publish-modal" class="fixed inset-0 bg-white z-[60] hidden flex-col">
         <div class="flex items-center justify-between px-6 py-3 border-b border-gray-100">
            <h2 class="font-bold text-xl">Story Preview</h2>
            <button type="button" id="close-publish-modal" class="text-gray-500 hover:text-gray-900">
               <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
         </div>
         <div class="flex-1 overflow-y-auto p-6 md:p-12">
            <form id="blog-editor-form" class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
               <input id="blog-editor-id" type="hidden" />
               <!-- Left: Preview -->
               <div class="space-y-6">
                 <div>
                   <label class="block text-sm font-bold text-gray-700 mb-2">Cover Image URL</label>
                   <input id="blog-thumbnail" type="text" placeholder="images/products/tenantplane.png or https://..." class="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm focus:outline-none focus:border-gray-400">
                 </div>
                 <div>
                   <label class="block text-sm font-bold text-gray-700 mb-2">Subtitle</label>
                   <textarea id="blog-description" rows="3" placeholder="Write a preview subtitle..." class="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm focus:outline-none focus:border-gray-400"></textarea>
                   <p class="text-xs text-gray-500 mt-2">Note: Changes here will affect how your story appears in public places.</p>
                 </div>
               </div>
               <!-- Right: Settings -->
               <div class="space-y-6">
                 <div>
                   <label class="block text-sm font-bold text-gray-700 mb-2">Topics</label>
                   <p class="text-xs text-gray-500 mb-2">Add up to five topics to help readers find your story.</p>
                   <input id="blog-tags" type="text" placeholder="Kubernetes, DevOps, AI" class="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm focus:outline-none focus:border-gray-400">
                 </div>
                 <div>
                   <label class="block text-sm font-bold text-gray-700 mb-2">Category</label>
                   <select id="blog-domain" class="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm focus:outline-none focus:border-gray-400">
                     <option value="devops">DevOps & Cloud</option>
                     <option value="ml">Machine Learning</option>
                     <option value="web">Web Development</option>
                     <option value="general">Company Notes</option>
                   </select>
                 </div>
                 <div class="grid grid-cols-2 gap-4">
                   <div>
                     <label class="block text-sm font-bold text-gray-700 mb-2">Author Name</label>
                     <input id="blog-author-name" type="text" placeholder="Author name" value="deboistech Engineering" class="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm focus:outline-none focus:border-gray-400">
                   </div>
                   <div>
                     <label class="block text-sm font-bold text-gray-700 mb-2">Author Role</label>
                     <input id="blog-author-role" type="text" placeholder="Role" value="Engineering" class="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm focus:outline-none focus:border-gray-400">
                   </div>
                 </div>
                 <div class="pt-6">
                   <button type="submit" class="bg-green-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-green-700 transition">Publish now</button>
                 </div>
               </div>
            </form>
         </div>
      </div>

      <main class="flex-grow max-w-3xl w-full mx-auto mt-12 px-4 pb-32">
        <div class="relative">
          <input id="blog-title" type="text" placeholder="Title" class="w-full text-5xl font-serif text-gray-800 placeholder-gray-300 border-none outline-none resize-none bg-transparent mb-6 focus:ring-0 p-0" />
        </div>
        
        <div class="relative group mt-2">
          <div id="blog-editor-toolbar" class="absolute -left-12 top-0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-row items-center gap-2 bg-white z-10 hidden pl-12 -ml-12 w-max">
             <button type="button" data-custom="image" class="w-9 h-9 rounded-full border border-green-600 flex items-center justify-center text-green-600 hover:bg-green-50 transition" title="Add an image">
               <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
             </button>
             <button type="button" data-custom="unsplash" class="w-9 h-9 rounded-full border border-green-600 flex items-center justify-center text-green-600 hover:bg-green-50 transition" title="Add an image from Unsplash">
               <svg class="w-4 h-4" viewBox="0 0 32 32" fill="currentColor"><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"/></svg>
             </button>
             <button type="button" data-custom="video" class="w-9 h-9 rounded-full border border-green-600 flex items-center justify-center text-green-600 hover:bg-green-50 transition" title="Add a video">
               <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
             </button>
             <button type="button" data-custom="embed" class="w-9 h-9 rounded-full border border-green-600 flex items-center justify-center text-green-600 hover:bg-green-50 transition" title="Add an embed">
               <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
             </button>
             <button type="button" data-custom="code" class="w-9 h-9 rounded-full border border-green-600 flex items-center justify-center text-green-600 hover:bg-green-50 transition" title="Add a new code block">
               <span class="font-mono font-bold text-sm">{}</span>
             </button>
             <button type="button" data-custom="hr" class="w-9 h-9 rounded-full border border-green-600 flex items-center justify-center text-green-600 hover:bg-green-50 transition" title="Add a new part">
               <span class="font-bold tracking-widest text-xs mb-1">...</span>
             </button>
          </div>
          <button type="button" id="editor-plus-btn" class="absolute -left-12 top-0 w-9 h-9 rounded-full border border-gray-400 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-900 transition bg-white hidden" title="Add block">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
          </button>
          <div id="blog-editor-content" class="text-xl leading-8 text-gray-800 outline-none min-h-[300px] empty:before:content-[attr(data-placeholder)] empty:before:text-gray-300 cursor-text font-serif" contenteditable="true" data-placeholder="Tell your story..."></div>
        </div>
      </main>
    </div>
  `;
}

function initBlogStudio({ pageHref }) {
  const form = document.getElementById("blog-editor-form");
  const editor = document.getElementById("blog-editor-content");
  const titleInput = document.getElementById("blog-title");
  if (!form || !editor || !titleInput) return;

  const fields = {
    id: document.getElementById("blog-editor-id"),
    title: titleInput,
    description: document.getElementById("blog-description"),
    domain: document.getElementById("blog-domain"),
    tags: document.getElementById("blog-tags"),
    thumbnail: document.getElementById("blog-thumbnail"),
    authorName: document.getElementById("blog-author-name"),
    authorRole: document.getElementById("blog-author-role"),
    status: document.getElementById("blog-action-status"),
    authorDisplay: document.getElementById("author-name-display"),
  };

  const publishBtn = document.getElementById("blog-publish-btn");
  const publishModal = document.getElementById("publish-modal");
  const closeModalBtn = document.getElementById("close-publish-modal");
  const plusBtn = document.getElementById("editor-plus-btn");
  const toolbar = document.getElementById("blog-editor-toolbar");

  let saveTimeout;
  const UNSAVED_DRAFT_KEY = "blog_unsaved_draft";

  const showStatus = (msg) => {
    if (!fields.status) return;
    fields.status.textContent = msg;
    fields.status.classList.remove("opacity-0");
    fields.status.classList.add("opacity-100");
    setTimeout(() => {
      fields.status.classList.remove("opacity-100");
      fields.status.classList.add("opacity-0");
    }, 2000);
  };

  const clearEditor = () => {
    fields.id.value = "";
    fields.title.value = "";
    fields.description.value = "";
    fields.domain.value = "devops";
    fields.tags.value = "";
    fields.thumbnail.value = "";
    fields.authorName.value = "deboistech Engineering";
    fields.authorRole.value = "Engineering";
    editor.innerHTML = "";
    fields.title.focus();
  };

  const loadPost = (post) => {
    const safePost = normalizeBlogPost(post);
    fields.id.value = safePost.id;
    fields.title.value = safePost.title;
    fields.description.value = safePost.description;
    fields.domain.value = safePost.domain;
    fields.tags.value = (safePost.tags || []).join(", ");
    fields.thumbnail.value = safePost.thumbnail || "";
    fields.authorName.value = safePost.author.name;
    fields.authorRole.value = safePost.author.role;
    if (fields.authorDisplay) fields.authorDisplay.textContent = safePost.author.name;
    editor.innerHTML = safePost.body.map((block) => block.type === "html" ? sanitizeArticleHtml(block.html || "") : renderEditorBlock(block)).join("");
    fields.title.focus();
  };

  const buildPostFromEditor = (status) => {
    const title = fields.title.value.trim();
    if (!title) return null;
    const now = new Date().toISOString();
    const id = fields.id.value || slugifyBlogTitle(title);
    const tags = fields.tags.value.split(",").map((tag) => tag.trim()).filter(Boolean);
    const existing = findBlogPostById(id, { includeDrafts: true }) || {};
    return normalizeBlogPost({
      ...existing,
      id,
      slug: id,
      status,
      title,
      description: fields.description.value.trim(),
      domain: fields.domain.value,
      tags,
      thumbnail: fields.thumbnail.value.trim(),
      thumbnailAlt: title,
      author: {
        name: fields.authorName.value.trim() || "deboistech Engineering",
        avatar: existing.author && existing.author.avatar ? existing.author.avatar : "images/teams/1.png",
        role: fields.authorRole.value.trim() || "Engineering",
      },
      publishedDate: status === "published" ? formatBlogDate(now) : existing.publishedDate || "",
      createdAt: existing.createdAt || now,
      updatedAt: now,
      body: [{ type: "html", html: sanitizeArticleHtml(editor.innerHTML) }],
    });
  };

  const savePost = (status, silent = false) => {
    const post = buildPostFromEditor(status);
    if (!post) return;
    const saved = upsertBlogPost(post);
    fields.id.value = saved.id;
    if (!silent) showStatus(status === "published" ? "Published" : "Saved");
  };

  const triggerAutoSave = () => {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      if (fields.title.value.trim() && fields.id.value) {
        savePost("draft", true);
      } else {
        localStorage.setItem(UNSAVED_DRAFT_KEY, JSON.stringify({
          title: fields.title.value,
          html: editor.innerHTML
        }));
        showStatus("Saved locally");
      }
    }, 1500);
  };

  fields.title.addEventListener("input", triggerAutoSave);
  editor.addEventListener("input", triggerAutoSave);
  fields.authorName.addEventListener("input", () => {
    if (fields.authorDisplay) fields.authorDisplay.textContent = fields.authorName.value || "Engineering";
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    savePost("published", false);
    localStorage.removeItem(UNSAVED_DRAFT_KEY);
    publishModal.classList.add("hidden");
    publishModal.classList.remove("flex");
  });

  publishBtn?.addEventListener("click", () => {
    if (!fields.title.value.trim()) {
      showStatus("Add a title first");
      fields.title.focus();
      return;
    }
    publishModal.classList.remove("hidden");
    publishModal.classList.add("flex");
  });

  closeModalBtn?.addEventListener("click", () => {
    publishModal.classList.add("hidden");
    publishModal.classList.remove("flex");
  });

  // Medium-style floating toolbar logic
  editor.addEventListener("keyup", () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0 && selection.isCollapsed) {
       const node = selection.focusNode;
       const el = node.nodeType === 3 ? node.parentElement : node;
       if (el && el.textContent.trim() === "" && editor.contains(el)) {
          plusBtn.classList.remove("hidden");
          const rect = el.getBoundingClientRect();
          const editorRect = editor.getBoundingClientRect();
          plusBtn.style.top = `${rect.top - editorRect.top}px`;
          toolbar.style.top = `${rect.top - editorRect.top}px`;
       } else {
          plusBtn.classList.add("hidden");
          toolbar.classList.add("hidden");
       }
    } else {
       plusBtn.classList.add("hidden");
       toolbar.classList.add("hidden");
    }
  });

  editor.addEventListener("click", () => {
     toolbar.classList.add("hidden");
  });

  plusBtn?.addEventListener("click", (e) => {
     e.stopPropagation();
     toolbar.classList.toggle("hidden");
  });

  document.querySelectorAll("#blog-editor-toolbar button").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      editor.focus();
      const cmd = button.dataset.custom;
      if (cmd === "image" || cmd === "unsplash") {
        const url = window.prompt(cmd === "image" ? "Paste the image URL" : "Paste Unsplash image URL");
        if (url) document.execCommand("insertHTML", false, `<figure><img src="${escapeHtml(url)}" alt="Image" /></figure><p><br></p>`);
      } else if (cmd === "video" || cmd === "embed") {
        const url = window.prompt("Paste the embed/video URL");
        if (url) document.execCommand("insertHTML", false, `<div class="p-4 bg-gray-50 border border-gray-200 rounded text-sm text-gray-500 mb-4">[Embed: ${escapeHtml(url)}]</div><p><br></p>`);
      } else if (cmd === "code") {
        document.execCommand("insertHTML", false, `<pre class="bg-gray-900 text-gray-100 p-4 rounded mb-4"><code>// Code here</code></pre><p><br></p>`);
      } else if (cmd === "hr") {
        document.execCommand("insertHorizontalRule", false, null);
      }
      toolbar.classList.add("hidden");
      plusBtn.classList.add("hidden");
    });
  });

  const params = new URLSearchParams(window.location.search);
  const editId = params.get("edit");
  const postToEdit = editId ? findBlogPostById(editId, { includeDrafts: true }) : null;
  if (postToEdit) {
    loadPost(postToEdit);
  } else {
    clearEditor();
    const unsavedRaw = localStorage.getItem(UNSAVED_DRAFT_KEY);
    if (unsavedRaw) {
      try {
        const unsaved = JSON.parse(unsavedRaw);
        if (unsaved && (unsaved.title || unsaved.html)) {
          fields.title.value = unsaved.title || "";
          editor.innerHTML = unsaved.html || "";
        }
      } catch (err) {}
    }
  }
}

function renderEditorBlock(block) {
  if (block.type === "heading") return `<h${block.level === 3 ? 3 : 2}>${escapeHtml(block.text)}</h${block.level === 3 ? 3 : 2}>`;
  if (block.type === "list") {
    const tag = block.ordered ? "ol" : "ul";
    return `<${tag}>${(block.items || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</${tag}>`;
  }
  if (block.type === "quote") return `<blockquote>${escapeHtml(block.text)}</blockquote>`;
  if (block.type === "code") return `<pre><code>${escapeHtml(block.code)}</code></pre>`;
  if (block.type === "image") return `<figure><img src="${escapeHtml(block.src)}" alt="${escapeHtml(block.alt || "")}" /><figcaption>${escapeHtml(block.caption || "")}</figcaption></figure>`;
  return `<p>${escapeHtml(block.text || "")}</p>`;
}
