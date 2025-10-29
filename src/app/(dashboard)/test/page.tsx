// src\app\(dashboard)\test\page.tsx
"use client";
import { useEffect } from "react";
import { fetchMockAssets } from "@/lib/api/fetchApi";
import { useAssetStore } from "@/stores/useAssetStore";

export default function TestPage() {
  const upsertMany = useAssetStore((s) => s.upsertMany);
  const getByType = useAssetStore((s) => s.getByType);
  const getChildren = useAssetStore((s) => s.getChildrenByParentExternal);

  useEffect(() => {
    (async () => {
      const assets = await fetchMockAssets();
      upsertMany(assets);

      // sanity checks
      console.log("camp:", getByType("campaign"));
      console.log("Campaigns under act_123:", getChildren("act_123"));
    })().catch((e) => console.error(e));
  }, [upsertMany, getByType, getChildren]);

  return (
    <div className="p-6 space-y-2">
      <h1 className="text-lg font-semibold">Assets wired to store</h1>
      <p className="text-sm text-gray-500">Open console. If it’s empty, that’s your browser, not me.</p>
    </div>
  );
}
