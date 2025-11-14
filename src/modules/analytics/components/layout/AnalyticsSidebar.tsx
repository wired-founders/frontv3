// src\modules\analytics\components\layout\AnalyticsSidebar.tsx
"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SidebarItem from "./SidebarItem";
import { useAnalyticsNav } from "@/stores/useAnalyticsNav";
import { ANALYTICS_NAV_LINKS, type AnalyticsSectionId } from "@/constants/navSidebar";
import { WorkspacePopover } from "@/components/popover/WorkspacePopover";
import { useUserStore } from "@/providers/UserStoreProvider";

export default function AnalyticsSidebar() {
  const workspaceName = useUserStore((s) => s.workspace!.name) as string;
  const [collapsed, setCollapsed] = useState(false);
  const { activeSection, setActiveSection } = useAnalyticsNav();
  const workspaceInitial = workspaceName.trim().charAt(0).toUpperCase();

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--sidebar-width",
      collapsed ? "var(--sidebar-collapsed-width)" : "256px"
    );
  }, [collapsed]);

  const handleSelect = (id: AnalyticsSectionId) => setActiveSection(id);

  return (
    <div className="border-r bg-sidebar transition-all duration-500 h-full">
      {/* Header */}
      <div
        className="flex h-14 items-center justify-between px-3 border-b 
     bg-background/70 backdrop-blur-sm supports-[backdrop-filter]:bg-background/50"
      >
        {" "}
        <WorkspacePopover collapsed={collapsed} workspaceName={workspaceName} workspaceInitial={workspaceInitial} />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed((v) => !v)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      {/* Nav */}
      <nav className="space-y-1 p-2">
        {ANALYTICS_NAV_LINKS.map((section) => (
          <SidebarItem
            key={section.id}
            section={section}
            activeSection={activeSection} // Pass the actual value
            collapsed={collapsed}
            onSelect={handleSelect}
          />
        ))}
      </nav>
    </div>
  );
}
