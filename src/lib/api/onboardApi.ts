// src\lib\api\onboardApi.ts
import { apiUrl } from "@/config/env.client";
import { WorkspaceInput, CompanyInput, ItemInput } from "@/types/home_types";
import { Company } from "@/stores/userStore";
import { Provider } from "@/components/modals/ConnectChannelsModal";

export async function createWorkspace(data: WorkspaceInput) {
  try {
    const res = await fetch(`${apiUrl}/onboard/workspace`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed (${res.status})`);
    }

    const result = await res.json();

    return result;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Creation failed";
    throw new Error(message);
  }
}
export const connectChannel = async (platform: Provider) => {
  window.location.assign(`${apiUrl}/connect/${platform}`);
};

export async function createCompany(data: CompanyInput): Promise<Company> {
  const res = await fetch(`${apiUrl}/onboard/company`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create company");
  const { company } = await res.json();
  //console.log("company api", company);
  return company;
}

export async function createItem(data: ItemInput) {
  const res = await fetch(`${apiUrl}/onboard/item`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create item");
  const { item } = await res.json();
  return item;
}
