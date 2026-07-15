// =============================================================
// lib/js/auth.js
// Simple passphrase-based team authentication.
// Stores session in sessionStorage — cleared when browser tab closes.
// =============================================================

const TEAM_AUTH_KEY = "deboistech.team.auth.v1";
const TEAM_PASSWORD = "deboistech@team";

/** Returns true if the current user is authenticated as a team member. */
function isTeamMember() {
  return sessionStorage.getItem(TEAM_AUTH_KEY) === "1";
}

/**
 * Attempts to log in with the given passphrase.
 * Returns true on success, false on failure.
 */
function teamLogin(password) {
  if (password === TEAM_PASSWORD) {
    sessionStorage.setItem(TEAM_AUTH_KEY, "1");
    return true;
  }
  return false;
}

/** Logs out the current team member. */
function teamLogout() {
  sessionStorage.removeItem(TEAM_AUTH_KEY);
}
