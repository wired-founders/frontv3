// src\modules\home\pages\Dashboard.tsx
"use client";

import { useUserStore } from "@/providers/UserStoreProvider";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  const name = useUserStore((s) => s.user?.name);

  return (
    <div className="h-full grid grid-rows-[auto_1fr] overflow-hidden">
      {/* Sub Header */}
      <div className="flex flex-col justify-center border-b px-4 h-14 bg-card">
        <h1 className="text-lg font-bold leading-tight">Dashboard</h1>
        <p className="text-xs text-muted-foreground">Welcome back, {name}</p>
      </div>

      {/* Content */}
      <div className="overflow-y-auto p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">1,234</p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
            <CardHeader>
              <CardTitle>Active Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">56</p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
            <CardHeader>
              <CardTitle>Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">$12,345</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
