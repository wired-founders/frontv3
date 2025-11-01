// src\app\(dashboard)\test\TestSidebar.tsx
"use client";

import { useState, useEffect } from "react";
import { Home, BarChart2, Layers, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CalmSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--sidebar-width",
      collapsed ? "var(--sidebar-collapsed-width)" : "256px"
    );
  }, [collapsed]);

  const links = [
    { id: "home", icon: Home, label: "Home" },
    { id: "analytics", icon: BarChart2, label: "Analytics" },
    { id: "projects", icon: Layers, label: "Projects" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <aside
      className={cn(
        "h-screen transition-[width] duration-300 border-r border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900",
        "flex flex-col items-center md:items-start",
        collapsed ? "w-[var(--sidebar-collapsed-width)]" : "w-[var(--sidebar-width)]"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between w-full px-3 py-4 border-b border-neutral-200 dark:border-neutral-800">
        {!collapsed && <h2 className="text-lg font-semibold text-neutral-700 dark:text-neutral-200">Kordor</h2>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md hover:bg-neutral-200/40 dark:hover:bg-neutral-800/50"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 w-full px-2 py-4 space-y-1">
        {links.map((link) => (
          <button
            key={link.id}
            className={cn(
              "flex items-center gap-3 w-full rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50"
            )}
            title={collapsed ? link.label : undefined}
          >
            <link.icon size={18} className="shrink-0" />
            {!collapsed && <span>{link.label}</span>}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="w-full border-t border-neutral-200 dark:border-neutral-800 px-3 py-3 text-xs text-neutral-500 dark:text-neutral-400">
        {!collapsed && <p>v1.0.0 • Focus Mode</p>}
      </div>
    </aside>
  );
}
