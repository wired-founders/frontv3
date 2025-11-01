// src\modules\analytics\components\layout\SidebarItem.tsx
"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AnalyticsSectionId } from "@/constants/navSidebar";

type Section = {
  id: AnalyticsSectionId;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  hasDropdown?: boolean;
};

export default function SidebarItem({
  section,
  activeSection, // Changed from isActive
  collapsed,
  onSelect,
}: {
  section: Section;
  activeSection: AnalyticsSectionId; // Changed from boolean
  collapsed: boolean;
  onSelect: (id: AnalyticsSectionId) => void;
}) {
  const [open, setOpen] = useState(false);
  
  // Check if main section or any sub-section is active
  const isMainActive = activeSection === section.id || activeSection.startsWith(`${section.id}:`);

  return (
    <div>
      <div
        className={cn(
          "flex w-full items-center gap-2 rounded-lg px-2 py-2",
          isMainActive ? "bg-primary text-primary-foreground" : "hover:bg-muted",
          collapsed && "justify-center"
        )}
        title={section.label}
      >
        <button
          type="button"
          onClick={() => onSelect(section.id)}
          className={cn("flex-1 flex items-center gap-3 text-sm font-medium", collapsed && "justify-center")}
        >
          {section.icon && <section.icon className="h-4 w-4 shrink-0" />}
          {!collapsed && <span className="truncate">{section.label}</span>}
        </button>

        {section.hasDropdown && !collapsed && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((v) => !v);
            }}
            className="ml-auto inline-flex h-6 w-6 items-center justify-center rounded-md hover:bg-black/5 dark:hover:bg-white/10"
          >
            <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
          </button>
        )}
      </div>

      {section.hasDropdown && !collapsed && open && (
        <div className="mt-1 ml-9 flex flex-col gap-1">
          <button
            type="button"
            onClick={() => onSelect("organic:overview")}
            className={cn(
              "text-left rounded-md px-3 py-2 text-sm hover:bg-muted",
              activeSection === "organic:overview" && "bg-primary/10"
            )}
          >
            Organic Overview
          </button>
          <button
            type="button"
            onClick={() => onSelect("organic:profiles")}
            className={cn(
              "text-left rounded-md px-3 py-2 text-sm hover:bg-muted",
              activeSection === "organic:profiles" && "bg-primary/10"
            )}
          >
            Profiles & Posts
          </button>
        </div>
      )}
    </div>
  );
}