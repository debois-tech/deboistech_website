// =============================================================
// lib/widgets/careers.js
// Widget: Open Roles / Career Listings
// =============================================================
//
// USAGE
// ─────
// 1. Add a mount div to your page:
//      <div id="careers-root"></div>
//
// 2. Include this script:
//      Root page : <script src="lib/widgets/careers.js"></script>
//      lib/pages : <script src="../widgets/careers.js"></script>
//
// 3. Call the renderer:
//      renderCareers({
//        mountId: "careers-root",
//        roles:   OPEN_ROLES,       // use default or pass custom array
//      });
//
// ADDING ROLES
// ─────────────
// Push a new object into OPEN_ROLES (or pass a custom array).
// Each role shape:
//   {
//     iconSvg:     "<path … />",            // heroicon SVG path
//     iconBg:      "bg-primary-100",        // Tailwind bg class
//     iconColor:   "text-primary-600",      // Tailwind text class
//     title:       "Role Title",
//     description: "Short description…",
//     tags:        [{ label: "Remote", color: "bg-primary-50 text-primary-700" }],
//     applyUrl:    "#ADDD_GOOGLE_FORM_LINK_HERE",   // Google Form link (falls back to global below)
//   }
// =============================================================

// #ADDD GOOGLE FORM LINK HERE — replace this URL with your Google Form link for all career applications
const CAREER_APPLY_URL = "mailto:hr@deboistech.in";

/** Current open roles at deboistech. */
const OPEN_ROLES = [
  {
    iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />`,
    iconBg: "bg-primary-100",
    iconColor: "text-primary-600",
    title: "Founder’s Office Intern",
    description:
      "Work closely with the founders on strategy, operations, training programs, partnerships, and products. Open to students and recent graduates.",
    tags: [
      { label: "Nashik (Offline)", color: "bg-primary-50 text-primary-700" },
      { label: "Internship",       color: "bg-primary-50 text-primary-700" },
      { label: "1 Month",          color: "bg-primary-50 text-primary-700" },
    ],
    applyUrl: "https://forms.gle/C1Jivv7QMA8zG9vD7",
  },
  {
    iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />`,
    iconBg: "bg-primary-100",
    iconColor: "text-primary-600",
    title: "Business Development Intern",
    description:
      "Drive outreach to colleges, institutions, and partners, and help grow our technology training programs and products. Open to students and recent graduates.",
    tags: [
      { label: "Nashik (Offline)", color: "bg-primary-50 text-primary-700" },
      { label: "Internship",       color: "bg-primary-50 text-primary-700" },
      { label: "1 Month",          color: "bg-primary-50 text-primary-700" },
    ],
    applyUrl: "https://forms.gle/C1Jivv7QMA8zG9vD7",
  },
  {
    iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />`,
    iconBg: "bg-primary-100",
    iconColor: "text-primary-600",
    title: "UI/UX Intern",
    description:
      "Help shape the visual identity of our products. Work on UI/UX design, branding, and marketing assets alongside our engineering team.",
    tags: [
      { label: "Remote",     color: "bg-primary-50 text-primary-700" },
      { label: "Internship", color: "bg-primary-50 text-primary-700" },
      { label: "Part-Time",  color: "bg-primary-50 text-primary-700" },
    ],
    applyUrl: "https://forms.gle/YSRR41uF4pX58DcH8",
  },
];

/**
 * Renders a full Careers / Open Roles section.
 *
 * @param {Object}  opts
 * @param {string}  opts.mountId       - ID of the container element
 * @param {Array}   [opts.roles]       - Role data array (defaults to OPEN_ROLES)
 * @param {string}  [opts.title]       - Section heading (default "Open Roles")
 * @param {string}  [opts.subtitle]    - Optional subheading
 * @param {string}  [opts.bg]          - Tailwind background class
 */
function renderCareers({ mountId, roles, title, subtitle, bg }) {
  const el = document.getElementById(mountId);
  if (!el) return;

  const data    = roles   || OPEN_ROLES;
  const heading = title   || "Join Our Team";
  const bgClass = bg      || "bg-white";

  const roleCards = data
    .map((role) => {
      const tagBadges = role.tags
        .map(
          (t) =>
            `<span class="inline-flex items-center rounded-full ${t.color} px-3 py-1 text-xs font-medium">${t.label}</span>`
        )
        .join("\n");

      const applyUrl = role.applyUrl || CAREER_APPLY_URL;

      return `
        <div class="card flex flex-col">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${role.iconBg} ${role.iconColor}">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                ${role.iconSvg}
              </svg>
            </div>
            <h2 class="text-lg font-bold text-gray-900">${role.title}</h2>
          </div>
          <p class="mt-3 text-sm text-gray-500">${role.description}</p>
          <div class="mt-3 flex flex-wrap gap-2">
            ${tagBadges}
          </div>
          <div class="mt-4">
            <a href="${applyUrl}" target="_blank" class="btn-primary">Apply Now</a>
          </div>
        </div>`;
    })
    .join("\n");

  el.innerHTML = `
    <section class="reveal ${bgClass} px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <div class="text-center">
          <h1 class="section-heading">${heading}</h1>
          ${subtitle ? `<p class="section-subheading mx-auto">${subtitle}</p>` : `<p class="section-subheading mx-auto">We're a small, focused team building products that matter. Join us if you love ownership, learning, and impact.</p>`}
        </div>
        ${
          data.length > 0
            ? `<div class="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3 mobile-scroll">
                 ${roleCards}
               </div>`
            : `<div class="mt-16 rounded-xl border border-dashed border-gray-200 bg-gray-50 py-20 text-center">
                  <p class="text-lg font-semibold text-gray-700">No open positions right now.</p>
                  <p class="mt-2 text-sm text-gray-500">Check back soon or submit your application using the link below.</p>
                </div>`
        }
        <div class="mt-12 rounded-xl border border-gray-100 bg-gray-50 px-8 py-6 text-center sm:flex sm:items-center sm:justify-between sm:text-left">
          <div>
            <p class="text-lg font-semibold text-gray-900">Don't see a role that fits?</p>
            <p class="mt-1 text-sm text-gray-500">Submit your application anyway — we're always looking for great people.</p>
          </div>
          <a href="${CAREER_APPLY_URL}" target="_blank"
            class="btn-primary mt-4 sm:mt-0 whitespace-nowrap">Send Your Application →</a>
        </div>
      </div>
    </section>`;
}
