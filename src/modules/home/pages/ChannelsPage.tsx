// src\modules\home\pages\ChannelsPage.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useUserStore } from "@/providers/UserStoreProvider";
import { ConnectChannelsModal } from "../components/modals/ConnectChannelsModal";

export type Asset = {
  id: string;
  accountId: string;
  provider: string;
  externalId: string;
  name: string;
  assetType: string;
  parentId: string | null;
  parentName: string | null;
};

export type BusinessGroup = {
  business: Asset;
  children: Asset[];
  counts?: Record<string, number>;
};

export default function ChannelsPage() {
  const socialAccounts = useUserStore((s) => s.socialAccounts);
  const accountIds = useMemo(
    () =>
      socialAccounts
        .map((acc: any) => acc.id)
        .filter(Boolean)
        .join(","),
    [socialAccounts]
  );

  const [groups, setGroups] = useState<BusinessGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // no accounts? nothing to fetch
    if (!accountIds) {
      setGroups([]);
      setLoading(false);
      return;
    }

    const ac = new AbortController();
    const run = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`http://localhost:5000/api/assets?accountIds=${encodeURIComponent(accountIds)}`, {
          credentials: "include",
          signal: ac.signal,
        });
        if (!res.ok) throw new Error(`Failed: ${res.status}`);

        const json = await res.json();
        // expecting { ok: true, groups: [...] }
        const data = Array.isArray(json.groups) ? json.groups : [];
        setGroups(data);
      } catch (err) {
        if ((err as any)?.name === "AbortError") return;
        const msg = err instanceof Error ? err.message : "Failed to fetch assets";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    run();
    return () => ac.abort();
  }, [accountIds]);

  if (loading) return <div className="p-6">Loading assets...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  // Compute counts if backend didn't send them
  const normalized = groups.map((g) => {
    if (g.counts) return g;
    const counts = g.children.reduce<Record<string, number>>((m, c) => {
      m[c.assetType] = (m[c.assetType] || 0) + 1;
      return m;
    }, {});
    return { ...g, counts };
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Connected Channels</h1>

      {normalized.length === 0 ? (
        <p className="text-gray-500">No Business Managers found</p>
      ) : (
        <div className="space-y-6">
          {normalized.map(({ business, children, counts }) => (
            <div key={business.id} className="rounded-lg border bg-white p-4">
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{business.name}</h3>
                  <p className="text-xs text-gray-500">Business ID: {business.externalId}</p>
                </div>
                <div className="text-xs text-gray-600">
                  {Object.entries(counts || {})
                    .map(([k, v]) => `${k}: ${v}`)
                    .join(" · ") || `${children.length} assets`}
                </div>
              </div>

              {children.length === 0 ? (
                <p className="text-xs text-gray-400">No child assets</p>
              ) : (
                <div className="space-y-2">
                  {children.map((child) => (
                    <div key={child.id} className="border-l-2 border-gray-200 pl-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{child.name}</span>
                        <span className="text-xs text-gray-500">
                          {child.assetType} · {child.provider}
                        </span>
                      </div>
                      {child.parentName && <p className="text-[11px] text-gray-400">Parent: {child.parentName}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
