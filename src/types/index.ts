export type UserRole = 'ADMIN' | 'USER' | 'STORE_OWNER';

export interface User {
  id: string;
  name: string;
  email: string;
  address: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Store {
  id: string;
  name: string;
  email: string | null;
  address: string | null;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

export interface Rating {
  id: string;
  store_id: string;
  user_id: string;
  rating: number;
  created_at: string;
  updated_at: string;
}

export interface StoreListItem {
  id: string;
  name: string;
  address: string | null;
  average_rating: number;
  total_ratings: number;
  user_rating: number | null;
}

export interface AdminDashboard {
  total_users: number;
  total_stores: number;
  total_ratings: number;
}

export interface StoreOwnerStoreStats {
  store_id: string;
  store_name: string;
  average_rating: number;
  total_ratings: number;
}

export interface StoreOwnerDashboard {
  stores: StoreOwnerStoreStats[];
  overall_average_rating: number;
  overall_total_ratings: number;
}

export interface RaterInfo {
  user_id: string;
  name: string;
  email: string;
  rating: number;
}

export interface PaginatedResponse<T> {
  total: number;
  page: number;
  page_size: number;
  items: T[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  address: string;
  password: string;
  role: UserRole;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}
