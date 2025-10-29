// src\modules\analytics\pages\CampaignPage.tsx
"use client";
import { useAssetStore } from "@/stores/useAssetStore";
import { fetchAnalytics } from '@/lib/api/analyticsApi';
import { useState, useEffect } from 'react';

export default function CampaignPage() {
  const getByType = useAssetStore((s) => s.getByType);
  const adAccounts = getByType("ad_account");
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const loadCampaigns = async () => {
      if (adAccounts[0]?.externalId) {
        const data = await fetchAnalytics("ad_account", adAccounts[0].externalId);
        
        // Group campaigns by ID
        const groupedCampaigns = data.reduce((acc, item) => {
          if (!acc[item.id]) {
            acc[item.id] = {
              id: item.id,
              name: item.name,
              status: item.status,
              objective: item.objective,
              createdAt: item.createdAt,
              allMetrics: []
            };
          }
          acc[item.id].allMetrics.push(item.metrics);
          return acc;
        }, {});

        setCampaigns(Object.values(groupedCampaigns));
      }
    };
    loadCampaigns();
  }, [adAccounts[0]?.externalId]);

  return (
    <div className="h-full grid grid-rows-[auto_1fr] overflow-hidden">
      <div className="flex items-center justify-between border-b px-4 py-2 bg-neutral-50 dark:bg-neutral-900">
        <h2 className="text-lg font-semibold">Campaigns</h2>
      </div>

      <div className="overflow-y-auto p-4 space-y-4">
        <div className="grid grid-cols-3 gap-4">
          {campaigns.map((camp) => (
            <div key={camp.id} className="p-4 border rounded-md bg-white dark:bg-neutral-950">
              <h3 className="font-medium">{camp.name}</h3>
              <p className="text-sm text-gray-500">{camp.status}</p>
              <p className="text-xs text-gray-400 mb-3">{camp.objective}</p>
              
              <div className="space-y-2 border-t pt-2">
                {camp.allMetrics.map((metric) => (
                  <div key={metric.id} className="text-xs bg-gray-50 dark:bg-neutral-900 p-2 rounded">
                    <p className="font-semibold mb-1">{metric.metricDate}</p>
                    <div className="grid grid-cols-2 gap-1">
                      <p>Spend: ${metric.metrics.spend}</p>
                      <p>Clicks: {metric.metrics.clicks}</p>
                      <p>CPC: ${metric.metrics.cpc}</p>
                      <p>CTR: {metric.metrics.ctr}%</p>
                      <p className="col-span-2">Impressions: {metric.metrics.impressions}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}