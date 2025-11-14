// src\modules\analytics\pages\CampaignLinkPage.tsx
"use client";

import { useAssetStore } from "@/stores/useAssetStore";
import { useEffect, useMemo, useState } from "react";
import { RouteLoading } from "@/components/ui";
import { getCampaigns, linkCampaignProducts, getCampaignProductLinks } from "@/lib/api/analyticsApi";
import { getItems } from "@/lib/api/fetchApi";

type Campaign = {
  id: string;
  name: string;
  status: string;
};

type Product = {
  id: string;
  name: string;
  type: string;
};

export default function CampaignProductLinkPage() {
  const getByType = useAssetStore((s) => s.getByType);
  const adAccounts = getByType("ad_account");
  const activeAccountId = useMemo(() => adAccounts?.[0]?.externalId ?? null, [adAccounts]);

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [targetProduct, setTargetProduct] = useState<Product | null>(null);
  const [selectedCampaignIds, setSelectedCampaignIds] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);

  // cache of existing links per item for chip rendering
  const [linksByItem, setLinksByItem] = useState<Record<string, Set<string>>>({});

  const setItemLinks = (itemId: string, ids: string[]) => {
    setLinksByItem((prev) => ({ ...prev, [itemId]: new Set(ids) }));
  };

  useEffect(() => {
    if (!activeAccountId) return;
    (async () => {
      setLoading(true);
      try {
        const [campaignsData, productsData] = await Promise.all([getCampaigns(activeAccountId), getItems()]);
        setCampaigns(campaignsData || []);
        setProducts(productsData || []);
      } finally {
        setLoading(false);
      }
    })();
  }, [activeAccountId]);

  const openDialogFor = async (product: Product) => {
    setTargetProduct(product);
    setDialogOpen(true);

    try {
      // hydrate existing selections
      const res = await getCampaignProductLinks({ itemId: product.id });
      const current = (res?.campaigns ?? []).map((c: { entityId: string }) => c.entityId);
      setSelectedCampaignIds(new Set(current));
      setItemLinks(product.id, current);
    } catch {
      setSelectedCampaignIds(new Set());
    }
  };

  const toggleCampaign = (id: string) => {
    const next = new Set(selectedCampaignIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedCampaignIds(next);
  };

  const handleSave = async () => {
    if (!targetProduct || selectedCampaignIds.size === 0) return;
    setSaving(true);
    try {
      const itemId = targetProduct.id;
      const ids = Array.from(selectedCampaignIds);

      // Call once per campaign; server should dedupe via unique index
      const results = await Promise.allSettled(ids.map((campId) => linkCampaignProducts(campId, [itemId])));

      // Update local cache so chips reflect immediately
      setItemLinks(itemId, ids);

      // Close/reset
      setDialogOpen(false);
      setTargetProduct(null);
      setSelectedCampaignIds(new Set());

      const failed = results.filter((r) => r.status === "rejected").length;
      if (failed > 0) console.warn(`Some links failed: ${failed}`);
    } finally {
      setSaving(false);
    }
  };

  if (!activeAccountId) {
    return <div className="p-4 text-sm text-gray-500">Connect an ad account first.</div>;
  }

  return (
    <div className="h-full grid grid-rows-[auto_1fr] overflow-hidden">
      <div className="flex items-center justify-between border-b px-4 py-2 bg-neutral-50 dark:bg-neutral-900 h-14">
        <h2 className="text-lg font-semibold">Tag campaigns to products</h2>
        {loading && <RouteLoading message="Loading…" />}
      </div>

      <div className="overflow-y-auto p-4">
        {/* Products list always visible */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {products.map((p) => (
            <div key={p.id} className="border rounded-lg p-3 flex flex-col gap-2 bg-white dark:bg-neutral-950">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-medium text-sm">{p.name}</div>
                  <div className="text-xs text-gray-500">{p.type}</div>
                </div>
                <button
                  onClick={() => openDialogFor(p)}
                  className="px-2 py-1 text-xs rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                  Tag campaigns
                </button>
              </div>

              {/* Existing tags as chips */}
              <div className="mt-1 flex flex-wrap gap-1">
                {(linksByItem[p.id] ? Array.from(linksByItem[p.id]) : []).slice(0, 4).map((eid) => (
                  <span key={eid} className="text-[11px] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800">
                    {campaigns.find((c) => c.id === eid)?.name ?? "Unknown"}
                  </span>
                ))}
                {linksByItem[p.id] && linksByItem[p.id].size > 4 && (
                  <span className="text-[11px] text-gray-500">+{linksByItem[p.id].size - 4}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && !loading && <div className="text-sm text-gray-500">No items found.</div>}
      </div>

      {/* Lightweight dialog */}
      {dialogOpen && targetProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => !saving && setDialogOpen(false)} />
          <div className="relative z-10 w-full max-w-lg rounded-xl border bg-white dark:bg-neutral-950 p-4 shadow-xl">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-base">Tag campaigns</h3>
                <p className="text-xs text-gray-500">
                  Product: <span className="font-medium">{targetProduct.name}</span>
                </p>
              </div>
              <button
                onClick={() => !saving && setDialogOpen(false)}
                className="text-xs px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-neutral-900"
              >
                Close
              </button>
            </div>

            {/* Campaign multi-select */}
            <div className="max-h-72 overflow-y-auto border rounded-md p-2 space-y-2">
              {campaigns.length === 0 && <div className="text-sm text-gray-500 p-2">No campaigns available.</div>}
              {campaigns.map((c) => (
                <label
                  key={c.id}
                  className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 dark:hover:bg-neutral-900 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    checked={selectedCampaignIds.has(c.id)}
                    onChange={() => toggleCampaign(c.id)}
                    disabled={saving}
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{c.name}</div>
                    <div className="text-[11px] uppercase tracking-wide text-gray-500">{c.status}</div>
                  </div>
                </label>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-gray-600">{selectedCampaignIds.size} selected</div>
              <button
                onClick={handleSave}
                disabled={saving || selectedCampaignIds.size === 0}
                className="px-3 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? "Saving…" : "Save tags"}
              </button>
            </div>

            <p className="mt-2 text-[11px] text-gray-500">
              Note: saves by calling the link API once per campaign to tag this product.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
