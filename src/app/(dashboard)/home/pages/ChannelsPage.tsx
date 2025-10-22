// src/app/(dashboard)/home/pages/ChannelsPage.tsx
"use client";

import { ConnectChannelsModal } from "@/components/modals/ConnectChannelsModal";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { Facebook, Instagram, Linkedin, Music2, Globe } from "lucide-react";
import { useUserStore } from "@/providers/UserStoreProvider";
import { useAssets } from "@/hooks/useHome";

const platformIcons: Record<string, any> = {
  facebook: Facebook,
  instagram: Instagram,
  tiktok: Music2,
  linkedin: Linkedin,
  website: Globe,
};

export default function ChannelsPage() {
  const socialAccounts = useUserStore((s) => s.socialAccounts);
  const { data, isLoading } = useAssets();
  const assets = data?.assets || [];

  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Connected Channels</h1>
        <ConnectChannelsModal />
      </div>

      {socialAccounts.length === 0 ? (
        <p className="text-gray-500">No channels connected yet</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {socialAccounts.map((account) => {
            const Icon = platformIcons[account.platform] || Globe;
            const accountAssets = assets.filter(
              (asset: any) => asset.accountId === account.id
            );

            return (
              <Card key={account.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon className="w-5 h-5" />
                    {account.accountName || account.platform}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {accountAssets.length > 0 && (
                    <p className="text-xs text-gray-400">
                      {accountAssets.length} assets
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}