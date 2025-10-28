// src\modules\analytics\pages\Overview.tsx
"use client";
import { useEffect } from "react";
import { useUserStore } from "@/providers/UserStoreProvider";
import { fetchSocialAccounts } from "@/lib/api/fetchApi";
import { toast } from "sonner";

export default function OverviewPage() {
  const socialAccounts = useUserStore((s) => s.socialAccounts);
  const accountIds = socialAccounts.map((acc: any) => acc.id).filter(Boolean);
  if (!accountIds.length) return;

  useEffect(() => {
    async function loadSocialAccounts() {
      try {
        const accounts = await fetchSocialAccounts(accountIds);
        //console.log("Fetched accounts:", accounts);
      } catch (error: any) {
        console.error("Error loading social accounts:", error.message);
        toast.error(`Failed to load social accounts: ${error.message || "Unknown error"}`);
      }
    }

    loadSocialAccounts();
  }, [socialAccounts]);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Analytics Overview</h1>
      <p className="text-gray-600">This is your overview section — a quick snapshot of paid and organic performance.</p>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <div className="border rounded-lg p-4 bg-white dark:bg-neutral-900">
          <h2 className="text-lg font-medium">Total Reach</h2>
          <p className="text-3xl font-bold mt-2">42.3K</p>
        </div>

        <div className="border rounded-lg p-4 bg-white dark:bg-neutral-900">
          <h2 className="text-lg font-medium">Paid Engagement</h2>
          <p className="text-3xl font-bold mt-2">5.7K</p>
        </div>

        <div className="border rounded-lg p-4 bg-white dark:bg-neutral-900">
          <h2 className="text-lg font-medium">Organic Engagement</h2>
          <p className="text-3xl font-bold mt-2">9.8K</p>
        </div>
      </div>
    </div>
  );
}
