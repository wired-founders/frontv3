// src\components\modals\ConnectChannelsModal.tsx
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

export type Provider = "facebook" | "instagram" | "linkedin" | "youtube";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onConnect: (provider: Provider) => void;
};

export function ConnectChannelsModal({ open, onOpenChange, onConnect }: Props) {
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Connect Channels</DialogTitle>
        </DialogHeader>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="border rounded-lg p-4 text-center">
            <Facebook className="w-7 h-7 mx-auto mb-2 text-blue-600" />
            <p className="text-sm font-medium">Facebook</p>
            <Button className="mt-3 w-full" onClick={() => onConnect("facebook")}>
              Connect
            </Button>
          </div>

          <div className="border rounded-lg p-4 text-center">
            <Instagram className="w-7 h-7 mx-auto mb-2 text-pink-500" />
            <p className="text-sm font-medium">Instagram</p>
            <Button className="mt-3 w-full" onClick={() => onConnect("instagram")}>
              Connect
            </Button>
          </div>

          <div className="border rounded-lg p-4 text-center">
            <Linkedin className="w-7 h-7 mx-auto mb-2 text-sky-700" />
            <p className="text-sm font-medium">LinkedIn</p>
            <Button className="mt-3 w-full" onClick={() => onConnect("linkedin")}>
              Connect
            </Button>
          </div>

          <div className="border rounded-lg p-4 text-center">
            <Youtube className="w-7 h-7 mx-auto mb-2 text-red-600" />
            <p className="text-sm font-medium">YouTube</p>
            <Button className="mt-3 w-full" onClick={() => onConnect("youtube")}>
              Connect
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
