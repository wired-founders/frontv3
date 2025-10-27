// src\modules\analytics\pages\Analytics.tsx
"use client";

import { useUserStore } from "@/providers/UserStoreProvider";
import { useState } from "react";

export default function AnalyticsPage() {
  const socialAccounts = useUserStore((s) => s.socialAccounts);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [adAccounts, setAdAccounts] = useState([]);
  const [loading, setLoading] = useState(false);

  const platforms = Array.from(new Set(socialAccounts.map((a) => a.platform)));

  const handleAccountClick = async (socialAccountId: string) => {
    setSelectedAccount(socialAccountId);
    setLoading(true);
    
    try {
      const res = await fetch(
        `http://localhost:5000/api/accounts/${socialAccountId}/ad-accounts`,
        { credentials: "include" }
      );
      const data = await res.json();
      setAdAccounts(data);
    } catch (error) {
      console.error("Failed to fetch ad accounts:", error);
      setAdAccounts([]);
    } finally {
      setLoading(false);
    }
  };

  const accountCards = socialAccounts
    .filter((acc) => selectedPlatform === "all" || acc.platform === selectedPlatform)
    .map((acc) => (
      <div
        key={acc.id}
        onClick={() => handleAccountClick(acc.id)}
        className={`border p-3 rounded-md cursor-pointer transition ${
          selectedAccount === acc.id
            ? "bg-blue-100 dark:bg-blue-900 border-blue-500"
            : "bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800"
        }`}
      >
        <p className="font-medium">{acc.accountName}</p>
        <p className="text-xs text-gray-500">{acc.platform}</p>
      </div>
    ));

  return (
    <div className="p-4 space-y-4">
      {/* Sub-header */}
      <div className="grid grid-cols-2 items-center border-b pb-2">
        <h1 className="text-xl font-semibold">Analytics</h1>
        <div className="justify-self-end">
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="border rounded-md bg-neutral-50 dark:bg-neutral-800 p-2 text-sm"
          >
            <option value="all">All Platforms</option>
            {platforms.map((p) => (
              <option key={p} value={p}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Account grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {socialAccounts.length > 0 ? (
          accountCards
        ) : (
          <p className="col-span-full text-gray-500">No accounts found.</p>
        )}
      </div>

      {/* Ad Accounts Section */}
      {selectedAccount && (
        <div className="mt-6 border-t pt-4">
          <h2 className="text-lg font-semibold mb-3">Ad Accounts</h2>
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : adAccounts.length > 0 ? (
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {adAccounts.map((ad: any) => (
                <div
                  key={ad.id}
                  className="border p-3 rounded-md bg-white dark:bg-neutral-800"
                >
                  <p className="font-medium">{ad.name}</p>
                  <p className="text-xs text-gray-500">ID: {ad.id}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No ad accounts found.</p>
          )}
        </div>
      )}
    </div>
  );
}