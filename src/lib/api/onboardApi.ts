// src\lib\api\onboardApi.ts
import { apiUrl } from "@/config/env.client";

export async function createWorkspace(data: { name: string }) {
  try {
    const res = await fetch(`${apiUrl}/onboard`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed (${res.status})`);
    }

    const result = await res.json();
    return result;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Creation failed";
    throw new Error(message);
  }
}
export type CompanyData = {
  name: string;
  industry: string;
  website: string;
  description: string;
};

export async function createCompany(data: CompanyData) {
  const res = await fetch(`${apiUrl}/onboard/company`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create company");
  return res.json();
}
