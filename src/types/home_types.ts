// src\types\home_types.ts
/**
 1. WorkspaceInput - ❗no response
 2. CompanyInput | Company
 2. ItemInput | Item
 3. GroupedByProvider , StoreAsset, 
 Campaign
 4. Asset | BusinessGroup
 */
export interface WorkspaceInput {
  name: string;
  workspaceType?: string;
  jobRole?: string;
  useCase?: string;
  platforms?: string[];
  inviteEmails?: string[];
}

export type Company = {
  id: string;
  name: string;
  industry: string;
  website: string;
  description: string;
}
export type CompanyInput = {
  name: string;
  industry: string;
  website: string;
  description: string;
};
export type ItemInput = {
  name: string;
  type: "product" | "service";
  price?: string;
  category?: string;
  description?: string;
};

export interface Item {
  id: number;
  name: string;
  type: "Product" | "Service";
  price: string;
  category: string;
  description: string;
}

export type GroupedByProvider = Record<string, BusinessGroupDTO[]>;

export type AssetRaw = {
  id: string;
  accountId: string;
  provider: string;
  externalId: string;
  name: string;
  assetType: "business" | "page" | "ad_account" | "instagram" | "whatsapp";
  parentId: string | null;
  parentName: string | null;
  metadata?: Record<string, unknown>;
  purpose?: string;
};

export type BusinessGroupDTO = {
  provider: string;
  business: AssetRaw;
  children: AssetRaw[];
};


export type EntityType = "campaign" | "ad_set" | "ad" | "creative";

export interface Entity {
  id: string;
  type: EntityType;
  assetId: string;
  parentId: string | null;
}

export type Entities = Entity[]; // plural = array
import { Asset} from '@/stores/useAssetStore'
export type ChannelsResponse = {
  groups: GroupedByProvider;
  assets: Asset;
  entities: Entities;
};




