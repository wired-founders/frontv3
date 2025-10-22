// src\components\layout\public\Header.tsx
"use client";

import Image from "next/image";

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-gray-800">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2">
        <Image
          src="/kordor-logo.svg" // replace with your actual logo path
          alt="Logo"
          width={36}
          height={36}
          priority
        />
        <span className="text-lg font-semibold text-white">Kordor Ai</span>
      </div>

      {/* Right: Placeholder for avatar/dropdown */}
      <div className="w-8 h-8 rounded-full bg-gray-700" />
    </header>
  );
}
