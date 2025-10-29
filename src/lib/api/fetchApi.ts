// src\lib\api\fetchApi.ts
/**
 1. get Company
 2. Get channels
 3. Get Items 
 4. Get Campaign Data
 */
import { apiUrl } from "@/config/env.client";
import { CompanyInput, Item } from "@/types/home_types";
import { mockChannelsData } from "./data";

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
  const { groups } = await res.json();
  console.log("ane", groups);

  return groups;
}

export async function fetchChannelss(accountIds: string[]) {
  // Return mock data directly
  // return mockChannelsData;

  //Original API call - commented out
  const query = accountIds.map((id) => `accountIds=${encodeURIComponent(id)}`).join("&");

  const res = await fetch(`${apiUrl}/api/assets?${query}`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch channels: ${res.status}`);
  }

  const { groups, assets } = await res.json();
return { groups, assets };
}

export async function fetchSocialAccounts(accountIds: string[]) {
  if (!accountIds?.length) throw new Error("No account IDs provided");

  const query = accountIds.join(","); // combine IDs into a comma-separated string

  const res = await fetch(`${apiUrl}/api/social-assets?accountIds=${encodeURIComponent(query)}`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error(`Failed to fetch social accounts: ${res.status}`);

  return await res.json();
}

// src/lib/api/fetchApi.ts
export async function fetchMockAssets() {
  const res = await fetch(`${apiUrl}/api/mock/assets`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

const { assets } = await res.json();
  return assets || [];
}
