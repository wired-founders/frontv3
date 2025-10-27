// src\modules\social\components\Sidebar.tsx
"use client";

import { Users, Share2, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function SocialSidebar() {
  const [active, setActive] = useState("accounts");

  const links = [
    { id: "accounts", label: "Accounts", icon: Users },
    { id: "posts", label: "Posts", icon: Share2 },
    { id: "messages", label: "Messages", icon: MessageSquare },
  ];

  return (
    <aside className="h-full border-r bg-background">
      <nav className="space-y-1 p-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = active === link.id;
          return (
            <button
              key={link.id}
              onClick={() => setActive(link.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span>{link.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
