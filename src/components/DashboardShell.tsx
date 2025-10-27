// src\components\DashboardShell.tsx
type Props = {
  sidebar: React.ReactNode;
  children: React.ReactNode;
};

export default function DashboardShell({ sidebar, children }: Props) {
  return (
    <div className="grid min-h-[100dvh] grid-rows-[var(--header-height)_1fr]">
      {/* Header row is rendered by (dashboard)/layout, so we leave top row empty here */}
      <div className="sr-only" aria-hidden />

      {/* Content row: Sidebar | Main */}
      <div className="grid h-full grid-cols-[var(--sidebar-width)_1fr] overflow-hidden">
        <aside className="h-full overflow-y-auto">{sidebar}</aside>
        <main className="h-full overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
