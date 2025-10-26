// src\components\layout\dashboard\Sidebar.tsx
"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Building2,
  UserCircle2,
  Share2,
  Package,
  Settings,BarChart3
} from "lucide-react";import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigationStore } from "@/stores/navStore";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { activePage, setActivePage } = useNavigationStore();

  const links = [
    { id: "dashboard" as const, icon: LayoutDashboard, label: "Dashboard" },
    { id: "company" as const, icon: Building2, label: "Company" },
    { id: "channels" as const, icon: Share2, label: "Channels" },
    { id: "analytics" as const, icon: BarChart3, label: "Analytics" },

    { id: "items" as const, icon: Package, label: "Items" },
  ];

  return (
    <div
      className={cn(
        "border-r bg-background transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-14 items-center justify-end px-3 border-b">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>

      <nav className="space-y-1 p-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = activePage === link.id;

          return (
            <button
              key={link.id}
              onClick={() => setActivePage(link.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
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
