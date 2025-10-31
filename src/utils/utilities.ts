// src\utils\utilities.ts
/**
 * Utility functions: small, pure helpers for sanitizing and transforming data.
 *
 * 1. normalizeWebsite(raw)
 *    - Cleans and standardizes website URLs.
 *    - Adds missing protocol (https://).
 *    - Trims spaces and trailing dots.
 *    - Lowercases hostname.
 *    - Returns safe, valid URL or original if invalid.
 *
 * 2. addGroupCounts(groups)
 *    - Adds a `counts` object to each BusinessGroup.
 *    - Tallies child assets by their `assetType`.
 *    - Leaves existing `counts` untouched.
 */

export function normalizeWebsite(raw: string | undefined | null): string {
  if (!raw) return "";
  let s = String(raw).trim();
  // allow empty
  if (s === "") return "";
  // strip trailing dots/spaces
  s = s.replace(/\.+$/, "");
  // add protocol if missing
  if (!/^https?:\/\//i.test(s)) s = `https://${s}`;
  try {
    const u = new URL(s);
    // lowercase hostname; keep path/query as-is
    u.hostname = u.hostname.toLowerCase();
    return u.toString();
  } catch {
    // if it's still garbage, return original so RHF can show error
    return s;
  }
}

