// src\app\(dashboard)\home\pages\Analytics.tsx
"use client";

import { useState, useEffect } from "react";
import { useUserStore } from "@/providers/UserStoreProvider";

type Campaign = {
  id: string;
  assetId: string;
  provider: string;
  externalId: string;
  entityType: string;
  parentId: string | null;
  name: string;
  status: string;
  objective: string;
  metadata: any;
  createdAt: string;
  updatedAt: string;
};

function AnalyticsHeader({ 
  selectedAccountId, 
  setSelectedAccountId, 
  adAccountIds, 
  fetchingAccounts,
  platform,
  setPlatform,
  start,
  setStart,
  end,
  setEnd,
  fetchAnalytics
}: any) {
  return (
    <div className="bg-white border rounded-lg p-4 space-y-3">
      <div>
        <label className="text-sm font-medium block mb-1">Ad Account</label>
        <select
          value={selectedAccountId}
          onChange={(e) => setSelectedAccountId(e.target.value)}
          className="border rounded px-3 py-2 text-sm w-full max-w-md"
          disabled={fetchingAccounts}
        >
          <option value="">{fetchingAccounts ? "Loading accounts..." : "Select Ad Account"}</option>
          {adAccountIds.map((id: string) => (
            <option key={id} value={id}>{id}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-2">
        {["all", "facebook", "linkedin", "instagram"].map((p) => (
          <button
            key={p}
            onClick={() => setPlatform(p)}
            className={`px-3 py-1 rounded border text-sm ${platform === p ? "bg-gray-900 text-white" : "bg-white"}`}
          >
            {p[0].toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm">
          Start
          <input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="ml-2 border rounded px-2 py-1 text-sm"
          />
        </label>
        <label className="text-sm">
          End
          <input
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="ml-2 border rounded px-2 py-1 text-sm"
          />
        </label>
        <button
          onClick={fetchAnalytics}
          className="ml-auto px-4 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
        >
          Fetch
        </button>
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const [platform, setPlatform] = useState<string>("all");
  const [start, setStart] = useState<string>("2025-01-01");
  const [end, setEnd] = useState<string>("2025-01-31");
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");
  const [adAccountIds, setAdAccountIds] = useState<string[]>([]);
  const [fetchingAccounts, setFetchingAccounts] = useState(false);

  const socialAccounts = useUserStore((s) => s.socialAccounts);
  const socialAccountId = socialAccounts[0]?.id;

  useEffect(() => {
    if (socialAccountId) {
      fetchAdAccounts();
    }
  }, [socialAccountId]);

  const fetchAdAccounts = async () => {
    setFetchingAccounts(true);
    try {
      const res = await fetch(`http://localhost:5000/api/ad-accounts?accountIds=${socialAccountId}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error(`Failed: ${res.status}`);
      const { adAccountIds } = await res.json();
      setAdAccountIds(Array.isArray(adAccountIds) ? adAccountIds : []);
    } catch (err) {
      console.error("Failed to fetch ad accounts:", err);
    } finally {
      setFetchingAccounts(false);
    }
  };

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    if (platform && platform !== "all") params.set("platform", platform);
    if (start) params.set("startDate", start);
    if (end) params.set("endDate", end);
    if (selectedAccountId) params.set("accountId", selectedAccountId);

    try {
      const res = await fetch(`http://localhost:5000/api/analytics/campaigns?${params.toString()}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error(`Failed: ${res.status}`);
      const data = await res.json();
      setCampaigns(Array.isArray(data.campaigns) ? data.campaigns : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch analytics");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Analytics</h1>

      <AnalyticsHeader
        selectedAccountId={selectedAccountId}
        setSelectedAccountId={setSelectedAccountId}
        adAccountIds={adAccountIds}
        fetchingAccounts={fetchingAccounts}
        platform={platform}
        setPlatform={setPlatform}
        start={start}
        setStart={setStart}
        end={end}
        setEnd={setEnd}
        fetchAnalytics={fetchAnalytics}
      />

      {loading && <div className="text-gray-600">Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white border p-4 rounded-lg">
            <p className="text-lg font-semibold">{campaign.name}</p>
            <p className="text-sm text-gray-600">
              Status: <span className={`font-medium ${campaign.status === 'ACTIVE' ? 'text-green-600' : 'text-gray-500'}`}>
                {campaign.status}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              Objective: <span className="font-medium">{campaign.objective}</span>
            </p>
            <p className="text-sm text-gray-600">
              Provider: <span className="font-medium">{campaign.provider}</span>
            </p>
          </div>
        ))}
      </div>

      {!loading && !error && campaigns.length === 0 && (
        <p className="text-gray-500">No campaigns found. Try selecting an ad account.</p>
      )}
    </div>
  );
}