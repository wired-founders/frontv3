// src\hooks\useHome.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createCompany } from "@/lib/api/onboardApi";
import { getCompany, getAssets } from "@/lib/api/fetchApi";
import { useUserStore } from "@/providers/UserStoreProvider";
import { CompanyInput } from "@/types/home_types";

// Company queries
export function useCompany() {
  const companyId = useUserStore((s) => s.company?.id);

  return useQuery<CompanyInput>({
    queryKey: ["company", companyId],
    queryFn: getCompany,
    retry: 1,
    enabled: !!companyId, 
  });
}

export function useCreateCompany() {
  const queryClient = useQueryClient();
  const setCompany = useUserStore((s) => s.setCompany);

  return useMutation<any, Error, CompanyInput>({
    mutationFn: createCompany,
    onSuccess: (company) => {
      queryClient.invalidateQueries({ queryKey: ["company"] });
      //console.log('hu',company)
      setCompany({ id: company.id, name: company.name });
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
    staleTime: 5 * 60 * 1000, // Data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Cache for 10 minutes
    refetchOnWindowFocus: false, // Don't refetch on tab switch
  });
}
// Add more home module queries here
// export function useWorkspace() { ... }
// export function useTeam() { ... }
