// src\stores\useAssetStore.ts

/**
 Will only be storing Asset data that will need to fetch relevant data from backend
 1. Asset id (db id)
 2. Provider
 3. Asset type
 4. external id ( ad_account id, page id etc)
 5. Paterents id ( )
 */
import { create } from "zustand";

export type AssetType = "business" | "page" | "instagram" | "whatsapp" | "ad_account" ;
export type Provider = "facebook" | "instagram" | "linkedin" | "youtube" | "whatsapp";

export type Asset = {
  id: string;
  provider: Provider;
  type: AssetType;
  externalId: string;
  name: string;
  parentExternalId?: string;
};

type Id = string;
type ExternalId = string;

type State = {
  byId: Record<Id, Asset>;
  idsByType: Record<AssetType, Id[]>;
  idsByParentExternal: Record<ExternalId, Id[]>;
  upsertMany: (assets: Asset[]) => void;
  getByType: (type: AssetType) => Asset[];
  getChildrenByParentExternal: (parent: ExternalId) => Asset[];
};


const initTypeMap = (): Record<AssetType, Id[]> => ({
  business: [],
  page: [],
  ad_account: [],
  instagram: [],
  whatsapp: [],
});

export const useAssetStore = create<State>((set, get) => ({
  byId: {},
  idsByType: initTypeMap(),
  idsByParentExternal: {},

  upsertMany: (assets) =>
    set((state) => {
      const byId = { ...state.byId };
      const idsByType = { ...state.idsByType };
      const idsByParentExternal = { ...state.idsByParentExternal };

      for (const a of assets) {
        byId[a.id] = { ...(byId[a.id] || {}), ...a };

        const t = idsByType[a.type] || (idsByType[a.type] = []);
        if (!t.includes(a.id)) t.push(a.id);

        if (a.parentExternalId) {
          const kids = idsByParentExternal[a.parentExternalId] || [];
          if (!kids.includes(a.id)) idsByParentExternal[a.parentExternalId] = [...kids, a.id];
        }
      }
      return { byId, idsByType, idsByParentExternal };
    }),

  getByType: (type) => (get().idsByType[type] || []).map((id) => get().byId[id]).filter(Boolean),
  getChildrenByParentExternal: (parent) =>
    (get().idsByParentExternal[parent] || []).map((id) => get().byId[id]).filter(Boolean),
}));
