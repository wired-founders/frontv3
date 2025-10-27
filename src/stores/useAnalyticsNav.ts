// src\stores\useAnalyticsNav.ts
import { create } from "zustand";

/**
 * Analytics Sidebar Store
 * Keeps track of the active analytics section (Overview, Paid, Organic, etc.)
 */

type AnalyticsSection = "overview" | "paid" | "organic" | "insights" | "reports"|'connect';

interface AnalyticsNavState {
  activeSection: AnalyticsSection;
  setActiveSection: (section: AnalyticsSection) => void;
}

export const useAnalyticsNav = create<AnalyticsNavState>((set) => ({
  activeSection: "overview",
  setActiveSection: (section) => set({ activeSection: section }),
}));
