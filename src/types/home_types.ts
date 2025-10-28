// src\types\home_types.ts
/**
 1. WorkspaceInput - ❗no response
 2. CompanyInput | ❗no response
 2. ItemInput | Item
 3. Campaign
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

export type Campaign = {
  id: string;
  assetId: string;
  provider: string;
  externalId: string;
  entityType: string;
  parentId: string | null;
  name: string;
  status: string;
  objective: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
};

export type Asset = {
  id: string;
  accountId: string;
  provider: string;
  externalId: string;
  name: string;
  assetType: string;
  parentId: string | null;
  parentName: string | null;
};

export type BusinessGroup = {
  business: Asset;
  children: Asset[];
  counts?: Record<string, number>;
};
