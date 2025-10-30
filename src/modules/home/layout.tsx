// src\modules\home\layout.tsx
import DashboardShell from "@/components/layout/dashboard/DashboardShell";
import Sidebar from "@/modules/home/components/layout/Sidebar";
import { QueryProvider } from "@/providers/QueryProvider";

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <DashboardShell sidebar={<Sidebar />}>{children}</DashboardShell>
    </QueryProvider>
  );
}
