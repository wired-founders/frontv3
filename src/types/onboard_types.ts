// src\types\onboard_types.ts
export interface newWorkspaceInput {
  name: string;
  workspaceType?: string;
  jobRole?: string;
  useCase?: string;
  platforms?: string[];
  inviteEmails?: string[];
}