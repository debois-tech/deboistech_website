// =============================================================
// lib/widgets/blog-sections.js
// Widget: Domain-based Blog Sections
// =============================================================
//
// USAGE
// ─────
// 1. Add a mount div to your page:
//      <div id="blog-sections-root"></div>
//
// 2. Include this script:
//      Root page : <script src="lib/widgets/blog-sections.js"></script>
//      lib/pages : <script src="../widgets/blog-sections.js"></script>
//
// 3. Call the renderer:
//      renderBlogSections({ mountId: "blog-sections-root", sections: BLOG_SECTIONS });
//
// ADDING BLOG SECTIONS
// ─────────────────────
// Push a new section object into BLOG_SECTIONS (or pass a custom array).
// Each section shape:
//   {
//     domain:    "ml",                          // unique key
//     title:     "Machine Learning",            // section heading
//     iconSvg:   "<path … />",                  // heroicon SVG path
//     iconBg:    "bg-purple-100",               // Tailwind bg class
//     iconColor: "text-purple-600",             // Tailwind text class
//     blogs: [
//       {
//         title:       "Title",
//         description: "Short description…",
//         image:       null,                    // optional image path
//         tag:         "AI/ML",
//         tagColor:    "bg-purple-100 text-purple-700",
//         link:        "#",                     // Medium URL (replace with actual link)
//       },
//     ],
//   }
// =============================================================

const BLOG_SECTIONS = [
  {
    domain: "ml",
    title: "Machine Learning",
    iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />`,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    blogs: [
      {
        title: "Transformers in Computer Vision",
        description: "How Vision Transformers (ViT) are reshaping image recognition and outperforming traditional CNNs in key benchmarks.",
        tag: "AI/ML",
        tagColor: "bg-purple-100 text-purple-700",
        link: "#",
      },
    ],
  },
  {
    domain: "devops",
    title: "DevOps & Cloud",
    iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />`,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    blogs: [
      {
        title: "Kubernetes Cost Optimization at Scale",
        description: "Practical strategies for reducing cloud costs in Kubernetes clusters — from right-sizing workloads to spot instances and namespace quotas.",
        tag: "DevOps",
        tagColor: "bg-blue-100 text-blue-700",
        link: "#",
      },
      {
        title: "Building a CI/CD Pipeline with GitHub Actions",
        description: "A step-by-step guide to setting up automated testing, building, and deploying applications using GitHub Actions and Docker.",
        tag: "DevOps",
        tagColor: "bg-blue-100 text-blue-700",
        link: "#",
      },
    ],
  },
  {
    domain: "web",
    title: "Web Development",
    iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />`,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    blogs: [],
  },
];

/**
 * Renders all blog sections — each section has a heading + card grid.
 *
 * @param {Object}  opts
 * @param {string}  opts.mountId        - ID of the container element
 * @param {Array}   [opts.sections]     - Section data array (defaults to BLOG_SECTIONS)
 * @param {string}  [opts.bg]           - Tailwind background class
 * @param {string}  [opts.basePath]     - Asset base path (passed to renderBlogCard)
 */
function renderBlogSections({ mountId, sections, bg, basePath }) {
  const el = document.getElementById(mountId);
  if (!el) return;

  const data    = sections || BLOG_SECTIONS;
  const bgClass = bg || "bg-gray-50";

  const sectionsHTML = data
    .filter((s) => s.blogs && s.blogs.length > 0)
    .map((section) => {
      const cardsHTML = section.blogs
        .map((blog) => typeof renderBlogCard === "function" ? renderBlogCard(blog, basePath) : "")
        .join("\n");

      const cardCount = section.blogs.length;

      return `
        <div class="mb-20 last:mb-0">
          <div class="flex items-center gap-3 mb-8">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl ${section.iconBg} ${section.iconColor}">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                ${section.iconSvg}
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-900">${section.title}</h2>
          </div>
          <div class="${cardCount > 3 ? 'flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory' : 'grid gap-6 md:grid-cols-2 lg:grid-cols-3'}">
            ${cardsHTML}
          </div>
        </div>`;
    })
    .join("\n");

  el.innerHTML = `
    <section class="reveal ${bgClass} px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <div class="text-center mb-12">
          <span class="eyebrow">OUR BLOGS</span>
          <h1 class="section-heading">Insights & <span class="text-primary-600">Stories</span></h1>
          <p class="section-subheading mx-auto">Thoughts on engineering, AI, cloud, and building products that matter.</p>
        </div>
        ${sectionsHTML}
      </div>
    </section>`;
}
