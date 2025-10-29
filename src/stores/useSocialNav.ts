// src\stores\useSocialNav.ts
import { create } from "zustand";

type PageId = "home" | "accounts" | "posts"| "calendar" | "connect";

type State = {
  activePage: PageId;
  setActivePage: (page: PageId) => void;
};

export const useSocialNavStore = create<State>((set) => ({
  activePage: "home", // default
  setActivePage: (page) => set({ activePage: page }),
}));
