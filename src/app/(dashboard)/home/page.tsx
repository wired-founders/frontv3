// src\app\(dashboard)\home\page.tsx
"use client";

import { useNavigationStore } from "@/stores/navStore";
import { useUserStore } from "@/providers/UserStoreProvider";

import {DashboardPage, CompanyPage, ChannelsPage, ItemsPage, AnalyticsPage} from "./pages";


export default function HomePage() {
  const activePage = useNavigationStore((s) => s.activePage);
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
       case "analytics":
      return <AnalyticsPage />;
    case "dashboard":
    default:
      return <DashboardPage />;
  }
}
