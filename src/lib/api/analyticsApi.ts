// src\lib\api\analyticsApi.ts
import { apiUrl } from "@/config/env.client";
import { AssetType } from "@/stores/useAssetStore";

export async function fetchAnalytics(type: AssetType, externalId: string) {
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
  const url = `${apiUrl}/api/analy/${path}?${paramKey}=${encodeURIComponent(externalId)}`;

  const res = await fetch(url, {
    method: "GET",
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) throw new Error(`Failed (${res.status}) fetching ${type}`);

  const { data } = await res.json();
  return data;
}
