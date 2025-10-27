// src\stores\useHomeNav.ts
/**
 * NavigationStore (State Manager)
 *  1 navStore holds activePage ( dashboard, users, etc )
 *  2 Sidebar Calls navStore when clicks on link /  reads activePage from navStore & highligh the tag that is active
 *  3 Reads activePage from store & Shows matching page component based on store value
 */

import { create } from "zustand";

type Page = "dashboard" | "users" | "settings" | "company" | "channels" | "items" | "analytics";

type HomeNavStore = {
  activePage: Page;
  setActivePage: (page: Page) => void;
};

export const useHomeNavStore = create<HomeNavStore>((set) => ({
  activePage: "dashboard",
  setActivePage: (page) => set({ activePage: page }),
}));
