// =============================================================
// lib/widgets/blog-card.js
// Shared blog card renderer with detail links and local stats.
// =============================================================

function renderBlogCard(item, basePath, detailHref) {
  const p = basePath || ".";
  const linkBase = detailHref || item.link || "#";
  const link = item.id && linkBase !== "#" && !linkBase.includes("?post=")
    ? `${linkBase}?post=${encodeURIComponent(item.id)}`
    : linkBase;
  const stats = item.id && typeof getBlogStats === "function" ? getBlogStats(item.id) : null;
  const statsHTML = stats
    ? `<div class="mt-4 flex flex-wrap gap-2 text-xs text-gray-500">
         <span class="rounded-full bg-gray-50 px-2.5 py-1 font-medium">${Number(stats.views || 0).toLocaleString()} views</span>
         <span class="rounded-full bg-gray-50 px-2.5 py-1 font-medium">${Number(stats.reads || 0).toLocaleString()} reads</span>
       </div>`
    : "";
  const imageBlock = item.image
    ? `<a href="${link}" class="block aspect-video w-full overflow-hidden rounded-lg">
         <img src="${isExternalBlogCardAsset(item.image) ? item.image : `${p}/${item.image}`}" alt="${escapeBlogCardHtml(item.imageAlt || item.title)}" class="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
       </a>`
    : `<a href="${link}" class="placeholder-box block aspect-video w-full rounded-lg">
         <span class="text-xs text-gray-400">Cover Placeholder</span>
       </a>`;

  return `
    <div class="card flex h-full flex-col">
      ${imageBlock}
      <span class="mt-4 inline-block self-start rounded-full ${item.tagColor} px-3 py-1 text-xs font-semibold whitespace-nowrap">
        ${escapeBlogCardHtml(item.tag)}
      </span>
      <h3 class="mt-3 text-lg font-bold text-gray-900"><a href="${link}" class="transition-colors hover:text-primary-700">${escapeBlogCardHtml(item.title)}</a></h3>
      <p class="mt-2 text-sm leading-6 text-gray-500">${escapeBlogCardHtml(item.description)}</p>
      ${statsHTML}
      <a href="${link}"
        class="mt-auto inline-flex pt-4 text-sm font-semibold text-primary-600 hover:text-primary-700">
        View Blog &rarr;
      </a>
    </div>`;
}

function escapeBlogCardHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isExternalBlogCardAsset(value) {
  return /^(https?:|data:|blob:|\.\/|\.\.\/|\/)/.test(String(value || ""));
}
