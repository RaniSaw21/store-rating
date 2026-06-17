import { api } from './axios';
import type { PaginatedResponse, User, UserRole } from '../types';

export const userApi = {
  listUsers: async (params: {
    page?: number;
    page_size?: number;
    role?: UserRole;
    search?: string;
    sort_by?: string;
    sort_dir?: string;
  }): Promise<PaginatedResponse<User>> => {
    const response = await api.get<PaginatedResponse<User>>('/api/v1/users', { params });
    return response.data;
  },

  getUser: async (userId: string): Promise<User> => {
    const response = await api.get<User>(`/api/v1/users/${userId}`);
    return response.data;
  },

  updateUser: async (userId: string, data: Partial<User>): Promise<User> => {
    const response = await api.patch<User>(`/api/v1/users/${userId}`, data);
    return response.data;
  },

  deleteUser: async (userId: string): Promise<void> => {
    await api.delete(`/api/v1/users/${userId}`);
  },
};
