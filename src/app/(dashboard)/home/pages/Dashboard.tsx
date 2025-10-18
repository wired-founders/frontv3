// src\app\(dashboard)\home\pages\Dashboard.tsx
// src/app/(dashboard)/home/pages/Dashboard.tsx
"use client";

import { useUserStore } from "@/providers/UserStoreProvider";

export default function DashboardPage() {
  const email = useUserStore((s) => s.user?.email);

  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-4 text-muted-foreground">Welcome back, {email}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
  );
}
