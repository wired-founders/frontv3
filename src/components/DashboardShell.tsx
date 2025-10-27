// src\components\DashboardShell.tsx
type Props = {
  sidebar: React.ReactNode;
  children: React.ReactNode;
};

export default function DashboardShell({ sidebar, children }: Props) {
  return (
    <div className="grid  grid-cols-[var(--sidebar-width)_1fr] overflow-hidden">
      <aside className="h-full overflow-hidden">{sidebar}</aside>
      <main className="h-full overflow-hidden">{children}</main>
    </div>
  );
}