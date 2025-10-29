// src\hooks\useAnalytics.ts
/**
 * useQuery
 1. queryKey
 2. 
 3. 
 */

"use client";
import {AssetType} from '@/stores/useAssetStore'
import { useQuery } from "@tanstack/react-query";
import { fetchAnalytics } from "@/lib/api/analyticsApi";

export function useAnalytics(type: AssetType, externalId: string) {
  return useQuery({
    queryKey: ["analytics", type, externalId],
    queryFn: () => fetchAnalytics(type, externalId), 
    enabled: !!externalId, 
  });
}
