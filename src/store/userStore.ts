import { create } from 'zustand';
import { userApi } from '../api/userApi';
import type { PaginatedResponse, User, UserRole } from '../types';

interface UserState {
  users: User[];
  loading: boolean;
  pagination: { total: number; page: number; page_size: number };
  listUsers: (params?: { page?: number; page_size?: number; role?: UserRole; search?: string; sort_by?: string; sort_dir?: string }) => Promise<void>;
  getUser: (userId: string) => Promise<void>;
  updateUser: (userId: string, data: Partial<User>) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  loading: false,
  pagination: { total: 0, page: 1, page_size: 20 },

  listUsers: async (params = {}) => {
    set({ loading: true });
    try {
      const response = await userApi.listUsers(params);
      set({ users: response.items, pagination: { total: response.total, page: response.page, page_size: response.page_size } });
    } finally {
      set({ loading: false });
    }
  },

  getUser: async (userId) => {
    set({ loading: true });
    try {
      await userApi.getUser(userId);
    } finally {
      set({ loading: false });
    }
  },

  updateUser: async (userId, data) => {
    set({ loading: true });
    try {
      await userApi.updateUser(userId, data);
      await get().listUsers();
    } finally {
      set({ loading: false });
    }
  },

  deleteUser: async (userId) => {
    set({ loading: true });
    try {
      await userApi.deleteUser(userId);
      await get().listUsers();
    } finally {
      set({ loading: false });
    }
  },
}));
