// src\components\popover\WorkspacePopover.tsx
"use client";

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Settings, Users, Plus } from "lucide-react";

type Props = {
  collapsed: boolean;
  workspaceName: string;
  workspaceInitial: string;
};

export function WorkspacePopover({ collapsed, workspaceName, workspaceInitial }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={
            collapsed
              ? "grid min-w-[2rem] aspect-square place-content-center rounded-md bg-primary/10 text-sm font-semibold uppercase hover:opacity-80 transition-opacity"
              : "flex items-center gap-2 max-w-[180px] text-left hover:opacity-80 transition-opacity"
          }
          aria-label="Workspace menu"
        >
          {collapsed ? workspaceInitial : <span className="truncate font-medium">{workspaceName}</span>}
        </button>
      </PopoverTrigger>

      <PopoverContent
        // switch direction based on collapsed state
        side={collapsed ? "right" : "bottom"}
        align={collapsed ? "start" : "center"}
        sideOffset={collapsed ? 16 : 4}
        className="w-64 p-2"
      >
        <div className="px-2 py-1.5 text-xs text-muted-foreground">Workspace</div>

        <button
          className="w-full flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted"
          onClick={() => console.log("open manage modal")}
        >
          <Settings className="h-4 w-4" />
          Manage settings
        </button>

        <button
          className="w-full flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted"
          onClick={() => console.log("open members panel")}
        >
          <Users className="h-4 w-4" />
          Members & roles
        </button>

        <div className="my-2 h-px bg-border" />

        <button
          className="w-full flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted"
          onClick={() => console.log("create workspace")}
        >
          <Plus className="h-4 w-4" />
          Create new workspace
        </button>
      </PopoverContent>
    </Popover>
  );
}
