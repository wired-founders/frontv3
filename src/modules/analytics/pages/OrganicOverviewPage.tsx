// src\modules\analytics\pages\OrganicOverviewPage.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Badge,
  Separator,
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui";

import { RefreshCw, Search, ListFilter } from "lucide-react";

type OverviewResponse = {
  range: string; // "7d" | "30d" | "90d"
  platform: string; // "all" | "facebook" | "instagram" | "tiktok" | "linkedin"
  totals: {
    reach: number;
    impressions: number;
    engagement: number; // likes+comments+shares or your definition
    posts: number;
    followers?: number;
    engagementRate?: number; // 0..1
  };
  byPlatform?: Array<{
    platform: string;
    reach: number;
    impressions: number;
    engagement: number;
    posts: number;
  }>;
};

export default function OrganicOverviewPage() {
  const [range, setRange] = useState<"7d" | "30d" | "90d">("30d");
  const [platform, setPlatform] = useState<"all" | "facebook" | "instagram" | "tiktok" | "linkedin">("all");
  const [search, setSearch] = useState(""); // optional: filter posts list later
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [data, setData] = useState<OverviewResponse | null>(null);

  const headerCount = useMemo(() => {
    if (!data) return "—";
    const t = data.totals;
    return `${t.posts} posts • ${fmt(t.reach)} reach • ${fmt(t.engagement)} engagements`;
  }, [data]);

  async function load() {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch(`/api/analytics/organic/overview?range=${range}&platform=${platform}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const json: OverviewResponse = await res.json();
      setData(json);
    } catch (e: any) {
      setErr(e?.message ?? "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range, platform]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="px-6 pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-tight">Organic Overview</h1>
              <Badge variant="secondary" className="rounded-full">
                {headerCount}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Track reach, impressions, engagement and posting cadence across platforms.
            </p>
          </div>
          {/* Optional action */}
          {/* <Button size="sm" variant="outline">Export</Button> */}
        </div>
      </div>

      {/* Toolbar */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Separator />
        <div className="px-6 py-3">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            {/* Search (reserve for posts list; harmless to keep now) */}
            <div className="w-full md:max-w-sm">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-8"
                  placeholder="Search posts (caption, tags)…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex w-full flex-wrap items-center gap-2 md:w-auto">
              <Select value={platform} onValueChange={(v) => setPlatform(v as any)}>
                <SelectTrigger className="w-[140px]">
                  <ListFilter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                </SelectContent>
              </Select>

              <Select value={range} onValueChange={(v) => setRange(v as any)}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="secondary" onClick={load} disabled={loading}>
                <RefreshCw
                  className="mr-2 h-4 w-4 animate-[spin_0.8s_linear_infinite] motion-reduce:animate-none"
                  style={{ opacity: loading ? 1 : 0 }}
                />
                Refresh
              </Button>
            </div>
          </div>
        </div>
        <Separator />
      </div>

      {/* Content */}
      <div className="px-6">
        {err && (
          <div className="rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm">
            <span className="font-medium">Failed to load:</span> {err}
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-3">
          <MetricCard title="Total Reach" value={fmt(data?.totals.reach)} loading={loading} />
          <MetricCard title="Impressions" value={fmt(data?.totals.impressions)} loading={loading} />
          <MetricCard title="Engagements" value={fmt(data?.totals.engagement)} loading={loading} />
          <MetricCard title="Posts" value={fmt(data?.totals.posts)} loading={loading} />
          <MetricCard title="Followers" value={fmt(data?.totals.followers)} loading={loading} />
          <MetricCard title="Engagement Rate" value={pct(data?.totals.engagementRate)} loading={loading} />
        </div>

        {/* By platform breakdown (optional) */}
        {!!data?.byPlatform?.length && (
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {data.byPlatform.map((p) => (
              <Card key={p.platform} className="rounded-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground capitalize">{p.platform}</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Reach</p>
                    <p className="font-semibold">{fmt(p.reach)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Impr.</p>
                    <p className="font-semibold">{fmt(p.impressions)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Engagement</p>
                    <p className="font-semibold">{fmt(p.engagement)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Posts</p>
                    <p className="font-semibold">{fmt(p.posts)}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* — helpers — */
function fmt(n?: number) {
  if (n == null) return "—";
  return Intl.NumberFormat().format(n);
}
function pct(n?: number) {
  if (n == null || Number.isNaN(n)) return "—";
  return `${(n * 100).toFixed(2)}%`;
}

/* — minimal shadcn skeleton fallback —
   If you don’t have a Skeleton component, this placeholder keeps layout stable.
*/
function MetricCard({ title, value, loading }: { title: string; value: string; loading: boolean }) {
  return (
    <Card className="rounded-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-7 w-24 animate-pulse rounded bg-muted" />
        ) : (
          <p className="mt-1 text-2xl font-bold">{value}</p>
        )}
      </CardContent>
    </Card>
  );
}
