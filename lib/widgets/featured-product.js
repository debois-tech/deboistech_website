// =============================================================
// lib/widgets/featured-product.js
// Widget: Feature Spotlight (image + eyebrow + checklist + CTA)
// =============================================================
//
// USAGE
// ─────
// 1. Add a mount div to your page:
//      <div id="featured-product-root"></div>
//
// 2. Include this script (path depends on page depth):
//      Root page : <script src="lib/widgets/featured-product.js"></script>
//      lib/pages : <script src="../widgets/featured-product.js"></script>
//
// 3. Call the renderer in your DOMContentLoaded handler:
//      renderFeatureSpotlight({
//        mountId:  "featured-product-root",
//        bg:       "bg-gray-50",
//        config:   TENANTPLANE_SPOTLIGHT,
//        basePath: p,   // "lib" from root, ".." from lib/pages/
//      });
//
// ADDING A NEW SPOTLIGHT
// ───────────────────────
// Create a new config object matching the shape of TENANTPLANE_SPOTLIGHT
// and pass it as `config`. No code changes required in this file.
// =============================================================

/** Default spotlight config for TenantPlane (used on the home page). */
const TENANTPLANE_SPOTLIGHT = {
  eyebrow: "FEATURED PRODUCT",
  title: `Tenant<span class="text-primary-600">Plane</span>`,
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
  linkLabel: "Explore TenantPlane →",
  image: "images/products/tenantplane.png",
  imageAlt: "TenantPlane screenshot",
};

/**
 * Renders a Feature Spotlight section — full-width image + content layout.
 *
 * @param {Object} opts
 * @param {string} opts.mountId   - ID of the container element
 * @param {string} [opts.bg]      - Tailwind background class (default "bg-gray-50")
 * @param {Object} opts.config    - Spotlight config object (see TENANTPLANE_SPOTLIGHT)
 * @param {string} [opts.basePath]- Asset base path ("lib" for root, ".." for lib/pages/)
 */
function renderFeatureSpotlight({ mountId, bg, config, basePath }) {
  const el = document.getElementById(mountId);
  if (!el) return;

  const p = basePath || ".";
  const bgClass = bg || "bg-gray-50";

  const checkItems = config.items
    .map((item) => `<span class="check-item">${item}</span>`)
    .join("\n");

  el.innerHTML = `
    <section class="reveal ${bgClass} px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <div class="grid items-center gap-6 lg:grid-cols-2">
          <div class="flex justify-center">
            <img src="${p}/${config.image}" alt="${config.imageAlt}"
              class="hero-image-wrap w-full max-w-lg rounded-xl shadow-lg" />
          </div>
          <div>
            <span class="eyebrow">${config.eyebrow}</span>
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              ${config.title}
            </h2>
            <p class="mt-4 text-lg leading-relaxed text-gray-500">${config.description}</p>
            <div class="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
              ${checkItems}
            </div>
            <div class="mt-8">
              <a href="${config.link}" target="_blank" rel="noopener noreferrer"
                class="btn-primary">${config.linkLabel}</a>
            </div>
          </div>
        </div>
      </div>
    </section>`;
}
