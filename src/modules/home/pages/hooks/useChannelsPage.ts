// src\modules\home\pages\hooks\useChannelsPage.ts


/**
 1. handleAddChannelClick   | handleLogAssets
 2. handleConnectClick
 3. Page renters ->  load useChannels() if (adAccountIds)  -> fetchChannels() -> Api Backend @returns {groups, assets, entities}
 4. 
 */
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAssetStore } from "@/stores/useAssetStore";
import { useChannels } from "@/hooks/useHome";
import { useEntityGraph } from "@/stores/useEntityStore";
import { connectChannel } from "@/lib/api/onboardApi";
import type { Provider } from "@/components/modals/ConnectChannelsModal";

export function useChannelsPage() {
  const [open, setOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const upsertMany = useAssetStore((s) => s.upsertMany);
  const getByType = useAssetStore((s) => s.getByType);
  const { data} = useChannels();

  const groupedByProvider  = data?.groups ?? [];
  const assets = data?.assets ?? [];
  const entities = data?.entities ?? [];


  // Cache assets
useEffect(() => {
  if (!Array.isArray(assets) || assets.length === 0) return;
  
  try {
    upsertMany(assets);
  } catch (e: any) {
    toast.error(e?.message || "Failed to cache assets");
  }
}, [assets, upsertMany]);

  // Cache entities
  useEffect(() => {
    if (entities.length) {
      try {
        const graph = useEntityGraph.getState();
        graph.upsertMany(entities);
        entities.forEach((entity) => {
          if (entity.parentId) {
            const siblings = entities.filter((e) => e.parentId === entity.parentId).map((e) => e.id);
            graph.link(entity.parentId, siblings);
          }
        });
      } catch (e: any) {
        toast.error(e?.message || "Failed to cache entities");
      }
    }
  }, [entities]);

  const handleAddChannelClick = () => setOpen(true);

  const handleConnectClick = async (platform: Provider) => {
    await connectChannel(platform);
  };

  const handleOpenBusiness = (group: unknown) => {
    setSelectedBusiness(group);
    setIsModalOpen(true);
  };

  const handleLogAssets = () => {
    console.log("Businesses:", getByType("business"));
    console.log("Pages:", getByType("page"));
    console.log("Ad Accounts:", getByType("ad_account"));
    console.log("Instagram:", getByType("instagram"));
    console.log("WhatsApp:", getByType("whatsapp"));
    console.log("Entity Graph:", useEntityGraph.getState().byId);
    console.log("Roots by Asset:", useEntityGraph.getState().rootsByAsset);
  };

  return {
    open,
    setOpen,
    selectedBusiness,
    isModalOpen,
    setIsModalOpen,
    groupedByProvider,
    handleAddChannelClick,
    handleConnectClick,
    handleOpenBusiness,
    handleLogAssets,
  };
}
