// src\modules\analytics\components\layout\Sidebar.tsx
"use client";
import { useAnalyticsNav } from "@/stores/useAnalyticsNav";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "paid", label: "Paid" },
  { id: "organic", label: "Organic" },
  { id: "insights", label: "Insights" },
  { id: "reports", label: "Reports" },
  { id: "connect", label: "Connect" },
];

export default function AnalyticsSidebar() {
  const { activeSection, setActiveSection } = useAnalyticsNav();

  return (
    <aside className="w-56 border-r min-h-screen p-4">
      <nav className="flex flex-col gap-2">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id as any)}
            className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
              activeSection === s.id ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {s.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
