// src\modules\analytics\pages\OrganicOverviewPage.tsx
"use client";

export default function OrganicOverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Organic Overview</h1>
        <p className="text-muted-foreground mt-2">
          Track your organic social media performance
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Total Reach</h3>
          <p className="text-2xl font-bold mt-2">24.5K</p>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Engagement</h3>
          <p className="text-2xl font-bold mt-2">3.2K</p>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Posts</h3>
          <p className="text-2xl font-bold mt-2">48</p>
        </div>
      </div>
    </div>
  );
}