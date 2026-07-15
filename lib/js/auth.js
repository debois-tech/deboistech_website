// =============================================================
// lib/js/auth.js
// Passphrase-based team authentication.
// Stores session in sessionStorage — cleared when browser tab closes.
// Password is stored as a SHA-256 hash so the plaintext is never
// exposed in source. This is still client-side only and will be
// replaced by Supabase OAuth in the NextJS migration.
// =============================================================

const TEAM_AUTH_KEY = "deboistech.team.auth.v1";

// SHA-256 hash of the team passphrase (pre-computed).
// To change the password: hash the new value and replace this hex string.
const TEAM_PASSWORD_HASH = "9942fc480de800f087e7eefc8546fa0058c1e2ec8800073ad68db94c0be7b3de";

/** Returns true if the current user is authenticated as a team member. */
function isTeamMember() {
  return sessionStorage.getItem(TEAM_AUTH_KEY) === "1";
}

/**
 * Hashes a string using SHA-256 via the Web Crypto API.
 */
async function sha256(value) {
  const encoder = new TextEncoder();
  const data = encoder.encode(value);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Attempts to log in with the given passphrase.
 * Returns true on success, false on failure.
 */
async function teamLogin(password) {
  const hash = await sha256(password);
  if (hash === TEAM_PASSWORD_HASH) {
    sessionStorage.setItem(TEAM_AUTH_KEY, "1");
    return true;
  }
  return false;
}

/** Logs out the current team member. */
function teamLogout() {
  sessionStorage.removeItem(TEAM_AUTH_KEY);
}
