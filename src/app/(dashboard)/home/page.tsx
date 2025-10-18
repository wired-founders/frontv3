// src/app/(dashboard)/home/page.tsx
"use client";

import { useNavigationStore } from "@/stores/navStore";
import DashboardPage from "./pages/Dashboard";
import UsersPage from "./pages/Users";
import SettingsPage from "./pages/Settings";

export default function HomePage() {
  const activePage = useNavigationStore((s) => s.activePage);

  switch (activePage) {
    case "users":
      return <UsersPage />;
    case "settings":
      return <SettingsPage />;
    case "dashboard":
    default:
      return <DashboardPage />;
  }
}