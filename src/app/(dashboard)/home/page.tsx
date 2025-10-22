// src\app\(dashboard)\home\page.tsx
"use client";

import { useNavigationStore } from "@/stores/navStore";
import { useUserStore } from "@/providers/UserStoreProvider";

import DashboardPage from "./pages/Dashboard";
import UsersPage from "./pages/Users";
import SettingsPage from "./pages/Settings";
import CompanyPage from "./pages/Company";
import ChannelsPage from "./pages/ChannelsPage";

export default function HomePage() {
  const activePage = useNavigationStore((s) => s.activePage);
  const companyId = useUserStore((s) => s.company?.id);
  console.log('company id in page', companyId)
  if (!companyId) {
    return <CompanyPage />;
  }
  switch (activePage) {
    case "users":
      return <UsersPage />;
    case "settings":
      return <SettingsPage />;
    case "company":
      return <CompanyPage />;
    case "channels":
      return <ChannelsPage />;
    case "dashboard":
    default:
      return <DashboardPage />;
  }
}
