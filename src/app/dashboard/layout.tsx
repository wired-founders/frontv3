// src\app\dashboard\layout.tsx
"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
// Sidebar exports named?
import { AppSidebar } from "@/components/app-sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
