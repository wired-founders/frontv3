// src\components\modals\BusinessModal.tsx
"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui";

type BusinessModalProps = {
  businessName: string;
  assets: {
    id: string;
    assetType: string;
    name: string;
    externalId: string;
  }[];
  open: boolean;
  onClose: () => void;
};

export function BusinessModal({ businessName, assets, open, onClose }: BusinessModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="capitalize">{businessName}</DialogTitle>
        </DialogHeader>

        <div className="space-y-2 mt-2">
          {assets.length > 0 ? (
            assets.map((asset) => (
              <div
                key={asset.id}
                className="border rounded-md px-3 py-2 bg-neutral-50 dark:bg-neutral-900 text-sm"
              >
                <p className="font-medium">{asset.name}</p>
                <p className="text-xs text-gray-500">{asset.assetType}</p>
                <p className="text-xs text-gray-500">{asset.externalId}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No assets found.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
