import { useEffect } from 'react';
import { Star, Users } from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';
import StatCard from '../../components/dashboard/StatCard';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';

export default function OwnerDashboard() {
  const { ownerStats, loading, getStoreOwnerDashboard } = useDashboardStore();

  useEffect(() => {
    getStoreOwnerDashboard();
  }, [getStoreOwnerDashboard]);

  if (loading || !ownerStats) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Store Owner Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <LoadingSkeleton className="h-32" />
          <LoadingSkeleton className="h-32" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Store Owner Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <StatCard
          title="Average Rating"
          value={ownerStats.overall_average_rating.toFixed(1)}
          icon={Star}
        />
        <StatCard
          title="Total Ratings"
          value={ownerStats.overall_total_ratings}
          icon={Users}
        />
      </div>
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Your Stores</h2>
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Store Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Average Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Total Ratings
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {ownerStats.stores.map((store) => (
                <tr key={store.store_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {store.store_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{store.average_rating.toFixed(1)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {store.total_ratings}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
