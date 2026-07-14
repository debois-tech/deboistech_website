// =============================================================
// lib/js/components.js
// Shared layout components: Navbar + Footer (self-mounting)
//
// ARCHITECTURE NOTE
// ─────────────────
// Widget renderers (renderFeatureSpotlight, renderTechMarquee,
// renderCardSection, renderProcessSteps, renderCareers) now live
// in their own files under lib/widgets/.
//
// This file is responsible ONLY for the shared chrome (nav + footer)
// that appears on EVERY page. It self-mounts on DOMContentLoaded.
//
// PATH LOGIC
// ──────────
// Pages in lib/pages/ set basePath = ".."  → assets at ../images/ etc.
// index.html at root    sets basePath = "." → assets at ./images/ etc.
// The isSub check detects the lib/pages/ depth automatically.
// =============================================================

document.addEventListener("DOMContentLoaded", () => {
  // isSub = true  when loaded from lib/pages/*.html
  // isSub = false when loaded from index.html (root)
  const isSub = window.location.pathname.includes("/lib/pages/");

  // imgBase  : prefix for image / CSS / font paths
  //   root     → "."      → ./images/logo.png
  //   lib/pages → "../.."  → ../../images/logo.png  (lib/pages/ → lib/ → root)
  const imgBase = isSub ? "../.." : ".";

  // pageHref : prefix for links BETWEEN lib/pages/* files
  //   root     → "lib/pages"  → lib/pages/services.html
  //   lib/pages → "."         → ./services.html  (same dir)
  const pageHref = isSub ? "." : "lib/pages";

  // homeHref : link back to index.html
  //   root     → "index.html"
  //   lib/pages → "../../index.html"  (lib/pages/ → lib/ → root)
  const homeHref = isSub ? "../../index.html" : "index.html";

  const page = window.location.pathname.split("/").pop();
  const active = (name) =>
    page === name ? "text-gray-900" : "text-gray-600 hover:text-gray-900";

  // ── Navbar ──────────────────────────────────────────────────
  const navRoot = document.getElementById("navbar-root");
  if (navRoot) {
    navRoot.innerHTML = `
      <header class="fixed top-12 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4">
        <nav class="mobile-nav flex items-center justify-between rounded-2xl bg-white/95 backdrop-blur px-5 py-3.5 shadow-lg border border-gray-100">
          <a href="${homeHref}" class="flex items-center">
            <img src="${imgBase}/images/logo.png" alt="deboistech" class="mobile-logo h-9 w-auto" />
          </a>
          <div class="flex items-center gap-10">
            <ul id="nav-menu" class="hidden sm:flex items-center gap-10">
              <li><a href="${pageHref}/services.html" class="text-base font-medium ${active("services.html")}">Services</a></li>
              <li><a href="${pageHref}/products.html" class="text-base font-medium ${active("products.html")}">Product</a></li>
              <li><a href="${pageHref}/about.html" class="text-base font-medium ${active("about.html")}">About</a></li>
              <li><a href="${pageHref}/blogs.html" class="text-base font-medium ${active("blogs.html")}">Blogs</a></li>
            </ul>
            <a href="${pageHref}/contact.html"
              class="hidden sm:inline-flex items-center gap-2 rounded-full bg-primary-700 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-800">
              Let's Talk →
            </a>
          </div>
          <button id="menu-toggle" class="sm:hidden rounded-lg p-2 text-gray-600 hover:bg-gray-100" aria-label="Toggle menu">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </nav>
        <div id="mobile-menu" class="hidden sm:hidden mt-2 rounded-xl border border-gray-100 bg-white px-4 pb-4 pt-2 shadow-lg">
          <a href="${pageHref}/services.html" class="block rounded-lg px-3 py-2 text-base font-medium ${active("services.html")}">Services</a>
          <a href="${pageHref}/products.html" class="block rounded-lg px-3 py-2 text-base font-medium ${active("products.html")}">Product</a>
          <a href="${pageHref}/about.html" class="block rounded-lg px-3 py-2 text-base font-medium ${active("about.html")}">About</a>
          <a href="${pageHref}/blogs.html" class="block rounded-lg px-3 py-2 text-base font-medium ${active("blogs.html")}">Blogs</a>
          <a href="${pageHref}/contact.html"
            class="mt-3 inline-flex items-center gap-2 rounded-full bg-primary-700 px-5 py-2 text-sm font-semibold text-white">
            Let's Talk →
          </a>
        </div>
      </header>`;

    const toggle = document.getElementById("menu-toggle");
    const menu   = document.getElementById("mobile-menu");
    if (toggle && menu) {
      toggle.addEventListener("click", () => menu.classList.toggle("hidden"));
    }
  }

  // ── Footer ──────────────────────────────────────────────────
  const ftRoot = document.getElementById("footer-root");
  if (ftRoot) {
    const aboutHref   = `${pageHref}/about.html`;
    const careersHref = `${pageHref}/careers.html`;
    const contactHref = `${pageHref}/contact.html`;

    ftRoot.innerHTML = `
      <footer class="bg-primary-900 px-4 py-16 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl">
          <div class="grid gap-8 lg:grid-cols-6">
            <div class="lg:col-span-2">
              <a href="${homeHref}" class="text-2xl font-bold text-white">deboistech</a>
              <p class="mt-4 max-w-xs text-sm leading-relaxed text-gray-400">
                Engineering modern solutions, AI, and cloud platforms that drive real business impact.
              </p>
              <div class="mt-6 flex gap-3">
                <a href="https://github.com/debois-tech" target="_blank" rel="noopener noreferrer"
                  class="flex h-10 w-10 items-center justify-center rounded-full bg-primary-800 text-gray-400 transition-colors hover:bg-primary-700 hover:text-white" aria-label="GitHub">
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>
                </a>
                <a href="https://www.linkedin.com/company/deboistech" target="_blank" rel="noopener noreferrer"
                  class="flex h-10 w-10 items-center justify-center rounded-full bg-primary-800 text-gray-400 transition-colors hover:bg-primary-700 hover:text-white" aria-label="LinkedIn">
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </a>
                <a href="https://www.instagram.com/deboistech/" target="_blank" rel="noopener noreferrer"
                  class="flex h-10 w-10 items-center justify-center rounded-full bg-primary-800 text-gray-400 transition-colors hover:bg-primary-700 hover:text-white" aria-label="Instagram">
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                </a>
              </div>
            </div>
            <div>
              <h4 class="text-sm font-bold text-white">Products</h4>
              <ul class="mt-4 space-y-3">
                <li><a href="https://tenantplane.deboistech.in/" target="_blank" rel="noopener noreferrer" class="text-sm text-gray-400 hover:text-white">TenantPlane</a></li>
                <li><a href="https://www.motoadmin.in/" target="_blank" rel="noopener noreferrer" class="text-sm text-gray-400 hover:text-white">MotoAdmin</a></li>
              </ul>
            </div>
            <div>
              <h4 class="text-sm font-bold text-white">Solutions</h4>
              <ul class="mt-4 space-y-3">
                <li><a href="#" class="text-sm text-gray-400 hover:text-white">Cloud Engineering</a></li>
                <li><a href="#" class="text-sm text-gray-400 hover:text-white">AI Solutions</a></li>
                <li><a href="#" class="text-sm text-gray-400 hover:text-white">Enterprise Software</a></li>
                <li><a href="#" class="text-sm text-gray-400 hover:text-white">Digital Products</a></li>
              </ul>
            </div>
            <div>
              <h4 class="text-sm font-bold text-white">Resources</h4>
              <ul class="mt-4 space-y-3">
                <li><a href="#" class="text-sm text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" class="text-sm text-gray-400 hover:text-white">FAQ's</a></li>
              </ul>
            </div>
            <div>
              <h4 class="text-sm font-bold text-white">Company</h4>
              <ul class="mt-4 space-y-3">
                <li><a href="${aboutHref}"   class="text-sm text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="${careersHref}" class="text-sm text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="${contactHref}" class="text-sm text-gray-400 hover:text-white">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div class="mt-12 border-t border-primary-700 pt-8 sm:flex sm:items-center sm:justify-between">
            <p class="text-xs text-gray-500">&copy; 2026 deboistech Technologies Pvt. Ltd. All rights reserved.</p>
            <div class="mt-4 flex gap-6 sm:mt-0">
              <a href="#" class="text-xs text-gray-500 hover:text-white">Privacy Policy</a>
              <a href="#" class="text-xs text-gray-500 hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>`;
  }
});
