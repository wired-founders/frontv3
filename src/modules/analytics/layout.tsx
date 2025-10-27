// src\modules\analytics\layout.tsx
import Sidebar from "./components/layout/Sidebar";

export default function AnalyticsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-screen grid-cols-[250px_1fr]">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}