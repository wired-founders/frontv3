// src\modules\home\layout.tsx
import Sidebar from "@/modules/home/components/layout/Sidebar";
import { QueryProvider } from "@/providers/QueryProvider";

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <div className="grid grid-cols-[var(--sidebar-width)_1fr] h-full overflow-hidden ">
        <Sidebar />
        <main className="h-full overflow-hidden">{children}</main>
      </div>
    </QueryProvider>
  );
}
