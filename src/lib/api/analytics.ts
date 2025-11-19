// src\lib\api\analytics.ts
import { CampaignQuery } from "./anaTypes";

function toQueryString(params: Record<string, any>) {
  return Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");
}

import { apiUrl } from "@/config/env.client";

export async function fetchPaidCampaigns(params: CampaignQuery) {
  const query = toQueryString(params);

  const res = await fetch(`${apiUrl}/api/analytics/paid/campaigns?${query}`, {
    credentials: "include",
  });

  const body = await res.json();
  return body.data || [];
}
