// src\modules\analytics\layout.tsx
import DashboardShell from "@/components/layout/dashboard/DashboardShell";
import Sidebar from "./components/layout/AnalyticsSidebar";
import { QueryProvider } from "@/providers/QueryProvider";

export default function AnalyticsLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <DashboardShell sidebar={<Sidebar />}>{children}</DashboardShell>
    </QueryProvider>
  );
}
