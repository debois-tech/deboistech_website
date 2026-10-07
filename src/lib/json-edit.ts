// Pure helpers behind the /admin JSON editor.

export type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

export const isObject = (v: unknown): v is { [key: string]: Json } =>
  typeof v === "object" && v !== null && !Array.isArray(v);

/** Empty copy of `sample`: same shape, blank values. Used for "Add item". */
export function blankLike(sample: Json | undefined): Json {
  if (typeof sample === "number") return 0;
  if (typeof sample === "boolean") return false;
  if (Array.isArray(sample)) return [];
  if (isObject(sample)) {
    return Object.fromEntries(Object.entries(sample).map(([k, v]) => [k, blankLike(v)]));
  }
  return "";
}

/** "iconPath" -> "Icon path" */
export const humanize = (key: string) =>
  key.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/^./, (c) => c.toUpperCase());

/** One-line label for a collapsed list item. */
export function summaryOf(item: Json, index: number): string {
  if (typeof item === "string") return item || `Item ${index + 1}`;
  if (isObject(item)) {
    for (const key of ["title", "name", "q", "label", "alt", "slug", "id"]) {
      const v = item[key];
      if (typeof v === "string" && v) return v;
    }
    const first = Object.values(item).find((v) => typeof v === "string" && v);
    if (typeof first === "string") return first;
  }
  return `Item ${index + 1}`;
}

/** Swap item `i` with its neighbour; returns the same array if out of range. */
export function move<T>(list: T[], i: number, dir: -1 | 1): T[] {
  const j = i + dir;
  if (j < 0 || j >= list.length) return list;
  const next = list.slice();
  [next[i], next[j]] = [next[j], next[i]];
  return next;
}

export const slugify = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
