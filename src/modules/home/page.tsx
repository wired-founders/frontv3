// src\modules\home\page.tsx
"use client";

import { useHomeNavStore } from "@/stores/useHomeNav";
import { useUserStore } from "@/providers/UserStoreProvider";
import { DashboardPage, CompanyPage, ChannelsPage, ItemsPage } from "./pages";

export default function HomePage() {
  const activePage = useHomeNavStore((s) => s.activePage);
  const companyId = useUserStore((s) => s.company?.id);
  //console.log("company id in page", companyId);
  if (!companyId) {
    return <CompanyPage />;
  }
  switch (activePage) {
    case "company":
      return <CompanyPage />;
    case "channels":
      return <ChannelsPage />;
    case "items":
      return <ItemsPage />;
    case "dashboard":
    default:
      return <DashboardPage />;
  }
}
