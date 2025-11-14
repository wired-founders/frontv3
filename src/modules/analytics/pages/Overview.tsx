// src\modules\analytics\pages\Overview.tsx
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function OverviewPage() {
  return (
    <div className="h-full grid grid-rows-[auto_1fr] overflow-hidden">
      {/* Sub Header */}
      <div className="flex items-center justify-between border-b bg-background/80 backdrop-blur-sm h-14 px-4">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-foreground">Analytics Overview</h1>
          <p className="text-xs text-muted-foreground">Paid + Organic snapshot</p>
        </div>

        <div className="flex items-center gap-2">
          <button className="text-xs font-medium text-muted-foreground hover:text-foreground border rounded-md px-2 py-1 transition-colors">
            Last 30 days
          </button>
          <button className="text-xs font-medium text-muted-foreground hover:text-foreground border rounded-md px-2 py-1 transition-colors">
            Export
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="overflow-y-auto p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
            <CardHeader>
              <CardTitle>Total Reach</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">42.3K</p>
              <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
            <CardHeader>
              <CardTitle>Paid Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">5.7K</p>
              <p className="text-xs text-muted-foreground mt-1">Across campaigns</p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
            <CardHeader>
              <CardTitle>Organic Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">9.8K</p>
              <p className="text-xs text-muted-foreground mt-1">All channels</p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
            <CardHeader>
              <CardTitle>Ad Spend</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">$3.4K</p>
              <p className="text-xs text-muted-foreground mt-1">Includes taxes/fees</p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
            <CardHeader>
              <CardTitle>CTR</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">2.14%</p>
              <p className="text-xs text-muted-foreground mt-1">Weighted average</p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
            <CardHeader>
              <CardTitle>CPC</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">$0.41</p>
              <p className="text-xs text-muted-foreground mt-1">Median last 30 days</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
