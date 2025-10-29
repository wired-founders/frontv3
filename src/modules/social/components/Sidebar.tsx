// src\modules\social\components\Sidebar.tsx
"use client";

import { useState, useEffect } from "react";
import { Home, Users,Calendar, Share2, MessageSquare, ChevronLeft, ChevronRight, Plug } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSocialNavStore } from "@/stores/useSocialNav";

export default function SocialSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { activePage, setActivePage } = useSocialNavStore();

  // Update CSS variable dynamically
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--sidebar-width",
      collapsed ? "var(--sidebar-collapsed-width)" : "240px"
    );
  }, [collapsed]);

  const links = [
    { id: "home" as const, icon: Home, label: "Home" },
    { id: "accounts" as const, icon: Users, label: "Accounts" },
    { id: "posts" as const, icon: Share2, label: "Posts" },
      { id: "calendar" as const, icon: Calendar, label: "Calendar" }, // added

    { id: "messages" as const, icon: MessageSquare, label: "Messages" },
    { id: "connect" as const, icon: Plug, label: "Connect" },
  ];

  return (
    <div className="border-r bg-background transition-all duration-300 h-full">
      <div className="flex h-14 items-center justify-end px-3 border-b">
        <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)}>
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
