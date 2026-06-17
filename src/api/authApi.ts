import { api } from './axios';
import type { LoginRequest, RegisterRequest, TokenResponse, User } from '../types';

export const authApi = {
  login: async (data: LoginRequest): Promise<TokenResponse> => {
    const formData = new URLSearchParams();
    formData.append('grant_type', 'password');
    formData.append('username', data.email);
    formData.append('password', data.password);

    const response = await api.post<TokenResponse>('/api/v1/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data;
  },

  register: async (data: RegisterRequest): Promise<User> => {
    const response = await api.post<User>('/api/v1/auth/register', data);
    return response.data;
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get<User>('/api/v1/users/me');
    return response.data;
  },
};
