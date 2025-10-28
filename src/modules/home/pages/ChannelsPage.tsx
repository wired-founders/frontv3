// src\modules\home\pages\ChannelsPage.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useUserStore } from "@/providers/UserStoreProvider";
import { ConnectChannelsModal } from "../components/modals/ConnectChannelsModal";
import { Button, RouteLoading } from "@/components/ui";
import { BusinessGroup } from "@/types/home_types";
import { fetchChannels } from "@/lib/api/fetchApi";
import { toast } from "sonner";

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
  const [open, setOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  useEffect(() => {
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
        const json = await fetchChannels(accountIds);
        const data = Array.isArray(json.groups) ? json.groups : [];
        setGroups(data);
      } catch (err) {
        if ((err as any)?.name === "AbortError") return;
        const msg = err instanceof Error ? err.message : "Failed to fetch assets";
        setError(msg);
        toast.error(msg); 
      } finally {
        setLoading(false);
      }
    };
    run();
    return () => ac.abort();
  }, [accountIds]);

  if (loading) return <RouteLoading message="Loading channels..." />;

  const normalized = groups.map((g) => {
    if (g.counts) return g;
    const counts = g.children.reduce<Record<string, number>>((m, c) => {
      m[c.assetType] = (m[c.assetType] || 0) + 1;
      return m;
    }, {});
    return { ...g, counts };
  });
  const toggleGroup = (businessId: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(businessId)) {
        next.delete(businessId);
      } else {
        next.add(businessId);
      }
      return next;
    });
  };
  return (
    <div className="h-full grid grid-rows-[auto_1fr] overflow-hidden">
      {/* Sub Header */}
      <div className="border-b px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Connected Channels</h1>
        <Button onClick={() => setOpen(true)}>Connect Channel</Button>
      </div>

      {/* Content Section */}
      <div className="overflow-y-auto p-6">
        {normalized.length === 0 ? (
          <p className="text-gray-500">No Business Managers found</p>
        ) : (
          <div className="space-y-4">
            {normalized.map(({ business, children, counts }) => {
              const isExpanded = expandedGroups.has(business.id);

              return (
                <div key={business.id} className="rounded-lg border bg-white">
                  <div
                    className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleGroup(business.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <svg
                          className={`w-5 h-5 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <div>
                          <h3 className="text-lg font-semibold">{business.name}</h3>
                          <p className="text-xs text-gray-500">Business ID: {business.externalId}</p>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600">
                        {Object.entries(counts || {})
                          .map(([k, v]) => `${k}: ${v}`)
                          .join(" · ") || `${children.length} assets`}
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-4 pb-4 border-t">
                      {children.length === 0 ? (
                        <p className="text-xs text-gray-400 pt-4">No child assets</p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
                          {children.map((child) => (
                            <div
                              key={child.id}
                              className="border rounded-md p-3 hover:shadow-md transition-shadow bg-gray-50 hover:bg-white cursor-pointer"
                            >
                              <div className="flex items-start justify-between mb-2">
                                <span className="font-medium text-sm">{child.name}</span>
                                <span
                                  className={`px-2 py-0.5 text-[10px] rounded-full font-medium ${
                                    child.assetType === "PAGE"
                                      ? "bg-blue-100 text-blue-700"
                                      : child.assetType === "AD_ACCOUNT"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-gray-100 text-gray-700"
                                  }`}
                                >
                                  {child.assetType}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span className="font-medium">{child.provider}</span>
                                {child.parentName && (
                                  <>
                                    <span>•</span>
                                    <span className="truncate">{child.parentName}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <ConnectChannelsModal open={open} onOpenChange={setOpen} />
    </div>
  );
}
