// src\stores\useAssetStore.ts
import { create } from "zustand";

type AssetState = {
  accountId: string | null;
  assetId: string | null;
  assetName: string | null;
  setAccountId: (id: string) => void;
  setAsset: (id: string, name: string) => void;
  reset: () => void;
};

export const useAssetStore = create<AssetState>((set) => ({
  accountId: null,
  assetId: null,
  assetName: null,

  setAccountId: (id) => set({ accountId: id }),
  setAsset: (id, name) => set({ assetId: id, assetName: name }),
  reset: () => set({ accountId: null, assetId: null, assetName: null }),
}));
