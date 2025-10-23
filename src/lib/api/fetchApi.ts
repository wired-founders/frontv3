// src\lib\api\fetchApi.ts
import { apiUrl } from "@/config/env.client";
import {CompanyData } from '@/types/onboard_types'

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