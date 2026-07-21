// =============================================================
// lib/widgets/faq-accordion.js
// Widget: Reusable FAQ accordion with smooth max-height animation
// =============================================================
//
// USAGE (new page with render)
// ──────────────────────────────
//   renderFaqAccordion({ mountId: "faq-root", items: FAQ_ITEMS });
//
// USAGE (existing inline markup)
// ──────────────────────────────
//   initFaqAccordion(document.getElementById("faq-section"));
//
// Inline classes expected:
//   .faq-item  — accordion row wrapper
//   .faq-trigger — clickable button (question row)
//   .faq-content — expandable answer wrapper
//   .faq-vert    — span for + icon (rotates 45° on open to become ×)
// =============================================================

const DEFAULT_FAQ_ITEMS = [
  {
    q: "What services does deboistech provide?",
    a: `We provide end-to-end technology solutions, including:<br>
      - Website Development<br>
      - Mobile App Development<br>
      - Custom Software Development<br>
      - AI & Machine Learning Solutions<br>
      - ERP Development<br>
      - CRM Development<br>
      - UI/UX Design<br>
      - Graphic Design & Branding<br>
      - SEO Services<br>
      - GEO (Generative Engine Optimization)<br>
      - DevOps & Cloud Solutions<br>
      - SaaS Product Development<br>
      - API Development & Integrations<br>
      - Website Maintenance & Support`,
  },
  {
    q: "Is deboistech a software company or a digital agency?",
    a: "deboistech is a technology company that combines software engineering, product development, cloud technologies, AI, and creative design services. We work with startups, SMEs, educational institutions, and enterprises to build scalable digital products and business solutions.",
  },
  {
    q: "Where is deboistech located?",
    a: "deboistech is based in Nashik, Maharashtra, and serves clients across India and internationally through remote collaboration and online project delivery.",
  },
  {
    q: "Do you work with clients outside Nashik?",
    a: "Yes. Although we are headquartered in Nashik, we work with businesses, startups, educational institutions, and organizations across India and overseas.",
  },
  {
    q: "Why should I choose deboistech?",
    a: "We focus on understanding business problems before writing code. Our team combines technical expertise, modern technologies, user-centric design, and scalable architecture to deliver reliable digital solutions tailored to each client's goals.",
  },
  {
    q: "Can deboistech build a website for my business?",
    a: "Yes. We design and develop business websites, corporate websites, portfolio websites, eCommerce stores, educational platforms, landing pages, and custom web applications optimized for performance, SEO, and user experience.",
  },
  {
    q: "Do you develop mobile applications?",
    a: "Yes. We develop Android, iOS, and cross-platform mobile applications tailored to your business requirements using modern development frameworks.",
  },
  {
    q: "Do you build custom software?",
    a: "Yes. We specialize in developing custom software solutions for businesses, including internal management systems, automation tools, customer portals, and enterprise applications.",
  },
  {
    q: "Does deboistech develop ERP and CRM systems?",
    a: "Yes. We develop customized ERP and CRM solutions that help businesses manage operations, inventory, customers, sales, employees, finance, and reporting efficiently.",
  },
  {
    q: "Do you provide AI development services?",
    a: "Yes. We build AI-powered applications, intelligent automation solutions, chatbots, document processing systems, recommendation engines, and machine learning solutions for businesses.",
  },
  {
    q: "Can you redesign my existing website?",
    a: "Absolutely. We can redesign outdated websites to improve visual appearance, mobile responsiveness, speed, SEO performance, accessibility, and user experience.",
  },
  {
    q: "Do you provide UI/UX and graphic design services?",
    a: "Yes. Our design services include UI/UX design, branding, logo design, marketing creatives, social media graphics, presentations, and complete brand identity design.",
  },
  {
    q: "What industries do you work with?",
    a: "We work with startups, educational institutions, healthcare organizations, manufacturing companies, retail businesses, hospitality, logistics, professional services, and many other industries.",
  },
  {
    q: "Do you provide SEO services?",
    a: "Yes. We help businesses improve their online visibility through technical SEO, on-page optimization, local SEO, content strategy, website performance optimization, and search engine best practices.",
  },
  {
    q: "What is GEO (Generative Engine Optimization)?",
    a: "Generative Engine Optimization (GEO) focuses on making your business and content discoverable by AI-powered search experiences like ChatGPT, Google AI Overviews, Gemini, and other AI assistants through structured, authoritative, and helpful content.",
  },
  {
    q: "Can deboistech help my business appear in AI search results?",
    a: "Yes. We create AI-friendly content, structured website architecture, FAQ sections, schema markup, knowledge content, and technical optimizations that improve the likelihood of your business being surfaced in AI-generated answers.",
  },
  {
    q: "How long does a typical project take?",
    a: "Project timelines depend on complexity. Simple websites may take a few weeks, while custom software, mobile applications, or enterprise solutions may require several months. A detailed timeline is shared before development begins.",
  },
  {
    q: "Do you offer website maintenance after launch?",
    a: "Yes. We provide ongoing maintenance, security updates, performance optimization, backups, feature enhancements, and technical support after your project goes live.",
  },
  {
    q: "How can I get a quote?",
    a: "Simply contact us with your project requirements. After understanding your goals, features, and timeline, we'll provide a customized proposal and estimate.",
  },
  {
    q: "Do you work with startups?",
    a: "Yes. We enjoy partnering with startups from the idea stage through product design, MVP development, scaling, and long-term technical support.",
  },
  {
    q: "Can I schedule a consultation before starting a project?",
    a: "Absolutely. We offer consultations to understand your business requirements, discuss possible solutions, recommend the right technology stack, and help you plan your project.",
  },
];

