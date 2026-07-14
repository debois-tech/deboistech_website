// =============================================================
// lib/widgets/blog-card.js
// Shared blog card renderer (image-aware with placeholder)
// =============================================================
//
// USAGE
// ─────
//   renderBlogCard(item, basePath)
//
//   item — blog object with shape:
//     { title, description, tag, tagColor, link,
//       image, imageAlt }
//   basePath — asset path prefix (e.g. "." or "../..")
//
//   Returns HTML string for a single blog card.
// =============================================================

function renderBlogCard(item, basePath) {
  const p = basePath || ".";
  const imageBlock = item.image
    ? `<div class="aspect-video w-full overflow-hidden rounded-lg">
         <img src="${p}/${item.image}" alt="${item.imageAlt || item.title}" class="h-full w-full object-cover" />
       </div>`
    : `<div class="placeholder-box aspect-video w-full rounded-lg">
         <span class="text-xs text-gray-400">Screenshot Placeholder</span>
       </div>`;
  return `
    <div class="card">
      ${imageBlock}
      <span class="mt-4 inline-block rounded-full ${item.tagColor} px-3 py-1 text-xs font-semibold whitespace-nowrap">
        ${item.tag}
      </span>
      <h3 class="mt-3 text-lg font-bold text-gray-900">${item.title}</h3>
      <p class="mt-2 text-sm text-gray-500">${item.description}</p>
      <a href="${item.link}" target="_blank" rel="noopener noreferrer"
        class="mt-3 inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-700">
        View Blog →
      </a>
    </div>`;
}
