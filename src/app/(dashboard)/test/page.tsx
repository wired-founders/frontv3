// src\app\(dashboard)\test\page.tsx
"use client";

export default function TestPage() {
  return (
    <div className="h-screen grid grid-rows-[auto_1fr] bg-neutral-50 dark:bg-neutral-900 text-gray-900 dark:text-gray-100">
      {/* Subheader Section */}
      <header className="border-b border-neutral-200 dark:border-neutral-800 px-6 py-4">
        <h1 className="text-2xl font-bold tracking-tight">Analytics Overview</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
          Calm layout. Clear hierarchy. Gentle contrasts.
        </p>
      </header>

      {/* Main Grid */}
      <main className="grid grid-cols-12 gap-4 p-6">
        {/* Left Column - Sidebar / Sub-sections */}
        <aside className="col-span-12 md:col-span-3 space-y-3">
          <section className="p-4 rounded-xl bg-white/80 dark:bg-neutral-800/80 shadow-sm border border-neutral-200 dark:border-neutral-700">
            <h2 className="text-sm font-semibold mb-2 text-neutral-700 dark:text-neutral-300">
              Insights
            </h2>
            <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
              <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                Overview
              </li>
              <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                Campaigns
              </li>
              <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                Audience
              </li>
            </ul>
          </section>
        </aside>

        {/* Right Column - Main Content */}
        <section className="col-span-12 md:col-span-9 space-y-4">
          <div className="p-6 rounded-xl bg-white dark:bg-neutral-800 shadow-sm border border-neutral-200 dark:border-neutral-700">
            <h2 className="text-lg font-semibold mb-2">Engagement Metrics</h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Charts, graphs, or summaries go here.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-neutral-800 shadow-sm border border-neutral-200 dark:border-neutral-700">
            <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Logs or timeline data here.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
