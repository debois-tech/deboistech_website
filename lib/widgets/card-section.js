// =============================================================
// lib/widgets/card-section.js
// Widget: Generic Card-Grid Section
// Handles: Solutions (4-col), Products (3-col), Blogs (3-col)
// =============================================================
//
// USAGE
// ─────
// 1. Add mount divs to your page:
//      <div id="solutions-root"></div>
//      <div id="selected-products-root"></div>
//      <div id="selected-blogs-root"></div>
//
// 2. Include this script:
//      Root page : <script src="lib/widgets/card-section.js"></script>
//      lib/pages : <script src="../widgets/card-section.js"></script>
//
// 3. Call renderCardSection() with the appropriate cardType:
//
//   Solutions (4-column, centred header):
//      renderCardSection({ mountId:"solutions-root", cardType:"solution",
//        items:SOLUTIONS, cols:4, bg:"bg-gray-50", title:"...", subtitle:"...", basePath:p });
//
//   Products (3-column + CTA bar):
//      renderCardSection({ mountId:"selected-products-root", cardType:"product",
//        items:PRODUCTS, cols:3, bg:"bg-white", title:"...", subtitle:"...",
//        ctaBar:{ text:"...", link:"pages/contact.html", label:"..." }, basePath:p });
//
//   Blogs (3-column + "view all" link inline with heading):
//      renderCardSection({ mountId:"selected-blogs-root", cardType:"blog",
//        items:BLOGS, cols:3, bg:"bg-gray-50", title:"...",
//        viewAllHref:"#", viewAllLabel:"View all →", basePath:p });
//
// DATA DEFINITIONS
// ────────────────
// Products data lives in lib/widgets/product-card.js
// Solutions/Services data lives in lib/widgets/solution-card.js
// Blogs data lives in lib/widgets/blog-sections.js
//
// EXTENDING
// ─────────
// Add a new card type by:
//   1. Defining a new data array (same file or external)
//   2. Adding a new `_renderXxxCard()` helper below
//   3. Adding `if (cardType === "xxx") return _renderXxxCard(item, p)` in renderCardSection
// =============================================================

const BLOGS = [];

// ── PUBLIC RENDERER ────────────────────────────────────────────

/**
 * Renders a card-grid section supporting three card types.
 *
 * @param {Object}  opts
 * @param {string}  opts.mountId       - ID of the container element
 * @param {string}  [opts.bg]          - Tailwind background class
 * @param {string}  opts.title         - Section heading (may include HTML spans)
 * @param {string}  [opts.subtitle]    - Optional subheading
 * @param {string}  [opts.viewAllHref] - If set, a "view all" link appears next to heading
 * @param {string}  [opts.viewAllLabel]- Label for the view-all link
 * @param {Array}   opts.items         - Data array (SOLUTIONS | PRODUCTS | BLOGS)
 * @param {string}  opts.cardType      - "solution" | "product" | "blog"
 * @param {number}  [opts.cols]        - 3 or 4 grid columns (default 3)
 * @param {Object}  [opts.ctaBar]      - { text, link, label } for a CTA strip below the grid
 * @param {string}  [opts.basePath]    - Asset base path
 */
function renderCardSection({
  mountId, bg, title, subtitle, viewAllHref, viewAllLabel,
  items, cardType, cols, ctaBar, basePath, detailHref,
}) {
  const el = document.getElementById(mountId);
  if (!el) return;

  const p = basePath || ".";
  const bgClass = bg || "bg-white";
  const colClass = cols === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3";

  const cardsHTML = items
    .map((item) => {
      if (cardType === "solution") return typeof renderSolutionCard === "function" ? renderSolutionCard(item) : "";
      if (cardType === "product")  return typeof renderProductCard === "function" ? renderProductCard(item, p) : "";
      if (cardType === "blog")     return typeof renderBlogCard === "function" ? renderBlogCard(item, p, detailHref) : "";
      return "";
    })
    .join("\n");

  const headerHTML = viewAllHref
    ? `<div class="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
         <div>
           <h2 class="section-heading">${title}</h2>
           ${subtitle ? `<p class="section-subheading">${subtitle}</p>` : ""}
         </div>
         <a href="${viewAllHref}"
           class="text-sm font-semibold text-primary-600 hover:text-primary-700 whitespace-nowrap">
           ${viewAllLabel || "View all →"}
         </a>
       </div>`
    : `<div class="text-center">
         <h2 class="section-heading">${title}</h2>
         ${subtitle ? `<p class="section-subheading mx-auto">${subtitle}</p>` : ""}
       </div>`;

  const ctaHTML = ctaBar
    ? `<div class="mt-12 rounded-xl border border-gray-100 bg-gray-50 px-8 py-6 text-center sm:flex sm:items-center sm:justify-between sm:text-left">
         <p class="text-lg font-semibold text-gray-900">${ctaBar.text}</p>
         <a href="${ctaBar.link}" class="btn-primary mt-4 sm:mt-0">${ctaBar.label}</a>
       </div>`
    : "";

  el.innerHTML = `
    <section class="reveal ${bgClass} px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div class="mx-auto max-w-7xl">
        ${headerHTML}
        <div class="mt-16 grid gap-8 ${colClass} mobile-scroll">
          ${cardsHTML}
        </div>
        ${ctaHTML}
      </div>
    </section>`;
}
