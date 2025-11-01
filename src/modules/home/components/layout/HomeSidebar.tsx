// src\modules\home\components\layout\HomeSidebar.tsx
"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useHomeNavStore } from "@/stores/useHomeNav";
import { WorkspacePopover } from "@/components/popover/WorkspacePopover";
import { HOME_NAV_LINKS } from "@/constants/navSidebar";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { activePage, setActivePage } = useHomeNavStore();
  const workspaceName = "Aenigm3 Labs"; // replace with dynamic store/context later
  const workspaceInitial = workspaceName.trim().charAt(0).toUpperCase();

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--sidebar-width",
      collapsed ? "var(--sidebar-collapsed-width)" : "256px"
    );
  }, [collapsed]);

  return (
    <div className="border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-300 h-full">
      <div className="flex h-14 items-center justify-between px-3 border-b bg-gray-200/70 dark:bg-gray-800/60 backdrop-blur-sm">
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

      <nav className="space-y-0.5 p-1.5">
        {HOME_NAV_LINKS.map((link) => {
          const Icon = link.icon;
          const isActive = activePage === link.id;

          return (
            <button
              key={link.id}
              onClick={() => setActivePage(link.id)}
              className={cn(
                "flex w-full items-center h-8 px-2 py-0.5 gap-2 rounded-md text-[13px] leading-tight transition-colors duration-200",
                isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                collapsed && "justify-center"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{link.label}</span>}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
