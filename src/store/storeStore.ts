import { create } from 'zustand';
import { storeApi } from '../api/storeApi';
import type { PaginatedResponse, Store, StoreListItem } from '../types';

interface StoreState {
  stores: StoreListItem[];
  store: Store | null;
  loading: boolean;
  pagination: { total: number; page: number; page_size: number };
  getStores: (params?: { page?: number; page_size?: number; search?: string; sort_by?: string; sort_dir?: string }) => Promise<void>;
  getStoreById: (storeId: string) => Promise<void>;
  createStore: (data: { name: string; email?: string; address?: string; owner_id?: string }) => Promise<void>;
  updateStore: (storeId: string, data: Partial<Store>) => Promise<void>;
  deleteStore: (storeId: string) => Promise<void>;
}

export const useStoreStore = create<StoreState>((set, get) => ({
  stores: [],
  store: null,
  loading: false,
  pagination: { total: 0, page: 1, page_size: 20 },

  getStores: async (params = {}) => {
    set({ loading: true });
    try {
      const response = await storeApi.listStores(params);
      set({ stores: response.items, pagination: { total: response.total, page: response.page, page_size: response.page_size } });
    } finally {
      set({ loading: false });
    }
  },

  getStoreById: async (storeId) => {
    set({ loading: true });
    try {
      const store = await storeApi.getStore(storeId);
      set({ store });
    } finally {
      set({ loading: false });
    }
  },

  createStore: async (data) => {
    set({ loading: true });
    try {
      await storeApi.createStore(data);
      await get().getStores();
    } finally {
      set({ loading: false });
    }
  },

  updateStore: async (storeId, data) => {
    set({ loading: true });
    try {
      await storeApi.updateStore(storeId, data);
      await get().getStores();
    } finally {
      set({ loading: false });
    }
  },

  deleteStore: async (storeId) => {
    set({ loading: true });
    try {
      await storeApi.deleteStore(storeId);
      await get().getStores();
    } finally {
      set({ loading: false });
    }
  },
}));
