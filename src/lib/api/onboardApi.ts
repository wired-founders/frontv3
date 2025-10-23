// src\lib\api\onboardApi.ts
import { apiUrl } from "@/config/env.client";
import {newWorkspaceInput,CompanyData } from '@/types/onboard_types'

export async function createWorkspace(data: newWorkspaceInput) {
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


export async function createItem(data: any) {
  const res = await fetch(`${apiUrl}/onboard/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create item");
  return res.json();
}
