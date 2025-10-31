// src\modules\social\layout.tsx
import DashboardShell from "@/components/layout/dashboard/DashboardShell";
import SocialSidebar from "./components/SocialSidebar";

export default function SocialLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell sidebar={<SocialSidebar />}>{children}</DashboardShell>;
}
