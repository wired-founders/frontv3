// src\modules\home\pages\ChannelsPage.tsx
/**
 1. handleAddChannelClick() -> Open ConnectChannelsModal -> Click connect -> handleConnectClick -> Api Redirect Backend
 2. When page rendering -> useChannels() if(adAccountIds) -> fetchChannels() -> Api Backend @returns {groups, assets, entities}
 3. groups ->  groupedByProvider() -> Show connected platforms 
 4. assets -> useEffect (upsertMany(assets))
 5. entities -> useEffect(graph.upsertMany(entities)) & link entities
 6. 
 */
"use client";

import { Button, Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui";
import { ConnectChannelsModal,BusinessAssetsModal } from "@/components/modals";
import { useChannelsPage } from "./hooks/useChannelsPage";

export default function ChannelsPage() {
  const {
    handleAddChannelClick,
    handleConnectClick,

    open,
    setOpen,
    isModalOpen,
    setIsModalOpen,

    selectedBusiness,
    groupedByProvider,

    handleOpenBusiness,
    handleLogAssets,
  } = useChannelsPage();

  return (
    <div className="h-full grid grid-rows-[auto_1fr] overflow-hidden">
      <div className="flex items-center justify-between border-b px-4 py-2 bg-neutral-50 dark:bg-neutral-900">
        <h2 className="text-lg font-semibold">Social Accounts</h2>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" onClick={handleLogAssets}>
            Log Assets
          </Button>

          <Button size="sm" variant="outline" onClick={handleAddChannelClick}>
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
                  {providerGroups.map((group: any) => (
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

      <ConnectChannelsModal open={open} onOpenChange={setOpen} onConnect={handleConnectClick} />
      <BusinessAssetsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} business={selectedBusiness} />
    </div>
  );
}
