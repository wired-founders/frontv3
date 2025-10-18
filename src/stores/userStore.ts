// src\stores\userStore.ts
import { createStore } from 'zustand/vanilla';

type User = {
  email: string;
  name?: string;
};

type UserStore = {
  user: User | null;
};

export const createUserStore = (initialUser: User | null = null) => {
  return createStore<UserStore>(() => ({
    user: initialUser,
  }));
};

export type UserStoreType = ReturnType<typeof createUserStore>;