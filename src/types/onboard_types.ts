// src\types\onboard_types.ts
export interface newWorkspaceInput {
  name: string;
  workspaceType?: string;
  jobRole?: string;
  useCase?: string;
  platforms?: string[];
  inviteEmails?: string[];
}

export type CompanyData = {
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