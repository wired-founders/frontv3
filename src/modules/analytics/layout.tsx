// src/modules/analytics/layout.tsx
import Sidebar from "./components/layout/Sidebar";

export default function AnalyticsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
