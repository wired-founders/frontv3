// src/app/(public)/test/page.tsx
"use client";

import { useState } from "react";

export default function TestPage() {
  const [loading, setLoading] = useState(false);

  const handleConnectFacebook = () => {
    setLoading(true);
    // backend origin — make sure NEXT_PUBLIC_API_URL is set in your .env
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ;
    window.location.href = `${apiUrl}/connect/facebook`;
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50">
      <h1 className="text-2xl font-semibold">Facebook Connection Test</h1>

      <button
        onClick={handleConnectFacebook}
        disabled={loading}
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? "Redirecting..." : "Connect Facebook"}
      </button>

      <p className="text-sm text-gray-500">
        This will redirect you to your Express backend for OAuth.
      </p>
    </div>
  );
}
