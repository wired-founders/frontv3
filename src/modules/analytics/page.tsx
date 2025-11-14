// src\modules\analytics\page.tsx
"use client";

import { useAnalyticsNav } from "@/stores/useAnalyticsNav";
import {
  OverviewPage,
  AnalyticsPage,
  CampaignPage,
  OrganicPage,
  OrganicOverviewPage,
  OrganicProfilesPage,
  CampaignProductLinkPage,
} from "./pages";

export default function AnalyticsHome() {
  const analyticsPage = useAnalyticsNav((s) => s.activeSection);

  switch (analyticsPage) {
    case "overview":
      return <OverviewPage />;
    case "connect":
      return <AnalyticsPage />;
    case "campaigns":
      return <CampaignPage />;
    case "link_campaign":
      return <CampaignProductLinkPage />;
    case "organic":
      return <OrganicPage />;
    case "organic:overview":
      return <OrganicOverviewPage />;
    case "organic:profiles":
      return <OrganicProfilesPage />;
    default:
      return <OverviewPage />;
  }
}
