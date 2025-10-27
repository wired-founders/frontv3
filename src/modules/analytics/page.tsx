// src\modules\analytics\page.tsx
"use client";

import { useAnalyticsNav } from "@/stores/useAnalyticsNav";
import { OverviewPage, AnalyticsPage } from "./pages";

export default function AnalyticsHome() {
  const analyticsPage = useAnalyticsNav((s) => s.activeSection);

  const renderPage = () => {
    switch (analyticsPage) {
      case "overview":
        return <OverviewPage />;
      case "connect":
        return <AnalyticsPage />;
      default:
        return <OverviewPage />;
    }
  };

  return <div className=" h-screen">{renderPage()}</div>;
}
