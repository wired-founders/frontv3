"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/home", label: "Home" },
  { href: "/analytics", label: "Analytics" },
  { href: "/social", label: "Social" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 border-r min-h-screen p-4">
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded text-sm font-medium transition-colors ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
