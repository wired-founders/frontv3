// src\lib\api\serverAuthApi.ts
//   🔗 Connected to 1. (Auth).layout &  2. Dashboard Layout
//   if (result.status === 401) redirect("/login");
//   if (result.status === 403) redirect("/verify-email"); 👉 middleware/requireAuth 403
//   if (!result.ok) redirect("/login");

//    ❓ need to check redirect verify url

import { cookies } from "next/headers";
import { env } from "@/config/env.server";
import { type User, type Workspace, type Company, type SocialAccount } from "@/stores/userStore";

type SessionResult =
  | { ok: false; status: 401 | 403 | number }
  | { ok: true; user: User; workspace: Workspace; company: Company;socialAccounts: SocialAccount[]  };


export async function checkSession(): Promise<SessionResult> {
  const cookieStore = await cookies();

  const res = await fetch(`${env.API_URL}/auth/validate`, {
    method: "GET",
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
    signal: AbortSignal.timeout(10000),
  });
  // console.log("Status:", res.status);
  // console.log("Headers:", Object.fromEntries(res.headers.entries()));

  // Return status for different redirects
  if (res.status === 401) return { ok: false, status: 401 };
  if (res.status === 403) return { ok: false, status: 403 };
  if (!res.ok) return { ok: false, status: res.status };

  try {
    const result = await res.json();
    return { ok: true, ...result };
  } catch {
    return { ok: false, status: 500 };
  }
}
