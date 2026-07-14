const SERVICES = [
  {
    iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />`,
    iconBg: "bg-primary-100", iconColor: "text-primary-600",
    title: "Cloud Engineering",
    description: "Scalable, secure and cost-efficient cloud solutions on AWS, Azure and GCP.",
    items: ["Cloud Architecture", "DevOps & Automation", "Infrastructure as Code", "Cloud Migration"],
    link: "#",
  },
  {
    iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />`,
    iconBg: "bg-primary-100", iconColor: "text-primary-600",
    title: "AI Solutions",
    description: "AI-powered applications and automation that unlock insights and boost productivity.",
    items: ["LLM Integration", "Intelligent Automation", "Data Analytics", "Custom AI Models"],
    link: "#",
  },
  {
    iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />`,
    iconBg: "bg-primary-100", iconColor: "text-primary-600",
    title: "Enterprise Applications",
    description: "Robust and secure enterprise software to streamline operations and scale your business.",
    items: ["Web Applications", "API Development", "Microservices", "System Integration"],
    link: "#",
  },
  {
    iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />`,
    iconBg: "bg-primary-100", iconColor: "text-primary-600",
    title: "Product Engineering",
    description: "End-to-end product development from idea validation to launch and beyond.",
    items: ["Product Strategy", "UI/UX Design", "Agile Development", "Product Support"],
    link: "#",
  },
  {
    iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />`,
    iconBg: "bg-primary-100", iconColor: "text-primary-600",
    title: "Web Development",
    description: "Custom websites, web apps, and e-commerce platforms built with modern frameworks.",
    items: ["Custom Websites", "Web Applications", "E-commerce Platforms", "Modern Frameworks"],
    link: "#",
  },
  {
    iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />`,
    iconBg: "bg-primary-100", iconColor: "text-primary-600",
    title: "Mobile Apps",
    description: "iOS and Android applications designed for performance and user experience.",
    items: ["iOS Development", "Android Development", "Cross-platform Apps", "App Store Deployment"],
    link: "#",
  },
  {
    iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />`,
    iconBg: "bg-primary-100", iconColor: "text-primary-600",
    title: "Cloud Solutions",
    description: "Scalable infrastructure, migration, and managed cloud services.",
    items: ["Cloud Migration", "Managed Services", "Scalable Infrastructure", "Cloud Security"],
    link: "#",
  },
  {
    iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />`,
    iconBg: "bg-primary-100", iconColor: "text-primary-600",
    title: "UI/UX Design",
    description: "User-centered design that drives engagement and conversions.",
    items: ["User Research", "Wireframing", "Prototyping", "Visual Design"],
    link: "#",
  },
  {
    iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />`,
    iconBg: "bg-primary-100", iconColor: "text-primary-600",
    title: "Consulting",
    description: "Technical strategy, architecture review, and technology advisory.",
    items: ["Technical Strategy", "Architecture Review", "Technology Advisory", "Digital Transformation"],
    link: "#",
  },
];

const SOLUTIONS = SERVICES.slice(0, 4);

function renderSolutionCard(item) {
  const listItems = item.items.map((i) => `<li class="check-item">${i}</li>`).join("\n");
  return `
    <div class="card">
      <div class="flex h-12 w-12 items-center justify-center rounded-full ${item.iconBg} ${item.iconColor}">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          ${item.iconSvg}
        </svg>
      </div>
      <h3 class="mt-5 text-lg font-bold text-gray-900">${item.title}</h3>
      <p class="mt-2 text-sm leading-relaxed text-gray-500">${item.description}</p>
      <hr class="my-4 border-gray-100" />
      <ul class="space-y-2">${listItems}</ul>
      <a href="${item.link}"
        class="mt-4 inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-700">
        Learn More →
      </a>
    </div>`;
}
