// src\app\(dashboard)\test\page.tsx
"use client";

export default function TestPage() {
  return (
    <div className="h-full grid grid-rows-[auto_1fr]">
      {/* Header */}
      <div className="border-b px-4 py-3 bg-neutral-50 dark:bg-neutral-900">
        <h1 className="text-2xl font-bold">Main Heading</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">Subheading text here</p>
      </div>

      {/* Main Content */}
      <div className="p-4">
        <p>Your main content goes here</p>
      </div>
    </div>
  );
}