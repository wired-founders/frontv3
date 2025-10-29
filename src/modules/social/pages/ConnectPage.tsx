// src\modules\social\pages\ConnectPage.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ConnectChannelsModal } from "@/components/modals/ConnectChannelsModal";

export default function ConnectPage() {
  const [open, setOpen] = useState(false);

  function handleConnect(provider: "facebook" | "instagram" | "linkedin" | "youtube") {
    // Replace with your real OAuth routes
    // Example if using Grant/Passport server routes:
    // window.location.href = `/auth/${provider}`;
    // Or open provider-specific flow in a new tab:
    // window.open(`/connect/${provider}`, "_self");
    console.log("Connect ->", provider);
    // keep modal open or close it depending on your flow
    setOpen(false);
  }

  return (
    <div className="h-full grid grid-rows-[auto_1fr] overflow-hidden bg-white dark:bg-neutral-950">
      {/* Sub Header */}
      <div className="border-b px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Connect Social Media</h1>
        <Button size="sm" onClick={() => setOpen(true)}>Connect channels</Button>
      </div>

      {/* Main Content */}
      <main className="overflow-y-auto p-6 space-y-4">
        <p className="text-sm text-muted-foreground">
          Manage all platform connections from one place. Use the button above to add new channels.
        </p>

        {/* Placeholder content area */}
        <div className="border rounded-lg p-4">
          <h2 className="text-sm font-medium mb-2">Current Connections</h2>
          <p className="text-sm text-muted-foreground">No connections yet.</p>
        </div>
      </main>

      <ConnectChannelsModal
        open={open}
        onOpenChange={setOpen}
        onConnect={handleConnect}
      />
    </div>
  );
}
