import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { useStoreStore } from '../../store/storeStore';
import { useRatingStore } from '../../store/ratingStore';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Pagination from '../../components/common/Pagination';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import EmptyState from '../../components/common/EmptyState';
import RatingModal from '../../components/modals/RatingModal';
import { toast } from 'sonner';

export default function UserDashboard() {
  const { stores, loading, pagination, getStores } = useStoreStore();
  const { submitRating } = useRatingStore();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

  useEffect(() => {
    getStores({ page: currentPage, search: search || undefined });
  }, [currentPage, search, getStores]);

  const handleRateStore = (storeId: string) => {
    setSelectedStore(storeId);
    setIsRatingModalOpen(true);
  };

  const handleRatingSubmit = async (rating: number) => {
    if (selectedStore) {
      try {
        await submitRating({ store_id: selectedStore, rating });
        toast.success('Rating submitted successfully');
        getStores({ page: currentPage, search: search || undefined });
      } catch (error) {
        toast.error('Failed to submit rating');
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
            <LoadingSkeleton key={i} className="h-20" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Browse Stores</h1>
      <Input
        placeholder="Search stores by name or address..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {stores.length === 0 ? (
        <EmptyState title="No stores found" description="Try adjusting your search" />
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stores.map((store) => (
              <div key={store.id} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900">{store.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{store.address || 'No address provided'}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{store.average_rating.toFixed(1)}</span>
                    <span className="text-gray-500">({store.total_ratings} ratings)</span>
                  </div>
                  {store.user_rating ? (
                    <span className="text-sm text-gray-600">Your rating: {store.user_rating}⭐</span>
                  ) : (
                    <Button size="sm" onClick={() => handleRateStore(store.id)}>
                      Rate
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          )}
        </>
      )}
      <RatingModal
        isOpen={isRatingModalOpen}
        onClose={() => setIsRatingModalOpen(false)}
        onSubmit={handleRatingSubmit}
      />
    </div>
  );
}
