// src\app\(public)\ana\layout.tsx
import type { ReactNode } from "react";
import CalmSidebar from "./CalmSidebar";
import Header from "./Header";

export default function AnaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
        h-screen grid
        grid-cols-[var(--sidebar-width)_1fr]
        transition-[grid-template-columns] duration-300
        bg-neutral-50 dark:bg-neutral-900 text-gray-900 dark:text-gray-100
      "
    >
      <CalmSidebar />
      <div className="flex flex-col h-full">
        <Header />
        <main className="flex-1 overflow-y-auto border-l border-neutral-200 dark:border-neutral-800">
          {children}
        </main>
      </div>
    </div>
  );
}
