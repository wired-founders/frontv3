// src\modules\home\components\layout\Sidebar.tsx
"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, LayoutDashboard, Building2, Share2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useHomeNavStore } from "@/stores/useHomeNav";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { activePage, setActivePage } = useHomeNavStore();

  // Update CSS variable when collapsed changes
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--sidebar-width",
      collapsed ? "var(--sidebar-collapsed-width)" : "240px" // or your default width
    );
  }, [collapsed]);

  const links = [
    { id: "dashboard" as const, icon: LayoutDashboard, label: "Dashboard" },
    { id: "company" as const, icon: Building2, label: "Company" },
    { id: "items" as const, icon: Package, label: "Items" },
    { id: "channels" as const, icon: Share2, label: "Channels" },
  ];

  return (
    <div className="border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-300 h-full">
      <div className="flex h-14 items-center justify-end px-3 border-b">
        <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>

      <nav className="space-y-0.5 p-1.5">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = activePage === link.id;

          return (
            <button
              key={link.id}
              onClick={() => setActivePage(link.id)}
              className={cn(
                // height + tighter padding
                "flex w-full items-center h-8 px-2 py-0.5",
                // compact spacing + radius + text
                "gap-2 rounded-md text-[13px] leading-tight",
                // faster hover feel
                "transition-colors duration-200",
                // states
                isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
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
