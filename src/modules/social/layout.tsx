// src\modules\social\layout.tsx
import DashboardShell from "@/components/DashboardShell";
import SocialSidebar from "./components/Sidebar";

export default function SocialLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell sidebar={<SocialSidebar />}>{children}</DashboardShell>;
}
