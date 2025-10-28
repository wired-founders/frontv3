// src\stores\useSocialNav.ts
import { create } from "zustand";

type State = {
  activePage: "accounts" | "posts" | "messages";
  setActivePage: (page: "accounts" | "posts" | "messages") => void;
};

export const useSocialNavStore = create<State>((set) => ({
  activePage: "accounts",
  setActivePage: (page) => set({ activePage: page }),
}));
