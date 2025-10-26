"use client";
import { useState } from "react";

export default function TestPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (category: string, startDate: string, endDate: string) => {
    setLoading(true);
    const response = await fetch(
      `http://localhost:5000/analytics?category=${category}&startDate=${startDate}&endDate=${endDate}`
    );
    const result = await response.json();
    setData(result);
    setLoading(false);
  };

  // **Logic section — prepare UI data first**
  const records = data?.records ?? [];

  const recordElements = records.map((record: any) => {
    const { id, platform, pageName, date, views, engagement } = record;

    return {
      id,
      platform,
      pageName,
      date,
      views: views.toLocaleString(),
      engagement,
    };
  });

  // you can now map again in JSX but cleanly:
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Social Media Analytics</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Filter by Platform</h2>
          <div className="flex gap-3">
            <button
              onClick={() => fetchData("facebook", "2025-01-01", "2025-01-31")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
            >
              Facebook
            </button>
            <button
              onClick={() => fetchData("linkedin", "2025-01-01", "2025-01-31")}
              className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-lg transition"
            >
              LinkedIn
            </button>
            <button
              onClick={() => fetchData("all", "2025-01-01", "2025-01-31")}
              className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-lg transition"
            >
              All Platforms
            </button>
          </div>
        </div>

        {loading && <div className="text-center text-gray-600">Loading...</div>}

        {data && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-4 pb-4 border-b">
              <p className="text-gray-600">
                Platform: <span className="font-semibold text-gray-800">{data.category}</span>
              </p>
              <p className="text-gray-600">
                Date Range: <span className="font-semibold text-gray-800">{data.dateRange.start}</span> to{" "}
                <span className="font-semibold text-gray-800">{data.dateRange.end}</span>
              </p>
            </div>

            <div className="space-y-3">
              {recordElements.map((record) => (
                <div
                  key={record.id}
                  className="bg-white border border-gray-200 p-4 rounded-lg hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-sm font-semibold text-blue-600">{record.platform}</span>
                      <p className="text-xs text-gray-500">{record.pageName}</p>
                    </div>
                    <span className="text-xs text-gray-500">{record.date}</span>
                  </div>

                  <div className="flex justify-between mt-3">
                    <div>
                      <p className="text-xs text-gray-600">Views</p>
                      <p className="font-semibold text-gray-900">{record.views}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Engagement</p>
                      <p className="font-semibold text-green-600">{record.engagement}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
