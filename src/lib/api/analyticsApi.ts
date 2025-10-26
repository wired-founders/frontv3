// src\lib\api\analyticsApi.ts
// src/api/analytics.ts
import { apiUrl } from "@/config/env.client";

export const getAssets = async () => {
  const res = await fetch(`${apiUrl}/analytics/assets`, {
    credentials: 'include', // If using cookies
  });
  
  if (!res.ok) throw new Error('Failed to fetch assets');
  return res.json();
};

export const syncMetrics = async (assetId: string, externalId: string) => {
  const res = await fetch(`${apiUrl}/analytics/sync-metrics`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ assetId, externalId })
  });
  
  if (!res.ok) throw new Error('Failed to sync metrics');
  return res.json();
};