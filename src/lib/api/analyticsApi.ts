// src\lib\api\analyticsApi.ts
import { apiUrl } from "@/config/env.client";
import { AssetType } from "@/stores/useAssetStore";
import { CampaignDTO } from "@/types/analyticsTypes";
import { URLSearchParams } from "url";

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
  return data;
}

export async function fetchOrganic(ids: string[]) {
  const qs = ids.map(id => `ids=${encodeURIComponent(id)}`).join("&");
  const res = await fetch(`${apiUrl}/api/analytics/organic?${qs}`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) throw new Error(`Failed to fetch organic insights (${res.status})`);
  const { data } = await res.json();
  return data;
}