/** Wire up smooth toggle on existing .faq-item markup within a root element */
function initFaqAccordion(root) {
  root.querySelectorAll(".faq-item").forEach((item) => {
    const trigger = item.querySelector(".faq-trigger");
    const content = item.querySelector(".faq-content");
    if (!trigger || !content) return;

    trigger.addEventListener("click", () => {
      const isOpen =
        content.style.maxHeight !== "0px" &&
        content.style.maxHeight !== "";

      if (!isOpen) {
        root.querySelectorAll(".faq-item").forEach((otherItem) => {
          if (otherItem === item) return;
          const otherContent = otherItem.querySelector(".faq-content");
          const otherVert = otherItem.querySelector(".faq-vert");
          const otherChevron = otherItem.querySelector(".faq-chevron");
          if (otherContent) otherContent.style.maxHeight = "0";
          if (otherVert) otherVert.style.transform = "rotate(0deg)";
          if (otherChevron) otherChevron.style.removeProperty("transform");
        });
      }

      const vert = item.querySelector(".faq-vert");
      const chevron = item.querySelector(".faq-chevron");

      if (isOpen) {
        content.style.maxHeight = "0";
        if (vert) vert.style.transform = "rotate(0deg)";
        if (chevron) chevron.style.removeProperty("transform");
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
        if (vert) vert.style.transform = "rotate(45deg)";
        if (chevron) chevron.style.transform = "rotate(180deg)";
      }
    });
  });
}

/** Render a full FAQ section (heading + accordion list) inside mountId */
function renderFaqAccordion({ mountId, items }) {
  const el = document.getElementById(mountId);
  if (!el) return;

  const faqItems = items || DEFAULT_FAQ_ITEMS;

  el.innerHTML = `
    <section class="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-3xl">
        <div>
          ${faqItems
            .map(
              (item, i) => `
            <div class="faq-item border-b border-gray-100 ${i === 0 ? "border-t" : ""}">
              <button class="faq-trigger flex w-full cursor-pointer items-center justify-between px-0 py-5 text-left text-sm font-semibold text-gray-900">
                <span>${item.q}</span>
                <svg class="faq-vert h-4 w-4 shrink-0 text-gray-300 transition-transform duration-300" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                  <path d="M10 4v12M4 10h12" />
                </svg>
              </button>
              <div class="faq-content overflow-hidden transition-all duration-300" style="max-height: 0;">
                <div class="pb-5 text-sm leading-6 text-gray-500">
                  ${item.a}
                </div>
              </div>
            </div>`
            )
            .join("")}
        </div>
      </div>
    </section>`;

  initFaqAccordion(el);
}
