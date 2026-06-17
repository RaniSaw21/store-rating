import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Star } from 'lucide-react';
import { useStoreStore } from '../../store/storeStore';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Pagination from '../../components/common/Pagination';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import EmptyState from '../../components/common/EmptyState';
import { toast } from 'sonner';

export default function AdminStores() {
  const { stores, loading, pagination, getStores, deleteStore } = useStoreStore();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getStores({ page: currentPage, search: search || undefined });
  }, [currentPage, search, getStores]);

  const handleDelete = async (storeId: string) => {
    if (confirm('Are you sure you want to delete this store?')) {
      try {
        await deleteStore(storeId);
        toast.success('Store deleted successfully');
        getStores({ page: currentPage, search: search || undefined });
      } catch (error) {
        toast.error('Failed to delete store');
      }
    }
  };

  const totalPages = Math.ceil(pagination.total / pagination.page_size);

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Stores</h1>
        <LoadingSkeleton className="h-12" />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <LoadingSkeleton key={i} className="h-16" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Stores</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Store
        </Button>
      </div>
      <Input
        placeholder="Search stores..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {stores.length === 0 ? (
        <EmptyState title="No stores found" description="Try adjusting your search" />
      ) : (
        <>
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {stores.map((store) => (
                  <tr key={store.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {store.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{store.address || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{store.average_rating.toFixed(1)}</span>
                        <span className="text-gray-500">({store.total_ratings})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(store.id)}>
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          )}
        </>
      )}
    </div>
  );
}
