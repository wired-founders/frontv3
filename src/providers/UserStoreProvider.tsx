// src\providers\UserStoreProvider.tsx
"use client";

import { createContext, useContext, useRef } from "react";
import { useStore } from "zustand";
import { createUserStore, type UserStoreType } from "@/stores/userStore";

const UserStoreContext = createContext<UserStoreType | null>(null);

export function UserStoreProvider({ 
  children, 
  initialUser 
}: { 
  children: React.ReactNode;
  initialUser: any;
}) {
  const storeRef = useRef<UserStoreType | undefined>(undefined);
  
  if (!storeRef.current) {
    storeRef.current = createUserStore(initialUser);
  }

  return (
    <UserStoreContext.Provider value={storeRef.current}>
      {children}
    </UserStoreContext.Provider>
  );
}

export function useUserStore<T>(selector: (state: any) => T) {
  const store = useContext(UserStoreContext);
  if (!store) throw new Error("Missing UserStoreProvider");
  return useStore(store, selector);
}
