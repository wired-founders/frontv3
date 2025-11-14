// src\constants\navSidebar.ts
import {
  LayoutDashboard,
  Building2,
  Package,
  Share2,
  Home,
  Users,
  Calendar,
  Plug,
  BarChart3,
  LineChart,
  TrendingUp,
  Link,
} from "lucide-react";

export const HOME_NAV_LINKS = [
  { id: "dashboard" as const, icon: LayoutDashboard, label: "Dashboard" },
  { id: "company" as const, icon: Building2, label: "Company" },
  { id: "items" as const, icon: Package, label: "Items" },
  { id: "channels" as const, icon: Share2, label: "Channels" },
];

export const ANALYTICS_NAV_LINKS = [
  { id: "overview", icon: BarChart3, label: "Overview" },
  { id: "organic", icon: LineChart, label: "Organic Insights", hasDropdown: true },
  { id: "campaigns", icon: TrendingUp, label: "Paid Insights" },
  { id: "connect", icon: Plug, label: "Connect" },
  { id: "link_campaign", icon: Link, label: "Link Products" },
] as const;

export type AnalyticsSectionId = (typeof ANALYTICS_NAV_LINKS)[number]["id"] | "organic:overview" | "organic:profiles";

export const SOCIAL_NAV_LINKS = [
  { id: "home" as const, icon: Home, label: "Home" },
  { id: "accounts" as const, icon: Users, label: "Accounts" },
  { id: "posts" as const, icon: Share2, label: "Posts" },
  { id: "calendar" as const, icon: Calendar, label: "Calendar" },
  { id: "connect" as const, icon: Plug, label: "Connect" },
];
