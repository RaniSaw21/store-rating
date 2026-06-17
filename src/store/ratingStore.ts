import { create } from 'zustand';
import { ratingApi } from '../api/ratingApi';
import type { Rating } from '../types';

interface RatingState {
  ratings: Rating[];
  loading: boolean;
  submitRating: (data: { store_id: string; rating: number }) => Promise<void>;
  getMyRatings: () => Promise<void>;
  updateRating: (ratingId: string, data: { rating: number }) => Promise<void>;
  deleteRating: (ratingId: string) => Promise<void>;
}

export const useRatingStore = create<RatingState>((set, get) => ({
  ratings: [],
  loading: false,

  submitRating: async (data) => {
    set({ loading: true });
    try {
      await ratingApi.submitRating(data);
      await get().getMyRatings();
    } finally {
      set({ loading: false });
    }
  },

  getMyRatings: async () => {
    set({ loading: true });
    try {
      const ratings = await ratingApi.getMyRatings();
      set({ ratings });
    } finally {
      set({ loading: false });
    }
  },

  updateRating: async (ratingId, data) => {
    set({ loading: true });
    try {
      await ratingApi.updateRating(ratingId, data);
      await get().getMyRatings();
    } finally {
      set({ loading: false });
    }
  },

  deleteRating: async (ratingId) => {
    set({ loading: true });
    try {
      await ratingApi.deleteRating(ratingId);
      await get().getMyRatings();
    } finally {
      set({ loading: false });
    }
  },
}));
