// src/components/layout/dashboard/Sidebar.tsx
"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Home, Settings, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigationStore } from "@/stores/navStore";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { activePage, setActivePage } = useNavigationStore();

  const links = [
    { id: "dashboard" as const, icon: Home, label: "Dashboard" },
    { id: "users" as const, icon: Users, label: "Users" },
    { id: "settings" as const, icon: Settings, label: "Settings" },
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