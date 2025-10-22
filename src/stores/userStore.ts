// src\stores\userStore.ts
/**
 * Fetching data with 3 properties (dashboard)/layout -> serverAuthApi.ts -> UserStoreProvider.tsx
 * 1. User
 * 2. Workspace
 * 3. Company
 */

import { createStore } from 'zustand/vanilla';

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
type UserStore = {
  user: User | null;
  workspace: Workspace | null;
  company: Company | null;
   socialAccounts: SocialAccount[];
};

export const createUserStore = (
  initialUser: User | null = null,
  initialWorkspace: Workspace | null = null,
  initialCompany: Company | null = null,
    initialSocialAccounts: SocialAccount[] = []
) => {
  return createStore<UserStore>(() => ({
    user: initialUser,
    workspace: initialWorkspace,
    company: initialCompany,
    socialAccounts: initialSocialAccounts,
  }));
};

export type UserStoreType = ReturnType<typeof createUserStore>;