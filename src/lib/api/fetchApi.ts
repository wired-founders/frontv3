// src\lib\api\fetchApi.ts
/**
 1. get Company
 2. Get channels
 3. Get Items 
 4. Get Campaign Data
 */
import { apiUrl } from "@/config/env.client";
import { CompanyInput, Item } from "@/types/home_types";

export async function getCompany(): Promise<CompanyInput> {
  const response = await fetch(`${apiUrl}/api/company`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to fetch company");
  return response.json();
}

export async function getChannels() {
  const res = await fetch(`${apiUrl}/api/channels`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch channels");
  console.log("channels", res.json());
  return res.json();
}

type GetItemsOpts = { signal?: AbortSignal };

export async function getItems(opts: GetItemsOpts = {}): Promise<Item[]> {
  const res = await fetch(`${apiUrl}/api/items`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    signal: opts.signal,
    cache: "no-store",
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Failed to fetch items (${res.status})`);
  }
  const { data } = await res.json();
  //console.log("items", data);
  return data;
}

export async function getAssets(accountIds: string[]) {
  const response = await fetch(`${apiUrl}/api/assets?accountIds=${accountIds.join(",")}`, { credentials: "include" });
  if (!response.ok) throw new Error("Failed to fetch assets");
  return response.json();
}


export async function fetchChannels(accountIds: string) {
  const res = await fetch(`${apiUrl}/api/assets?accountIds=${encodeURIComponent(accountIds)}`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error(`Failed to fetch channels: ${res.status}`);

  return res.json();
}
