// src\utils\normalize.ts
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
