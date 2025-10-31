// src\modules\social\components\SocialSidebar.tsx
"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useSocialNavStore } from "@/stores/useSocialNav";
import { SOCIAL_NAV_LINKS } from "@/constants/navSidebar";
import { WorkspacePopover } from "@/components/popover/WorkspacePopover";

export default function SocialSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { activePage, setActivePage } = useSocialNavStore();

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
        {SOCIAL_NAV_LINKS.map((link) => {
          const Icon = link.icon;
          const isActive = activePage === link.id;

          return (
            <button
              key={link.id}
              onClick={() => setActivePage(link.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-colors",
                isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{link.label}</span>}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
