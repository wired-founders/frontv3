// src\components\modals\BusinessAssetsModal.tsx
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface BusinessAssetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  business: any;
}

export function BusinessAssetsModal({ isOpen, onClose, business }: BusinessAssetsModalProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!business) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{business.business.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            {business.children.map((child: any) => (
              <div
                key={child.id}
                className="border rounded overflow-hidden hover:shadow-sm transition-shadow"
              >
                <div
                  className="flex justify-between items-start p-3 cursor-pointer hover:bg-gray-50"
                  onClick={() => setExpandedId(expandedId === child.id ? null : child.id)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium">{child.name}</p>
                      <Badge variant="secondary" className="text-xs">
                        {child.assetType}
                      </Badge>
                      {child.metadata?.status && (
                        <Badge
                          variant={child.metadata.status === "ACTIVE" ? "default" : "outline"}
                          className="text-xs"
                        >
                          {child.metadata.status}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{child.purpose}</p>
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      expandedId === child.id ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {expandedId === child.id && (
                  <div className="px-3 pb-3 pt-0 bg-gray-50/50 border-t">
                    <dl className="space-y-2 text-xs mt-2">
                      <div className="flex justify-between">
                        <dt className="font-medium text-gray-600">External ID:</dt>
                        <dd className="text-gray-800 font-mono text-[10px]">{child.externalId}</dd>
                      </div>

                      {child.metadata?.accessToken && (
                        <div className="flex justify-between">
                          <dt className="font-medium text-gray-600">Access:</dt>
                          <dd className="text-green-600">✓ Token Available</dd>
                        </div>
                      )}

                      {child.metadata?.currency && (
                        <div className="flex justify-between">
                          <dt className="font-medium text-gray-600">Currency:</dt>
                          <dd className="text-gray-800">{child.metadata.currency}</dd>
                        </div>
                      )}

                      {child.metadata?.accountId && (
                        <div className="flex justify-between">
                          <dt className="font-medium text-gray-600">Account ID:</dt>
                          <dd className="text-gray-800 font-mono text-[10px]">{child.metadata.accountId}</dd>
                        </div>
                      )}

                      {child.metadata?.pageId && (
                        <div className="flex justify-between">
                          <dt className="font-medium text-gray-600">Page ID:</dt>
                          <dd className="text-gray-800 font-mono text-[10px]">{child.metadata.pageId}</dd>
                        </div>
                      )}

                      {child.metadata?.username && (
                        <div className="flex justify-between">
                          <dt className="font-medium text-gray-600">Username:</dt>
                          <dd className="text-gray-800">@{child.metadata.username}</dd>
                        </div>
                      )}

                      {child.metadata?.waId && (
                        <div className="flex justify-between">
                          <dt className="font-medium text-gray-600">WhatsApp ID:</dt>
                          <dd className="text-gray-800 font-mono text-[10px]">{child.metadata.waId}</dd>
                        </div>
                      )}

                      {child.parentName && (
                        <div className="flex justify-between">
                          <dt className="font-medium text-gray-600">Parent:</dt>
                          <dd className="text-gray-800">{child.parentName}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}