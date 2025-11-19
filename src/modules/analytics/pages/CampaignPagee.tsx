// src\modules\analytics\pages\CampaignPagee.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useUserStore } from "@/providers/UserStoreProvider";
import { fetchPaidCampaigns } from "@/lib/api/analytics";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import {
  Search,
  RefreshCw,
  ListFilter,
  ArrowUpDown,
  Facebook,
  Instagram,
  CandlestickChart,
  Linkedin,
} from "lucide-react";

type CampaignRow = {
  id: string;
  name: string;
  provider: "facebook" | "instagram" | "tiktok" | "linkedin" | null;
  status?: string | null;
  totals: {
    spend: number;
    impressions: number;
    clicks: number;
    cpc: number | null;
    ctr: number | null; // 0-1
  };
};

type ApiResult = {
  rows: CampaignRow[];
  total: number;
  page: number;
  limit: number;
};

const nf = new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 });
const money = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const pct = (v: number | null | undefined, digits = 2) => (v == null ? "—" : `${(v * 100).toFixed(digits)}%`);
const dec = (v: number | null | undefined, digits = 2) => (v == null ? "—" : Number(v).toFixed(digits));

export default function CampaignsPage() {
  const [rows, setRows] = useState<CampaignRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  // filters (sub-header)
  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState<"all" | "facebook" | "instagram" | "tiktok" | "linkedin">("all");
  const [sort, setSort] = useState<"-spend" | "spend" | "-ctr" | "ctr" | "-date" | "date">("-spend");

  // pagination (you can wire next/prev later)
  const [page] = useState(1);
  const limit = 25;

  const companyId = useUserStore((s) => s.company?.id);

  // simple debounce for search
  const [searchTick, setSearchTick] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setSearchTick((n) => n + 1), 350);
    return () => clearTimeout(t);
  }, [search]);

  async function load() {
    if (!companyId) return;
    setLoading(true);
    try {
      const data = (await fetchPaidCampaigns({
        companyId,
        scope: "paid",
        sort,
        page,
        limit,
        platform,
        // you can pass start/end later
      })) as ApiResult | CampaignRow[];

      // handle both {rows:[...]} and [...] shapes to survive API warts
      const list = Array.isArray(data) ? data : data.rows;
      const cnt = Array.isArray(data) ? list.length : data.total;

      // local search filter (server-side search is better; this is quick UX)
      const filtered = search ? list.filter((c) => c.name?.toLowerCase().includes(search.toLowerCase())) : list;

      setRows(filtered);
      setTotal(cnt);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId, platform, sort, page, searchTick]);

  const headerCount = useMemo(() => `${rows.length}${total ? ` / ${total}` : ""}`, [rows.length, total]);

  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col">
      {/* Top header */}
      <div className="px-6 pt-2">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-tight">Paid Campaigns</h1>
              <Badge variant="secondary" className="rounded-full">
                {headerCount}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Monitor performance and triage by platform, spend, and efficiency.
            </p>
          </div>
          {/* Optional: right-aligned quick action slot */}
          {/* <Button size="sm" variant="outline">Export</Button> */}
        </div>
      </div>

      {/* Sub-header toolbar */}
      <div className="sticky top-0 z-10 mt-2 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Separator />
        <div className="px-6 py-3">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            {/* Left: Search */}
            <div className="w-full md:max-w-sm">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-8"
                  placeholder="Search campaigns"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Right: Controls */}
            <div className="flex w-full flex-wrap items-center gap-2 md:w-auto">
              {/* Platform */}
              <Select value={platform} onValueChange={(v) => setPlatform(v as any)}>
                <SelectTrigger className="w-[140px]">
                  <ListFilter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="facebook">
                    <span className="inline-flex items-center gap-2">
                      <Facebook className="h-4 w-4" />
                      Facebook
                    </span>
                  </SelectItem>
                  <SelectItem value="instagram">
                    <span className="inline-flex items-center gap-2">
                      <Instagram className="h-4 w-4" />
                      Instagram
                    </span>
                  </SelectItem>
                  <SelectItem value="tiktok">
                    <span className="inline-flex items-center gap-2">
                      <CandlestickChart className="h-4 w-4" />
                      TikTok
                    </span>
                  </SelectItem>
                  <SelectItem value="linkedin">
                    <span className="inline-flex items-center gap-2">
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sort} onValueChange={(v) => setSort(v as any)}>
                <SelectTrigger className="w-[150px]">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="-spend">Spend ↓</SelectItem>
                  <SelectItem value="spend">Spend ↑</SelectItem>
                  <SelectItem value="-ctr">CTR ↓</SelectItem>
                  <SelectItem value="ctr">CTR ↑</SelectItem>
                  <SelectItem value="-date">Latest</SelectItem>
                  <SelectItem value="date">Oldest</SelectItem>
                </SelectContent>
              </Select>

              {/* Refresh */}
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="secondary" onClick={load}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Refresh
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>Reload data</span>
                    <kbd className="ml-2 rounded border bg-muted px-1 text-xs">R</kbd>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        <Separator />
      </div>

      {/* Separator below sub-header */}
      <div className="px-6">
        <Separator />
      </div>

      {/* Main content: scrollable area containing the grid */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <ScrollArea className="h-full">
          {loading ? (
            <div className="grid grid-cols-1 gap-4 py-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <Card key={i} className="rounded-xl">
                  <CardHeader>
                    <Skeleton className="h-5 w-3/5" />
                    <CardDescription>
                      <Skeleton className="mt-2 h-4 w-20" />
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : rows.length === 0 ? (
            <div className="py-10 text-sm text-muted-foreground">No campaigns found.</div>
          ) : (
            <div className="grid grid-cols-1 gap-4 py-6 md:grid-cols-2 lg:grid-cols-3">
              {rows.map((c) => (
                <Card
                  key={c.id}
                  className="rounded-xl border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md"
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{c.name || "Untitled"}</CardTitle>
                    <CardDescription className="uppercase tracking-wide text-[11px]">
                      {c.provider ?? "—"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-muted-foreground">Status</div>
                      <div className="text-right font-medium">{c.status ?? "N/A"}</div>

                      <div className="text-muted-foreground">Spend</div>
                      <div className="text-right font-semibold">{money.format(c.totals.spend || 0)}</div>

                      <div className="text-muted-foreground">Impressions</div>
                      <div className="text-right">{nf.format(c.totals.impressions || 0)}</div>

                      <div className="text-muted-foreground">Clicks</div>
                      <div className="text-right">{nf.format(c.totals.clicks || 0)}</div>

                      <div className="text-muted-foreground">CPC</div>
                      <div className="text-right">{dec(c.totals.cpc, 2)}</div>

                      <div className="text-muted-foreground">CTR</div>
                      <div className="text-right">{pct(c.totals.ctr, 2)}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
