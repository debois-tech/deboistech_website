// =============================================================
// lib/widgets/product-card.js
// Shared product card renderer + product data
// =============================================================
//
// USAGE
// ─────
//   renderProductCard(item, basePath)
//
//   item — product object with shape:
//     { iconSvg, iconBg, iconColor, title, description,
//       link, linkTarget, linkLabel, image, imageAlt }
//   basePath — asset path prefix (e.g. "." or "../..")
//
//   Returns HTML string for a single product card.
// =============================================================

const PRODUCTS = [
  {
    iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />`,
    iconBg: "bg-primary-100", iconColor: "text-primary-600",
    title: "TenantPlane",
    description: "Kubernetes management platform for cluster provisioning, monitoring, and operations across cloud environments.",
    link: "https://tenantplane.deboistech.in/",
    linkTarget: "_blank",
    linkLabel: "Explore TenantPlane →",
    image: "images/products/tenantplanecropped.png",
    imageAlt: "TenantPlane screenshot",
  },
  {
    iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75M8.25 15l1.5 1.5L12 13.5" />`,
    iconBg: "bg-orange-100", iconColor: "text-orange-600",
    title: "MotoAdmin",
    description: "Driving school management platform for customer CRM, document tracking, automated WhatsApp reminders, invoicing, and multi-branch operations.",
    link: "https://www.motoadmin.in/",
    linkTarget: "_blank",
    linkLabel: "Explore MotoAdmin →",
    image: "images/products/motoadmin.png",
    imageAlt: "MotoAdmin screenshot",
  },
];

function renderProductCard(item, basePath) {
  const p = basePath || ".";
  const rel = item.linkTarget === "_blank" ? 'rel="noopener noreferrer"' : "";
  const imageBlock = item.image
    ? `<div class="mt-5 flex-1 min-h-[140px] overflow-hidden rounded-xl">
         <img src="${p}/${item.image}" alt="${item.imageAlt}" class="h-full w-full object-cover" />
       </div>`
    : `<div class="placeholder-box mt-5 flex-1 min-h-[140px]">
         <span class="text-xs text-gray-400">Screenshot Placeholder</span>
       </div>`;
  return `
    <div class="card flex flex-col">
      <div class="flex h-12 w-12 items-center justify-center rounded-xl ${item.iconBg} ${item.iconColor}">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          ${item.iconSvg}
        </svg>
      </div>
      <h3 class="mt-5 text-lg font-bold text-gray-900">${item.title}</h3>
      <p class="mt-2 text-sm text-gray-500">${item.description}</p>
      <a href="${item.link}" target="${item.linkTarget || "_self"}" ${rel}
        class="mt-3 inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-700">
        ${item.linkLabel}
      </a>
      ${imageBlock}
    </div>`;
}
