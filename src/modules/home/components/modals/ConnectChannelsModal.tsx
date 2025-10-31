// src\modules\home\components\modals\ConnectChannelsModal.tsx
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button, Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { Facebook, Instagram, Linkedin, Music2, Globe } from "lucide-react";
import { apiUrl } from "@/config/env.client";

const platformSlug: Record<string, string> = {
  Facebook: "facebook",
  Instagram: "instagram",
  TikTok: "tiktok",
  LinkedIn: "linkedin",
  Website: "website",
};
type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
export function ConnectChannelsModal({ open, onOpenChange }: Props) {
  const platforms = [
    { name: "Facebook", icon: Facebook },
    { name: "Instagram", icon: Instagram },
    { name: "TikTok", icon: Music2 },
    { name: "LinkedIn", icon: Linkedin },
    { name: "Website", icon: Globe },
  ];

  const handleConnect = (name: string) => {
    const slug = platformSlug[name];
    if (!apiUrl) {
      console.error("Missing NEXT_PUBLIC_API_ORIGIN");
      return;
    }
    if (!slug) {
      console.error(`No slug for platform: ${name}`);
      return;
    }
    window.location.assign(`${apiUrl}/connect/${slug}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Connect Your Channels</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-4">
          {platforms.map(({ name, icon: Icon }) => (
            <Card key={name} className="flex flex-col items-center justify-center text-center">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 justify-center">
                  <Icon className="w-5 h-5" />
                  {name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="mt-2" onClick={() => handleConnect(name)}>
                  Connect
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
