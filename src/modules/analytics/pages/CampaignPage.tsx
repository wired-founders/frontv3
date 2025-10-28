// src\modules\analytics\pages\CampaignPage.tsx
"use client";

export default function CampaignPage() {
  return (
    <div className="h-full grid grid-rows-[auto_1fr] overflow-hidden">
      {/* Sub-header */}
      <div className="flex items-center justify-between border-b px-4 py-2 bg-neutral-50 dark:bg-neutral-900">
        <h2 className="text-lg font-semibold">Campaigns</h2>
        <button className="text-sm text-blue-600 hover:underline">
          + Add Campaign
        </button>
      </div>

      {/* Main content */}
      <div className="overflow-y-auto p-4 space-y-4">
        <p className="text-gray-600 text-sm">
          Overview of your active and completed campaigns will appear here.
        </p>

        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 border rounded-md bg-white dark:bg-neutral-950">
            <h3 className="font-medium">Campaign A</h3>
            <p className="text-sm text-gray-500">Performance summary</p>
          </div>
          <div className="p-4 border rounded-md bg-white dark:bg-neutral-950">
            <h3 className="font-medium">Campaign B</h3>
            <p className="text-sm text-gray-500">Performance summary</p>
          </div>
          <div className="p-4 border rounded-md bg-white dark:bg-neutral-950">
            <h3 className="font-medium">Campaign C</h3>
            <p className="text-sm text-gray-500">Performance summary</p>
          </div>
        </div>
      </div>
    </div>
  );
}
