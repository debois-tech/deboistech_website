// =============================================================
// lib/widgets/solution-card.js
// Widget: Service Card (3-tier: Build / Scale / Accelerate)
// =============================================================
//
// SERVICES  — full 9-card dataset (used by services page)
// SOLUTIONS — 3 representative cards, used by home page grid
//
// renderSolutionCard(item, opts)
//   Renders a single problem→solution service card using the
//   site's primary green theme. Called by card-section.js
//   (cardType:"solution") and services-section.js.
// =============================================================

const SERVICES = [
  // ── TIER 1: BUILD ─────────────────────────────────────────
  {
    tier: "build",
    iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />`,
    title: "Product Engineering",
    problem: "Your product roadmap keeps slipping because your team is juggling too many priorities.",
    solution: "We embed a dedicated squad that owns the full lifecycle — from architecture to launch — so you hit milestones without burning out your internal team.",
    ctaLabel: "Talk to us about Product Engineering",
    link: "../../lib/pages/contact.html",
  },
  {
    tier: "build",
    iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />`,
    title: "Web Development",
    problem: "Your current site looks dated, loads slowly, and converts poorly.",
    solution: "We build fast, responsive web apps on modern stacks (React, Next.js, Node) with performance and SEO baked in from day one.",
    ctaLabel: "Talk to us about Web Development",
    link: "../../lib/pages/contact.html",
  },
  {
    tier: "build",
    iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />`,
    title: "Mobile Apps",
    problem: "Your users expect a native app experience, but cross-platform tools feel limiting.",
    solution: "We choose the right approach — native, Flutter, or React Native — based on your performance needs and timeline. No one-size-fits-all.",
    ctaLabel: "Talk to us about Mobile Apps",
    link: "../../lib/pages/contact.html",
  },

  // ── TIER 2: SCALE ─────────────────────────────────────────
  {
    tier: "scale",
    iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />`,
    title: "Cloud Engineering",
    problem: "Your cloud bill is unpredictable and your infrastructure can't handle traffic spikes.",
    solution: "We design auto-scaling, cost-optimized architectures on AWS, Azure, or GCP with Infrastructure as Code and CI/CD from day one.",
    ctaLabel: "Talk to us about Cloud Engineering",
    link: "../../lib/pages/contact.html",
  },
  {
    tier: "scale",
    iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />`,
    title: "Enterprise Applications",
    problem: "Your teams work in silos because your systems don't talk to each other.",
    solution: "We build API-first microservices and integrate legacy systems so data flows seamlessly across your organization.",
    ctaLabel: "Talk to us about Enterprise Applications",
    link: "../../lib/pages/contact.html",
  },
  {
    tier: "scale",
    iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />`,
    title: "DevOps & Automation",
    problem: "Releases are stressful and your team spends more time fixing deployments than shipping features.",
    solution: "We set up CI/CD pipelines, container orchestration, and monitoring so your team deploys confidently, multiple times a day.",
    ctaLabel: "Talk to us about DevOps & Automation",
    link: "../../lib/pages/contact.html",
  },

  // ── TIER 3: ACCELERATE ────────────────────────────────────
  {
    tier: "accelerate",
    iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />`,
    title: "AI Solutions",
    problem: "You're sitting on data but can't turn it into actionable insights.",
    solution: "We integrate LLMs, build custom models, and automate workflows so your team makes decisions faster and your product gets smarter.",
    ctaLabel: "Talk to us about AI Solutions",
    link: "../../lib/pages/contact.html",
  },
  {
    tier: "accelerate",
    iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />`,
    title: "UI/UX Design",
    problem: "Users sign up but don't stick around — your product is hard to use.",
    solution: "We run user research, wireframe flows, and prototype before a single line of code is written. Design that actually converts.",
    ctaLabel: "Talk to us about UI/UX Design",
    link: "../../lib/pages/contact.html",
  },
  {
    tier: "accelerate",
    iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />`,
    title: "Consulting",
    problem: "You need a technical strategy but don't want a 100-page deck you'll never read.",
    solution: "We deliver actionable roadmaps, architecture reviews, and hands-on advisory — practical advice you can execute next week.",
    ctaLabel: "Talk to us about Consulting",
    link: "../../lib/pages/contact.html",
  },
];

// Home page uses one card from each tier
const SOLUTIONS = [SERVICES[0], SERVICES[3], SERVICES[6]];

// ── Card renderer ─────────────────────────────────────────────
// Uses the site's primary green theme throughout — no per-card
// accent overrides. Outcome badge removed.
function renderSolutionCard(item, opts = {}) {
  const ctaHref = opts.ctaHref || item.link || "#";

  return `
    <div class="svc-card">
      <div class="svc-card__header">
        <div class="svc-card__icon-wrap">
          <svg class="svc-card__icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            ${item.iconSvg}
          </svg>
        </div>
        <h3 class="svc-card__title">${item.title}</h3>
      </div>
      <div class="svc-card__divider"></div>
      <p class="svc-card__problem">${item.problem}</p>
      <p class="svc-card__solution"><span class="svc-card__arrow">→</span> ${item.solution}</p>
      <a href="${ctaHref}" class="svc-card__cta">
        ${item.ctaLabel} →
      </a>
    </div>`;
}
