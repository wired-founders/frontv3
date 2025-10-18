// src\config\env.server.ts
function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required env var: ${key}`);
  return value;
}

// safe to throw here — server code runs in Node, not the browser
export const env = {
  API_ORIGIN: requireEnv("API_ORIGIN"),
  DATABASE_URL: requireEnv("DATABASE_URL"),
  SUPABASE_SERVICE_ROLE_KEY: requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
};
