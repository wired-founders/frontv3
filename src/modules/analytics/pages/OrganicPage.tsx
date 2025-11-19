// src\modules\analytics\pages\OrganicPage.tsx
import { useAssetStore } from "@/stores/useAssetStore";
import { fetchOrganic } from "@/lib/api/analyticsApi";

export default function OrganicPage() {
  const getByType = useAssetStore((s) => s.getByType);
  const page = getByType("page");
  const instagram = getByType("instagram");
  const whatsapp = getByType("whatsapp");

  const pageIds = page.map((a) => a.id);
  const instagramIds = instagram.map((a) => a.id);
  const whatsappIds = whatsapp.map((a) => a.id);

  const allIds = [...pageIds, ...instagramIds, ...whatsappIds];


 const handleAddInsight = async () => {
  const data = await fetchOrganic(allIds);
  console.log("Organic insights:", data);
};

  return (
    <div className="p-6 h-full bg-gray-100 dark:bg-gray-900">
      {/* Subheader Section */}
      <div className="flex items-center justify-between border-b pb-3 mb-6 bg-neutral-50 dark:bg-neutral-900">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Organic Insights</h2>
        <button
          onClick={handleAddInsight}
          className="text-sm text-blue-600 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-blue-600 dark:text-blue-400"
        >
          + Add Insight
        </button>
      </div>

      {/* Main Content Section */}
      <div className="space-y-6">
        {/* Insight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Insight Card 1 */}
          <div className="p-4 border rounded-lg bg-white dark:bg-neutral-800 shadow-sm hover:shadow-md transition-shadow duration-300">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Traffic Overview</h3>
            <p className="text-sm text-gray-500 dark:text-gray-300">Total Visits: 12,300</p>
            <p className="text-sm text-gray-500 dark:text-gray-300">New Visitors: 8,200</p>
          </div>

          {/* Insight Card 2 */}
          <div className="p-4 border rounded-lg bg-white dark:bg-neutral-800 shadow-sm hover:shadow-md transition-shadow duration-300">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Engagement</h3>
            <p className="text-sm text-gray-500 dark:text-gray-300">Average Time on Page: 2m 30s</p>
            <p className="text-sm text-gray-500 dark:text-gray-300">Bounce Rate: 45%</p>
          </div>

          {/* Insight Card 3 */}
          <div className="p-4 border rounded-lg bg-white dark:bg-neutral-800 shadow-sm hover:shadow-md transition-shadow duration-300">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Conversions</h3>
            <p className="text-sm text-gray-500 dark:text-gray-300">Conversion Rate: 3.5%</p>
            <p className="text-sm text-gray-500 dark:text-gray-300">Total Conversions: 430</p>
          </div>
        </div>
      </div>
    </div>
  );
}
