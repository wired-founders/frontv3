// src\lib\api\onboardApi.ts
import { apiUrl } from "@/config/env.client";
import {newWorkspaceInput } from '@/types/onboard_types'
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


export async function getCompany(): Promise<CompanyData> {
  const response = await fetch(`${apiUrl}/api/company`, {
    credentials: 'include'
  });
  if (!response.ok) throw new Error('Failed to fetch company');
  return response.json();
}

export async function getChannels() {
  const response = await fetch(`${apiUrl}/api/channels`, {
    credentials: 'include'
  });
  if (!response.ok) throw new Error('Failed to fetch channels');
  return response.json();
}
export async function getAssets(accountIds: string[]) {
  const response = await fetch(
    `${apiUrl}/api/assets?accountIds=${accountIds.join(",")}`,
    { credentials: "include" }
  );
  if (!response.ok) throw new Error("Failed to fetch assets");
  return response.json();
}