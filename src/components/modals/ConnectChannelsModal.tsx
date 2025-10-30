// src\components\modals\ConnectChannelsModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle, // make sure this is from your shadcn/ui dialog file
} from "@/components/ui"; // <- import from the dialog file, not a barrel
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa6";

export type Provider = "facebook" | "instagram" | "linkedin" | "youtube";

type PlatformTile = {
  id: Provider;
  name: string;
  subtitle: string;
  icon: ReactNode;
  isNew?: boolean;
  isComingSoon?: boolean;
};

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onConnect: (provider: Provider) => void;
  platforms?: PlatformTile[];
  busyId?: Provider | null;
  title?: string;
  className?: string;
};

const DEFAULT_PLATFORMS: PlatformTile[] = [
  { id: "facebook", name: "Facebook", subtitle: "Pages, Ad Accounts", icon: <FaFacebook />, isNew: true },
  { id: "instagram", name: "Instagram", subtitle: "IG Accounts, Media", icon: <FaInstagram />, isComingSoon: true },
  { id: "linkedin", name: "LinkedIn", subtitle: "Company Pages", icon: <FaLinkedin />, isComingSoon: true },
  { id: "youtube", name: "YouTube", subtitle: "Channels, Videos", icon: <FaYoutube />, isComingSoon: true },
];

export function ConnectChannelsModal({
  open,
  onOpenChange,
  onConnect,
  platforms = DEFAULT_PLATFORMS,
  busyId = null,
  title = "Connect Channels",
  className,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Remove aria-labelledby; let Radix wire this automatically */}
      <DialogContent className={cn("max-w-2xl p-4 sm:p-6", className)}>
        <DialogHeader>
          {/* If you want it hidden:
             <VisuallyHidden><DialogTitle>{title}</DialogTitle></VisuallyHidden>
             Otherwise keep it visible: */}
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {platforms.map((p) => {
            const disabled = p.isComingSoon || busyId === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => !disabled && onConnect(p.id)}
                disabled={disabled}
                aria-disabled={disabled}
                aria-label={disabled ? `${p.name} (coming soon)` : `Connect ${p.name}`}
                className={cn(
                  "group relative border rounded-lg p-4 text-left flex flex-col items-center",
                  "transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                  "dark:border-neutral-700",
                  disabled ? "opacity-60 cursor-not-allowed" : "hover:shadow-md dark:hover:bg-neutral-800"
                )}
              >
                <div className={cn("w-7 h-7", disabled && "opacity-70")}>{p.icon}</div>
                <div className="mt-2 text-sm font-medium text-neutral-900 dark:text-neutral-100">{p.name}</div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  {p.isComingSoon ? "Coming soon" : p.subtitle}
                </div>
                {p.isNew && !p.isComingSoon && (
                  <span className="mt-1 text-[10px] bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 px-2 py-0.5 rounded-full">
                    New
                  </span>
                )}
                {busyId === p.id && (
                  <span
                    className="absolute top-2 right-2 inline-flex h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent text-neutral-400"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ConnectChannelsModal;
