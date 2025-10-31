// src\modules\analytics\pages\OrganicPage.tsx
export default function OrganicPage() {
  return (
    <div className="p-4 h-full grid grid-rows-[auto_1fr] overflow-hidden bg-gray-200">
      <div className="flex items-center justify-between border-b px-4 py-2 bg-neutral-50 dark:bg-neutral-900">
        <h2 className="text-lg font-semibold">Campaigns</h2>
        <button className="text-sm text-blue-600 hover:underline">+ Add Campaign</button>
      </div>
      <div>Main</div>
    </div>
  );
}
