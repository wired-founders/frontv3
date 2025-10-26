// src\modules\analytics\page.tsx
"use client";

import { useState } from "react";

export function AnalyticsPage() {
  const [filters, setFilters] = useState({
    platform: "facebook",
    dateRange: "last 7 days",
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Fetching analytics with filters:", filters);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Analytics</h1>

      <form onSubmit={handleSubmit} className="flex gap-4 items-end">
        <select
          name="platform"
          value={filters.platform}
          onChange={handleChange}
          className="border rounded p-2"
        >
          <option value="">Select Platform</option>
          <option value="facebook">Facebook</option>
          <option value="instagram">Instagram</option>
          <option value="linkedin">LinkedIn</option>
        </select>

        <input
          type="text"
          name="dateRange"
          placeholder="Date Range (e.g. last 7 days)"
          value={filters.dateRange}
          onChange={handleChange}
          className="border rounded p-2"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2"
        >
          Apply
        </button>
      </form>

      <div className="border rounded p-6 text-gray-500">
        No data yet. Adjust filters and fetch from backend.
      </div>
    </div>
  );
}

export default AnalyticsPage;
