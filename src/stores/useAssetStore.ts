// src\stores\useAssetStore.ts
import { create } from "zustand";

export type Asset = {
  id: string;
  name: string;
  type: string; // e.g., "page", "ad_account", "campaign", etc.
  provider?: string; // e.g., "facebook", "instagram"
  status?: string;
  metadata?: Record<string, any>;
};

type AssetState = {
  selectedAsset: Asset | null;

  setAsset: (asset: Asset) => void;
  reset: () => void;
};

export const useAssetStore = create<AssetState>((set) => ({
  selectedAsset: null,

  setAsset: (asset) => set({ selectedAsset: asset }),
  reset: () => set({ selectedAsset: null }),
}));
