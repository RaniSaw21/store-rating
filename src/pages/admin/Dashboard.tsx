import { useEffect } from 'react';
import { Users, Store, Star } from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';
import StatCard from '../../components/dashboard/StatCard';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';

export default function AdminDashboard() {
  const { adminStats, loading, getAdminDashboard } = useDashboardStore();

  useEffect(() => {
    getAdminDashboard();
  }, [getAdminDashboard]);

  if (loading || !adminStats) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-3">
          <LoadingSkeleton className="h-32" />
          <LoadingSkeleton className="h-32" />
          <LoadingSkeleton className="h-32" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <StatCard title="Total Users" value={adminStats.total_users} icon={Users} />
        <StatCard title="Total Stores" value={adminStats.total_stores} icon={Store} />
        <StatCard title="Total Ratings" value={adminStats.total_ratings} icon={Star} />
      </div>
    </div>
  );
}
