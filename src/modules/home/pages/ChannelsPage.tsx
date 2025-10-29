// src\modules\home\pages\ChannelsPage.tsx
"use client";

import { Button, Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui";
import { fetchChannelss } from "@/lib/api/fetchApi";
import { useEffect, useState } from "react";
import { useUserStore } from "@/providers/UserStoreProvider";
import { groupByProvider } from "@/utils/utilities";
import { BusinessAssetsModal } from "@/components/modals/BusinessAssetsModal";
import { toast } from "sonner";
import { useAssetStore } from "@/stores/useAssetStore";

export default function ChannelsPage() {
  const socialAccounts = useUserStore((s) => s.socialAccounts);
  const accountIds = socialAccounts.map((a: any) => a?.id).filter(Boolean);
  const [groups, setGroups] = useState<any[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const upsertMany = useAssetStore((s) => s.upsertMany);
  const getByType = useAssetStore((s) => s.getByType);

  useEffect(() => {
    (async () => {
      try {
        const { groups, assets } = await fetchChannelss(accountIds);
        //console.log("log", groups);
        setGroups(groups);
        upsertMany(assets);
      } catch (err) {
        console.error(err.message);
        toast.error("fetch Failed", err.message);
      }
    })();
  }, []);

  const handleOpenBusiness = (group: unknown) => {
    setSelectedBusiness(group);
    setIsModalOpen(true);
  };

  const groupedByProvider = groupByProvider(groups);

  return (
    <div className="h-full grid grid-rows-[auto_1fr] overflow-hidden">
      <div className="flex items-center justify-between border-b px-4 py-2 bg-neutral-50 dark:bg-neutral-900">
        <h2 className="text-lg font-semibold">Social Accounts</h2>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              console.log("Businesses:", getByType("business"));
              console.log("Pages:", getByType("page"));
              console.log("Ad Accounts:", getByType("ad_account"));
              console.log("Instagram:", getByType("instagram"));
              console.log("WhatsApp:", getByType("whatsapp"));
            }}
          >
            Log Assets
          </Button>

          <Button size="sm" variant="outline">
            + Add
          </Button>
        </div>
      </div>

      <div className="p-4 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3 auto-rows-min">
        {Object.entries(groupedByProvider).map(([provider, providerGroups]) => (
          <Accordion key={provider} type="multiple" className="border rounded-md">
            <AccordionItem value={provider}>
              <AccordionTrigger className="px-3 py-2 text-sm font-medium capitalize">{provider}</AccordionTrigger>
              <AccordionContent className="px-3 pb-3 text-sm">
                <div className="space-y-2">
                  {providerGroups.map((group) => (
                    <div
                      key={group.business.id}
                      className="flex justify-between items-center py-2 px-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded border"
                    >
                      <div className="flex-1">
                        <span className="text-sm font-medium">{group.business.name}</span>
                        <span className="text-xs text-gray-500 ml-2">{group.children.length} assets</span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 px-2 text-xs"
                        onClick={() => handleOpenBusiness(group)}
                      >
                        Open
                      </Button>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>

      <BusinessAssetsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} business={selectedBusiness} />
    </div>
  );
}
