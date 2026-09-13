// =============================================================
// Supabase configuration guard.
//
// The Supabase project does not exist yet (plan Phase 4), so
// .env.local still holds the placeholder values from Phase 1.6.2.
// Those are syntactically valid, which means a plain "is the var
// set?" check passes and then every query fails on DNS lookup —
// taking the whole page down with it.
//
// This module is the single place that decides whether the data
// layer should talk to Supabase at all. Queries fall back to the
// static content in lib/content.ts when it says no.
// =============================================================

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/** Values create-next-app / the conversion plan leaves behind. */
const PLACEHOLDER_PATTERN = /your-project-ref|your-anon-key|your-service-role-key|placeholder|^changeme$/i;

function isRealValue(value: string): boolean {
  return value.length > 0 && !PLACEHOLDER_PATTERN.test(value);
}

/**
 * True only when both public Supabase credentials look like real values.
 * Cheap and synchronous — safe to call in any Server Component.
 */
export function isSupabaseConfigured(): boolean {
  if (!isRealValue(SUPABASE_URL) || !isRealValue(SUPABASE_ANON_KEY)) {
    return false;
  }
  try {
    const { protocol } = new URL(SUPABASE_URL);
    return protocol === "https:" || protocol === "http:";
  } catch {
    return false;
  }
}
