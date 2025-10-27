// src/modules/analytics/layout.tsx
import Sidebar from "./components/layout/Sidebar";
import { QueryProvider } from "@/providers/QueryProvider";

export default function AnalyticsLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <div className="grid grid-cols-[var(--sidebar-width)_1fr] h-full overflow-hidden">
        <Sidebar />
        <main className="overflow-y-auto p-6">{children}</main>
      </div>
    </QueryProvider>
  );
}