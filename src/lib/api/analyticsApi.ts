// src\lib\api\analyticsApi.ts
/**
 1. 
 2. 
 */
import { apiUrl } from "@/config/env.client";
import { AssetType } from "@/stores/useAssetStore";
import { CampaignDTO } from "@/types/analyticsTypes";

export async function fetchAnalytics(type: AssetType, externalId: string): Promise<CampaignDTO[]> {
  const pathMap: Record<AssetType, string> = {
    business: "business",
    page: "pages",
    instagram: "instagram",
    whatsapp: "whatsapp",
    ad_account: "campaigns",
  };

  // parameter key per type
  const paramKeyMap: Record<AssetType, string> = {
    ad_account: "adAccountId",
    page: "pageId",
    instagram: "accountId",
    business: "businessId",
    whatsapp: "whatsappId",
  };

  const path = pathMap[type];
  const paramKey = paramKeyMap[type];
  const url = `${apiUrl}/api/analytics/${path}?${paramKey}=${encodeURIComponent(externalId)}`;

  const res = await fetch(url, {
    method: "GET",
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) throw new Error(`Failed (${res.status}) fetching ${type}`);

  const { data } = await res.json();
  //console.log("campaigns", data);

  return data;
}

export async function fetchOrganic(ids: string[]) {
  const qs = ids.map((id) => `ids=${encodeURIComponent(id)}`).join("&");
  const res = await fetch(`${apiUrl}/api/analytics/organic?${qs}`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) throw new Error(`Failed to fetch organic insights (${res.status})`);
  const { data } = await res.json();
  return data;
}

export async function getCampaigns(accountId: string) {
  const res = await fetch(`${apiUrl}/api/analytics/campaignss?accountId=${encodeURIComponent(accountId)}`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Failed to fetch campaigns (${res.status})`);
  }
  const { data } = await res.json();
  return data;
}

export async function linkCampaignProducts(entityId: string, itemIds: string[]) {
  const res = await fetch(`${apiUrl}/api/analytics/campaign-products/link`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ entityId, itemIds }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Failed to link products (${res.status})`);
  }
  return res.json();
}
export async function getCampaignProductLinks(params: { itemId?: string; entityId?: string }) {
  const q = new URLSearchParams();
  if (params.itemId) q.set("itemId", params.itemId);
  if (params.entityId) q.set("entityId", params.entityId);

  const res = await fetch(`${apiUrl}/api/analytics/campaign-products?${q.toString()}`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Failed to fetch campaign-product links (${res.status})`);
  }
  const { data } = await res.json();
  return data;
}
