// src\app\(public)\ana\Header.tsx
"use client";

import { Menu, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header
      className="
        sticky top-0 z-20 h-[var(--header-height,3.5rem)]
        flex items-center justify-between
        border-b border-neutral-200 dark:border-neutral-800
        bg-white/70 dark:bg-neutral-900/70
        backdrop-blur supports-[backdrop-filter]:backdrop-blur
        px-4 md:px-6
      "
    >
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <Button
          size="icon"
          variant="ghost"
          className="hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50"
        >
          <Menu className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
        </Button>
        <h1 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 tracking-tight">
          Analytics Overview
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        <Button
          size="icon"
          variant="ghost"
          className="hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50"
        >
          <Bell className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50"
        >
          <User className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
        </Button>
      </div>
    </header>
  );
}
