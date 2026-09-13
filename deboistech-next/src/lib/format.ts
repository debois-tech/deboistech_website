/**
 * Date formatting helpers.
 *
 * `toLocaleDateString()` with no arguments resolves against the host's
 * locale and timezone, which differ between the Node server and the
 * browser — producing a hydration mismatch on every rendered date.
 * Pinning both makes server and client output identical.
 */
const DATE_FORMAT = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** e.g. "17 Aug 2026". Returns `fallback` for null/invalid input. */
export function formatDate(value: string | null | undefined, fallback = ""): string {
  if (!value) return fallback;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return fallback;
  return DATE_FORMAT.format(date);
}

/** ISO-8601 date portion for <time dateTime="…">. */
export function isoDate(value: string | null | undefined): string | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

const DOMAIN_LABELS: Record<string, string> = {
  ml: "Machine Learning",
  devops: "DevOps",
  web: "Web",
  general: "General",
};

export function domainLabel(domain: string): string {
  return DOMAIN_LABELS[domain] ?? domain;
}
