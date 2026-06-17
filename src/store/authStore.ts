import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi } from '../api/authApi';
import type { LoginRequest, RegisterRequest, User, UserRole } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterRequest) => Promise<User>;
  logout: () => void;
  getProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      role: null,
      isAuthenticated: false,
      loading: false,

      login: async (email: string, password: string) => {
        set({ loading: true });
        try {
          const response = await authApi.login({ email, password });
          localStorage.setItem('token', response.access_token);
          set({ token: response.access_token });
          await get().getProfile();
        } finally {
          set({ loading: false });
        }
      },

      register: async (data: RegisterRequest) => {
        set({ loading: true });
        try {
          return await authApi.register(data);
        } finally {
          set({ loading: false });
        }
      },

      logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ user: null, token: null, role: null, isAuthenticated: false });
      },

      getProfile: async () => {
        try {
          const user = await authApi.getProfile();
          localStorage.setItem('user', JSON.stringify(user));
          set({ user, role: user.role, isAuthenticated: true });
        } catch (error) {
          get().logout();
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, token: state.token, role: state.role, isAuthenticated: state.isAuthenticated }),
    }
  )
);
