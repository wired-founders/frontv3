// src\stores\navStore.ts
// src/stores/navigationStore.ts
import { create } from "zustand";

type Page = "dashboard" | "users" | "settings";

type NavigationStore = {
  activePage: Page;
  setActivePage: (page: Page) => void;
};

export const useNavigationStore = create<NavigationStore>((set) => ({
  activePage: "dashboard",
  setActivePage: (page) => set({ activePage: page }),
}));