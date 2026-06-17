import { api } from './axios';
import type { AdminDashboard, PaginatedResponse, RaterInfo, StoreOwnerDashboard } from '../types';

export const dashboardApi = {
  getAdminDashboard: async (): Promise<AdminDashboard> => {
    const response = await api.get<AdminDashboard>('/api/v1/dashboard/admin');
    return response.data;
  },

  getStoreOwnerDashboard: async (): Promise<StoreOwnerDashboard> => {
    const response = await api.get<StoreOwnerDashboard>('/api/v1/dashboard/store-owner');
    return response.data;
  },

  getStoreRaters: async (storeId: string, params: { page?: number; page_size?: number }): Promise<PaginatedResponse<RaterInfo>> => {
    const response = await api.get<PaginatedResponse<RaterInfo>>(`/api/v1/dashboard/store/${storeId}/raters`, { params });
    return response.data;
  },
};
