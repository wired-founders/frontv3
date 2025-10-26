// src\stores\userStore.ts
/**
 * Fetching data with 3 properties (dashboard)/layout -> serverAuthApi.ts -> UserStoreProvider.tsx
 * 1. User
 * 2. Workspace
 * 3. Company
 */

import { createStore } from "zustand/vanilla";

export type User = {
  id: string;
  email: string;
  name?: string;
  image?: string;
};

export type Workspace = {
  id?: string;
  name?: string;
};
export type Company = {
  id?: string;
  name?: string;
};
export type SocialAccount = {
  id: string;
  accountName: string | null;
  platform: string;
};
type UserState = {
  user: User | null;
  workspace: Workspace | null;
  company: Company | null;
  socialAccounts: SocialAccount[];
};
type UserActions = {
  setCompany: (company: Company) => void;
};
export type UserStore = UserState & UserActions;

export const createUserStore = (
  initialUser: User | null = null,
  initialWorkspace: Workspace | null = null,
  initialCompany: Company | null = null,
  initialSocialAccounts: SocialAccount[] = []
) => {
  return createStore<UserStore>((set) => ({
    user: initialUser,
    workspace: initialWorkspace,
    company: initialCompany,
    socialAccounts: initialSocialAccounts,

    setCompany: (company: Company) => set({ company }),
  }));
};

export type UserStoreType = ReturnType<typeof createUserStore>;
