// src\hooks\useHome.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCompany, createCompany, CompanyData, getAssets } from "@/lib/api/onboardApi";
import { useUserStore } from "@/providers/UserStoreProvider";

// Company queries
export function useCompany() {
  const companyId = useUserStore((s) => s.company?.id);

  return useQuery<CompanyData>({
    queryKey: ["company", companyId],
    queryFn: getCompany,
    retry: 1,
    enabled: !!companyId, // Add this - only fetch if companyId exists
  });
}

export function useCreateCompany() {
  const queryClient = useQueryClient();
  
  return useMutation<any, Error, CompanyData>({
    mutationFn: createCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company"] });
    },
  });
}

export function useAssets() {
  const socialAccounts = useUserStore((s) => s.socialAccounts);
  const accountIds = socialAccounts.map((acc) => acc.id);

  return useQuery({
    queryKey: ["assets", accountIds],
    queryFn: () => getAssets(accountIds),
    enabled: accountIds.length > 0,
  });
}

// Add more home module queries here
// export function useWorkspace() { ... }
// export function useTeam() { ... }