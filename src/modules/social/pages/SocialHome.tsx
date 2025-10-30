// src\modules\social\pages\SocialHome.tsx
"use client";

export default function SocialHome() {
  return (
    <div className="h-full grid grid-rows-[auto_1fr] overflow-hidden bg-white dark:bg-neutral-950">
      {/* Sub Header */}
      <div className="border-b px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Social Home</h1>
        <div className="text-xs text-muted-foreground">v0 — basic layout</div>
      </div>

      {/* Main Content */}
      <main className="overflow-y-auto p-6 space-y-4">
        <section className="border rounded-lg p-4">
          <h2 className="text-sm font-medium mb-2">Section A</h2>
          <p className="text-sm text-muted-foreground">
            Drop your widgets or lists here.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-medium mb-2">Left</h3>
            <p className="text-sm text-muted-foreground">Content</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-medium mb-2">Right</h3>
            <p className="text-sm text-muted-foreground">Content</p>
          </div>
        </section>
      </main>
    </div>
  );
}
