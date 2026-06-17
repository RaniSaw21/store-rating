import { create } from 'zustand';
import { dashboardApi } from '../api/dashboardApi';
import type { AdminDashboard, PaginatedResponse, RaterInfo, StoreOwnerDashboard } from '../types';

interface DashboardState {
  adminStats: AdminDashboard | null;
  ownerStats: StoreOwnerDashboard | null;
  raters: RaterInfo[];
  loading: boolean;
  pagination: { total: number; page: number; page_size: number };
  getAdminDashboard: () => Promise<void>;
  getStoreOwnerDashboard: () => Promise<void>;
  getStoreRaters: (storeId: string, params?: { page?: number; page_size?: number }) => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  adminStats: null,
  ownerStats: null,
  raters: [],
  loading: false,
  pagination: { total: 0, page: 1, page_size: 20 },

  getAdminDashboard: async () => {
    set({ loading: true });
    try {
      const stats = await dashboardApi.getAdminDashboard();
      set({ adminStats: stats });
    } finally {
      set({ loading: false });
    }
  },

  getStoreOwnerDashboard: async () => {
    set({ loading: true });
    try {
      const stats = await dashboardApi.getStoreOwnerDashboard();
      set({ ownerStats: stats });
    } finally {
      set({ loading: false });
    }
  },

  getStoreRaters: async (storeId, params = {}) => {
    set({ loading: true });
    try {
      const response = await dashboardApi.getStoreRaters(storeId, params);
      set({ raters: response.items, pagination: { total: response.total, page: response.page, page_size: response.page_size } });
    } finally {
      set({ loading: false });
    }
  },
}));
