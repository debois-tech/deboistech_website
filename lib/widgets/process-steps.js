// =============================================================
// lib/widgets/process-steps.js
// Widget: Development Process Stepper
// =============================================================
//
// USAGE
// ─────
// 1. Add a mount div:
//      <div id="process-root"></div>
//
// 2. Include this script:
//      Root page : <script src="lib/widgets/process-steps.js"></script>
//      lib/pages : <script src="../widgets/process-steps.js"></script>
//
// 3. Call the renderer:
//      renderProcessSteps({ mountId: "process-root", steps: PROCESS_STEPS });
//
// CUSTOMISING STEPS
// ─────────────────
// Pass a custom array of step objects, or modify PROCESS_STEPS.
// Each step: { iconSvg: "<path ... />", title: "...", description: "..." }
// =============================================================

/** Default 5-step engineering process used on the home page. */
const PROCESS_STEPS = [
  {
    iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />`,
    title: "Discover",
    description: "Understanding your business and goals",
  },
  {
    iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />`,
    title: "Design",
    description: "Planning architecture and user experience",
  },
  {
    iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />`,
    title: "Develop",
    description: "Building scalable and high-quality software",
  },
  {
    iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />`,
    title: "Deploy",
    description: "Secure deployment and migration",
  },
  {
    iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />`,
    title: "Support",
    description: "Continuous support and improvement",
  },
];

/**
 * Renders a horizontal stepper section with a dashed connector line.
 * Each step has an icon circle that fills with the primary colour on hover.
 *
 * @param {Object} opts
 * @param {string} opts.mountId - ID of the container element
 * @param {Array}  opts.steps   - Array of { iconSvg, title, description } objects
 */
function renderProcessSteps({ mountId, steps }) {
  const el = document.getElementById(mountId);
  if (!el) return;

  const stepItems = steps
    .map(
      (step) => `
    <div class="group relative z-10 flex flex-col items-center text-center md:w-48">
      <div class="flex items-center justify-center rounded-full border-2 border-primary-600 bg-white text-primary-600 transition-all duration-300 group-hover:bg-primary-600 group-hover:text-white"
        style="width: 4.5rem; height: 4.5rem;">
        <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          ${step.iconSvg}
        </svg>
      </div>
      <h3 class="mt-4 text-sm font-bold text-gray-900">${step.title}</h3>
      <p class="mt-1 text-xs text-gray-500">${step.description}</p>
    </div>`
    )
    .join("\n");

  el.innerHTML = `
    <section class="reveal bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <div class="text-center">
          <h2 class="section-heading">Our Development Process</h2>
        </div>
        <div class="mt-16">
          <div class="relative flex items-start justify-between">
            <div class="absolute left-0 top-9 hidden h-0.5 w-full border-t-2 border-dashed border-primary-200 md:block"></div>
            ${stepItems}
          </div>
        </div>
      </div>
    </section>`;
}
