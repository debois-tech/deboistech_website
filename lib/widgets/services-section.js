// =============================================================
// lib/widgets/services-section.js
// Widget: Full 3-tier Services Section (Services page only)
//
// Renders the tier tab-selector + card grid.
// Requires solution-card.js to be loaded first (for SERVICES
// data and renderSolutionCard).
//
// Usage (services page, via main.js):
//   renderServicesSection({ mountId: "services-root", basePath: p });
// =============================================================

// All tiers share the site's primary green theme
const GREEN        = "#059669";
const GREEN_LIGHT  = "rgba(5,150,105,0.10)";

const TIERS = [
  {
    id: "build",
    label: "Build",
    hook: "Turn ideas into working software",
    color: GREEN,
    colorLight: GREEN_LIGHT,
  },
  {
    id: "scale",
    label: "Scale",
    hook: "Make your systems handle growth",
    color: GREEN,
    colorLight: GREEN_LIGHT,
  },
  {
    id: "accelerate",
    label: "Accelerate",
    hook: "Work smarter with AI and design",
    color: GREEN,
    colorLight: GREEN_LIGHT,
  },
];

function renderServicesSection({ mountId, basePath }) {
  const el = document.getElementById(mountId);
  if (!el) return;

  const p = basePath || ".";
  // From lib/pages/* basePath is "../..", so contact is at ../../lib/pages/contact.html
  // From root, basePath is ".", so contact is at lib/pages/contact.html
  const contactHref = p === "../.." ? "../../lib/pages/contact.html" : "lib/pages/contact.html";

  // Build tier tabs HTML
  const tabsHTML = TIERS.map((tier, i) => `
    <button
      class="svc-tier-tab${i === 0 ? " svc-tier-tab--active" : ""}"
      data-tier="${tier.id}"
      style="--tier-color:${tier.color};--tier-light:${tier.colorLight};"
      aria-selected="${i === 0 ? "true" : "false"}"
    >
      <span class="svc-tier-tab__label">${tier.label}</span>
      <span class="svc-tier-tab__hook">${tier.hook}</span>
    </button>
  `).join("\n");

  // Build tier panels (one per tier, each contains 3 cards)
  const panelsHTML = TIERS.map((tier, i) => {
    const tierServices = (typeof SERVICES !== "undefined" ? SERVICES : [])
      .filter(s => s.tier === tier.id);

    const cardsHTML = tierServices.map(item =>
      typeof renderSolutionCard === "function"
        ? renderSolutionCard(item, { ctaHref: contactHref })
        : ""
    ).join("\n");

    return `
      <div
        class="svc-tier-panel${i === 0 ? " svc-tier-panel--active" : ""}"
        data-panel="${tier.id}"
        style="--tier-color:${tier.color};"
        role="tabpanel"
        aria-labelledby="tab-${tier.id}"
      >
        <div class="svc-cards-grid mobile-scroll">
          ${cardsHTML}
        </div>
      </div>`;
  }).join("\n");

  el.innerHTML = `
    <section class="reveal bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div class="mx-auto max-w-7xl">

        <!-- Section header -->
        <div class="text-center mb-14">
          <h2 class="section-heading">Our <span class="text-primary-600">Services</span></h2>
          <p class="section-subheading mx-auto">
            Technology solutions that solve real business problems.
            Not feature lists — outcomes you can measure.
          </p>
        </div>

        <!-- Tier tab selector -->
        <div class="svc-tier-tabs" role="tablist" aria-label="Service tiers">
          ${tabsHTML}
        </div>

        <!-- Tier panels -->
        <div class="svc-tier-panels">
          ${panelsHTML}
        </div>

        <!-- Bottom CTA -->
        <div class="svc-cta-strip">
          <div class="svc-cta-strip__content">
            <p class="svc-cta-strip__heading">Not sure which tier fits your project?</p>
            <p class="svc-cta-strip__body">Tell us what you're building and we'll point you to the right approach — no pitch, just clarity.</p>
          </div>
          <a href="${contactHref}" class="btn-primary whitespace-nowrap">Describe your project →</a>
        </div>

      </div>
    </section>`;

  // ── Wire up tab switching ────────────────────────────────
  const tabs   = el.querySelectorAll(".svc-tier-tab");
  const panels = el.querySelectorAll(".svc-tier-panel");

  function activateTab(tierId) {
    tabs.forEach(t => {
      t.classList.remove("svc-tier-tab--active");
      t.setAttribute("aria-selected", "false");
    });
    panels.forEach(p => p.classList.remove("svc-tier-panel--active"));

    const targetTab = el.querySelector(`.svc-tier-tab[data-tier="${tierId}"]`);
    if (targetTab) {
      targetTab.classList.add("svc-tier-tab--active");
      targetTab.setAttribute("aria-selected", "true");
    }
    el.querySelector(`.svc-tier-panel[data-panel="${tierId}"]`)
      ?.classList.add("svc-tier-panel--active");
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      activateTab(tab.dataset.tier);
    });
  });

  // Activate tab based on URL hash on load
  const hash = window.location.hash.replace("#", "");
  if (hash && ["build", "scale", "accelerate"].includes(hash)) {
    activateTab(hash);
  }
}
