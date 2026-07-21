// =============================================================
// lib/js/main.js
// Page orchestrator — mounts widgets + wires up interactions
//
// SCRIPT LOAD ORDER (index.html or any page):
//   1. lib/widgets/featured-product.js   → defines renderFeatureSpotlight
//   2. lib/widgets/tech-marquee.js        → defines renderTechMarquee
//   3. lib/widgets/card-section.js        → defines renderCardSection
//   4. lib/widgets/process-steps.js       → defines renderProcessSteps
//   5. lib/widgets/careers.js             → defines renderCareers
//   6. lib/js/components.js               → mounts navbar + footer (self)
//   7. lib/js/main.js  ← THIS FILE        → mounts sections + observers
//
// Renderers MUST be called BEFORE the IntersectionObserver is set up
// so dynamically injected .reveal elements are observed on first load.
// =============================================================

document.addEventListener("DOMContentLoaded", () => {
  // ── Resolve asset base path ──────────────────────────────────
  // lib/pages/* → basePath = ".."  (../images/, ../lib/pages/, …)
  // index.html  → basePath = "."   (./images/, ./lib/pages/, …)
  const isSub = window.location.pathname.includes("/lib/pages/");
  const p        = isSub ? "../.." : ".";         // for image paths in widgets (../../images/ from lib/pages/)
  const pageHref = isSub ? "." : "lib/pages";     // for page-to-page links
  const getRenderedBlogSections = () => {
    const baseSections = typeof BLOG_SECTIONS !== "undefined" ? BLOG_SECTIONS : [];
    return typeof getBlogSectionsWithStoredPosts === "function"
      ? getBlogSectionsWithStoredPosts(baseSections)
      : baseSections;
  };

  // ────────────────────────────────────────────────────────────
  // SECTION RENDERS
  // Call each widget renderer before setting up the scroll
  // observer so that injected .reveal wrappers get observed.
  // ────────────────────────────────────────────────────────────

  // Section 2 — Featured Product spotlight
  if (typeof renderFeatureSpotlight === "function") {
    renderFeatureSpotlight({
      mountId:  "featured-product-root",
      bg:       "bg-gray-50",
      config:   TENANTPLANE_SPOTLIGHT,
      basePath: p,
    });
  }

  // Section 3 — Trusted Technologies logo scroll
  if (typeof renderTechMarquee === "function") {
    renderTechMarquee({
      mountId:  "tech-marquee-root",
      title:    "Trusted Technologies",
      subtitle: "We use modern, reliable and secure technologies to build scalable solutions for the future.",
      logos:    TECH_LOGOS,
      basePath: p,
    });
  }

  // Section 4 — Solutions (3-column, centered, home page only)
  if (typeof renderCardSection === "function" && document.getElementById("solutions-root") && typeof SOLUTIONS !== "undefined") {
    renderCardSection({
      mountId:  "solutions-root",
      bg:       "bg-gray-50",
      title:    `Solutions That Drive <span class="text-primary-600">Real Impact</span>`,
      subtitle: "From cloud infrastructure to intelligent applications, we build scalable, secure and future-ready solutions tailored to your business.",
      items:    SOLUTIONS,
      cardType: "solution",
      cols:     3,
      basePath: p,
      smallCta: {
        text: "Explore All Services →",
        link: `${pageHref}/services.html`,
      },
    });
  }

  // Section 5 — Selected Products (3-column + CTA bar, home page only)
  if (typeof renderCardSection === "function" && document.getElementById("selected-products-root") && typeof PRODUCTS !== "undefined") {
    renderCardSection({
      mountId:  "selected-products-root",
      bg:       "bg-white",
      title:    "Latest Products",
      subtitle: "We build and maintain powerful products used by teams worldwide.",
      items:    PRODUCTS.slice(0, 3),
      cardType: "product",
      cols:     3,
      ctaBar: {
        text:  "Want to build something amazing together?",
        link:  `${pageHref}/contact.html`,
        label: "Let's Build Your Product →",
      },
      basePath: p,
    });
  }

  // Section 6 — Selected Blogs (defaults + locally published posts)
  if (typeof renderCardSection === "function") {
    const latestBlogs = getRenderedBlogSections().flatMap(s => s.blogs || []).slice(0, 3);
    if (latestBlogs.length > 0 && document.getElementById("selected-blogs-root")) {
      renderCardSection({
        mountId:      "selected-blogs-root",
        bg:           "bg-gray-50",
        title:        "Selected Blogs",
        viewAllHref:  `${pageHref}/blogs.html`,
        viewAllLabel: "View all blogs &rarr;",
        items:        latestBlogs,
        cardType:     "blog",
        cols:         3,
        basePath:     p,
        detailHref:   `${pageHref}/blog-detail.html`,
      });
    }
  }

  // Section 7 — Development Process stepper
  if (typeof renderProcessSteps === "function") {
    renderProcessSteps({
      mountId: "process-root",
      steps:   PROCESS_STEPS,
    });
  }

  // Careers page — Open Roles grid
  if (typeof renderCareers === "function") {
    renderCareers({
      mountId: "careers-root",
      roles:   OPEN_ROLES,
    });
  }

  // Blog page — domain-based blog sections with local published posts.
  if (typeof renderBlogSections === "function") {
    renderBlogSections({
      mountId: "blog-sections-root",
      sections: getRenderedBlogSections(),
      basePath: p,
      detailHref: `${pageHref}/blog-detail.html`,
      editorHref: `${pageHref}/blog-studio.html`,
    });
  }

  // Blog detail page — resolves the selected post from ?post=slug-or-id.
  if (typeof renderBlogDetail === "function" && document.getElementById("blog-detail-root")) {
    const blogBasePath = isSub ? "../.." : ".";
    const requestedPost = new URLSearchParams(window.location.search).get("post");
    const currentPost = typeof findBlogPostById === "function" ? findBlogPostById(requestedPost) : null;
    if (currentPost) {
      const stats = typeof trackBlogView === "function" ? trackBlogView(currentPost.id) : undefined;
      document.getElementById("blog-detail-root").innerHTML = renderBlogDetail(currentPost, blogBasePath, stats);
      if (typeof initBlogDetailInteractions === "function") initBlogDetailInteractions(currentPost);
    } else {
      document.getElementById("blog-detail-root").innerHTML = renderBlogDetail(null);
    }
  }

  // Blog studio — local editor, drafts, published posts, and per-blog stats.
  // TEAM ONLY: redirect public visitors back to the blogs page.
  if (typeof renderBlogStudio === "function" && document.getElementById("blog-studio-root")) {
    if (typeof isTeamMember === "function" && !isTeamMember()) {
      window.location.replace((isSub ? "./" : "lib/pages/") + "blogs.html?locked=1");
    } else {
      document.getElementById("blog-studio-root").innerHTML = renderBlogStudio({ basePath: p, pageHref });
      if (typeof initBlogStudio === "function") initBlogStudio({ basePath: p, pageHref });
    }
  }

  // Services page — 3-tier tabbed services grid
  if (typeof renderServicesSection === "function" && document.getElementById("services-root")) {
    renderServicesSection({
      mountId:  "services-root",
      basePath: p,
    });
  }

  // Products page — all products grid
  if (typeof renderCardSection === "function" && document.getElementById("products-root") && typeof PRODUCTS !== "undefined") {
    renderCardSection({
      mountId:  "products-root",
      bg:       "bg-gray-50",
      title:    'Our <span class="text-primary-600">Products</span>',
      subtitle: "Tools and platforms built by deboistech to power modern infrastructure and teams.",
      items:    PRODUCTS,
      cardType: "product",
      cols:     3,
      basePath: p,
    });
  }

  // Section 8 — FAQ accordion (about page) / FAQ page
  if (typeof initFaqAccordion === "function") {
    const faqSection = document.getElementById("faq-section");
    if (faqSection) initFaqAccordion(faqSection);
  }
  if (typeof renderFaqAccordion === "function") {
    const faqPageRoot = document.getElementById("faq-page-root");
    if (faqPageRoot) renderFaqAccordion({ mountId: "faq-page-root" });
  }

  // ── Scroll reveal observer ────────────────────────────────────
  // Registered AFTER all renders so injected .reveal elements
  // are included in the observation set.
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  // ── Logo scroll — pause animation on hover ────────────────────
  document.querySelectorAll(".scroll-track, .scroll-track-reverse").forEach((el) => {
    el.addEventListener("mouseenter", () => { el.style.animationPlayState = "paused"; });
    el.addEventListener("mouseleave", () => { el.style.animationPlayState = "running"; });
  });

  // ── Contact form (handled by FormSubmit — no JS needed) ──────
  // The form in index.html already uses action="https://formsubmit.co/..."
  // No JS submit handler required.
});
