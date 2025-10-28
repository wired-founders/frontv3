// src\modules\analytics\components\layout\Sidebar.tsx
"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAnalyticsNav } from "@/stores/useAnalyticsNav";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "paid", label: "Paid" },
  { id: "organic", label: "Organic" },
  { id: "insights", label: "Insights" },
  { id: "reports", label: "Reports" },
  { id: "connect", label: "Connect" },
];

export default function AnalyticsSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { activeSection, setActiveSection } = useAnalyticsNav();

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--sidebar-width',
      collapsed ? 'var(--sidebar-collapsed-width)' : '240px'
    );
  }, [collapsed]);

  return (
    <div className="border-r bg-background transition-all duration-300 h-full">
      <div className="flex h-14 items-center justify-end px-3 border-b">
        <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>

      <nav className="space-y-1 p-2">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id as any)}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-colors text-sm font-medium",
              activeSection === s.id 
                ? "bg-primary text-primary-foreground" 
                : "hover:bg-muted"
            )}
          >
            {!collapsed && <span>{s.label}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
}