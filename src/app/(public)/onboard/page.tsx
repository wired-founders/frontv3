// src\app\(public)\onboard\page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createWorkspace } from "@/lib/api/onboardApi";

export default function OnboardPage() {
  const [workspaceName, setWorkspaceName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const result = await createWorkspace({ name: workspaceName });
    if (result) {
      router.push("/home");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6">
        <h1 className="text-2xl font-bold mb-4">Create Workspace</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Workspace name"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            required
            className="w-full p-2 border rounded mb-4"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded"
          >
            {loading ? "Creating..." : "Create Workspace"}
          </button>
        </form>
      </div>
    </div>
  );
}
