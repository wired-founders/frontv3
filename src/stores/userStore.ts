// src\stores\userStore.ts
import { createStore } from 'zustand/vanilla';

export type User = {
  email: string;
  name?: string;
  image?:string;
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