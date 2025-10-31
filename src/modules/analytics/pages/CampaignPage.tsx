// src/modules/analytics/pages/CampaignPage.tsx
"use client";

import { useAssetStore } from "@/stores/useAssetStore";
import { fetchAnalytics } from "@/lib/api/analyticsApi";
import { useEffect, useMemo, useState } from "react";

type MetricRow = {
  id: string;
  entityId: string;
  metricDate: string; // ISO yyyy-mm-dd
  metrics: {
    cpc?: number;
    ctr?: number;
    spend?: number;
    clicks?: number;
    impressions?: number;
  };
  createdAt: string; // ISO
};

type CampaignDTO = {
  id: string;
  name: string;
  status: string;
  objective: string;
  createdAt: string; // ISO
  allMetrics: MetricRow[];
};

export default function CampaignPage() {
  const getByType = useAssetStore((s) => s.getByType);
  const adAccounts = getByType("ad_account");
  const activeAccountId = useMemo(
    () => adAccounts?.[0]?.externalId ?? null,
    [adAccounts]
  );

  const [campaigns, setCampaigns] = useState<CampaignDTO[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!activeAccountId) return;
    (async () => {
      setLoading(true);
      try {
        // fetchAnalytics should return the DTO array the controller sends
        const data: CampaignDTO[] = await fetchAnalytics(
          "ad_account",
          activeAccountId
        );
        setCampaigns(data || []);
      } finally {
        setLoading(false);
      }
    })();
  }, [activeAccountId]);

  if (!activeAccountId) {
    return (
      <div className="p-4 text-sm text-gray-500">
        Connect an ad account to view campaigns.
      </div>
    );
  }

  return (
    <div className="h-full grid grid-rows-[auto_1fr] overflow-hidden">
      <div className="flex items-center justify-between border-b px-4 py-2 bg-neutral-50 dark:bg-neutral-900">
        <h2 className="text-lg font-semibold">Campaigns</h2>
        {loading && <span className="text-xs text-gray-500">Loading…</span>}
      </div>

      <div className="overflow-y-auto p-4 space-y-4">
        {campaigns.length === 0 && !loading ? (
          <p className="text-sm text-gray-500">No campaigns found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {campaigns.map((camp) => (
              <div
                key={camp.id}
                className="p-4 border rounded-md bg-white dark:bg-neutral-950"
              >
                <h3 className="font-medium">{camp.name}</h3>
                <p className="text-sm text-gray-500">{camp.status}</p>
                <p className="text-xs text-gray-400 mb-3">{camp.objective}</p>

                <div className="space-y-2 border-t pt-2">
                  {camp.allMetrics.map((m) => (
                    <div
                      key={m.id || `${camp.id}-${m.metricDate}`}
                      className="text-xs bg-gray-50 dark:bg-neutral-900 p-2 rounded"
                    >
                      <p className="font-semibold mb-1">{m.metricDate}</p>
                      <div className="grid grid-cols-2 gap-1">
                        <p>Spend: ${m.metrics.spend ?? 0}</p>
                        <p>Clicks: {m.metrics.clicks ?? 0}</p>
                        <p>CPC: ${m.metrics.cpc ?? 0}</p>
                        <p>CTR: {(m.metrics.ctr ?? 0).toFixed(3)}%</p>
                        <p className="col-span-2">
                          Impressions: {m.metrics.impressions ?? 0}
                        </p>
                      </div>
                    </div>
                  ))}
                  {camp.allMetrics.length === 0 && (
                    <p className="text-xs text-gray-500">No metrics yet.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
