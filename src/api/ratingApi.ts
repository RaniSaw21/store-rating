import { api } from './axios';
import type { Rating } from '../types';

export const ratingApi = {
  submitRating: async (data: { store_id: string; rating: number }): Promise<Rating> => {
    const response = await api.post<Rating>('/api/v1/ratings', data);
    return response.data;
  },

  getMyRatings: async (): Promise<Rating[]> => {
    const response = await api.get<Rating[]>('/api/v1/ratings/my-ratings');
    return response.data;
  },

  getMyRatingForStore: async (storeId: string): Promise<Rating | null> => {
    const response = await api.get<Rating | null>(`/api/v1/ratings/store/${storeId}/my-rating`);
    return response.data;
  },

  updateRating: async (ratingId: string, data: { rating: number }): Promise<Rating> => {
    const response = await api.patch<Rating>(`/api/v1/ratings/${ratingId}`, data);
    return response.data;
  },

  deleteRating: async (ratingId: string): Promise<void> => {
    await api.delete(`/api/v1/ratings/${ratingId}`);
  },
};
