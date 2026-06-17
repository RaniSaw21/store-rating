import { api } from './axios';
import type { PaginatedResponse, Store, StoreListItem } from '../types';

export const storeApi = {
  listStores: async (params: {
    page?: number;
    page_size?: number;
    search?: string;
    sort_by?: string;
    sort_dir?: string;
  }): Promise<PaginatedResponse<StoreListItem>> => {
    const response = await api.get<PaginatedResponse<StoreListItem>>('/api/v1/stores', { params });
    return response.data;
  },

  getStore: async (storeId: string): Promise<Store> => {
    const response = await api.get<Store>(`/api/v1/stores/${storeId}`);
    return response.data;
  },

  createStore: async (data: { name: string; email?: string; address?: string; owner_id?: string }): Promise<Store> => {
    const response = await api.post<Store>('/api/v1/stores', data);
    return response.data;
  },

  updateStore: async (storeId: string, data: Partial<Store>): Promise<Store> => {
    const response = await api.patch<Store>(`/api/v1/stores/${storeId}`, data);
    return response.data;
  },

  deleteStore: async (storeId: string): Promise<void> => {
    await api.delete(`/api/v1/stores/${storeId}`);
  },
};
