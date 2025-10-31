// src\modules\analytics\pages\Connections.tsx
/**
 1. Reading Assets ids from useAssetStore 
 */
"use client";

import { useState, useMemo, useEffect } from "react";
import { useAssetStore, type Asset } from "@/stores/useAssetStore";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useEntityGraph } from "@/stores/useEntityStore";

type Tab = "all" | "organic" | "paid";

export default function ConnectionPage() {
  const [tab, setTab] = useState<Tab>("all");
  const getByType = useAssetStore((s) => s.getByType);
  const adAccounts = getByType("ad_account");
  const pages = getByType("page");
  const instas = getByType("instagram");
  const whastApp = getByType("whatsapp");
  const organic = useMemo(() => [...pages, ...instas, ...whastApp], [pages, instas, whastApp]);
  const paid = useMemo(() => [...adAccounts], [adAccounts]);

  const showAdAccounts = tab !== "organic" && paid.length > 0;
  const showPages = tab !== "paid" && organic.length > 0;

  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const { data, isFetching } = useAnalytics(selectedAsset?.type!, selectedAsset?.externalId || "");

  useEffect(() => {
    if (!selectedAsset?.id || !data) return;

    const nodes = data.map((c: any) => ({
      id: c.id, // DB id from your list
      type: "campaign" as const,
      assetId: selectedAsset.id, // IMPORTANT: asset DB id, not externalId
      parentId: null, // campaigns are roots
    }));

    useEntityGraph.getState().upsertMany(nodes);
  }, [selectedAsset?.id, data]);

  function handleTabChange(value: string) {
    setTab(value as Tab);
  }

  return (
    <div className="h-full grid grid-rows-[auto_1fr] overflow-hidden">
      {/* Header with Tabs */}
      <div className="flex items-center justify-between border-b px-4 py-2 bg-neutral-50 dark:bg-neutral-900">
        <h2 className="text-lg font-semibold">Connected Entities</h2>
        <Tabs defaultValue="all" value={tab} onValueChange={handleTabChange} className="w-auto">
          <TabsList className="bg-transparent border rounded-md">
            <TabsTrigger
              value="all"
              className="text-sm px-3 py-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="organic"
              className="text-sm px-3 py-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Organic
            </TabsTrigger>
            <TabsTrigger
              value="paid"
              className="text-sm px-3 py-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Paid
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main content */}
      <div className="p-4 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-2 auto-rows-min">
        <div className="space-y-4">
          {/* PAID */}
          {showAdAccounts && (
            <Accordion type="single" collapsible className="rounded-lg border bg-white/60 dark:bg-neutral-950/60">
              <AccordionItem value="ad_accounts" className="border-none">
                <AccordionTrigger className="px-4 py-3 text-sm font-semibold hover:no-underline">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-md border text-xs">
                        $
                      </span>
                      <span>Ad Accounts</span>
                      <span className="ml-2 rounded-md border px-2 py-0.5 text-xs text-gray-600 dark:text-gray-400">
                        {paid.length}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">Paid data sources</span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-4 pb-4 pt-0">
                  <div className="sticky top-0 z-10 mb-3 -mt-1 flex items-center justify-between rounded-md bg-white/70 p-2 text-xs backdrop-blur dark:bg-neutral-950/70">
                    <span className="text-gray-600 dark:text-gray-400">Name • External ID</span>
                    <span className="text-gray-500">Grid: auto-fill</span>
                  </div>

                  <div className="grid gap-3 [grid-template-columns:repeat(auto-fill,minmax(220px,1fr))]">
                    {paid.map((acc: any) => (
                      <div
                        key={acc.id}
                        className="group rounded-lg border p-3 transition-all hover:-translate-y-0.5 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium">{acc.name || acc.externalId}</p>
                            <p className="truncate text-xs text-gray-500">{acc.externalId}</p>
                          </div>
                          <span className="rounded-md border px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-gray-600 dark:text-gray-400">
                            Ad Account
                          </span>
                        </div>

                        <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                          <span className="truncate">Provider: {acc.provider ?? "facebook"}</span>
                          <button
                            className="opacity-70 underline-offset-2 hover:opacity-100 hover:underline disabled:opacity-40"
                            disabled={isFetching && selectedAsset?.id === acc.id}
                            onClick={() => setSelectedAsset(acc)}
                          >
                            {isFetching && selectedAsset?.id === acc.id ? "Fetching…" : "Fetch"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {paid.length === 0 && (
                    <div className="rounded-md border p-3 text-sm text-gray-600 dark:text-gray-400">
                      No ad accounts connected.
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}

          {/* ORGANIC */}
          {showPages && (
            <Accordion type="single" collapsible className="rounded-lg border bg-white/60 dark:bg-neutral-950/60">
              <AccordionItem value="pages" className="border-none">
                <AccordionTrigger className="px-4 py-3 text-sm font-semibold hover:no-underline">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-md border text-xs">
                        #
                      </span>
                      <span>Pages & Instagram</span>
                      <span className="ml-2 rounded-md border px-2 py-0.5 text-xs text-gray-600 dark:text-gray-400">
                        {organic.length}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">Organic data sources</span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-4 pb-4 pt-0">
                  <div className="sticky top-0 z-10 mb-3 -mt-1 flex items-center justify-between rounded-md bg-white/70 p-2 text-xs backdrop-blur dark:bg-neutral-950/70">
                    <span className="text-gray-600 dark:text-gray-400">Name • Type • External ID</span>
                    <span className="text-gray-500">Grid: auto-fill</span>
                  </div>

                  <div className="grid gap-3 [grid-template-columns:repeat(auto-fill,minmax(220px,1fr))]">
                    {organic.map((pg: any) => (
                      <div
                        key={pg.id}
                        className="group rounded-lg border p-3 transition-all hover:-translate-y-0.5 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium">{pg.name || pg.externalId}</p>
                            <p className="truncate text-xs text-gray-500">{pg.externalId}</p>
                          </div>
                          <span className="rounded-md border px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-gray-600 dark:text-gray-400">
                            {pg.type}
                          </span>
                        </div>

                        <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                          <span className="truncate">Provider: {pg.provider ?? "facebook"}</span>
                          <button
                            className="opacity-70 underline-offset-2 hover:opacity-100 hover:underline disabled:opacity-40"
                            disabled={isFetching && selectedAsset?.id === pg.id}
                            onClick={() => setSelectedAsset(pg)}
                          >
                            {isFetching && selectedAsset?.id === pg.id ? "Fetching…" : "Fetch"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {organic.length === 0 && (
                    <div className="rounded-md border p-3 text-sm text-gray-600 dark:text-gray-400">
                      No pages or Instagram accounts connected.
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </div>
      </div>
    </div>
  );
}
