// src\stores\useAnalyticsNav.ts

/**
 * Analytics Sidebar Store
 * Keeps track of the active analytics section (Overview, Paid, Organic, etc.)
 */
import { create } from "zustand";
import type { AnalyticsSectionId } from "@/constants/navSidebar";

interface AnalyticsNavState {
  activeSection: AnalyticsSectionId;
  setActiveSection: (section: AnalyticsSectionId) => void;
}

export const useAnalyticsNav = create<AnalyticsNavState>((set) => ({
  activeSection: "overview",
  setActiveSection: (section) => set({ activeSection: section }),
}));