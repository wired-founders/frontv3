// src\app\(dashboard)\home\layout.tsx
import Sidebar from "@/components/layout/dashboard/Sidebar";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[calc(100vh-56px)] overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
}