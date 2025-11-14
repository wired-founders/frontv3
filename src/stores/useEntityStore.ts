// src\stores\useEntityStore.ts
import { create } from "zustand";

type EntityType = "campaign" | "ad_set" | "ad" | "creative";
type EntityId = string;   // db id
type AssetId = string;    // social_assets.id

export type EntityRef = {
  id: EntityId;
  type: EntityType;
  assetId: AssetId;
  parentId?: EntityId | null;
};

type GraphState = {
  // node registry
  byId: Record<EntityId, EntityRef>;
  // adjacency
  children: Record<EntityId, EntityId[]>;        // parentId -> childIds
  // entry points per asset
  rootsByAsset: Record<AssetId, EntityId[]>;     // campaigns for an ad_account

  upsertMany: (nodes: EntityRef[]) => void;
  link: (parentId: EntityId, childIds: EntityId[]) => void;

  // selectors
  getChildren: (parentId: EntityId) => EntityRef[];
  getTreeForAsset: (assetId: AssetId) => EntityRef[]; // campaigns only
};

export const useEntityGraph = create<GraphState>((set, get) => ({
  byId: {},
  children: {},
  rootsByAsset: {},

  upsertMany(nodes) {
    set((s) => {
      for (const n of nodes) {
        s.byId[n.id] = n;
        if (!n.parentId) {
          const roots = s.rootsByAsset[n.assetId] ?? [];
          if (!roots.includes(n.id)) s.rootsByAsset[n.assetId] = [...roots, n.id];
        }
      }
      return s;
    });
  },

  link(parentId, childIds) {
    set((s) => {
      const cur = s.children[parentId] ?? [];
      const merged = Array.from(new Set([...cur, ...childIds]));
      s.children[parentId] = merged;
      return s;
    });
  },

  getChildren(parentId) {
    const s = get();
    return (s.children[parentId] ?? []).map((id) => s.byId[id]).filter(Boolean);
  },

  getTreeForAsset(assetId) {
    const s = get();
    return (s.rootsByAsset[assetId] ?? []).map((id) => s.byId[id]).filter(Boolean);
  },
}));
