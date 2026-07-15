// =============================================================
// lib/widgets/blog-sections.js
// Widget: Domain-based Blog Sections
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
        id: "vision-transformers",
        title: "Transformers in Computer Vision",
        description: "How Vision Transformers are reshaping image recognition and when they make sense beside traditional CNN-based systems.",
        tag: "AI/ML",
        tagColor: "bg-purple-100 text-purple-700",
        link: "blog-detail.html",
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
        id: "kubernetes-platforms",
        title: "Building Kubernetes Platforms That Teams Can Actually Operate",
        description: "A practical approach to turning Kubernetes into a dependable platform that developers and operators can use with confidence.",
        image: "images/products/tenantplane.png",
        imageAlt: "TenantPlane Kubernetes management dashboard",
        tag: "Kubernetes",
        tagColor: "bg-blue-100 text-blue-700",
        link: "blog-detail.html",
      },
      {
        id: "github-actions-cicd",
        title: "Building a CI/CD Pipeline with GitHub Actions",
        description: "A clear path for automated testing, building, and deployment using GitHub Actions, Docker, and environment gates.",
        tag: "DevOps",
        tagColor: "bg-blue-100 text-blue-700",
        link: "blog-detail.html",
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

function renderBlogSections({ mountId, sections, bg, basePath, detailHref, editorHref }) {
  const el = document.getElementById(mountId);
  if (!el) return;

  const data = sections || BLOG_SECTIONS;
  const bgClass = bg || "bg-gray-50";
  const sectionData = data.filter((s) => s.blogs && s.blogs.length > 0);

  const sectionsHTML = sectionData
    .map((section) => {
      const cardsHTML = section.blogs
        .map((blog) => typeof renderBlogCard === "function" ? renderBlogCard(blog, basePath, detailHref) : "")
        .join("\n");
      const cardCount = section.blogs.length;

      return `
        <div class="mb-20 last:mb-0">
          <div class="mb-8 flex items-center gap-3">
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

  const editorActions = editorHref
    ? `<div class="mt-8 flex flex-wrap justify-center gap-3">
         <a href="${editorHref}#write" class="btn-primary">Write Blog</a>
         <a href="${editorHref}#stats" class="btn-secondary">View Stats</a>
       </div>`
    : "";
  const emptyHTML = sectionData.length
    ? sectionsHTML
    : `<div class="rounded-xl border border-dashed border-gray-200 bg-white p-10 text-center text-gray-500">No published blogs yet.</div>`;

  el.innerHTML = `
    <section class="reveal ${bgClass} px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <div class="mb-12 text-center">
          <span class="eyebrow">OUR BLOGS</span>
          <h1 class="section-heading">Insights & <span class="text-primary-600">Stories</span></h1>
          <p class="section-subheading mx-auto">Thoughts on engineering, AI, cloud, and building products that matter.</p>
          ${editorActions}
        </div>
        ${emptyHTML}
      </div>
    </section>`;
}
