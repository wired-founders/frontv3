// src\types\onboard_types.ts
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

export interface Item {
  id: number;
  name: string;
  type: "Product" | "Service";
  price: string;
  category: string;
  description: string;
}

export type ItemInput = {
  name: string;
  type: "product" | "service";
  price?: string; 
  category?: string;
  description?: string;
};
