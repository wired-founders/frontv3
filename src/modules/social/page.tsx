// src\modules\social\page.tsx
"use client";

export default function SocialPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Social</h1>
      <p className="text-gray-600">
        This is your social dashboard. Connect accounts, track performance, and manage your pages.
      </p>
      <div className="border rounded p-6 text-gray-500">
        No social data yet. Connect a platform to get started.
      </div>
    </div>
  );
}
