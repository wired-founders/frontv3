// src\modules\analytics\pages\OrganicProfilesPage.tsx
"use client";

export default function OrganicProfilesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profiles & Posts</h1>
        <p className="text-muted-foreground mt-2">
          Manage your connected profiles and analyze posts
        </p>
      </div>

      <div className="rounded-lg border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Connected Profiles</h2>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-muted-foreground">No profiles connected yet</p>
        </div>
      </div>
    </div>
  );
}