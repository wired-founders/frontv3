// src\lib\api\fetchApi.ts
/**
 1. get Company
 2. Get channels
 3. Get Items 
 4. Get Channel Data
 5. Get Campaigns
 6. Link Campaign Products
 */
import { apiUrl } from "@/config/env.client";
import { Company, Item, ChannelsResponse } from "@/types/home_types";

export async function getCompany(): Promise<Company> {
  const response = await fetch(`${apiUrl}/api/company`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to fetch company");
  return response.json();
}
export async function getItems(): Promise<Item[]> {
  const res = await fetch(`${apiUrl}/api/items`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
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

export async function fetchChannels(accountIds: string[]): Promise<ChannelsResponse> {
  const query = accountIds.map((id) => `accountIds=${encodeURIComponent(id)}`).join("&");

  const res = await fetch(`${apiUrl}/api/assets?${query}`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch channels: ${res.status}`);
  }

  const { groups, assets, entities } = await res.json();
  return { groups, assets, entities };
}


