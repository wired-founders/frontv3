// src\stores\navStore.ts
/**
 * NavigationStore (State Manager) 
 *  1 navStore holds activePage ( dashboard, users, etc )
 *  2 Sidebar Calls navStore when clicks on link /  reads activePage from navStore & highligh the tag that is active 
 *  3 Reads activePage from store & Shows matching page component based on store value
 */


import { create } from "zustand";

type Page = "dashboard" | "users" | "settings" | "company" | "channels";

type NavigationStore = {
  activePage: Page;
  setActivePage: (page: Page) => void;
};

export const useNavigationStore = create<NavigationStore>((set) => ({
  activePage: "dashboard",
  setActivePage: (page) => set({ activePage: page }),
}));