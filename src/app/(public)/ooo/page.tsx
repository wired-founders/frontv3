// src\app\(public)\ooo\page.tsx
// src/app/(public)/ooo/page.tsx
"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatBot from "@/components/bot/ChatBot";

export default function OOOPage() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="h-screen grid grid-cols-[auto_1fr] bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
      {/* Sidebar */}
      <aside
        className={`h-full border-r border-neutral-200 dark:border-neutral-800 transition-all duration-300 ${
          collapsed ? "w-16" : "w-60"
        } flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
          <span className={`font-semibold text-lg ${collapsed ? "hidden" : "block"}`}>Menu</span>
          <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <Menu size={18} /> : <X size={18} />}
          </Button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <div className="text-sm cursor-pointer hover:text-primary transition">Dashboard</div>
          <div className="text-sm cursor-pointer hover:text-primary transition">Settings</div>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex flex-col h-full">
        {/* Header */}
        <header className="h-14 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between px-6 bg-white/50 dark:bg-neutral-950/50 backdrop-blur-md">
          <h1 className="text-lg font-semibold">Out of Office</h1>
          <Button variant="outline" size="sm">
            Help
          </Button>
        </header>

        {/* Page content */}
        <main className="p-6">
          <p className="text-muted-foreground">You’ve left the workspace. The assistant remains available.</p>
          {/* Floating Chat Button */}
          <ChatBot />
        </main>
      </div>
    </div>
  );
}
