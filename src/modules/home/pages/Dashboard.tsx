// src\modules\home\pages\Dashboard.tsx
"use client";

import { useUserStore } from "@/providers/UserStoreProvider";

export default function DashboardPage() {
  const email = useUserStore((s) => s.user?.email);

  return (
    <div className="h-full grid grid-rows-[auto_1fr] overflow-hidden">
      {/* Sub Header */}
      <div className="border-b px-6 py-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Welcome back, {email}</p>
      </div>

      {/* Content Section */}
      <div className="overflow-y-auto p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">Total Users</h3>
            <p className="mt-2 text-2xl">1,234</p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">Active Sessions</h3>
            <p className="mt-2 text-2xl">56</p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">Revenue</h3>
            <p className="mt-2 text-2xl">$12,345</p>
          </div>
        </div>
      </div>
    </div>
  );
}