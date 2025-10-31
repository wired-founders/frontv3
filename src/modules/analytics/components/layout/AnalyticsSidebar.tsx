// src\modules\analytics\components\layout\AnalyticsSidebar.tsx
"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAnalyticsNav } from "@/stores/useAnalyticsNav";
import { ANALYTICS_NAV_LINKS } from "@/constants/navSidebar";
import { WorkspacePopover } from "@/components/popover/WorkspacePopover";

export default function AnalyticsSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { activeSection, setActiveSection } = useAnalyticsNav();

  const workspaceName = "Aenigm3 Labs"; // replace with dynamic store/context later
  const workspaceInitial = workspaceName.trim().charAt(0).toUpperCase();

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--sidebar-width",
      collapsed ? "var(--sidebar-collapsed-width)" : "256px"
    );
  }, [collapsed]);

  return (
    <div className="border-r bg-background transition-all duration-500 h-full">
      <div className="flex h-14 items-center justify-between px-3 border-b bg-gray-200/70">
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

      <nav className="space-y-1 p-2">
        {ANALYTICS_NAV_LINKS.map((s) => {
          const isActive = activeSection === s.id;

          return (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id as any)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-colors text-sm font-medium",
                isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                collapsed && "justify-center"
              )}
              title={s.label}
            >
              {s.icon && <s.icon className="h-4 w-4 shrink-0" />}
              {!collapsed && <span>{s.label}</span>}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
