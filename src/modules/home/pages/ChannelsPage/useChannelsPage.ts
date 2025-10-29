// src/modules/home/pages/ChannelsPage/useChannelsPage.ts
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAssetStore } from "@/stores/useAssetStore";
import { useChannels } from "@/hooks/useHome";
import { useEntityGraph } from "@/stores/useEntityStore";
import { connectChannel } from "@/lib/api/onboardApi";
import { groupByProvider } from "@/utils/utilities";
import type { Provider } from "@/components/modals/ConnectChannelsModal";

export function useChannelsPage() {
  const [open, setOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { data, isLoading, error } = useChannels();
  const upsertMany = useAssetStore((s) => s.upsertMany);
  const getByType = useAssetStore((s) => s.getByType);

  const groups = data?.groups ?? [];
  const assets = data?.assets ?? [];
  const entities = data?.entities ?? [];

  // Cache assets
  useEffect(() => {
    if (assets.length) {
      try {
        upsertMany(assets);
      } catch (e: any) {
        toast.error(e?.message || "Failed to cache assets");
      }
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

  const groupedByProvider = groupByProvider(groups);

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